const router = require("express").Router();
const auth = require("../../config/auth");
const logger = require("../../config/logger");
const { Province, ProvinceBranch, Branch } = require("../../config/database");
const { getBranches } = require("../util/branches");
const _ = require("lodash");

router.get("/branches", auth.required, (req, res, next) => {
  /**
   * Getting list of Branches from CBS
   * API will be provided from the Bank itself
   * You must map branch and province by yourself
   */
  getBranches()
    .then(branches => {
      res.send(branches);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ success: false, message: "Server Error!" });
    });
});

router.get('/province_to_branch/:provinceId', async (req,res)=> {
  const {provinceId} = req.params;
  Branch.hasMany(ProvinceBranch, {sourceKey: 'id', foreignKey : 'branchId'});
  // if (process.env.NODE_ENV === "development") {
    const data = await Branch.findAll({
      attributes: ['name'],
      include: [
        {
          model: ProvinceBranch,
          attributes: ['id','provinceId'],
          where: {
            provinceId
          }
        }
      ]
    })
    // console.log(data);
    res.status(200).send(data);
    // return data;
// }
})

router.get("/provinces", auth.required, (req, res, next) => {
  Province.hasMany(ProvinceBranch);
  Province.findAll({
    include: {
      model: ProvinceBranch,
      required: false
    }
  })
    .then(provinces => {
      res.send(provinces);
    })
    .catch(err => {
      logger.log(err);
      res.send("Error!");
    });
});

router.put("/branches", auth.required, (req, res, next) => {
  var provinces = req.body;
  Promise.all(
    provinces.map(async (p) => {
      await ProvinceBranch.update(
        { provinceId: 0 },
        { where: { provinceId: p.id } }
      );
      return Promise.all(
        p.province_to_branches.map(async p2b => {
          const count = await ProvinceBranch.update(p2b, {
            where: { branchId: p2b.branchId }
          });
          if (count[0] === 0) {
            await ProvinceBranch.create(p2b);
          }
        })
      );
    })
  ).then(_ => {
    res.send("Completed!");
  }).catch(err => {
    logger.error(err);
  });
});

module.exports = router;
