import React from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Col,
  Row,
  Table,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Card,
  CardBody,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import {
  makerBranchSummary,
  downloadBranchSummary,
} from "../Reports/api/branch_summary";
import { getAll } from "../../util/api";
import moment from "moment";
import {
  getStartQuarter,
  getBSDate,
  getQuarterByAD,
  QUARTER_ONE,
  QUARTER_TWO,
  QUARTER_THREE,
  QUARTER_FOUR,
  getFormattedDate,
} from "../Reports/util/getDates";
import _ from "lodash";
import { bs2ad } from "ad-bs-converter";
import { getData } from "./util";

export default class MakerBranchSummary extends React.Component {
  state = {
    options: {
      branchId: "",
      frequency: 3,
      mergeFunction: "avg",
      status: "Approved",
      startDate: getStartQuarter(),
    },
    branches: [],
    branchSummary: [],
    riskAreas: [],
    activeTab: "1",
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  updateData() {
    makerBranchSummary(this.state.options)
      .then((data) => {
        this.setState({
          branchSummary: data.branchSummary,
          riskAreas: data.riskAreas,
        });
      })
      .catch((err) => {});
  }

  handleDateChange = (e) => {
    const value = e.target.value;
    let bsDate = "";
    switch (e.target.name) {
      case "quarter":
        const year = getBSDate(this.state.options.startDate).year;
        bsDate = (value === QUARTER_FOUR ? year + 1 : year) + value;
        break;
      case "year":
        const quarter = getQuarterByAD(this.state.options.startDate);
        bsDate =
          (quarter === QUARTER_FOUR ? Number(value) + 1 : value) + quarter;
        break;
      default:
        break;
    }
    if (value) {
      const adDate = getFormattedDate(bs2ad(bsDate));
      const options = this.state.options;
      options.startDate = adDate;
      this.setState(
        {
          options,
        },
        () => this.updateData()
      );
    }
  };

  downloadReport = () => {
    downloadBranchSummary({
      branchSummary: this.state.branchSummary,
      riskAreas: this.state.riskAreas,
      options: this.state.options,
    })
      .then((data) => {
        const path = data.path;
        window.open(process.env.REACT_APP_SERVER_URL + `/${path}`);
      })
      .catch(() => {});
  };

  componentDidMount() {
    this.updateData();
    getAll((err, data) => {
      if (err) return;
      this.setState({ branches: data.branches });
    });
  }

  render() {
    const p = this.props.permissions;
    return (
      <div className="animated fadeIn mb-3">
        <Card>
          <CardBody>
            <Row>
              <Col md={4}>
                <Label>Select Quarter</Label>
                <InputGroup className="mb-2">
                  <InputGroupAddon addonType="prepend">
                    <Input
                      onChange={this.handleDateChange}
                      value={getQuarterByAD(this.state.options.startDate)}
                      type="select"
                      name="quarter"
                      className="font-italic"
                    >
                      <option value="">Select Quarter</option>
                      <option value={QUARTER_ONE}>First Quarter</option>
                      <option value={QUARTER_TWO}>Second Quarter</option>
                      <option value={QUARTER_THREE}>Third Quarter</option>
                      <option value={QUARTER_FOUR}>Fourth Quarter</option>
                    </Input>
                  </InputGroupAddon>
                  <Input
                    type="number"
                    maxLength="4"
                    minLength="4"
                    className="font-italic"
                    placeholder="Year"
                    name="year"
                    onChange={this.handleDateChange}
                    value={getBSDate(this.state.options.startDate).year}
                  />
                </InputGroup>
              </Col>
              {p.isMaker && !p.isAdmin && !p.isChecker ? (
                <Col md={4}>
                  <Label>Branch</Label>
                  <Input
                    name="branchId"
                    value={
                      getData(
                        this.props.permissions.branch,
                        this.state.branches
                      ).name
                    }
                    readOnly
                  />
                </Col>
              ) : null}
            </Row>
          </CardBody>
        </Card>
        <Nav tabs>
          {this.state.riskAreas.map((riskArea, index) => {
            return (
              <NavItem key={index}>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === index + 1,
                  })}
                  onClick={() => {
                    this.toggle(index + 1);
                  }}
                >
                  {riskArea.code}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          {this.state.riskAreas.map((riskArea, index) => {
            return (
              <TabPane key={index} tabId={index + 1}>
                <Table responsive bordered>
                  <thead>
                    <tr>
                      <th>S.N.</th>
                      <th>Branch</th>
                      <th>Transaction Date</th>
                      <th>Risk Particulars</th>
                      <th>Risk Trigger</th>
                      <th>Occurrences</th>
                      <th>Amount/Timing</th>
                      <th>Financial Impact</th>
                      <th>Non-financial Impact</th>
                      <th>Related Account</th>
                      <th>Related Staff</th>
                      <th>Traced Date</th>
                      <th>Traced By</th>
                      <th>Rectification Date</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riskArea.risk_registers.map((row, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>
                            {getData(row.branchId, this.state.branches).name}
                          </td>
                          <td>
                            {moment(row.transactionDate).format("Do MM YYYY")}
                          </td>
                          <td>{row.riskAreaParticular}</td>
                          <td>{row.riskTrigger}</td>
                          <td>{row.occurrence}</td>
                          <td>{row.amountTiming}</td>
                          <td>{row.financialImpact}</td>
                          <td>{row.nonFinancialImpact}</td>
                          <td>{row.relatedAccount}</td>
                          <td>{row.relatedStaff}</td>
                          <td>{moment(row.tracedDate).format("Do MM YYYY")}</td>
                          <td>{row.tracedBy}</td>
                          <td>
                            {moment(row.rectificationDate).format("Do MM YYYY")}
                          </td>
                          <td>{row.remarks}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </TabPane>
            );
          })}
        </TabContent>
      </div>
    );
  }
}
