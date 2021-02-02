const { Branch } = require("../../config/database");
const axios = require("axios");
const https = require("https");
/**
 * @method module:Utility#getBranches
 * @param {Array<String>} attributes Array of attributes to get for branches
 *
 * @returns The list of branches from CBS or from local database
 */
const getBranches = async (attributes) => {
  let data = [];
  if (process.env.NODE_ENV === "development") {
    data = await Branch.findAll({
      where: { isDeleted: false },
      raw: true,
      attributes: attributes ? attributes : ["*"],
    });
  } else {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const response = await axios(process.env.BRANCH_SERVER_URL, {
      httpsAgent: agent,
    });
    data = response.data;
  }

  return data;
};

/**
 * @method module:Utility#associateBranches
 *
 * @param {Array<Object>} branches List of branches
 * @param {Array<Object>} data List of items to associate with branches
 * @param {String} associateKey Key to be used to store branches after association
 * @param {String} foreignKey Key to compare in associated items for association
 * @param {String} sourceKey Key to compare foreignKey
 * @example
 * // returns
 * // [
 * //   { id: 1, name: "A", items: [{branchId: 1, name: "P"}, {branchId: 1, name: "Q"}, {branchId: 1, name: "R"}] },
 * //   { id: 2, name: "B", items: [{branchId: 2, name: "X"}, {branchId: 2, name: "Y"}] }
 * // ]
 * associatedBranches(
 *   [
 *     { id: 1, name: "A" },
 *     { id: 2, name: "B" },
 *   ], //branches
 *   [
 *     { branchId: 1, name: "P" },
 *     { branchId: 1, name: "Q" },
 *     { branchId: 1, name: "R" },
 *     { branchId: 2, name: "X" },
 *     { branchId: 2, name: "Y" },
 *   ], //data
 *   "items", //associateKey
 *   "branchId",
 *   "id"
 * );
 * @returns Array with association
 */
const associateBranches = (
  branches,
  data,
  associateKey,
  foreignKey,
  sourceKey
) => {
  return branches.map((b) => {
    // console.log("data ", JSON.parse(JSON.stringify(data)));
    // console.log("branches", b);
    const associatedData = data.filter((d) =>
      d[sourceKey ? sourceKey : "branchId"] ===
      b[foreignKey ? foreignKey : "id"]
        ? 1
        : 0
    );
    b[associateKey] = associatedData;
    // console.log("b", b);
    return b;
  });
};

const getBranch = async (branchId) => {
  const branches = await getBranches();
  return branches.filter((b) => (b.id === Number(branchId) ? 1 : 0))[0];
};

module.exports = {
  getBranch,
  getBranches,
  associateBranches,
};
