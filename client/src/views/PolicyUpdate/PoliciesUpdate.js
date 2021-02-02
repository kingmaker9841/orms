import { getPolicies, editPolicies } from "./api";
import React, { Component } from "react";
import {
  // Row,
  // Col,
  Table,
  Input,
  Form,
  CardBody,
  Card,
  CardHeader,
  CardFooter,
  Button
} from "reactstrap";
import moment from "moment";

class PoliciesUpdate extends Component {
  state = {
    riskAreas: []
  };
  componentDidMount() {
    getPolicies((err, policy) => {
      if (err) return;

      this.setState({ riskAreas: policy });
    });
  }
  handleChange = e => {
    const [key, riskAreaId] = e.target.name.split("-");

    const value = e.target.value;
    const riskAreas = this.state.riskAreas.map(riskArea => {
      if (Number(riskAreaId) === riskArea.id) {
        const riskEstimation = riskArea.policy ? riskArea.policy : {};
        riskEstimation.riskAreaId = riskArea.id;

        riskEstimation[key] = value;
        riskArea.policy = riskEstimation;
      }
      return riskArea;
    });
    this.setState({
      riskAreas: riskAreas
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      await editPolicies(this.state.riskAreas);
      alert("Success !");
    } catch (ex) {
      alert("we got some exception");
    }
  };
  onItemSelect = risk => {
    this.setState({ selectedArea: risk });
  };
  render() {
    const { riskAreas } = this.state;

    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <CardHeader>
            <h3>
              <i className="fa fa-free-code-camp" aria-hidden="true"></i>

              <strong className="ml-3">Policies Update</strong>
            </h3>
          </CardHeader>
          <CardBody>
            <Table striped responsive bordered>
              <thead>
                <tr>
                  {/* <th></th>
                  <th></th>
                  <th>Policies</th>
                  <th></th>
                  <th></th>
                  <th>Manual</th>
                  <th></th>
                  <th></th>
                  <th>Others</th>
                  <th></th>
                  <th></th> */}
                  <th rowSpan="2">Risk Area</th>
                  <th rowSpan="2">Adequacy</th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Policies
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Manual
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Others
                  </th>
                  <th colSpan="1" style={{ textAlign: "center" }}></th>
                </tr>
                <tr>
                  <th>Approval</th>
                  <th>Revision</th>
                  <th>Deadline</th>
                  <th>Approval</th>
                  <th>Revision</th>
                  <th>Deadline</th>
                  <th>Approval</th>
                  <th>Revision</th>
                  <th>Deadline</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {riskAreas.map((riskArea, idx) => {
                  const policy = riskArea.policy ? riskArea.policy : "";
                  const estimation = riskArea.risk_estimation_ho ? riskArea.risk_estimation_ho : {};
                  return (
                    <tr key={riskArea.name + idx}>
                      <td>{riskArea.name}</td>
                      <td>{estimation.policiesAndProcedure}</td>
                      <td>
                        <Input
                          type="date"
                          style={{ width: "160px" }}
                          name={"policyApproval-" + riskArea.id}
                          onChange={this.handleChange}
                          value={
                            policy["policyApproval"]
                              ? moment(policy["policyApproval"]).format(
                                "YYYY-MM-DD"
                              )
                              : ""
                          }
                          // required
                        />
                      </td>
                      <td className="ml-0 mr-0">
                        <Input
                          // disabled={this.state.isDisabled}
                          type="date"
                          style={{ width: "160px" }}
                          name={"policyRevision-" + riskArea.id}
                          onChange={this.handleChange}
                          value={
                            policy["policyRevision"]
                              ? moment(policy["policyRevision"]).format(
                                "YYYY-MM-DD"
                              )
                              : ""
                          }
                        />
                      </td>
                      <td>
                        <Input
                          // disabled={this.state.isDisabled}
                          type="date"
                          style={{ width: "160px" }}
                          name={"policyDeadline-" + riskArea.id}
                          onChange={this.handleChange}
                          value={
                            policy["policyDeadline"]
                              ? moment(policy["policyDeadline"]).format(
                                "YYYY-MM-DD"
                              )
                              : ""
                          }
                          // required
                        />
                      </td>
                      <td>
                        <Input
                          // disabled={this.state.isDisabled}
                          type="date"
                          style={{ width: "160px" }}
                          name={"manualApproval-" + riskArea.id}
                          onChange={this.handleChange}
                          value={
                            policy["manualApproval"]
                              ? moment(policy["manualApproval"]).format(
                                "YYYY-MM-DD"
                              )
                              : ""
                          }
                          // required
                        />
                      </td>
                      <td>
                        <Input
                          // disabled={this.state.isDisabled}
                          type="date"
                          style={{ width: "160px" }}
                          name={"manualRevision-" + riskArea.id}
                          onChange={this.handleChange}
                          value={
                            policy["manualRevision"]
                              ? moment(policy["manualRevision"]).format(
                                "YYYY-MM-DD"
                              )
                              : ""
                          }
                        />
                      </td>
                      <td>
                        <Input
                          // disabled={this.state.isDisabled}
                          type="date"
                          style={{ width: "160px" }}
                          name={"manualDeadline-" + riskArea.id}
                          onChange={this.handleChange}
                          value={
                            policy["manualDeadline"]
                              ? moment(policy["manualDeadline"]).format(
                                "YYYY-MM-DD"
                              )
                              : ""
                          }
                          // required
                        />
                      </td>
                      <td>
                        <Input
                          // disabled={this.state.isDisabled}
                          type="date"
                          style={{ width: "160px" }}
                          name={"othersApproval-" + riskArea.id}
                          onChange={this.handleChange}
                          value={
                            policy["othersApproval"]
                              ? moment(policy["othersApproval"]).format(
                                "YYYY-MM-DD"
                              )
                              : ""
                          }
                          // required
                        />
                      </td>
                      <td>
                        <Input
                          // disabled={this.state.isDisabled}
                          type="date"
                          style={{ width: "160px" }}
                          name={"othersRevision-" + riskArea.id}
                          onChange={this.handleChange}
                          value={
                            policy["othersRevision"]
                              ? moment(policy["othersRevision"]).format(
                                "YYYY-MM-DD"
                              )
                              : ""
                          }
                        />
                      </td>
                      <td>
                        <Input
                          // disabled={this.state.isDisabled}
                          type="date"
                          style={{ width: "160px" }}
                          name={"othersDeadline-" + riskArea.id}
                          onChange={this.handleChange}
                          value={
                            policy["othersDeadline"]
                              ? moment(policy["othersDeadline"]).format(
                                "YYYY-MM-DD"
                              )
                              : ""
                          }
                          // required
                        />
                      </td>
                      <td>
                        <textarea
                          style={{ width: "160px" }}
                          name={"remarks-" + riskArea.id}
                          onChange={this.handleChange}
                          value={policy["remarks"] ? policy["remarks"] : ""}
                          // required
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
          <CardFooter>
            <Button color="danger" type="submit">
              Submit
            </Button>
          </CardFooter>
        </Form>
      </Card>
    );
  }
}

export default PoliciesUpdate;
