import React, { useState } from "react";
import moment from "moment";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  CardFooter,
  Input,
  Label,
} from "reactstrap";
import { paginate } from "./Utils/paginate";
import { splitKey } from "./Utils/splitKey";
import { getData } from "./util";
import Pagination from "./pagination";

const RiskRegisterTable = (props) => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelect = (e) => {
    const value = e.target.value;
    setPageSize(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousChange = () => {
    const now = currentPage;
    const previous = now - 1;
    setCurrentPage(previous);
  };

  const handleNextChange = () => {
    const now = currentPage;
    const next = now + 1;
    setCurrentPage(next);
  };

  const keys = [
    "status",
    "branch",
    "transactionDate",
    "riskAreaParticular",
    "riskTrigger",
    "occurrence",
    "amountTiming",
    "financialImpact",
    "nonFinancialImpact",
    "relatedAccount",
    "relatedStaff",
    "tracedDate",
    "tracedBy",
    "rectificationDate",
    "remarks",
    "createdAt",
    "updatedAt",
  ];
  const riskRegistersLength = props.riskRegisters
    ? props.riskRegisters.length
    : 0;
  const riskRegisters = paginate(props.riskRegisters, currentPage, pageSize);
  const p = props.permissions;
  const VIEW_EDIT = "2";
  const VIEW_EDIT_DELETE = "3";
  return (
    <>
      <Card id="risk-register-table">
        <CardHeader>
          <Row>
            <Col xs={5}>Risk Register</Col>
            <Col xs={6} className="float-right">
              <Label htmlFor="select" className=" pl-1 mt-1 float-right lead">
                Risk Register Per Page.
              </Label>
              <Input
                type="select"
                name="select"
                style={{ width: "15%" }}
                className="float-right"
                onClick={handleSelect}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={riskRegistersLength}>All</option>
              </Input>
              <Label htmlFor="select" className=" mt-1 pr-1 float-right lead">
                Show
              </Label>
            </Col>
            <Col xs={1} className="float-right">
              <Button
                size="sm"
                onClick={() => {
                  const elem = document.getElementById("risk-register-table");
                  if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                  } else if (elem.mozRequestFullScreen) {
                    /* Firefox */
                    elem.mozRequestFullScreen();
                  } else if (elem.webkitRequestFullscreen) {
                    /* Chrome, Safari and Opera */
                    elem.webkitRequestFullscreen();
                  } else if (elem.msRequestFullscreen) {
                    /* IE/Edge */
                    elem.msRequestFullscreen();
                  }
                }}
              >
                <i className="fa fa-arrows" />
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Table responsive bordered>
            <thead className="mt-0">
              <tr>
                <th>
                  Check All
                  <div className="pretty p-icon p-jelly p-round p-bigger">
                    <Input
                      type="checkbox"
                      onChange={props.handleCheckAllChange}
                    />
                    <div className="state p-danger">
                      <i className="icon material-icons">
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </i>
                      <Label></Label>
                    </div>
                  </div>
                </th>
                {keys.map((key) => (
                  <th key={key}>{splitKey(key)}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {riskRegisters.map((data, idx) => (
                <tr key={idx}>
                  <td>
                    {data.status === "Draft" ||
                    data.status === "Pending" ||
                    data.status === "Unapproved" ? (
                      <div className="pretty p-icon p-jelly p-round p-bigger">
                        <Input
                          type="checkbox"
                          name={idx}
                          checked={data.isChecked ? true : false}
                          onChange={props.handleCheckChange}
                        />
                        <div className="state p-danger">
                          <i className="icon material-icons">
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </i>
                          <Label></Label>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>{data.status}</td>
                  <td>{getData(data.branchId, props.branches).name}</td>
                  <td>{moment(data.transactionDate).format("YYYY/MM/DD")}</td>
                  <td>{data.riskAreaParticular}</td>
                  <td>{data.riskTrigger}</td>
                  <td>{data.occurrence}</td>
                  <td>
                    {Number(data.amountTiming).toLocaleString("en") +
                      " " +
                      (getData(data.baseUnitId, props.baseUnits).unit
                        ? getData(data.baseUnitId, props.baseUnits).unit
                        : "rupees")}
                  </td>
                  <td>{Number(data.financialImpact).toLocaleString("en")}</td>
                  <td>{data.nonFinancialImpact}</td>
                  <td>{data.relatedAccount}</td>
                  <td>{data.relatedStaff}</td>
                  <td>{moment(data.tracedDate).format("YYYY/MM/DD")}</td>
                  <td>{data.tracedBy}</td>
                  <td>
                    {data.rectificationDate
                      ? moment(data.rectificationDate).format("YYYY/MM/DD")
                      : ""}
                  </td>
                  <td>{data.remarks}</td>
                  <td>{moment(data.createdAt).format("YYYY/MM/DD")}</td>

                  <td>{moment(data.updatedAt).format("YYYY/MM/DD")}</td>
                  <td>
                    {(data.status === "Draft" ||
                      data.status === "Pending" ||
                      data.status === "Unapproved") &&
                    (p.riskRegister === VIEW_EDIT ||
                      p.riskRegister === VIEW_EDIT_DELETE) ? (
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => props.handleEditClick(data)}
                      >
                        <i className="fa fa-edit fa-lg"></i>
                      </Button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            className="mt-3"
            itemsCount={props.count}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            onPreviousChange={handlePreviousChange}
            onNextChange={handleNextChange}
          />
        </CardBody>
        <CardFooter>
          {p.isApprover ? (
            <Button
              id="approve"
              color="info"
              size="sm"
              className="ml-3 text-white"
              type="approve"
              onClick={props.handleAllSubmit}
            >
              Approve
            </Button>
          ) : null}
          {p.isMaker || p.isChecker ? (
            <Button
              id="submit"
              color="info"
              size="sm"
              className="ml-3 text-white"
              type="submit"
              onClick={props.handleAllSubmit}
            >
              Submit
            </Button>
          ) : null}
          {p.isChecker || p.isApprover ? (
            <Button
              id="return"
              color="warning"
              size="sm"
              className="ml-3 text-white"
              type="submit"
              onClick={props.handleAllSubmit}
            >
              Return
            </Button>
          ) : null}
          {p.riskRegister === VIEW_EDIT_DELETE ? (
            <Button
              id="delete"
              color="danger"
              size="sm"
              className="ml-3 text-white"
              type="submit"
              onClick={props.handleAllSubmit}
            >
              Delete
            </Button>
          ) : null}
        </CardFooter>
      </Card>
    </>
  );
};

export default RiskRegisterTable;
