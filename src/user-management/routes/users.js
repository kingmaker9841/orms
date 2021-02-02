const router = require('express').Router();
const Op = require('sequelize').Op;
const auth = require('../../config/auth');
const logger = require('../../config/logger');
const { User, UserChange } = require('../../config/database');
const UserModel = require('../models/user');
const { getUsers, signInLdap } = require('../util/user_ldap_auth');
const timeout = require('connect-timeout'); //express v4
const { auditData } = require('../../config/audit');

router.get('/users/ldap', timeout('10s'), auth.required, (req, res, next) => {
  getUsers((users) => {
    res.send(
      users.filter((user) =>
        user.name === 'Administrator' ||
        user.name === 'Guest' ||
        user.name === 'krbtgt'
          ? 0
          : 1
      )
    );
  });
});

router.get('/users', auth.required, (req, res, next) => {
  User.findAll({
    where: { isDeleted: false },
  })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send(false);
    });
});

router.get('/users/:id', auth.required, (req, res, next) => {
  User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => res.send(user))
    .catch((err) => {
      logger.error(err);
      res.status(500).send(false);
    });
});

router.put('/users/:id', auth.required, (req, res, next) => {
  const user = req.body;
  user.loginAttemptsCount = user.loginAttempts;
  //AUDIT STARTS HERE
  auditData(User, user, req.payload);
  //AUDIT ENDS HERE

  User.update(user, {
    where: { id: req.params.id },
  })
    .then((_) => res.send(true))
    .catch((err) => {
      logger.error(err);
      res.status(500).send(false);
    });
});

router.post('/users', auth.required, (req, res, next) => {
  const user = {
    email: req.body.userPrincipalName ? req.body.userPrincipalName : '',
    username: req.body.sAMAccountName ? req.body.sAMAccountName : '',
    distinguishedName: req.body.distinguishedName
      ? req.body.distinguishedName
      : '',
    firstName: req.body.givenName ? req.body.givenName : '',
    lastName: req.body.sn ? req.body.sn : '',
    phoneNumber: req.body.telephoneNumber ? req.body.telephoneNumber : '',
    roleId: req.body.roleId ? req.body.roleId : '',
    branchId: req.body.branchId ? req.body.branchId : '',
    departmentId: req.body.departmentId ? req.body.departmentId : '',
    //For Province Manager
    provinceId: req.body.provinceId ? req.body.provinceId : '',
    loginAttempts: req.body.loginAttempts ? req.body.loginAttempts : '',
    loginAttemptsCount: req.body.loginAttempts ? req.body.loginAttempts : '',
    createdBy: req.body.createdBy ? req.body.createdBy : '',
  };
  User.create(user)
    .then((_) => res.send(true))
    .catch((err) => {
      logger.error(err);
      res.status(500).send(false);
    });
});

router.post('/login', timeout('10s'), (req, res, next) => {
  const { username, password } = {
    username: req.body.email,
    password: req.body.password,
  };
  process.env.NODE_ENV === 'development'
    ? console.log(username, password)
    : null;
  if (username && password) {
    User.findOne({
      where: {
        [Op.or]: [
          {
            email: username,
          },
          {
            username: username,
          },
        ],
        isDeleted: false,
        isActive: true,
      },
    })
      .then((user) => {
        if (user) {
          let attempts = user.loginAttemptsCount;
          if (attempts > 0) {
            if (process.env.NODE_ENV === 'development') {
              const data = UserModel.toAuthJSON(user);
              res.cookie('token', data.token);
              res.send(data);
              User.update(
                { loginAttemptsCount: user.loginAttempts },
                { where: { id: user.id } }
              );
            } else {
              signInLdap(user.distinguishedName, password, (result) => {
                if (result) {
                  const data = UserModel.toAuthJSON(user);
                  res.cookie('token', data.token);
                  res.send(data);
                  User.update(
                    { loginAttemptsCount: user.loginAttempts },
                    { where: { id: user.id } }
                  );
                } else {
                  attempts--;
                  res.status(401).send(false);
                  if (attempts === 0)
                    User.update(
                      { isActive: false },
                      { where: { id: user.id } }
                    );
                  User.update(
                    { loginAttemptsCount: attempts },
                    { where: { id: user.id } }
                  );
                }
              });
            }
          } else {
            res.status(401).send(false);
          }
        } else {
          res.status(401).send(false);
        }
        return null;
      })
      .catch((err) => {
        logger.error(err);
        res.status(500).send(false);
      });
  }
});

router.delete('/users/:id', auth.required, (req, res, next) => {
  User.update(
    {
      isDeleted: true,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((_) => {
      res.send('Successful!');
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send('Error!');
    });
});

module.exports = router;
