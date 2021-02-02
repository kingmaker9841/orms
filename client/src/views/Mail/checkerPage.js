import React from "react";
import { Table, Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import moment from "moment";

const CheckerPage = ({
  checkerData,
  checkerNotification,
  handleNotificationStatus
}) => {
  return (
    <React.Fragment>
      {// eslint-disable-next-line
      checkerNotification != ""
        ? checkerNotification.map(mail => (
            <Card key={mail.id}>
              <CardHeader
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,0))"
                }}
              >
                <Row>
                  <Col>
                    <Row>
                      <i
                        className="fa fa-envelope-o fa-2x mr-3 ml-3"
                        aria-hidden="true"
                      ></i>{" "}
                      <h4 className="mt-1 text-primary">
                        <strong>Notification</strong>
                      </h4>
                    </Row>
                  </Col>
                  <Col>
                    <button
                      type="button"
                      className="btn btn-warning"
                      size="small"
                      style={{ float: "right" }}
                      onClick={() => handleNotificationStatus(mail)}
                    >
                      Mark as read
                    </button>
                  </Col>
                </Row>
              </CardHeader>
              <div className="card-body text">
                <h5 className="card-title text-danger ml-4">
                  <strong>Dear Sir/Ma'am ,</strong>
                </h5>
                <p className="lead ml-4">
                  <strong>
                    It has been observed that you have not submitted Operational
                    Risk Register for 2 or more weeks.
                    <br />
                    Please provide the justification for the same.
                  </strong>
                </p>
              </div>

              <br />
              <p align="center">
                <strong>
                  @ Copyright Risk Department
                  <br />
                  Sunrise Bank
                </strong>
              </p>
              <p className="ml-2 text-primary">
                Received : {moment(mail.sendAt).fromNow()}{" "}
              </p>
            </Card>
          ))
        : ""}

      <Card>
        <CardHeader>Mailing Info</CardHeader>
        <CardBody>
          <Table striped bordered>
            <thead>
              <tr>
                <td>Branch</td>
                <td>Email</td>
                <td>Role</td>
                <td>Send Date</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {checkerData.map(data => {
                return (
                  <tr key={data.id}>
                    <td>{data.branchId}</td>
                    <td>{data.mail}</td>
                    <td>{data.role}</td>
                    <td>{moment(data.sendAt).format("MM-DD-YYYY")}</td>
                    <td>{data.seen === true ? "Seen" : "Unseen"}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default CheckerPage;
