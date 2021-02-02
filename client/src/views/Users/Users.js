import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Card, Input, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { getUsers, deleteUser } from "./api";
import { getAll } from "../../util";
import { getHash } from "../../_url";
import { VIEW_EDIT, VIEW_EDIT_DELETE } from "../Roles/util";

class Users extends Component {
  state = {
    users: [],
    roles: [],
    departments: [],
    isActive: true,
    searchQuery: ""
  };

  getObject(id, arr) {
    if (arr) {
      const obj = arr.filter(a => (a.id === id ? 1 : 0))[0];
      if (obj) {
        return obj.name;
      }
    }
    return "";
  }

  handleDelete = id => {
    if (
      window.confirm(
        "Do you want to delete the User? The action is irreversible!"
      )
    ) {
      deleteUser(id, (err, data) => {
        if (err) return;
        window.location.reload();
      });
    }
  };

  componentDidMount() {
    getUsers((err, users) => {
      if (err) return;
      this.setState({
        users: users
      });
    });
    getAll((err, data) => {
      if (err) return;
      this.setState({
        roles: data.roles,
        departments: data.departments
      });
    });
  }

  handleSearch = query => {
    this.setState({ searchQuery: query.target.value });
  };

  render() {
    const { searchQuery, users } = this.state;
    const permissions = this.props.permissions ? this.props.permissions : {};
    let filtered = users;
    if (searchQuery) {
      filtered = users.filter(
        user =>
          user.firstName
            .toLowerCase()
            .startsWith(searchQuery.toLocaleLowerCase()) ||
          user.lastName
            .toLowerCase()
            .startsWith(searchQuery.toLocaleLowerCase()) ||
          user.phoneNumber
            .toLowerCase()
            .startsWith(searchQuery.toLocaleLowerCase())
      );
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            {permissions.isAdmin ||
            permissions.user === VIEW_EDIT ||
            permissions.user === VIEW_EDIT_DELETE ? (
              <Link className="btn btn-success btn-sm mb-2" to="/users/add">
                Add User
              </Link>
            ) : null}
          </Col>
          {users ? (
            <Col>
              <input
                className="form-control mr-0 mb-3"
                type="text"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={this.handleSearch}
                style={{ width: "60%", float: "right", border: "1px solid" }}
              />
            </Col>
          ) : (
            ""
          )}
        </Row>

        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <Row>
                  <Col>
                    <i className="fa fa-user"></i> Users
                  </Col>
                  <Col xs={3}>
                    <Input
                      type="select"
                      value={this.state.isActive ? "active" : "inactive"}
                      onChange={e =>
                        this.setState({
                          isActive: e.target.value === "active" ? true : false
                        })
                      }
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Input>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="table-responsive">
                <Table>
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Phone Number</th>
                      <th>Role</th>

                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((user, index) => {
                      return user.isActive === this.state.isActive ? (
                        <tr key={index}>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.phoneNumber}</td>
                          <td>
                            {this.getObject(user.roleId, this.state.roles)}
                          </td>

                          <td>
                            {user.isActive ? (
                              <div className="btn btn-success btn-sm text-white">
                                Active
                              </div>
                            ) : (
                              <div className="btn btn-warning btn-sm text-white">
                                Inactive
                              </div>
                            )}
                          </td>
                          <td>
                            {permissions.isAdmin ||
                            permissions.user === VIEW_EDIT ||
                            permissions.user === VIEW_EDIT_DELETE ? (
                              <Link
                                to={"users/" + getHash(user.id)}
                                className="btn btn-info btn-sm mr-2"
                              >
                                <i className="fa fa-edit text-white" />
                              </Link>
                            ) : null}
                            {/* {permissions.user === VIEW_EDIT_DELETE ||
                            permissions.isAdmin ? (
                              <Button
                                size="sm"
                                color="danger"
                                onClick={() => this.handleDelete(user.id)}
                              >
                                <i className="fa fa-trash" />
                              </Button>
                            ) : null} */}
                          </td>
                        </tr>
                      ) : null;
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Users;
