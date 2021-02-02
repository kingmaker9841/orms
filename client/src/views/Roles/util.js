const NONE = 0;
const VIEW = "1";
const VIEW_EDIT = "2";
const VIEW_EDIT_DELETE = "3";

const options = [
  {
    value: 0,
    label: "--- NONE ---",
  },
  {
    value: VIEW,
    label: "View",
  },
  {
    value: VIEW_EDIT,
    label: "View / Edit",
  },
  {
    value: VIEW_EDIT_DELETE,
    label: "View / Edit / Delete",
  },
];

const optionsPage = [
  {
    value: NONE,
    label: "--- NONE ---",
  },
  {
    value: VIEW,
    label: "View",
  },
  {
    value: VIEW_EDIT,
    label: "View / Edit",
  },
  {
    value: VIEW_EDIT_DELETE,
    label: "View / Edit / Delete",
  },
];

const optionsBoolean = [
  {
    value: false,
    label: "No",
  },
  {
    value: true,
    label: "Yes",
  },
];

export {
  options,
  optionsPage,
  optionsBoolean,
  VIEW,
  VIEW_EDIT,
  VIEW_EDIT_DELETE,
};
