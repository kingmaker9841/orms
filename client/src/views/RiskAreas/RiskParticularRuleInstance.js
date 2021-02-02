import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  InputGroup,
  InputGroupAddon,
  Input,
  Row,
  Col,
  Table,
  Button,
} from "reactstrap";
const { splitText } = require("./util");

const RiskRuleInstance = (props) => {
  const [btnHidden, setButtonAddFlag] = useState({});
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
  const riskParticulars = props.riskParticulars;
  const riskInstanceRules = props.riskInstanceRules;
  return (
    <Card>
      <CardHeader>
        <Row>
          <Col>
            <strong>Risk Rule Instance</strong>
          </Col>
          <Col>
            <Button
              size="sm"
              className="text-white"
              color="danger"
              onClick={() => {
                props.deleteRiskParticularTable("instance", null);
                setButtonAddFlag({});
              }}
            >
              <i className="fa fa-trash" />
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Row>
          <Col lg={6}>
            <Table striped responsive>
              <thead>
                <tr>
                  <th scope="col">Likelihood</th>
                  <th scope="col">Lower Limit</th>
                  <th scope="col">Upper Limit</th>
                </tr>
              </thead>
              <tbody>
                {props.likelihoods.map((likelihood, idx) => {
                  let likelihoodRule = riskInstanceRules.filter((r) =>
                    Number(r.likelihoodId) === likelihood.id ? 1 : 0
                  )[0];
                  likelihoodRule = likelihoodRule ? likelihoodRule : {};
                  return (
                    <tr key={idx}>
                      <td>{likelihood.name}</td>
                      <td>
                        <Input
                          name={
                            "instance-" +
                            idx +
                            "-likelihood-lower-" +
                            likelihood.id
                          }
                          key={likelihood.id}
                          value={
                            likelihoodRule.lowerLimit
                              ? likelihoodRule.lowerLimit
                              : ""
                          }
                          onChange={props.onChange}
                        />
                      </td>
                      <td>
                        <Input
                          name={
                            "instance-" +
                            idx +
                            "-likelihood-upper-" +
                            likelihood.id
                          }
                          key={likelihood.id}
                          value={
                            likelihoodRule.upperLimit
                              ? likelihoodRule.upperLimit
                              : ""
                          }
                          onChange={props.onChange}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col lg={6}>
            <Table striped responsive>
              <thead>
                <tr>
                  <th scope="col">Impact</th>
                  <th scope="col">Instance</th>
                </tr>
              </thead>
              <tbody>
                {props.impacts.map((impact, idx) => {
                  return (
                    <tr key={idx}>
                      <th key={impact.name + idx}>{impact.name}</th>
                      <td key={impact.id}>
                        {riskParticulars.map((riskParticular, indx) => {
                          const riskImpact = riskParticular
                            .risk_area_impact_rules[0]
                            ? riskParticular.risk_area_impact_rules[0]
                            : {};
                          const propName = "name-" + indx;
                          const riskParticularName = riskParticular.name.split(
                            splitText
                          );
                          if (
                            riskParticular.type === "instance" &&
                            riskImpact.impactId === impact.id
                          ) {
                            if (!btnHidden[impact.id]) {
                              btnHidden[impact.id] = true;
                              setButtonAddFlag({ ...btnHidden });
                            }
                            return (
                              <React.Fragment key={indx}>
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
                                        className={
                                          name ? "font-weight-bold" : ""
                                        }
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

                                <Button
                                  size="sm"
                                  className="text-white btn-sm m-1"
                                  color="danger"
                                  onClick={() => {
                                    btnHidden[impact.id] = false;
                                    setButtonAddFlag({ ...btnHidden });
                                    props.deleteRiskParticularTable(
                                      "instance",
                                      indx
                                    );
                                  }}
                                >
                                  <i className="fa fa-trash" />
                                </Button>
                              </React.Fragment>
                            );
                          }
                          return null;
                        })}
                        {btnHidden[impact.id] ? null : (
                          <>
                            <Button
                              id={"impact-add-button" + impact.id}
                              key={idx}
                              color="primary"
                              className="ml-1"
                              onClick={(e) => {
                                props.handleAddImpact(impact.id);
                                e.target.display = "none";
                              }}
                            >
                              +
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default RiskRuleInstance;
