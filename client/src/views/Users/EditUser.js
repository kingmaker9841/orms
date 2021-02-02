import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Form, Button, Col, Row, FormGroup, Input, Label } from 'reactstrap';
import { getAll } from "../../util/api";
import { editUser, getUser } from "./api";
import { getId } from '../../_url';
import Select from "react-select";

class EditUser extends Component {

  state = {
    user: {},
    roles: [],
    selectedBranch: null,
    branches: [],
    departments: [],
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    const user = this.state.user;
    user[name] = value;
    this.setState({ user: user });
  }

  handleBranchChange = selectedBranch => {
    const branchId = selectedBranch.value;
    if (branchId) {
      this.setState({ selectedBranch });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      ...this.state.user,
      branchId: this.state.selectedBranch.value
    }
    if (user.branchId) {
      editUser(user, (err, json) => {
        if (err) return;
        if (json) {
          this.props.history.push('/users');
        }
      });
    } else {
      window.alert("Please select a branch")
    }
  }

  componentDidMount() {
    const id = getId(this.props.match.params.id);
    if (!Number(id)) {
      this.props.history.push("/users");
      return;
    }
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
        departments: data.departments,
      });
      getUser(id, (err, user) => {
        if (err) return;
        const selectedBranch = branches.filter(b => b.value === user.branchId ? 1 : 0)[0];
        this.setState({ user: user, selectedBranch: selectedBranch });
      });
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
              <Card>
                <CardHeader>
                  <i className="fa fa-user"></i> AD Users
              </CardHeader>
                <CardBody className="table-responsive">
                  <FormGroup row className="my-0">
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="isActive"><strong>Status</strong></Label>
                        <Input type="select" id="isActive" name="isActive" onChange={this.handleChange} placeholder="Active" value={this.state.user.isActive ? this.state.user.isActive : false}>
                          <option value={true}>Active</option>
                          <option value={false}>Inactive</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input type="text" id="email" name="email" placeholder="Email" value={this.state.user.email ? this.state.user.email : ''} readOnly />
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" value={this.state.user.phoneNumber ? this.state.user.phoneNumber : ""} readOnly />
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="my-0">
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" id="username" name="username" placeholder="User Name" value={this.state.user.username ? this.state.user.username : ""} readOnly />
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input type="text" id="firstName" name="firstName" placeholder="First Name" value={this.state.user.firstName ? this.state.user.firstName : ""} readOnly />
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input type="text" id="lastName" name="lastName" placeholder="Last Name" value={this.state.user.lastName ? this.state.user.lastName : ""} readOnly />
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="my-0">
                    <Col xs="3">
                      <FormGroup>
                        <Label htmlFor="roleId">Role</Label>
                        <Input type="select" id="roleId" name="roleId" required value={this.state.user.roleId}>
                          <option value="">Select Role for the user</option>
                          {this.state.roles.map((role, index) =>
                            <option key={index} value={role.id}>{role.name}</option>
                          )}
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
                          options={this.state.branches ? this.state.branches : []}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="3">
                      <FormGroup>
                        <Label htmlFor="departmentId">Department</Label>
                        <Input type="select" id="departmentId" name="departmentId" value={this.state.user.departmentId}>
                          <option value="">Select Department</option>
                          {this.state.departments.map((department, index) => {
                            let padding = "- ";
                            let level = department.level;
                            while (level-- > 0) {
                              padding += "--> ";
                            }
                            return (
                              <option key={index} value={department.id}>{padding + department.name}</option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col xs="3">
                      <FormGroup>
                        <Label htmlFor="loginAttempts">Login Attempts</Label>
                        <Input type="select" id="loginAttempts" name="loginAttempts" required value={this.state.user.loginAttempts}>
                          <option value={3}>3</option>
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default EditUser;