import { VIEW_EDIT, VIEW_EDIT_DELETE } from './views/Roles/util';

const { VIEW } = require('./views/Roles/util');

const navItems =
  [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-pie-chart',

    },
    {
      name: 'Notification',
      url: '/mail-log',
      icon: 'icon-pie-chart'
    },
    {
      name: 'Risk Event',
      url: '/risk-register',
      icon: 'icon-pie-chart'
    },
    {
      name: 'Branch',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '',            // optional class names space delimited list for title item ex: "text-center"
      icon: 'icon-chart',
      permission: ['branchSummary', 'riskRegister'],
      children: [
        {
          name: 'Branch Summary',
          url: '/reports/branch-summary',
          icon: 'icon-pie-chart',
          permission: ['branchSummary']
        },
        {
          name: 'Risk Register',
          url: '/risk-register',
          icon: 'icon-pie-chart',
          permission: ['riskRegister']
        },
      ]
    },
    {
      name: 'Head Office',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '',            // optional class names space delimited list for title item ex: "text-center"
      icon: 'icon-chart',
      permission: ['policyAndProcedure', 'hoSummary', 'lossDatabase'],
      children: [
        {
          name: 'Policies & Procedure',
          url: '/policies-update',
          icon: "icon-settings",
          permission: ['policyAndProcedure'],
        },
        {
          name: 'HO Summary',
          url: '/reports/ho-summary',
          icon: 'icon-pie-chart',
          permission: ['hoSummary']
        },
        {
          name: 'Loss Database',
          url: '/loss-database',
          icon: 'icon-pie-chart',
          permission: ['lossDatabase']
        }
      ]
    },
    {
      name: 'Estimation',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '',            // optional class names space delimited list for title item ex: "text-center"
      icon: 'icon-chart',
      permission: ['riskEstimationHo', 'riskEstimation'],
      children: [
        {
          name: 'Risk Estimation HO',
          url: '/risk-estimation-ho',
          icon: 'icon-settings',
          permission: ['riskEstimationHo']
        },
        {
          name: 'Risk Estimation Branch',
          url: '/risk-estimation',
          icon: 'icon-settings',
          permission: ['riskEstimation']
        },
      ]
    },
    {
      name: 'Reports',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '',            // optional class names space delimited list for title item ex: "text-center"
      icon: 'icon-chart',
      permission: ['branchDetail', 'reportOutput', 'auditTrail', 'riskTrigger'],
      children: [
        {
          name: 'Branch Details',
          url: '/reports/branch-details',
          icon: 'icon-pie-chart',
          permission: ['branchDetail']
        },
        {
          name: "Risk Trigger",
          url: "/reports/risk-trigger",
          icon: 'icon-pie-chart',
          permission: ['riskTrigger']
        },
        {
          name: "Form Reports",
          url: "/forms/report",
          icon: 'icon-pie-chart',
          permission: ['form']
        },
        // {
        //   name: 'Outputs',
        //   url: '/reports/outputs',
        //   icon: 'icon-cloud-download',
        //   permission: ['reportOutput']
        // },
        {
          name: "Audit Trail",
          url: '/reports/register-data',
          icon: 'icon-chart',
          permission: ['auditTrail']
        },
      ]
    },
    {
      name: 'Risk Area/Function',
      url: '/risk-areas',
      icon: 'icon-settings',
      permission: ['riskArea']
    },
    {
      // title: true,
      name: 'Settings',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '',             // optional class names space delimited list for title item ex: "text-center",
      icon: 'icon-settings',
      permission: ['role', 'branch', 'user', 'department', 'alert'],
      children: [
        {
          name: 'Branches',
          url: '/branches',
          icon: 'icon-layers',
          permission: ['branch']
        },
        {
          name: 'Departments',
          url: '/departments',
          icon: 'icon-briefcase',
          permission: ['department']
        },
        {
          name: 'Users',
          url: '/users',
          icon: 'icon-user',
          permission: ['user']
        },
        {
          name: 'Roles',
          url: '/roles',
          icon: 'icon-shield',
          permission: ['role']
        },
        {
          name: 'Alerts',
          url: '/alerts',
          icon: 'icon-settings',
          permission: ['alert']
        },
        {
          name: 'Forms',
          url: '/forms',
          icon: 'icon-settings',
          permission: ['form']
        },
      ]
    },
  ]


function getChildren(permissions, children) {
  const items = [];
  children.forEach(nav => {
    const permission = nav.permission;
    if (permission) {
      let isAccessible = false;
      permission.forEach(r => {
        if (permissions[r] === VIEW || permissions[r] === VIEW_EDIT || permissions[r] === VIEW_EDIT_DELETE) {
          isAccessible = true;
        }
      });
      if (isAccessible) items.push(nav);
    } else {
      items.push(nav);
    }
  });
  return items;
}

function getNavbarItems(permissions) {
  const items = [];
  navItems.forEach(nav => {
    const permission = nav.permission;
    if (permission) {
      let isAccessible = false;
      permission.forEach(r => {
        if (permissions[r] === VIEW || permissions[r] === VIEW_EDIT || permissions[r] === VIEW_EDIT_DELETE) {
          isAccessible = true;
        }
      });
      if (isAccessible) {
        nav.children = nav.children ? getChildren(permissions, nav.children) : null;
        items.push(nav);
      };
    } else {
      items.push(nav);
    }
  });
  return {
    items: items
  };
}

export default getNavbarItems;