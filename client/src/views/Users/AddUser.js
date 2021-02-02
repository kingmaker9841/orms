import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  Button,
  Col,
  Row,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import Select from "react-select";
import { getAll } from "../../util/api";
import { getFormData } from "../../util/form";
import { getLdapUsers, addUser } from "./api";

class AddUser extends Component {
  state = {
    users: [],
    user: {},
    roles: [],
    selectedBranch: null,
    branches: [],
    departments: [],
    selectedOption: {},
    selectedOptions: []
  };

  handleBranchChange = selectedBranch => {
    const branchId = selectedBranch.value;
    if (branchId) {
      this.setState({ selectedBranch });
    }
  };

  handleUserChange = selectedOption => {
    const distinguishedName = selectedOption.value;
    if (distinguishedName) {
      this.setState({ selectedOption });
      const user = this.state.users.filter(u =>
        u.distinguishedName === distinguishedName ? 1 : 0
      )[0];
      this.setState({ user: user ? user : {} });
    } else {
      const keys = Object.keys(this.state.user);
      const user = {};
      keys.forEach(k => (user[k] = ""));
      this.setState({ user: user });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const formData = getFormData(e);
    if (formData.branchId) {
      const user = {
        ...this.state.user,
        ...formData,
      };
      addUser(user, (err, json) => {
        if (err) return;
        if (json) {
          this.props.history.push("/users");
        }
      });
    } else {
      window.alert("Please select a branch")
    }
  };

  componentDidMount() {
    this._isMounted = true;
    getLdapUsers((err, users) => {
      if (err) return;
      const selectedOptions = users.map(u => {
        return {
          value: u.distinguishedName,
          label: u.displayName
        };
      });
      this.setState({
        users: users,
        selectedOptions: selectedOptions
      });
    });
    getAll((err, data) => {
      if (err) return;
      const branches = data.branches.map(d => {
        return {
          value: d.id,
          label: d.name
        }
      });
      this.setState({
        roles: data.roles,
        branches: branches,
        departments: data.departments
      });
    });
  }

  render() {
    const { selectedOptions, branches } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Form onSubmit={this.handleSubmit}>
              <Card>
                <CardHeader>
                  <i className="fa fa-user"></i> AD Users
                </CardHeader>
                <CardBody className="table-responsive">

                  <FormGroup>
                    <Label htmlFor="user">User</Label>
                    <Select
                      value={this.state.selectedOption}
                      onChange={this.handleUserChange}
                      options={selectedOptions ? selectedOptions : []}
                    />
                  </FormGroup>

                  <FormGroup row className="my-0">
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          type="text"
                          id="email"
                          placeholder="Email"
                          value={
                            this.state.user.userPrincipalName
                              ? this.state.user.userPrincipalName
                              : ""
                          }
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="telephoneNumber">Phone Number</Label>
                        <Input
                          type="text"
                          id="telephoneNumber"
                          placeholder="Phone Number"
                          value={
                            this.state.user.telephoneNumber
                              ? this.state.user.telephoneNumber
                              : ""
                          }
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="my-0">
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input
                          type="text"
                          id="username"
                          placeholder="User Name"
                          value={
                            this.state.user.sAMAccountName
                              ? this.state.user.sAMAccountName
                              : ""
                          }
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          type="text"
                          id="firstName"
                          placeholder="First Name"
                          value={
                            this.state.user.givenName
                              ? this.state.user.givenName
                              : ""
                          }
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          type="text"
                          id="lastName"
                          placeholder="Last Name"
                          value={this.state.user.sn ? this.state.user.sn : ""}
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="my-0">
                    <Col xs="3">
                      <FormGroup>
                        <Label htmlFor="roleId">Role</Label>
                        <Input type="select" id="roleId" name="roleId" required>
                          <option value="">Select Role for the user</option>
                          {this.state.roles.map((role, index) => (
                            <option key={index} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col xs="3">
                      <FormGroup>
                        <Label htmlFor="branchId">Branch</Label>
                        <Select
                          id="branchId"
                          name="branchId"
                          value={this.state.selectedBranch ? this.state.selectedBranch : ""}
                          onChange={this.handleBranchChange}
                          options={branches ? branches : []}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="3">
                      <FormGroup>
                        <Label htmlFor="departmentId">Department</Label>
                        <Input
                          type="select"
                          id="departmentId"
                          name="departmentId"
                        >
                          <option value="">Select Department</option>
                          {this.state.departments.map((department, index) => {
                            let padding = "- ";
                            let level = department.level;
                            while (level-- > 0) {
                              padding += "--> ";
                            }
                            return (
                              <option key={index} value={department.id}>
                                {padding + department.name}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col xs="3">
                      <FormGroup>
                        <Label htmlFor="loginAttempts">Login Attempts</Label>
                        <Input
                          type="select"
                          id="loginAttempts"
                          name="loginAttempts"
                          required
                        >
                          <option value={3}>3</option>
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="success">
                    <i className="fa fa-dot-circle-o"></i> Submit
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddUser;
