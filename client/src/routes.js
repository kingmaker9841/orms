import React from "react";
import { VIEW, VIEW_EDIT, VIEW_EDIT_DELETE } from "./views/Roles/util";

// REPORTING
const Dashboard = React.lazy(() => import("./views/Dashboard"));
const RegisterReports = React.lazy(() =>
  import("./views/Reports/RegisterReports")
);
const BranchSummary = React.lazy(() => import("./views/Reports/BranchSummary"));
const BranchDetails = React.lazy(() => import("./views/Reports/BranchDetails"));
const HOSummary = React.lazy(() => import("./views/Reports/HOSummary"));
const ReportOutputs = React.lazy(() => import("./views/Reports/ReportOutputs"));
// REPORTING-END

const Users = React.lazy(() => import("./views/Users/Users"));
const AddUser = React.lazy(() => import("./views/Users/AddUser"));
const EditUser = React.lazy(() => import("./views/Users/EditUser"));

const Roles = React.lazy(() => import("./views/Roles/Roles"));
const AddRole = React.lazy(() => import("./views/Roles/AddRole"));
const EditRole = React.lazy(() => import("./views/Roles/EditRole"));

const Branches = React.lazy(() => import("./views/Branches/Branches"));

const Departments = React.lazy(() => import("./views/Departments/Departments"));
const AddDepartment = React.lazy(() =>
  import("./views/Departments/AddDepartment")
);
const EditDepartment = React.lazy(() =>
  import("./views/Departments/EditDepartment")
);

const RiskAreas = React.lazy(() => import("./views/RiskAreas/RiskAreas"));
const RiskAreaParents = React.lazy(() =>
  import("./views/RiskAreas/RiskAreaParents")
);
const AddRiskArea = React.lazy(() => import("./views/RiskAreas/AddRiskArea"));
const RiskAreaCodes = React.lazy(() =>
  import("./views/RiskAreas/RiskAreaCodes")
);
const EditRiskArea = React.lazy(() => import("./views/RiskAreas/EditRiskArea"));

const RiskEstimationHO = React.lazy(() =>
  import("./views/RiskHOSummary/RiskEstimationHO")
);

const RiskEstimation = React.lazy(() =>
  import("./views/RiskEstimation/RiskEstimation")
);

const RiskRegisters = React.lazy(() =>
  import("./views/RiskRegister/RiskRegisters")
);

const PoliciesUpdate = React.lazy(() =>
  import("./views/PolicyUpdate/PoliciesUpdate")
);

const LossDatabase = React.lazy(() =>
  import("./views/LossDatabase/LossDatabase")
);

