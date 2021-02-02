import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Button,
  Label,
  Input,
  Col,
  Row,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import { toast } from "react-toastify";
import { Number } from "core-js";
import TableToExcel from "@linways/table-to-excel";
import { getLossData, submitLossData, getLossDatabaseRiskCause } from "./api";
import moment from "moment";
import { getData } from "../RiskRegister/util";
import { getBranches } from "../Branches/api";
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

function LossDatabase(props) {
  const [lossData, setLossData] = useState([]);
  const [allBranches, setAllBranches] = useState([]);
  const [selectBranch, setSelectBranch] = useState("");
  const [generatedLossData, setGeneratedLossData] = useState("unapproved");
  const [peopleCount, setPeopleCount] = useState(0);
  const [processCount, setProcessCount] = useState(0);
  const [systemCount, setSystemCount] = useState(0);
  const [externalCount, setExternalCount] = useState(0);
  const [startDate, setStartDate] = useState(getStartQuarter());

  useEffect(() => {
    getLossData(
      selectBranch,
      generatedLossData === "unapproved" ? false : true,
      (err, result) => {
        if (err) {
          return window.alert("Loss DataBase couldnot be retrieved!!");
        }
        setLossData(result);
      }
    );
    getBranches((err, result) => {
      if (err) {
        return window.alert("Loss DataBase couldnot be retrieved!!");
      }
      setAllBranches(result);
    });
    getLossDatabaseRiskCause({
      branchId: selectBranch,
      generatedLossData: generatedLossData === 'unapproved' ? false : true,
      riskCause : 'people'
    }, (err,result) => {
      console.log("people", result);
      if (err) {
        return window.alert("Loss DataBase couldnot be retrieved at this moment !!")
      }
      setPeopleCount(result);
    })
    getLossDatabaseRiskCause({
      branchId: selectBranch,
      generatedLossData: generatedLossData === 'unapproved' ? false : true,
      riskCause : 'process'
    }, (err,result) => {
      console.log("process", result);
      if (err) {
        return window.alert("Loss DataBase couldnot be retrieved at this moment !!")
      }
      setProcessCount(result);
    })
    getLossDatabaseRiskCause({
      branchId: selectBranch,
      generatedLossData: generatedLossData === 'unapproved' ? false : true,
      riskCause : 'system'
    }, (err,result) => {
      console.log("system", result);
      if (err) {
        return window.alert("Loss DataBase couldnot be retrieved at this moment !!")
      }
      setSystemCount(result)
    })
    getLossDatabaseRiskCause({
      branchId: selectBranch,
      generatedLossData: generatedLossData === 'unapproved' ? false : true,
      riskCause : 'external'
    }, (err,result) => {
      console.log("external", result);
      if (err) {
        return window.alert("Loss DataBase couldnot be retrieved at this moment !!")
      }
      setExternalCount(result)
    })
  }, [selectBranch, generatedLossData, startDate]);

  const handleSelect = (val) => {
    setSelectBranch(val);
  };

  const handleCheckAllChange = (e) => {
    const isChecked = Boolean(e.target.checked);
    const lossDatas = lossData.map((lD) => {
      lD.isChecked = isChecked;
      return lD;
    });
    setLossData(lossDatas);
  };

  const handleCheckChange = (e) => {
    const lossDatas = lossData.map((check, i) => {
      if (Number(e.target.name) === i) {
        check.isChecked = e.target.checked;
      }
      return check;
    });
    setLossData(lossDatas);
  };

  const handleAllSubmit = (e) => {
    e.preventDefault();
    const filtered = [];
    lossData.forEach((lD) =>
      lD.isChecked
        ? filtered.push({
            id: parseInt(lD.id),
            isLossDatabaseGenerated: Boolean(true),
          })
        : null
    );
    console.log("filteredData", filtered);
    submitLossData(filtered, (isCompleted) => {
      if (isCompleted) {
        console.log("Completed and Okay");
        getLossData(selectBranch, (err, result) => {
          if (err) {
            toast.error("Oops! Something went wrong.");
          }
          setLossData(result);
        });
      } else {
        toast.error("Oops! Something went wrong.");
      }
    });
  };

  const handleSelectGeneratedData = (val) => {
    setGeneratedLossData(val);
  };

  const downloadReport = () => {
    TableToExcel.convert(document.getElementById("loss-database"), {
      name: "loss-database-summary.xlsx",
    });
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    let bsDate = null;
    if (value) {
      switch (e.target.name) {
        case "quarter":
          const year = getBSDate(startDate).year;
          bsDate = (value === QUARTER_FOUR ? year + 1 : year) + value;
          break;
        case "year":
          if (value.length === 4) {
            const quarter = getQuarterByAD(startDate);
            bsDate =
              (quarter === QUARTER_FOUR ? Number(value) + 1 : value) + quarter;
          }
          break;
        default:
          break;
      }
      const adDate = bsDate
        ? getFormattedDate(bs2ad(bsDate))
        : startDate;
      setStartDate(adDate);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>LOSS DATABASE</CardHeader>
        <Row>
        <Col className="ml-3 mt-3" md={4}>
            <Label>Quarter Start Date (YYYY/MM/DD)</Label>
            <InputGroup className="mb-2">
              <InputGroupAddon addonType="prepend">
                <Input
                  onChange={(e) => handleDateChange(e)}
                  value={getQuarterByAD(startDate)}
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
                onChange={(e) => handleDateChange(e)}
                value={getBSDate(startDate).year}
              />
            </InputGroup>
          </Col>
          <Col className="mt-3" md={4}>
          <Label>Branch</Label>
          <Input
            type="select"
            name="branchId"
            value={selectBranch}
            onChange={(e) => handleSelect(e.target.value)}
          >
            <option value="">--- Your Branch ---</option>
            {allBranches &&
              allBranches.map((branch, idx) => {
                return (
                  <option key={idx} value={branch.id}>
                    {" "}
                    {branch.name}{" "}
                  </option>
                );
              })}
          </Input>
        </Col>
        </Row>
        <Col className="mt-2" md={4}>
          <Label>Loss Data</Label>
          <Input
            type="select"
            name="generatedLossData"
            onChange={(e) => handleSelectGeneratedData(e.target.value)}
          >
            <option value="unapproved">Unapproved Loss Data</option>
            <option value="approved">Approved Loss Data</option>
          </Input>
        </Col>

        <CardBody>
          <Table responsive bordered id="loss-database">
            <thead>
              <tr>
                <th>
                  Check All
                  <div className="pretty p-icon p-jelly p-round p-bigger">
                    <Input
                      type="checkbox"
                      onChange={(e) => handleCheckAllChange(e)}
                    />
                    <div className="state p-danger">
                      <i className="icon material-icons">
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </i>
                      <Label></Label>
                    </div>
                  </div>
                </th>
                {/* {generatedLossData === "unapproved" ? (
                <th>
                  Check All
                  <div className="pretty p-icon p-jelly p-round p-bigger">
                    <Input
                      type="checkbox"
                      onChange={(e) => handleCheckAllChange(e)}
                    />
                    <div className="state p-danger">
                      <i className="icon material-icons">
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </i>
                      <Label></Label>
                    </div>
                  </div>
                </th>
              ) : null} */}

                <th data-f-bold rowSpan="3">
                  S.N
                </th>
                <th data-f-bold rowSpan="3">
                  Location Code
                </th>
                <th data-f-bold rowSpan="3">
                  Branch Name
                </th>
                <th data-f-bold rowSpan="3">
                  Date of Event (Transaction)
                </th>
                <th data-f-bold rowSpan="3">
                  Date of Finding or Reporting
                </th>
                <th data-f-bold rowSpan="3">
                  Details of Events (Risk Particular)
                </th>
                <th data-f-bold rowSpan="3">
                  Related Department (Risk Owner)
                </th>
                <th data-f-bold rowSpan="3">
                  Event Type (Level 1)
                </th>
                <th data-f-bold rowSpan="3">
                  Event Category (Level 2)
                </th>
                <th data-f-bold rowSpan="3">
                  Amount Involved
                </th>
                <th data-f-bold rowSpan="3">
                  Total Loss
                </th>
                <th data-f-bold rowSpan="3">
                  Corrective Action
                </th>
                <th data-f-bold rowSpan="3">
                  Relevant Control (Document)
                </th>
                <th data-f-bold rowSpan="3">
                  Past History (Occurence)
                </th>
                <th data-f-bold rowSpan="3">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody>
              {lossData &&
                lossData.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="pretty p-icon p-jelly p-round p-bigger">
                          <Input
                            type="checkbox"
                            name={index}
                            checked={data.isChecked ? true : false}
                            onChange={(e) => handleCheckChange(e)}
                          />
                          <div className="state p-danger">
                            <i className="icon material-icons">
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </i>
                            <Label></Label>
                          </div>
                        </div>
                      </td>
                      <td>{index + 1}</td>
                      <td></td>
                      <td>{getData(selectBranch, allBranches).name}</td>
                      <td>
                        {moment(data.transactionDate).format("YYYY/MM/DD")}
                      </td>
                      <td>{moment(data.tracedDate).format("YYYY/MM/DD")}</td>
                      <td>{data.riskAreaParticular}</td>
                      <td>{data.relatedStaff}</td>
                      <td>{data.riskAreaCode}</td>
                      <td>{data.riskAreaParticularCode}</td>
                      <td>{data.amountTiming}</td>
                      <td>
                        {Number(data.financialImpact).toLocaleString("en")}
                      </td>
                      <td>{data.mitigationAction}</td>
                      <td></td>
                      <td>{data.occurrence}</td>
                      <td>{data.remarks}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </CardBody>
        <CardFooter>
          <Button className="mx-2" color="info" onClick={downloadReport}>
            <i className="fa fa-download text-white" />
          </Button>
          {generatedLossData === "approved" ? (
            <Button
              id="approve"
              color="warning"
              size="sm"
              className="ml-3 text-white"
              type="approve"
            >
              Already Approved
            </Button>
          ) : (
            <Button
              id="approve"
              color="info"
              size="sm"
              className="ml-3 text-white"
              type="approve"
              onClick={(e) => handleAllSubmit(e)}
            >
              Approve Data
            </Button>
          )}
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <strong>Risk Cause (Level 2)</strong>
        </CardHeader>
        <CardBody>
          <Table bordered striped>
            <thead>
              <tr>
                <th>People (in Rs.)</th>
                <th>Process (in Rs.)</th>
                <th>Systems (in Rs.)</th>
                <th>External (in Rs.)</th>
                <th>Final Total Loss (in Rs.)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {Number(peopleCount).toLocaleString("en")} </td>
                <td> {Number(processCount).toLocaleString("en")} </td>
                <td> {Number(systemCount).toLocaleString("en")} </td>
                <td> {Number(externalCount).toLocaleString("en")} </td>
                <td>{peopleCount + processCount + systemCount + externalCount}</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}

export default LossDatabase;


