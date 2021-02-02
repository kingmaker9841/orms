import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Col, Row, Input } from "reactstrap";
import { getAll } from "../../util/api";
// REDUX
import {
  setSelectedBranch,
  setSelectedRiskArea,
} from "../../redux/actions/risk_register";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RiskRegisterInput from "./RiskRegisterInput";
import MakerBranchSummary from "./MakerBranchSummary";
// REDUX END
const RiskRegisters = (props) => {
  const [riskAreas, setRiskAreas] = useState([]);
  const [branchId, setBranchId] = useState(null);
  const [riskAreaCode, setRiskAreaCode] = useState(null);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    getAll((err, data) => {
      if (err) return;
      setBranches(data.branches);
      setRiskAreas(data.riskAreas);
    });
  }, []);

  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setBranchId(branchId);
    props.setSelectedBranch(branchId);
  };
  const handleRiskRegisterChange = (e) => {
    const riskAreaCode = e.target.value;
    setRiskAreaCode(riskAreaCode);
    props.setSelectedRiskArea(riskAreaCode);
  };

  const p = props.permissions ? props.permissions : {};
  return (
    <div className="animated fadeIn">
      <Row>
        {p.isApprover || p.isAdmin ? (
          <Col md={5} xs={6} className="mb-3">
            <Input
              type="select"
              onChange={handleBranchChange}
              value={
                Number(props.selectedBranchId)
                  ? Number(props.selectedBranchId)
                  : 0
              }
            >
              <option value={0}>---- Your Branch ----</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </Input>
          </Col>
        ) : null}
        <Col md={7} xs={6} className="mb-3">
          <Input type="select" onChange={handleRiskRegisterChange}>
            <option value={""}>--- Select Risk Register ---</option>
            {riskAreas.map((riskArea) => (
              <option key={riskArea.id} value={riskArea.code}>
                {riskArea.name}
              </option>
            ))}
          </Input>
        </Col>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <Row>
                    <i className="fa fa-cog ml-2 mt-2"></i>
                    <h5 className="m-2"> Risk Analysis</h5>
                  </Row>
                </Col>
                <Col></Col>
              </Row>
            </CardHeader>
            <CardBody className="table-responsive">
              <RiskRegisterInput {...props} />
            </CardBody>
          </Card>
        </Col>
        {props.permissions.isMaker && !props.permissions.isAdmin ? (
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col>
                    <Row>
                      <i className="fa fa-cog ml-2 mt-2"></i>
                      <h5 className="m-2"> Risk Report</h5>
                    </Row>
                  </Col>
                  <Col></Col>
                </Row>
              </CardHeader>
              <CardBody className="table-responsive">
                <MakerBranchSummary {...props} />
              </CardBody>
            </Card>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

const mapStateToProps = ({ state }) => {
  return {
    selectedBranchId: state.selectedBranchId,
    selectedRiskAreaCode: state.selectedRiskAreaCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { setSelectedBranch, setSelectedRiskArea },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RiskRegisters);
