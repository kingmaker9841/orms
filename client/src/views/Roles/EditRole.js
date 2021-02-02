import React, { Component } from "react";
import { getRole, editRole, getRoleTypes } from "./api";
import RoleForm from "./RoleForm";

const formId = "edit-role-form";
class EditDepartment extends Component {
  state = {
    id: null,
    role: {},
    roleTypes: []
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    getRole(id, (err, json) => {
      if (err) return;
      this.setState({ role: json.data });
    });
    getRoleTypes((err, roleTypes) => {
      if (err) return;
      this.setState({ roleTypes: roleTypes });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const role = this.state.role;
    editRole(role, (err, data) => {
      if (err) return;
      this.props.history.push("/roles");
      window.location.reload();
    });
  };

  handleChange = e => {
    const [type, roleTypeId] = e.target.name.split("-");
    const value = e.target.value;
    const role = this.state.role;
    console.log("e", e);
    if (type === "control") {
      let flagFound = false;
      role.role_controls = role.role_controls
        ? role.role_controls.map(rC => {
            if (rC.roleTypeId === Number(roleTypeId)) {
              flagFound = true;
              rC.value = value;
            }
            return rC;
          })
        : [];
      if (!flagFound) {
        role.role_controls.push({
          roleId: role.id,
          roleTypeId: Number(roleTypeId),
          value: value
        });
      }
    } else {
      switch (e.target.type) {
        case "radio":
          role.isMaker = false;
          role.isChecker = false;
          role.isApprover = false;
          role[e.target.value] = true;
          break;
        case "checkbox":
          role[e.target.value] = e.target.checked;
          break;
        default:
          role[e.target.name] = value;
          break;
      }
    }
    this.setState({
      role: role
    });
  };

  render() {
    return (
      <RoleForm
        title="Edit Role"
        formId={formId}
        role={this.state.role}
        roleTypes={this.state.roleTypes}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        roles={this.state.roles}
        isEdit={true}
        {...this.props}
      />
    );
  }
}

export default EditDepartment;