const Alerts = React.lazy(() => import("./views/Alerts/Alerts"));
const RiskTrigger = React.lazy(() => import("./views/Reports/RiskTrigger"));
const MailLog = React.lazy(() => import("./views/Mail/mailLog"));
//Forms
const FormList = React.lazy(() => import("./views/Forms/FormList"));
const ViewForm = React.lazy(() => import("./views/Forms/FormView"));
const FormBuilder = React.lazy(() => import("./views/Forms/FormBuilder"));
const FormReport = React.lazy(() => import("./views/Forms/FormReport"));
const FormReportView = React.lazy(() => import("./views/Forms/FormReportView"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/mail-log", name: "Notification", component: MailLog },
  {
    path: "/policies-update",
    exact: true,
    name: "Policies",
    component: PoliciesUpdate,
    permission: {
      name: "policyAndProcedure",
      level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE],
    },
  },
  {
    path: "/loss-database",
    exact: true,
    name: "Loss Database",
    component: LossDatabase,
    permission: {
      name: "lossDatabase",
      level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE],
    },
  },

  // REPORTS
  {
    path: "/reports/risk-trigger",
    name: "Risk Trigger Report",
    exact: true,
    component: RiskTrigger,
    permission: {
      name: "riskTrigger",
      level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE],
    },
  },
  {
    path: "/reports/register-data",
    name: "Risk Register Report",
    exact: true,
    component: RegisterReports,
    permission: {
      name: "auditTrail",
      level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE],
    },
  },
  {
    path: "/reports/branch-summary",
    name: "Branch Summary",
    component: BranchSummary,
    permission: {
      name: "branchSummary",
      level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE],
    },
  },
  {
    path: "/reports/branch-details",
    name: "Branch Reports",
    component: BranchDetails,
    permission: {
      name: "branchDetail",
      level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE],
    },
  },
  {
    path: "/reports/ho-summary",
    name: "HO Summary",
    component: HOSummary,
    permission: {
      name: "hoSummary",
      level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE],
    },
  },
  {
    path: "/reports/outputs",
    name: "Outputs",
    component: ReportOutputs,
    permission: {
      name: "reportOutput",
      level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE],
    },
  },
  // USERS
  {
    path: "/users",
    exact: true,
    name: "Users",
    component: Users,
    permission: { name: "user", level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE] },
  },
  {
    path: "/users/add",
    exact: true,
    name: "Add User",
    component: AddUser,
    permission: { name: "user", level: [VIEW_EDIT, VIEW_EDIT_DELETE] },
  },
  {
    path: "/users/:id",
    name: "Add User",
    component: EditUser,
    permission: { name: "user", level: [VIEW_EDIT, VIEW_EDIT_DELETE] },
  },
  // ROLES
  {
    path: "/roles",
    exact: true,
    name: "Roles",
    component: Roles,
    permission: { name: "role", level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE] },
  },
  {
    path: "/roles/add",
    exact: true,
    name: "Add Role",
    component: AddRole,
    permission: { name: "role", level: [VIEW_EDIT, VIEW_EDIT_DELETE] },
  },
  {
    path: "/roles/:id",
    name: "View Role",
    component: EditRole,
    permission: { name: "role", level: [VIEW_EDIT, VIEW_EDIT_DELETE] },
  },
  // BRANCHES
  {
    path: "/branches",
    name: "Branches",
    component: Branches,
    permission: { name: "branch", level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE] },
  },
  // DEPARTMENTS
  {
    path: "/departments",
    exact: true,
    name: "Departments",
    component: Departments,
    permission: {
      name: "department",
      level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE],
    },
  },
  {
    path: "/departments/add",
    exact: true,
    name: "Add Department",
    component: AddDepartment,
    permission: { name: "department", level: [VIEW_EDIT, VIEW_EDIT_DELETE] },
  },
  {
    path: "/departments/:id",
    name: "View Department",
    component: EditDepartment,
    permission: { name: "department", level: [VIEW_EDIT, VIEW_EDIT_DELETE] },
  },
  // Alerts
  { path: "/alerts", exact: true, name: "Alerts", component: Alerts },
  // RISK AREA
  {
    path: "/risk-areas",
    exact: true,
    name: "Risk Areas",
    component: RiskAreaParents,
    permission: {
      name: "riskArea",
      level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE],
    },
  },
  {
    path: "/risk-areas/edit/:id",
    name: "Edit Risk Area",
    component: EditRiskArea,
    permission: { name: "riskArea", level: [VIEW_EDIT, VIEW_EDIT_DELETE] },
  },
  {
    path: "/risk-areas/add",
    exact: true,
    name: "Add Risk Area",
    component: AddRiskArea,
    permission: { name: "riskArea", level: [VIEW_EDIT, VIEW_EDIT_DELETE] },
  },
  {
    path: "/risk-areas/code",
    exact: true,
    name: "Risk Area Codes",
    component: RiskAreaCodes,
    permission: { name: "riskArea", level: [VIEW_EDIT, VIEW_EDIT_DELETE] },
  },
  {
    path: "/risk-areas/:riskParentId",
    name: "View Risk Area",
    component: RiskAreas,
    permission: {
      name: "riskArea",
      level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE],
    },
  },
  // RISK ESTIMATION HO
  {
    path: "/risk-estimation-ho",
    exact: true,
    name: "Risk Estimation(HO)",
    component: RiskEstimationHO,
    permission: {
      name: "riskEstimationHo",
      level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE],
    },
  },
  // RISK ESTIMATION
  {
    path: "/risk-estimation",
    exact: true,
    name: "Risk Estimation Branch",
    component: RiskEstimation,
    permission: {
      name: "riskEstimation",
      level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE],
    },
  },
  // RISK REGISTER
  {
    path: "/risk-register",
    exact: true,
    name: "Risk Register",
    component: RiskRegisters,
    permission: {
      name: "riskRegister",
      level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE],
    },
  },

  //MAIL LOG

  //FORMS
  {
    path: "/forms",
    exact: true,
    name: "Forms",
    component: FormList,
    permission: { name: "form", level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE] },
  },
  {
    path: "/forms/view",
    name: "View Form",
    component: ViewForm,
    permission: { name: "form", level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE] },
  },
  {
    path: "/forms/builder",
    name: "Form Builder",
    component: FormBuilder,
    permission: { name: "form", level: [VIEW_EDIT, VIEW_EDIT_DELETE] },
  },
  {
    path: "/forms/report",
    name: "Form Report",
    component: FormReport,
    permission: { name: "form", level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE] },
  },
  {
    path: "/report/view",
    name: "Form Report View",
    component: FormReportView,
    permission: { name: "form", level: [VIEW, VIEW_EDIT, VIEW_EDIT_DELETE] },
  },
];

export default routes;
