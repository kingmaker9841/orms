import React, { Component } from "react";
import { CardFooter, Card, CardBody, CardHeader, Table } from "reactstrap";

class MakerDashboard extends Component {
  state = {};

  render() {
    const data = this.props.reportedInstances;
    const approvedValue = data
      ? data.filter(d => (d.status === "Approved" ? 1 : 0))[0]
      : { count: 0 };
    const unapprovedValue = data
      ? data.filter(d => (d.status === "Unapproved" ? 1 : 0))[0]
      : { count: 0 };
    const pendingValue = data
      ? data.filter(d => (d.status === "Pending" ? 1 : 0))[0]
      : { count: 0 };

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
                  <td>{pendingValue ? pendingValue.count : 0}</td>
                  <td>{unapprovedValue ? unapprovedValue.count : 0}</td>
                  <td>{approvedValue ? approvedValue.count : 0}</td>
                  <td>{
                    Number(pendingValue ? pendingValue.count : 0)
                    + Number(unapprovedValue ? unapprovedValue.count : 0)
                    + Number(approvedValue ? approvedValue.count : 0)
                  }</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
        <Card>
          <CardHeader><strong>Unrectified Errors</strong> </CardHeader>
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
                  <td>{previousQuarter}</td>
                  <td>{thisQuarter}</td>
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

export default MakerDashboard;
