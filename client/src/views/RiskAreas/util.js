const { getLossDataCatName } = require("./api");

function populateLikelihoodTable(riskParticularLikelihoodRules, likelihoodId) {
  if (riskParticularLikelihoodRules && likelihoodId) {
    const rule = riskParticularLikelihoodRules.filter((l) =>
      Number(l.likelihoodId) === likelihoodId ? 1 : 0
    )[0];
    return rule ? rule : {};
  }
  return {};
}

function populateImpactTable(riskParticularImpacts, impactId) {
  if (riskParticularImpacts && impactId) {
    const imapctRule = riskParticularImpacts.filter((l) =>
      Number(l.impactId) === impactId ? 1 : 0
    )[0];
    return imapctRule ? imapctRule : {};
  }
  return {};
}

function populateInstanceLikelihoodTable(
  riskParticularLikelihood,
  likelihoodId
) {
  if (riskParticularLikelihood && likelihoodId) {
    const likelihoodRule = riskParticularLikelihood.filter((l) =>
      l.likelihoodId === likelihoodId ? 1 : 0
    )[0];
    return likelihoodRule ? likelihoodRule : {};
  }
  return {};
}

function populateInstanceImpactTable(riskParticularImpact, impactId) {
  if (riskParticularImpact && impactId) {
    const impactRule = riskParticularImpact.filter((l) =>
      l.impactId === impactId ? 1 : 0
    )[0];
    return impactRule ? impactRule : {};
  }
  return {};
}

const splitText = "|||";

export {
  populateLikelihoodTable,
  populateImpactTable,
  populateInstanceImpactTable,
  populateInstanceLikelihoodTable,
  splitText,
};
