/**
 * @method module:Reporting#getQueryHOSummary
 * @param {Number} frequency  - QUARTERLY, HALF_YEARLY, YEARLY (in months)
 * @param {String} status     - DRAFT, PENDING, UNAPPROVED, APPROVED (Risk Register status)
 * @param {Date} startDate    - Base date to calculate the report Data
 * @returns Query to calculate the HO summary
 */
const getQuery = (options) => {
    const frequency = options.frequency;
    const startDate = options.startDate;
    let queryBuilder = `
    SELECT
        risk_areas.id as id,
        risk_areas.name as riskAreaName,
        risk_areas.code as riskAreaCode,
        Estimation.previousRiskScore as previousRiskScore,
        Estimation.likelihood as estLikelihood,
        Estimation.impact as estImpact,
        BranchScore.occurrence as occurrence,
        BranchScore.amountTiming as amountTiming,
        BranchScore.financialImpact as financialImpact,
        BranchScore.actualRiskScore as actualRiskScore,
        EstimatedCategory.name as estimatedCategory,
        PreviousCategory.name as previousCategory,
        ActualCategory.name as actualCategory
    FROM risk_areas
    LEFT JOIN risk_estimation_hos Estimation ON risk_areas.id = Estimation.riskAreaId
    INNER JOIN (
        SELECT
            riskAreaId,
            SUM(occurrence) as occurrence,
            SUM(amountTiming) as amountTiming,
            SUM(financialImpact) as financialImpact,
            AVG(actualRiskScore) as actualRiskScore
        FROM branch_scores
        WHERE
            actualRiskScore != 0
            AND startDate = '${startDate}'
        GROUP BY
            riskAreaId
        ) BranchScore ON BranchScore.riskAreaId = risk_areas.id
    LEFT JOIN risk_categorizations EstimatedCategory ON EstimatedCategory.lowerLimit < (Estimation.likelihood * Estimation.impact)
        AND EstimatedCategory.upperLimit >= (Estimation.likelihood * Estimation.impact)
    LEFT JOIN risk_categorizations PreviousCategory ON PreviousCategory.lowerLimit < Estimation.previousRiskScore
        AND PreviousCategory.upperLimit >= Estimation.previousRiskScore
    LEFT JOIN risk_categorizations ActualCategory ON ActualCategory.lowerLimit < BranchScore.actualRiskScore
        AND ActualCategory.upperLimit >= BranchScore.actualRiskScore
    WHERE
        risk_areas.isActive = 'true'
        AND risk_areas.isDeleted = 'false'
    `;
    return queryBuilder;
}

module.exports = {
    getQuery
}