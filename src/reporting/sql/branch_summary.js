const { QUARTERLY, HALF_YEARLY, YEARLY } = require("../util/values");

/**
 * @method module:Reporting#RiskRegisterSummary
 * @param {Object} options - Options to generate the query
 * @returns Query for the risk register summary data to calculate report
 */
const RiskRegisterSummary = (options) => {
  const branchId = options.branchId;
  const frequency = options.frequency;
  const status = options.status;
  const startDate = options.startDate;
  return `
    SELECT
        riskAreaCode,
        riskAreaParticularCode,
        type,
        SUM(occurrence) as occurrence,
        SUM(amountTiming) as amountTiming,
        SUM(
            CASE
            WHEN financialImpact NOT LIKE '%[^0-9]%' THEN CAST(financialImpact AS BIGINT)
            ELSE 0
            END
        ) as financialImpact
        FROM dbo.risk_registers
        INNER JOIN dbo.risk_area_particulars ON dbo.risk_registers.riskAreaParticularCode = dbo.risk_area_particulars.code
        AND branchId = ${branchId}
        AND dbo.risk_registers.tracedDate > '${startDate}'
        AND dbo.risk_registers.tracedDate < DATEADD(MONTH, ${frequency}, '${startDate}')
        AND dbo.risk_registers.status LIKE '${status}'
        GROUP BY
        riskAreaCode,
        riskAreaParticularCode,
        type
    `;
};

/**
 * @method module:Reporting#BranchSummaryRange
 * @param {String} Summary - Generated risk register summary query
 * @param {Object} options - Options to generate the query
 * @returns Returns the query for RANGE based risk particulars
 */
const BranchSummaryRange = (Summary, options) => {
  const divideBy = options.frequency / 3;
  return `
    SELECT
        occurrence,
        amountTiming,
        financialImpact,
        riskAreaCode,
        MAX(dbo.risk_area_likelihood_rules.likelihoodId) as likelihood,
        MAX(dbo.risk_area_impact_rules.impactId) as impact
        FROM (
            SELECT
            occurrence,
            amountTiming,
            financialImpact,
            id as riskParticularId,
            riskAreaCode
            FROM (${Summary}) Summary
            INNER JOIN dbo.risk_area_particulars ON riskAreaParticularCode = dbo.risk_area_particulars.code
            AND dbo.risk_area_particulars.isActive = 1
            AND dbo.risk_area_particulars.isDeleted = 0
        ) as A
        INNER JOIN dbo.risk_area_likelihood_rules ON dbo.risk_area_likelihood_rules.lowerLimit <=  (occurrence / ${divideBy})
        AND riskParticularId = dbo.risk_area_likelihood_rules.riskAreaParticularId
        INNER JOIN dbo.risk_area_impact_rules on dbo.risk_area_impact_rules.lowerLimit <=  (amountTiming / ${divideBy})
        AND riskParticularId = dbo.risk_area_impact_rules.riskAreaParticularId
        GROUP BY
        occurrence,
        amountTiming,
        financialImpact,
        riskAreaCode
    `;
};

/**
 * @method module:Reporting#BranchSummaryInstance
 * @param {String} Summary - Generated risk register summary query
 * @param {Object} options - Options to generate the query
 * @returns Returns the query for INSTANCE based risk particulars
 */
const BranchSummaryInstance = (Summary, options) => {
  const divideBy = options.frequency / 3;
  return `
    SELECT
        SUM(occurrence) as occurrence,
        SUM(amountTiming) as amountTiming,
        SUM(financialImpact) as financialImpact,
        riskAreaCode,
        MAX(
        dbo.risk_area_likelihood_instance_rules.likelihoodId
        ) as likelihood,
        MAX(dbo.risk_area_impact_rules.impactId) AS impact
    FROM (${Summary}) Summary
    INNER JOIN dbo.risk_areas ON dbo.risk_areas.code = riskAreaCode
        AND Summary.type = 'instance'
    INNER JOIN dbo.risk_area_particulars ON dbo.risk_area_particulars.code = riskAreaParticularCode
    INNER JOIN dbo.risk_area_impact_rules ON dbo.risk_area_impact_rules.riskAreaParticularId = dbo.risk_area_particulars.id
    INNER JOIN dbo.risk_area_likelihood_instance_rules ON dbo.risk_areas.id = dbo.risk_area_likelihood_instance_rules.riskAreaId
        AND dbo.risk_area_likelihood_instance_rules.lowerLimit <= (occurrence / ${divideBy})
    GROUP BY
        riskAreaCode
    `;
};

/**
 * @method module:Reporting#getQueryBranchSummary
 * @param {Number} branchId   - Branch ID whose report is to be calculated
 * @param {Number} frequency  - QUARTERLY, HALF_YEARLY, YEARLY (in months)
 * @param {String} status     - DRAFT, PENDING, UNAPPROVED, APPROVED (Risk Register status)
 * @param {String} mergeType  - avg, min, max (Merge Function Types)
 * @param {Date} startDate    - Base date to calculate the report Data
 * @returns Query to calculate the BRANCH summary
 */
const getQuery = (options) => {
  const Summary = RiskRegisterSummary(options);
  let queryBuilder = `
        SELECT *
        FROM (${BranchSummaryInstance(Summary, options)}) Instance
        UNION (${BranchSummaryRange(Summary, options)})
    `;
  // console.log(queryBuilder);
  return queryBuilder;
};

module.exports = {
  getQuery,
};
