import React, { Component } from "react";
import RiskRegisterData from "../Reports/RiskRegisterData";
import { getAll } from "../../util/api";
import { getRiskAreas } from "../RiskAreas/api";
import { getAllRiskRegister } from "../Reports/api";
import MakerDashboard from "./makerDashboard";
import {
  Row,
  Col,
  Label,
  InputGroup,
  InputGroupAddon,
  Input,
} from "reactstrap";

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
import { bs2ad } from "ad-bs-converter";
// import CheckerDashboard from "./checkerDashboard";

class Dashboard extends Component {
  state = {
    options: {
      branchId: "",
      frequency: "3",
      status: "Approved",
      startDate: getStartQuarter(),
      isApprover: false,
    },

    riskRegisters: [],
    riskAreaCode: [],

    branches: [],
  };

  handleDateChange = async (e) => {
    const value = e.target.value;
    let bsDate = null;
    if (value) {
      switch (e.target.name) {
        case "quarter":
          const year = getBSDate(this.state.options.startDate).year;
          bsDate = (value === QUARTER_FOUR ? year + 1 : year) + value;
          break;
        case "year":
          if (value.length === 4) {
            const quarter = getQuarterByAD(this.state.options.startDate);
            bsDate =
              (quarter === QUARTER_FOUR ? Number(value) + 1 : value) + quarter;
          }
          break;
        default:
          break;
      }
      const adDate = bsDate
        ? getFormattedDate(bs2ad(bsDate))
        : this.state.options.startDate;
      const options = this.state.options;
      options.startDate = adDate;
      await this.setState({
        options,
      });
      await getAllRiskRegister(this.state.options)
        .then((data) => {
          this.setState({ riskRegisters: data });
        })
        .catch((err) => alert("Error"));
    }
  };
  handleChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const options = this.state.options;
    switch (name) {
      default:
        options[name] = value;
        break;
    }
    await this.setState({
      options: options,
    });

    await getAllRiskRegister(this.state.options)
      .then((data) => {
        this.setState({ riskRegisters: data });
      })
      .catch((err) => {
        return;
      });
  };

  async componentDidMount() {
    let options = this.state.options;
    const per = this.props.permissions;

    if (per.isMaker) {
      options["status"] = "Pending";
      await this.setState({ options });
    } else if (per.isChecker) {
      options["status"] = "Unapproved";
      await this.setState({ options });
    } else {
      options["status"] = "Approved";
      options["isApprover"] = true;
      await this.setState({ options });
    }
    getAllRiskRegister(this.state.options)
      .then((data) => {
        this.setState({ riskRegisters: data });
      })
      .catch((err) => {
        return;
      });
    getRiskAreas({}, async (err, riskAreas) => {
      if (err) return;
      this.setState({
        riskAreas,
      });
    });

    getAll((err, data) => {
      if (err) return;
      this.setState({ branches: data.branches });
    });
  }

  render() {
    const { riskRegisters } = this.state;

    const reportedInstances = riskRegisters.reportedInstances
      ? riskRegisters.reportedInstances
      : "";
    const funcReport = riskRegisters.functionWiseReports
      ? riskRegisters.functionWiseReports
      : [];
    const unRectifiedErrors = riskRegisters.unrectifiedErrors
      ? riskRegisters.unrectifiedErrors
      : "";

    const p = this.props.permissions;

    const label = funcReport.map((risk) => risk.code);
    const hexArr = "#00796b";
    const count = funcReport.map((e) => e["risk_registers.count"]);

    const otherChart = {
      labels: label,
      datasets: [
        {
          label: "line",
          backgroundColor: hexArr,
          data: count,
        },
      ],
    };

    const barChartOptions = {
      responsive: true,
      animation: {
        animateScale: true,
      },
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      fill: false,
      showLines: true,
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Functions",
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: `No of instances (${this.state.options.status})`,
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    return (
      <div className="animated fadeIn">
        <Row>
          {p.isApprover || p.isAdmin ? (
            <Col md={4}>
              <Label>Branch</Label>
              <Input
                type="select"
                name="branchId"
                value={this.state.options.branchId}
                onChange={this.handleChange}
              >
                <option value="">--- Your Branch ---</option>
                {this.state.branches.map((branch) => (
                  <option value={branch.id} key={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </Input>
            </Col>
          ) : null}
          <Col md={4}>
            <Label>Quarter Start Date (YYYY/MM/DD)</Label>
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
        </Row>

        <RiskRegisterData
          barChartOptions={barChartOptions}
          otherChart={otherChart}
        />

        <MakerDashboard
          reportedInstances={reportedInstances}
          unRectifiedErrors={unRectifiedErrors}
        />
      </div>
    );
  }
}

export default Dashboard;
