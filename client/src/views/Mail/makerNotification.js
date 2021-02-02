import React, { Component } from "react";
// import noNotification from "../../assets/img/no.png";
import { Card, CardHeader, Row, Col } from "reactstrap";
import moment from "moment";

class MakerNotification extends Component {
  state = {};

  render() {
    const { mailData, handleNotificationStatus } = this.props;
    return (
      <React.Fragment>
        {// eslint-disable-next-line
          mailData != "" ? (
            mailData.map(mail => (
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
                      It has been observed that you have not logged into
                      Operational Risk Register Portal for 3 or more days.
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
          ) : (
              "No Notification to show"
            )}
      </React.Fragment>
    );
  }
}

export default MakerNotification;
