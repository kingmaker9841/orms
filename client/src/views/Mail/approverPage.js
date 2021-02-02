import React from "react";
import moment from "moment";
import { Table, Card, CardBody, CardFooter, CardHeader } from "reactstrap";

const ApproverPage = ({ approverData }) => {
  return (
    <Card>
      <CardHeader>Mailing Info Approver</CardHeader>
      <CardBody>
        <Table striped bordered>
          <thead>
            <tr>
              <td>
                <strong>Branch</strong>
              </td>
              <td>
                <strong>Email</strong>
              </td>
              <td>
                <strong>Role</strong>
              </td>
              <td>
                <strong>Sent Date</strong>
              </td>
              <td>
                <strong>Status</strong>
              </td>
            </tr>
          </thead>
          <tbody>
            {approverData
              ? approverData.map(data => {
                  return (
                    <tr key={data.id}>
                      <td>{data.branchId}</td>
                      <td>{data.mail}</td>
                      <td>{data.role}</td>
                      <td>{moment(data.sendAt).format("MM-DD-YYYY")}</td>
                      <td>{data.seen === true ? "Seen" : "Unseen"}</td>
                    </tr>
                  );
                })
              : "No data"}
          </tbody>
        </Table>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default ApproverPage;
