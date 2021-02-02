# Operation Risk Management Documentation

**Operational Risk Management System(ORMS) © 2020** is a record of operational risk events and their assessment which supports the overall operational risk management process. Operational Risk Management System is helpful for:

- Collecting the data on operational issues.
- Identifying current risk exposures and emerging risk trends.
- Providing risk grading for branches.
- Providing recommendations for improvement in operational aspects of branches, departments and the bank as a whole.
- Setting the framework for reporting to Risk Management Committee and Senior Management.

# Basic Salient Features

- ORM System have latest UI/UX features and able to interactive, seamless, intuitive, flexible.
- System have provision to create unlimited number of Users/Roles/Branches/ Outlets etc.
- ORM System supports self-UserManagement System and Active directory based login/LDAP integration
- ORMSystem has been designed on the basis of format prescribed by Risk Management Policy Guidelines, 2018 of the Bank.
- ORM System has 360-degree process dashboard with snapshot of major state of Risk, risk activities and menus for action.
- ORMSystem Dashboard has list of widgets which can be selected and positioned with priority and user’s choice.
- ORM System had composed of administrative module, data capture module, monitoring module and reporting module
- ORM System has administrative module, that able to configure parameter like risk categories, sub categories, frequencies, impact score etc.
- ORM System had designed considering major day to day functions performed by the branches like: Cash Handling, Teller Transaction, Remittance Issue, Account opening, and Cheque Issue etc.
- ORM system can quantify the operational risk identified. ORM System has provision to allocate scores. Each score has its own relevant impact and likelihood.
- ORM System has Sub-category of Risk Score i.e. Likelihood and Impact to be numeric only. Risk score can be result of multiplication of both likelihood and impact.
- ORM System has mailing features to those who preserve the high risk or low risk activities/score.
- ORM System has provision to calculate the risk score branch-wise and function-wise.
- ORM System has the form, where branch can feed the risk events on daily basis.
- ORM System has the features of auto generated remainder to the respective branch which do not fill and maintain ORMsystem on timely manner.
- ORM System has feature of branch-wise operational risk estimation to higher level.
- ORM System has provision of branch wise automatic risk grading and consolidated risk grading.
- ORM System has provision of comparison of actual risk score v/s estimated risk score and actual risk score v/s previous actual risk score based on following categories:
  - Improved (If grading is improved)
  - Status quo (If grading remains same)
  - Downgraded (If grading is downgraded)

# Reporting

ORMS is a Business Intelligence Software that helps decision-making process easier and minimize the operation risk in advance. ORMS generates various reports such as Branch Categorization, Branch Categorization Summary, and Branch Grading etc. ORMS also provide reports based on Risk Triggers, Risk Particulars and Related Staff. ORMS also provide Audit Trail of the system for Information Security (IS) Audit. Besides system, generated report ORMS can also provide customize report as per the requirement of the bank.

# Installation

ORMS requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd general-dms-api
$ npm install
```

Create `.env` file similar to `.env.example` and update the credentials before running below command

```sh
$ npm start
```

**For production environments...**
Similar to above but you have to add one extra variable during production i.e.`NODE_ENV = production`

Also, instead of using `npm start` to run the server you'll have to follow some production standard library like `pm2`

[![pm2](https://nodei.co/npm/pm2.png?downloads=true&downloadRank=true)](https://www.npmjs.com/package/pm2)

```sh
$ pm2 start index.js --name <YOUR_PROJECT_NAME|gdms>
```

After the completion of the above tasks you can go to the setup route as below, and set necessary values in the tables

```sh
http://localhost:<PORT>/setup/initial
```

# Documentation

To generate documentation we are using JSDOC plugin

```sh
npm run jsdoc
```

# Resources for development!

**Security**

- [Web security essentials - Security perspective](https://www.sohamkamani.com/blog/2017/01/16/web-security-essentials/)
- [High order components - for Route Authorization](https://reactjs.org/docs/higher-order-components.html)
- [Handling authentication with nodejs](https://medium.freecodecamp.org/learn-how-to-handle-authentication-with-node-using-passport-js-4a56ed18e81e)
- [Using high order components for Authenticated Routing](https://www.codementor.io/sahilmittal/using-higher-order-components-for-authenticated-routing-i1hcp6pc6)
- [Role based authorization REACT](https://hackernoon.com/role-based-authorization-in-react-c70bb7641db4)

**Active Directory**

- [Active directory attributes list](https://docs.secureauth.com/display/KBA/Active+Directory+Attributes+List)
- [Setting up LDAP on windows server](https://blogs.msdn.microsoft.com/microsoftrservertigerteam/2017/04/10/step-by-step-guide-to-setup-ldaps-on-windows-server/)
- [LDAPjs - AD authentication library for nodejs](http://ldapjs.org/)

**Database**

- [Sequelize ORM](http://docs.sequelizejs.com/)

**GUI**

- [Material Page layout examples](https://material-ui.com/getting-started/page-layout-examples/)
- [Core UI](https://coreui.io/demo/#icons/coreui-icons.html)
- [React bootstrap 4 library](https://reactstrap.github.io/)
- [FontAwesome4 cheatsheet](https://fontawesome.com/v4.7.0/cheatsheet/)

**REDUX**

- [Redux guide](https://medium.com/free-code-camp/understanding-redux-the-worlds-easiest-guide-to-beginning-redux-c695f45546f6)

**Production Guide**

- [Express Tutorial Part 7: Deploying to production](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)
- [NodeJS: Best Practices for Production](https://www.freecodecamp.org/news/nodejs-best-practices-for-production-5b173983d14b/)
- [Node.js Production Environment - a Step-By-Step Guide for Startups](https://blog.risingstack.com/nodejs-production-environment-for-startups/)

**Documentation & Reporting**

- [JSDOC for documentation](https://devhints.io/jsdoc)
- [DocumentationJS for documentation](https://github.com/documentationjs/documentation#documentation)
- [TableToExcel in React Component](https://www.npmjs.com/package/@linways/table-to-excel)
