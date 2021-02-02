const {
  BaseUnit,
  Likelihood,
  Impact,
  RiskArea,
  RiskAreaParticular,
  RiskAreaTracedBy,
  RiskAreaTrigger,
  RiskAreaLikelihoodRule,
  RiskAreaImpactRule,
  RiskAreaInstanceRule,
} = require("../../config/database");

/**
 * This function updates the risk triggers associated with the risk area
 * @method module:RiskRuleSetup#updateRiskTriggers
 * @param {Array<Object>} riskTriggers - List of risk triggers received from the
 * @param {Number} userId              - User id of the user who changed the data
 * @param {Number} riskAreaId          - ID of the associated risk area
 */
async function updateRiskTriggers(riskTriggers, userId, riskAreaId) {
  await RiskAreaTrigger.update(
    { isDeleted: true, editedBy: userId },
    { where: { riskAreaId: riskAreaId } }
  );
  for (riskTrigger of riskTriggers) {
    if (riskTrigger.id) {
      await RiskAreaTrigger.update(
        { ...riskTrigger, editedBy: userId, isDeleted: false },
        { where: { id: riskTrigger.id } }
      );
    } else {
      await RiskAreaTrigger.create({
        ...riskTrigger,
        createdBy: userId,
      });
    }
  }
}
/**
 * This function updates the traced by associated with the risk area
 * @method module:RiskRuleSetup#updateRiskTracedBy
 * @param {Array<Object>} tracedBys    - List of traced by values
 * @param {Number} userId              - User id of the user who changed the data
 * @param {Number} riskAreaId          - ID of the associated risk area
 */
async function updateRiskTracedBy(tracedBys, userId, riskAreaId) {
  await RiskAreaTracedBy.update(
    { isDeleted: true, editedBy: userId },
    { where: { riskAreaId: riskAreaId } }
  );
  for (tracedBy of tracedBys) {
    if (tracedBy.id) {
      await RiskAreaTracedBy.update(
        { ...tracedBy, editedBy: userId, isDeleted: false },
        { where: { id: tracedBy.id } }
      );
    } else {
      await RiskAreaTracedBy.create({
        ...tracedBy,
        createdBy: userId,
      });
    }
  }
}
/**
 * This function updates the risk instance rules which is one of the type of riskParticular.
 * @method module:RiskRuleSetup#updateRiskInstanceRules
 * @param {Array<Object>} riskInstanceRules    - List of rules for instance types
 * @param {Number} userId                      - User id of the user who changed the data
 * @param {Number} riskAreaId                  - ID of the associated risk area
 */
async function updateRiskInstanceRules(riskInstanceRules, userId, riskAreaId) {
  await RiskAreaInstanceRule.update(
    { isDeleted: true, editedBy: userId },
    { where: { riskAreaId: riskAreaId, isDeleted: false } }
  );
  for (riskInstanceRule of riskInstanceRules) {
    if (riskInstanceRule.id) {
      await RiskAreaInstanceRule.update(
        { ...riskInstanceRule, editedBy: userId, isDeleted: false },
        { where: { id: riskInstanceRule.id } }
      );
    } else {
      await RiskAreaInstanceRule.create({
        ...riskInstanceRule,
        riskAreaId: riskAreaId,
        createdBy: userId,
      });
    }
  }
}
/**
 * This function updates the risk particulars (detail of error)
 * @method module:RiskRuleSetup#updateRiskParticulars
 * @param {Array<Object>} riskParticulars      - List of risk particulars(details of error)
 * @param {Number} userId                      - User id of the user who changed the data
 * @param {Number} riskAreaId                  - ID of the associated risk area
 */
async function updateRiskParticulars(riskParticulars, userId, riskAreaId) {
  await RiskAreaParticular.update(
    { isDeleted: true, editedBy: userId },
    { where: { riskAreaId: riskAreaId, isDeleted: false } }
  );
  await Promise.all(
    riskParticulars.map((riskParticular) => {
      return updateRiskParticular(riskParticular, userId);
    })
  );
  return true;
}
/**
 * This method updates individual risk particular
 * @method module:RiskRuleSetup#updateRiskParticular
 * @param {Object} riskParticular    - Object of risk particular - individual
 * @param {Number} userId            - User id of the user who changed the data
 */
async function updateRiskParticular(riskParticular, userId) {
  if (riskParticular.id) {
    await Promise.all([
      RiskAreaParticular.update(
        { ...riskParticular, editedBy: userId, isDeleted: false },
        { where: { id: riskParticular.id } }
      ),
      updateRiskAreaLikelihoodRule(
        riskParticular.risk_area_likelihood_rules,
        userId,
        riskParticular.id
      ),
      updateRiskAreaImpactRule(
        riskParticular.risk_area_impact_rules,
        userId,
        riskParticular.id
      ),
    ]);
  } else {
    await RiskAreaParticular.create({
      ...riskParticular,
      createdBy: userId,
    }).then((particular) => {
      updateRiskAreaLikelihoodRule(
        riskParticular.risk_area_likelihood_rules,
        userId,
        particular.id
      );
      updateRiskAreaImpactRule(
        riskParticular.risk_area_impact_rules,
        userId,
        particular.id
      );
    });
  }
}
/**
 * This method updates the likelihood rules for the risk particular
 * @method module:RiskRuleSetup#updateRiskAreaLikelihoodRule
 * @param {Array<Object>} likelihoodRules - List of likelihood rules
 * @param {Number} userId                 - User id of the user who changed the data
 * @param {Number} riskAreaParticularId   - ID of the associated risk particular
 */
async function updateRiskAreaLikelihoodRule(
  likelihoodRules,
  userId,
  riskAreaParticularId
) {
  for (rule of likelihoodRules) {
    if (rule.id) {
      await RiskAreaLikelihoodRule.update(
        { ...rule, editedBy: userId },
        { where: { id: rule.id } }
      );
    } else {
      await RiskAreaLikelihoodRule.create({
        ...rule,
        riskAreaParticularId,
        createdBy: userId,
      });
    }
  }
}
/**
 * This method updates the impact rules for the risk particular
 * @method module:RiskRuleSetup#updateRiskAreaImpactRule
 * @param {Array<Object>} impactRules     - List of impact rules
 * @param {Number} userId                 - User id of the user who changed the data
 * @param {Number} riskAreaParticularId   - ID of the associated risk particular
 */
async function updateRiskAreaImpactRule(
  impactRules,
  userId,
  riskAreaParticularId
) {
  for (rule of impactRules) {
    if (rule.id) {
      await RiskAreaImpactRule.update(
        { ...rule, editedBy: userId },
        { where: { id: rule.id } }
      );
    } else {
      await RiskAreaImpactRule.create({
        ...rule,
        riskAreaParticularId,
        createdBy: userId,
      });
    }
  }
}

module.exports = {
  updateRiskParticulars,
  updateRiskTracedBy,
  updateRiskTriggers,
  updateRiskInstanceRules,
};
