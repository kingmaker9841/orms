import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Col,
  Row,
  Form,
  Table,
  Input
} from "reactstrap";
import { getRiskEstimationHO, editRiskEstimationHO } from "./api";
import RiskCategorization from "./RiskCategorization";
import RiskEscalation from "./RiskEscalation";
import { VIEW_EDIT, VIEW_EDIT_DELETE } from "../Roles/util";

class RiskEstimationHO extends Component {
  state = {
    isDisabled: true,
    riskAreas: []
  };

  componentDidMount() {
    getRiskEstimationHO((err, riskAreas) => {
      if (err) return;
      this.setState({
        riskAreas: riskAreas
      });
    });
  }

  handleChange = e => {
    const [key, riskAreaId] = e.target.name.split("-");
    const value = e.target.value;
    const riskAreas = this.state.riskAreas.map(riskArea => {
      if (Number(riskAreaId) === riskArea.id) {
        const riskEstimation = riskArea.risk_estimation_ho
          ? riskArea.risk_estimation_ho
          : {};
        riskEstimation.riskAreaId = riskArea.id;
        riskEstimation[key] = value;
        riskArea.risk_estimation_ho = riskEstimation;
      }
      return riskArea;
    });
    this.setState({
      riskAreas: riskAreas
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    editRiskEstimationHO(this.state.riskAreas, (err, json) => {
      if (err) return;
      window.location.reload();
    });
  };
  onItemSelect = risk => {
    this.setState({ selectedArea: risk });
  };

  render() {
    const { riskAreas } = this.state;
    const policyAndProcedure = [
      "Adequately Exist and Operational",
      "Adequately Exist but not Operational",
      "Partially Exist",
      "Do not Exist"
    ];
    const p = this.props.permissions ? this.props.permissions : {};

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <Form onSubmit={this.handleSubmit}>
                <CardHeader>
                  {p.riskEstimationHo === VIEW_EDIT ||
                    p.riskEstimationHo === VIEW_EDIT_DELETE ||
                    p.isAdmin ? (
                      <Button
                        color="info"
                        className="mr-2"
                        size="sm"
                        onClick={() =>
                          this.setState({ isDisabled: !this.state.isDisabled })
                        }
                      >
                        <i className="fa fa-edit text-white"></i>
                      </Button>
                    ) : null}
                  Risk Estimation HO
                </CardHeader>
                <CardBody className="table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        <th>S.N.</th>
                        <th>Risk Area/Functions</th>
                        <th style={{ minWidth: "80px" }}>
                          Previous Risk Score
                        </th>
                        <th style={{ minWidth: "80px" }}>Likelihood</th>
                        <th style={{ minWidth: "80px" }}>Impact</th>
                        <th style={{ minWidth: "80px" }}>Weight</th>
                        <th style={{ minWidth: "150px" }}>
                          Policies and Procedures
                        </th>
                        <th>Remarks</th>
                        <th>Reporting Frequencies</th>
                        <th>Responsibility</th>
                        <th style={{ minWidth: "120px" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riskAreas.map((riskArea, index) => {
                        const riskEstimationHO = riskArea.risk_estimation_ho
                          ? riskArea.risk_estimation_ho
                          : {};

                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{riskArea.name}</td>
                            <td>
                              <Input
                                disabled={this.state.isDisabled}
                                type="number"
                                min="0"
                                name={"previousRiskScore-" + riskArea.id}
                                onChange={this.handleChange}
                                value={
                                  riskEstimationHO["previousRiskScore"]
                                    ? riskEstimationHO["previousRiskScore"]
                                    : ""
                                }
                              />
                            </td>
                            <td>
                              <Input
                                disabled={this.state.isDisabled}
                                type="number"
                                min="0"
                                max="5"
                                name={"likelihood-" + riskArea.id}
                                onChange={this.handleChange}
                                value={
                                  riskEstimationHO["likelihood"]
                                    ? riskEstimationHO["likelihood"]
                                    : ""
                                }
                              />
                            </td>
                            <td>
                              <Input
                                disabled={this.state.isDisabled}
                                type="number"
                                min="0"
                                max="5"
                                name={"impact-" + riskArea.id}
                                onChange={this.handleChange}
                                value={
                                  riskEstimationHO["impact"]
                                    ? riskEstimationHO["impact"]
                                    : ""
                                }
                              />
                            </td>
                            <td>
                              <Input
                                disabled={this.state.isDisabled}
                                type="number"
                                name={"weight-" + riskArea.id}
                                onChange={this.handleChange}
                                value={
                                  riskEstimationHO["weight"]
                                    ? riskEstimationHO["weight"]
                                    : ""
                                }
                              />
                            </td>
                            <td>
                              <Input
                                disabled={this.state.isDisabled}
                                type="select"
                                name={"policiesAndProcedure-" + riskArea.id}
                                title={
                                  riskEstimationHO["policiesAndProcedure"]
                                    ? riskEstimationHO["policiesAndProcedure"]
                                    : ""
                                }
                                value={
                                  riskEstimationHO["policiesAndProcedure"]
                                    ? riskEstimationHO["policiesAndProcedure"]
                                    : ""}
                                onChange={this.handleChange}
                              >
                                <option value="">--- Select ---</option>
                                {policyAndProcedure.map(data => {
                                  return (
                                    <option
                                      key={data}
                                    >
                                      {data}
                                    </option>
                                  );
                                })}
                              </Input>
                            </td>
                            <td>
                              <Input
                                disabled={this.state.isDisabled}
                                type="text"
                                name={"remarks-" + riskArea.id}
                                title={
                                  riskEstimationHO["remarks"]
                                    ? riskEstimationHO["remarks"]
                                    : ""
                                }
                                onChange={this.handleChange}
                                value={
                                  riskEstimationHO["remarks"]
                                    ? riskEstimationHO["remarks"]
                                    : ""
                                }
                              />
                            </td>
                            <td>
                              <Input
                                disabled={this.state.isDisabled}
                                type="text"
                                name={"reportingFrequency-" + riskArea.id}
                                title={
                                  riskEstimationHO["reportingFrequency"]
                                    ? riskEstimationHO["reportingFrequency"]
                                    : ""
                                }
                                onChange={this.handleChange}
                                value={
                                  riskEstimationHO["reportingFrequency"]
                                    ? riskEstimationHO["reportingFrequency"]
                                    : ""
                                }
                              />
                            </td>
                            <td>
                              <Input
                                disabled={this.state.isDisabled}
                                type="text"
                                name={"responsibility-" + riskArea.id}
                                title={
                                  riskEstimationHO["responsibility"]
                                    ? riskEstimationHO["responsibility"]
                                    : ""
                                }
                                onChange={this.handleChange}
                                value={
                                  riskEstimationHO["responsibility"]
                                    ? riskEstimationHO["responsibility"]
                                    : ""
                                }
                              />
                            </td>
                            <td>
                              <Input
                                disabled={
                                  this.state.isDisabled || !p.isApprover
                                }
                                type="select"
                                name={"isActive-" + riskArea.id}
                                title={riskEstimationHO["isActive"] ? 1 : 0}
                                onChange={this.handleChange}
                                value={
                                  riskEstimationHO["isActive"]
                                    ? riskEstimationHO["isActive"]
                                    : false
                                }
                              >
                                <option value="false">Inactive</option>
                                <option value="true">Active</option>
                              </Input>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter>
                  {this.state.isDisabled ? null : p.riskEstimationHo ===
                    VIEW_EDIT ||
                    p.riskEstimationHo === VIEW_EDIT_DELETE ||
                    p.isAdmin ? (
                      <Button type="submit" size="sm" color="success">
                        <i className="fa fa-dot-circle-o"></i> Submit
                    </Button>
                    ) : null}
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
        <RiskEscalation {...this.props} />
        <RiskCategorization {...this.props} />
      </div>
    );
  }
}

export default RiskEstimationHO;
