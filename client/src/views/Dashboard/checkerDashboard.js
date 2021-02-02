import React, { Component } from "react";
import { CardFooter, Card, CardBody, CardHeader, Table } from "reactstrap";

class CheckerDashboard extends Component {
  state = {};

  render() {
    const data = this.props.reportedInstances;
    const approvedValue = data
      ? data.map(d => (d.status === "Approved" ? d.count : 0))
      : 0;
    const unapprovedValue = data
      ? data.map(d => (d.status === "Unapproved" ? d.count : 0))
      : 0;
    const pendingValue = data
      ? data.map(d => (d.status === "Pending" ? d.count : 0))
      : 0;
      
    var { thisQuarter, previousQuarter } = this.props.unRectifiedErrors;
    thisQuarter = thisQuarter ? thisQuarter.map(d => d.count) : "";
    previousQuarter = previousQuarter ? previousQuarter.map(d => d.count) : "";
    return (
      <React.Fragment>
        <Card>
          <CardHeader><strong>Branch Wise Reported Instance Status</strong></CardHeader>
          <CardBody>
            <Table bordered striped>
              <thead>
                <tr>
                  <th>Pending</th>
                  <th>Unapproved</th>
                  <th>Approved</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{ pendingValue}</td>
                  <td>{unapprovedValue}</td>
                  <td>{approvedValue}</td>
                  <td>{Number(pendingValue) + Number(unapprovedValue) + Number(approvedValue)}</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
        <Card>
          <CardHeader><strong>No of Rectification Errors</strong> </CardHeader>
          <CardBody>
            <Table bordered striped>
              <thead>
                <tr>
                  <th>Previous Quarter</th>
                  <th>This Quarter</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{thisQuarter}</td>
                  <td>{previousQuarter}</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </React.Fragment>
    );
  }
}

export default CheckerDashboard;
