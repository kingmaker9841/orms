import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, Col, Row, } from 'reactstrap';
import { getDepartments } from './api';
import { getHash, } from '../../_url';
import { VIEW_EDIT, VIEW_EDIT_DELETE } from '../Roles/util';

class Departments extends Component {

  state = {
    departments: [],
  }

  componentDidMount() {
    getDepartments((err, departments) => {
      if (err) return;
      this.setState({
        departments: departments
      });
    });
  }

  render() {
    const p = this.props.permissions ? this.props.permissions : {};
    return (
      <div className="animated fadeIn">
        {p.department === VIEW_EDIT || p.department === VIEW_EDIT_DELETE || p.isAdmin ?
          <Link className="btn btn-success btn-sm mb-2" to="/departments/add">Add Department</Link>
          : null}
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-layer-group"></i> Departments
              </CardHeader>
              <CardBody>
                {this.state.departments.map((department, idx) => {
                  return (
                    <div key={idx} style={{ paddingLeft: department.level * 40 }} className="py-1">
                      <span className="m-1">- {department.name}</span>
                      {p.department === VIEW_EDIT || p.department === VIEW_EDIT_DELETE || p.isAdmin ?
                        <Link className="btn btn-info btn-sm text-white" to={"/departments/" + getHash(department.id)}><i className="fa fa-edit" /></Link>
                        : null}
                    </div>
                  )
                })}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div >

    );
  }
}

export default Departments;
