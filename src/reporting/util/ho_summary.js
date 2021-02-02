const { getQuery } = require("../sql/ho_summary");
const { sequelize } = require("../../config/database");

/**
 * @method module:Reporting#getHoSummary
 * @param {Object} options        - Options to calculate the branch summary report
 * @returns The HO summary data from the generated query
 */
async function getHoSummary(options) {
  const query = getQuery(options);
  const hoSummaryRaw = await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
  });
  return {
    hoSummary: hoSummaryRaw,
  };
}

module.exports = {
  getHoSummary,
};
