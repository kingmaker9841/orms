import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Row, Table, Button } from 'reactstrap';
import { getRoles, deleteRole } from './api';
import { VIEW_EDIT, VIEW_EDIT_DELETE } from './util';

class Roles extends Component {

  state = {
    roles: [],
  }

  componentDidMount() {
    getRoles((err, roles) => {
      if (err) return;
      this.setState({
        roles: roles
      });
    });
  }

  handleDelete = id => {
    if (window.confirm("Do you want to delete the Roles? The action is irreversible!")) {
      deleteRole(id, (err, data) => {
        if (err) return;
        window.location.reload();
      });
    }
  }

  render() {
    const p = this.props.permissions ? this.props.permissions : {};
    return (
      <div className="animated fadeIn">
        {p.role === VIEW_EDIT || p.role === VIEW_EDIT_DELETE || p.isAdmin ?
          <Link className="btn btn-success btn-sm mb-2" to="/roles/add">Add Role</Link>
          : null}
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date registered</th>
                      <th>Date modified</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.roles.map((role, idx) =>
                      <tr key={idx}>
                        <td>{role.name}</td>
                        <td>{new Date(role.createdAt).toDateString()}</td>
                        <td>{new Date(role.updatedAt).toDateString()}</td>
                        <th>
                          {p.role === VIEW_EDIT || p.role === VIEW_EDIT_DELETE || p.isAdmin ?
                            <Link className="btn btn-info btn-sm text-white mr-2" to={"/roles/" + role.id}><i className="fa fa-edit" /></Link>
                            : null}
                          {p.role === VIEW_EDIT_DELETE || p.isAdmin ?
                            <Button size="sm" color="danger" onClick={() => this.handleDelete(role.id)}>
                              <i className="fa fa-trash" />
                            </Button>
                            : null}
                        </th>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div >

    );
  }
}

export default Roles;
