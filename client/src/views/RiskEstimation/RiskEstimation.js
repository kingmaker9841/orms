import React, { Component } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Col, Row, Form, Table, Input } from 'reactstrap';
import { getRiskEstimation, editRiskEstimation } from './api';
import { getAll } from '../../util/api';
import { VIEW_EDIT, VIEW_EDIT_DELETE } from '../Roles/util';

class RiskEstimation extends Component {

  state = {
    isDisabled: true,
    riskAreas: [],
    branchId: 0,
    branches: [],
  }

  componentDidMount() {
    this.updateData();
    getAll((err, data) => {
      if (err) return;
      this.setState({
        branches: data.branches
      })
    });
  }

  updateData() {
    getRiskEstimation(this.state.branchId, (err, riskAreas) => {
      if (err) return;
      this.setState({
        riskAreas: riskAreas
      });
    });
  }

  handleBranchChange = e => {
    const branchId = e.target.value;
    this.setState({
      branchId: branchId
    }, () => {
      this.updateData();
    });
  }

  handleChange = e => {
    const [key, riskAreaId] = e.target.name.split('-');
    const value = e.target.value;
    const riskAreas = this.state.riskAreas.map(riskArea => {
      if (Number(riskAreaId) === riskArea.id) {
        const riskEstimation = riskArea.risk_estimation ? riskArea.risk_estimation : {};
        riskEstimation.riskAreaId = riskArea.id;
        riskEstimation[key] = value;
        riskArea.risk_estimation = riskEstimation;
      }
      return riskArea;
    });
    this.setState({
      riskAreas: riskAreas
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    editRiskEstimation(this.state.riskAreas, this.state.branchId, (err, json) => {
      if (err) return;
      window.location.reload();
    });
  }

  render() {
    const p = this.props.permissions ? this.props.permissions : {};
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
              <Card>
                <CardHeader>
                  <Row>
                    {p.riskEstimation === VIEW_EDIT || p.riskEstimation === VIEW_EDIT_DELETE || p.isAdmin ?
                      <>
                        {p.isApprover && p.isAdmin ?
                          <Col md={5} xs={6}>
                            <Input type="select" onChange={this.handleBranchChange}>
                              <option value={0}>---- Your Branch ----</option>
                              {this.state.branches.map(branch =>
                                <option key={branch.id} value={branch.id}>{branch.name}</option>
                              )}
                            </Input>
                          </Col>
                          :
                          null}
                        <Col>
                          <Button color="info" size="sm" className="mr-2" onClick={() => this.setState({ isDisabled: !this.state.isDisabled })}>
                            <i className="fa fa-edit text-white"></i>
                          </Button>
                          Risk Estimation 
                        </Col>
                      </>
                      : null}
                  </Row>
                </CardHeader>
                <CardBody className="table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        <th>S.N.</th>
                        <th>Risk Area/Functions</th>
                        <th style={{ minWidth: '80px' }}>Previous Risk Score</th>
                        <th style={{ minWidth: '80px' }}>Likelihood</th>
                        <th style={{ minWidth: '80px' }}>Impact</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.riskAreas.map((riskArea, index) => {
                        const riskEstimation = riskArea.risk_estimation ? riskArea.risk_estimation : {};
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{riskArea.name}</td>
                            <td>
                              <Input disabled={this.state.isDisabled}
                                type="number"
                                min="0"
                                name={"previousRiskScore-" + riskArea.id}
                                value={riskEstimation['previousRiskScore'] ? riskEstimation['previousRiskScore'] : ''} />
                            </td>
                            <td>
                              <Input disabled={this.state.isDisabled}
                                type="number"
                                min="0"
                                max="5"
                                name={"likelihood-" + riskArea.id}
                                value={riskEstimation['likelihood'] ? riskEstimation['likelihood'] : ''} />
                            </td>
                            <td>
                              <Input disabled={this.state.isDisabled}
                                type="number"
                                min="0"
                                max="5"
                                name={"impact-" + riskArea.id}
                                value={riskEstimation['impact'] ? riskEstimation['impact'] : ''} />
                            </td>
                            <td>
                              <Input disabled={this.state.isDisabled}
                                type="text"
                                name={"remarks-" + riskArea.id}
                                title={riskEstimation['remarks'] ? riskEstimation['remarks'] : ''}
                                value={riskEstimation['remarks'] ? riskEstimation['remarks'] : ''} />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter>
                  {this.state.isDisabled ?
                    null :
                    p.riskEstimation === VIEW_EDIT || p.riskEstimation === VIEW_EDIT_DELETE || p.isAdmin ?
                      <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                      : null
                  }
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Row>
      </div >

    );
  }
}

export default RiskEstimation;