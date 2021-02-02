import React, { Component } from "react";
import { toast } from "react-toastify";
import { mailLog, mailStatus } from "./API";
import { getCurrentUser } from "../../services/authService";
import MakerNotification from "./makerNotification";
import CheckerPage from "./checkerPage";
import ApproverPage from "./approverPage";

class MailLog extends Component {
  state = {
    mail: [],
    currentUser: {},
    makerNotification: {}
  };

  handleNotificationStatus = async mail => {
    mail.seen = true;
    this.setState({ makerNotification: mail });
    try {
      mailStatus(mail.id, mail);
      toast.info("Mail marked as read and removed !");
    } catch (ex) {
      toast.error("Can't mark  as read.Try later !");
      mail.seen = false;
    }
  };
  populateMail = () => {
    mailLog()
      .then(data => this.setState({ mail: data }))
      .catch(err => toast.error(err));
  };
  componentDidMount() {
    this.populateMail();
    this.setState({ currentUser: getCurrentUser() });
  }
  render() {
    const { mail, currentUser } = this.state;

    const p = this.props.permissions;
    const makerNotification = mail
      ? mail.filter(
        d =>
          d.branchId === currentUser.branchId &&
          d.seen === false &&
          d.mail === currentUser.email
      )
      : "";
    const checkerNotification = mail
      ? mail.filter(
        d =>
          d.branchId === currentUser.branchId &&
          d.seen === false &&
          d.mail === currentUser.email
      )
      : "";
    const checkerData = mail
      ? mail.filter(d => d.branchId === currentUser.branchId)
      : "";
    return (
      <div>
        {p.isMaker ? (
          <MakerNotification
            mailData={makerNotification}
            handleNotificationStatus={this.handleNotificationStatus}
          />
        ) : (
            ""
          )}
        {p.isChecker ? (
          checkerData ? (
            <CheckerPage
              checkerData={checkerData}
              checkerNotification={checkerNotification}
              handleNotificationStatus={this.handleNotificationStatus}
            />
          ) : (
              "No notification"
            )
        ) : (
            ""
          )}
        {p.isApprover ? <ApproverPage approverData={mail} /> : ""}
      </div>
    );
  }
}

export default MailLog;
