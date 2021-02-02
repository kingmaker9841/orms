import React, { useState, useEffect } from "react";
import RiskRuleRange from "./RiskParticularRuleRange";
//eslint-disable-next-line
import RiskRuleInstance from "./RiskParticularRuleInstance";
import RiskTrigger from "./RiskTrigger";
import RiskTracedBy from "./RiskTracedBy";
import {
  Card,
  CardBody,
  CardHeader,
  Collapse,
  CardFooter,
  Button,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { getRiskAreaParents } from "./api/risk_parent";

const { splitText } = require("./util");
const RiskAreaForm = (props) => {
  const [parents, setParents] = useState([]);
  const [collapse, setCollapse] = useState({});
  const handleRiskParticularNameChange = (
    index,
    propName,
    value,
    riskParticularArrName
  ) => {
    const e = { target: { name: propName } };
    if (index !== null) {
      riskParticularArrName = riskParticularArrName.map((r, i) =>
        i === index ? value : r
      );
    } else {
      riskParticularArrName.push("");
    }
    e.target.value = riskParticularArrName.join(splitText);
    props.handleRiskParticularNameChange(e);
  };
  const handleRiskParticularNameDelete = (
    index,
    propName,
    riskParticularArrName
  ) => {
    const e = { target: { name: propName } };
    riskParticularArrName = riskParticularArrName.filter((r, i) =>
      i === index ? 0 : 1
    );
    e.target.value = riskParticularArrName.join(splitText);
    props.handleRiskParticularNameChange(e);
  };
  const riskArea = props.riskArea;
  const riskParticulars = riskArea
    ? riskArea.risk_area_particulars
      ? riskArea.risk_area_particulars
      : []
    : [];
  const riskInstanceRules = riskArea
    ? riskArea.risk_area_likelihood_instance_rules
      ? riskArea.risk_area_likelihood_instance_rules
      : []
    : [];
  const riskTriggers = riskArea
    ? riskArea.risk_area_triggers
      ? riskArea.risk_area_triggers
      : []
    : [];
  const riskTracedBy = riskArea
    ? riskArea.risk_area_traced_bies
      ? riskArea.risk_area_traced_bies
      : []
    : [];
  useEffect(() => {
    getRiskAreaParents((err, riskAreaParents) => {
      if (err) return;
      setParents(riskAreaParents);
    });
  }, []); //eslint-disable-line
  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={12}>
          <Form id={props.formId} onSubmit={props.handleSubmit}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-briefcase pr-2"></i>
                  {props.title}
                </strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      {riskArea ? (
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          value={riskArea.name ? riskArea.name : ""}
                          onChange={props.handleRiskAreaChange}
                          placeholder="Enter Risk Area Name"
                          required
                        />
                      ) : (
                          <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter Risk Area Name"
                            required
                          />
                        )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="name">Category</Label>
                      {riskArea ? (
                        <Input
                          type="select"
                          name="riskAreaParentId"
                          id="riskAreaParentId"
                          value={
                            riskArea.riskAreaParentId
                              ? riskArea.riskAreaParentId
                              : ""
                          }
                          onChange={props.handleRiskAreaChange}
                          placeholder="Enter Risk Category Level 1"
                          required
                        >
                          {parents.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                        </Input>
                      ) : (
                          <Input
                            type="select"
                            name="riskAreaParentId"
                            id="riskAreaParentId"
                            placeholder="Enter Risk Category Level 1"
                            required
                          >
                            {parents.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </Input>
                        )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="code">Code</Label>
                      {riskArea ? (
                        <Input
                          type="text"
                          name="code"
                          id="code"
                          value={riskArea.code ? riskArea.code : ""}
                          onChange={props.handleRiskAreaChange}
                          placeholder="Enter Risk Area Code"
                          required
                        />
                      ) : (
                          <Input
                            type="text"
                            name="code"
                            id="code"
                            placeholder="Enter Risk Area Code"
                            required
                          />
                        )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="isActive">Status</Label>
                      {riskArea ? (
                        <Input
                          type="select"
                          name="isActive"
                          id="isActive"
                          value={riskArea.isActive ? riskArea.isActive : ""}
                          disabled={
                            !props.permissions.isApprover ||
                            !props.permissions.isApprover
                          }
                          onChange={props.handleRiskAreaChange}
                          required
                        >
                          <option value="false">Inactive</option>
                          <option value="true">Active</option>
                        </Input>
                      ) : (
                          <Input
                            type="select"
                            name="isActive"
                            id="isActive"
                            disabled={
                              !props.permissions.isApprover ||
                              !props.permissions.isApprover
                            }
                            required
                          >
                            <option value="false">Inactive</option>
                            <option value="true">Active</option>
                          </Input>
                        )}
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button
                  id="submit-button-risk-area-form"
                  type="submit"
                  size="sm"
                  color="success"
                >
                  <i className="fa fa-dot-circle-o"></i>
                  Submit
                </Button>
                <Button className="ml-2" type="reset" size="sm" color="danger">
                  <i className="fa fa-ban"></i> Reset
                </Button>
              </CardFooter>
            </Card>
            {props.isEdit ? (
              <React.Fragment>
                {riskParticulars.map((riskParticular, indx) => {
                  const propName = "name-" + indx;
                  const riskParticularName = riskParticular.name.split(
                    splitText
                  );
                  if (riskParticular.type === "range") {
                    return (
                      <Card key={indx}>
                        <CardHeader>
                          <Row>
                            <Col md={8}>
                              <Row>
                                <Col>
                                  <InputGroup className="mb-2">
                                    <InputGroupAddon addonType="prepend">
                                      <Button color="success" type="button">
                                        Name
                                      </Button>
                                    </InputGroupAddon>
                                    <Input
                                      type="text"
                                      className="font-italic"
                                      style={{ width: 150 }}
                                      name={"title-" + indx}
                                      value={
                                        riskParticular.title
                                          ? riskParticular.title
                                          : ""
                                      }
                                      onChange={
                                        props.handleRiskParticularPropChange
                                      }
                                      placeholder="Title"
                                      required
                                    />
                                  </InputGroup>
                                </Col>
                                <Col>
                                  <InputGroup className="mb-2">
                                    <InputGroupAddon addonType="prepend">
                                      <Button color="primary" type="button">
                                        Code
                                      </Button>
                                    </InputGroupAddon>
                                    <Input
                                      type="text"
                                      className="font-italic"
                                      style={{ width: 150 }}
                                      name={"code-" + indx}
                                      value={
                                        riskParticular.code
                                          ? riskParticular.code
                                          : ""
                                      }
                                      onChange={
                                        props.handleRiskParticularPropChange
                                      }
                                      placeholder="Enter Risk Particular Code"
                                      required
                                    />
                                  </InputGroup>
                                </Col>
                              </Row>
                              {riskParticularName.map((name, i) => {
                                return (
                                  <InputGroup className="mb-2" key={i}>
                                    <Input
                                      required
                                      className={name ? "font-weight-bold" : ""}
                                      key={"riskParticularName" + indx}
                                      name={propName}
                                      value={name}
                                      placeholder="Detail of Error"
                                      onChange={(e) =>
                                        handleRiskParticularNameChange(
                                          i,
                                          propName,
                                          e.target.value,
                                          riskParticularName
                                        )
                                      }
                                    />
                                    <InputGroupAddon addonType="append">
                                      <Button
                                        type="button"
                                        color="danger"
                                        onClick={() =>
                                          handleRiskParticularNameDelete(
                                            i,
                                            propName,
                                            riskParticularName
                                          )
                                        }
                                      >
                                        <i className="fa fa-trash"></i>
                                      </Button>
                                    </InputGroupAddon>
                                  </InputGroup>
                                );
                              })}
                              <Button
                                className="text-white"
                                color="warning"
                                size="sm"
                                onClick={() => {
                                  handleRiskParticularNameChange(
                                    null,
                                    propName,
                                    "",
                                    riskParticularName
                                  );
                                }}
                              >
                                +
                              </Button>
                            </Col>
                            <Col md={3}>
                              <Row>
                                <Input
                                  value={riskParticular.baseUnitId}
                                  onChange={
                                    props.handleRiskParticularNameChange
                                  }
                                  name={"baseUnitId-" + indx}
                                  type="select"
                                >
                                  {props.baseUnits.map((b) => (
                                    <option key={b.id} value={b.id}>
                                      {b.type}
                                    </option>
                                  ))}
                                </Input>
                              </Row>
                              <Row className="justify-content-end">
                                <Button
                                  className="text-white btn-sm m-1"
                                  color="info"
                                  onClick={() => {
                                    collapse[indx] = !collapse[indx];
                                    setCollapse({ ...collapse });
                                  }}
                                >
                                  <i className="fa fa-bars" />
                                </Button>
                                <Button
                                  size="sm"
                                  className="text-white btn-sm m-1"
                                  color="danger"
                                  onClick={() => {
                                    props.deleteRiskParticularTable(
                                      "range",
                                      indx
                                    );
                                  }}
                                >
                                  <i className="fa fa-trash" />
                                </Button>
                              </Row>
                            </Col>
                          </Row>
                        </CardHeader>
                        <Collapse isOpen={collapse[indx]}>
                          <CardBody>
                            <RiskRuleRange
                              key={"riskRule" + indx}
                              index={indx}
                              likelihoods={props.likelihoods}
                              impacts={props.impacts}
                              riskParticular={riskParticular}
                              onChange={props.handleChangeRiskRule}
                            />
                          </CardBody>
                        </Collapse>
                      </Card>
                    );
                  }
                  return null;
                })}

                <Row className="mb-2">
                  <Col xs={5}>
                    <Input
                      type="select"
                      id="type"
                      disabled={props.instanceVisible}
                    >
                      <option value="range">Range</option>
                      {props.instanceVisible ? null : (
                        <option value="instance">Instance</option>
                      )}
                    </Input>
                  </Col>
                  <Col xs={4}>
                    <Button
                      color="info"
                      className="text-white"
                      onClick={props.addRiskAreaParticularTable}
                    >
                      +
                    </Button>
                  </Col>
                </Row>

                <Collapse isOpen={props.instanceVisible}>
                  <RiskRuleInstance
                    //RISK PARTICULAR TABLE DELETE
                    deleteRiskParticularTable={props.deleteRiskParticularTable}
                    key={riskParticulars.id}
                    likelihoods={props.likelihoods}
                    impacts={props.impacts}
                    onChange={props.handleChangeRiskRule}
                    handleRiskParticularNameChange={
                      props.handleRiskParticularNameChange
                    }
                    handleRiskParticularPropChange={
                      props.handleRiskParticularPropChange
                    }
                    handleAddImpact={props.handleAddImpact}
                    riskAreaId={riskArea.id}
                    riskInstanceRules={riskInstanceRules}
                    riskParticulars={riskParticulars}
                  />
                </Collapse>

                <hr />

                <RiskTrigger
                  key={riskTriggers.id}
                  riskTriggers={riskTriggers}
                  handleTriggerChange={props.handleTriggerChange}
                  addRiskTrigger={props.addRiskTrigger}
                  deleteRiskTrigger={props.deleteRiskTrigger}
                  handleLossDataChange={props.handleLossDataChange}
                />

                <hr />

                <RiskTracedBy
                  riskTracedBy={riskTracedBy}
                  handleRiskTracedByChange={props.handleRiskTracedByChange}
                  addRiskTracedBy={props.addRiskTracedBy}
                  deleteRiskTracedBy={props.deleteRiskTracedBy}
                />
              </React.Fragment>
            ) : null}
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default RiskAreaForm;
