import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Col,
  Row,
  Label,
  Input,
  FormGroup,
  Form,
  InputGroupAddon,
  InputGroup,
} from "reactstrap";
import { ToastContainer } from "react-toastify";
import language from "../../config/language";

const RiskRegisterForm = (props) => {
  const [inputer, setInputer] = useState("");
  const [authorizer, setAuthorizer] = useState("");
  useEffect(() => {
    var today = new Date().toISOString().split("T")[0];
    document.getElementsByName("transactionDate")[0].setAttribute("max", today);
    document.getElementsByName("tracedDate")[0].setAttribute("max", today);
    document
      .getElementsByName("rectificationDate")[0]
      .setAttribute("max", today);
  }, [props.selectedRegister]);

  return (
    <Card>
      <CardHeader>Add Risk Register</CardHeader>
      <Form
        onSubmit={props.handleSubmit}
        onChange={props.handleChange}
        id="create-course-form"
      >
        <CardBody>
          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="transactionDate">
                  {language.TRANSACTION_DATE}
                </Label>
                <Input
                  required
                  id="transactionDate"
                  defaultValue={new Date().toJSON().slice(0, 15)}
                  name="transactionDate"
                  type="date"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label htmlFor="riskAreaParticularDetail">
                  {language.RISK_PARTICULAR}
                </Label>
                <Input
                  required
                  type="select"
                  id="riskAreaParticularDetail"
                  name="riskAreaParticularDetail"
                >
                  <option value="Others">Others (specify in remarks)</option>
                  {props.riskParticulars.map((particular, i) => {
                    return (
                      <option
                        key={i}
                        value={
                          particular.name +
                          "-" +
                          particular.code +
                          "-" +
                          particular.baseUnitId
                        }
                      >
                        {particular.name}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="riskTrigger">{language.RISK_TRIGER}</Label>
                <Input
                  required
                  type="select"
                  id="riskTrigger"
                  name="riskTrigger"
                >
                  <option value="Others">Others (specify in remarks)</option>
                  {props.riskTriggers.map((trigger, i) => {
                    return <option key={i}>{trigger.name}</option>;
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label htmlFor="occurrence">{language.OCCURRENCE}</Label>
                <Input
                  required
                  id="occurrence"
                  name="occurrence"
                  type="number"
                  min="1"
                  defaultValue="1"
                />
              </FormGroup>
            </Col>
          </Row>
          <ToastContainer />

          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="amountTiming">{language.AMOUNT_TIMING}</Label>
                <InputGroup className="mb-2">
                  <Input
                    required
                    id="amountTiming"
                    name="amountTiming"
                    type="text"
                    min="0"
                    value={
                      props.amountTiming
                        ? Number(props.amountTiming).toLocaleString("en")
                        : props.amountTiming === 0
                        ? 0
                        : ""
                    }
                    onChange={props.handleChangeCurrency}
                  />
                  <InputGroupAddon addonType="append">
                    <Button color="primary" type="button" id="baseUnitLabel">
                      rupees
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label htmlFor="financialImpact">
                  {language.FINANCIAL_IMPACT}
                </Label>
                <Input
                  id="financialImpact"
                  name="financialImpact"
                  type="text"
                  min="0"
                  value={
                    props.financialImpact
                      ? Number(props.financialImpact).toLocaleString("en")
                      : ""
                  }
                  onChange={props.handleChangeCurrency}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="nonFinancialImpact">
                  {language.NON_FINANCIAL_IMPACT}
                </Label>
                <Input id="nonFinancialImpact" name="nonFinancialImpact" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label htmlFor="relatedAccount">
                  {language.RELATED_ACCOUNT}
                </Label>
                <Input
                  required
                  id="relatedAccount"
                  name="relatedAccount"
                  min="0"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <FormGroup>
                    <Label htmlFor="relatedStaff1">
                      {language.RELATED_STAFF}
                    </Label>
                    <Input
                      required
                      id="relatedStaff1"
                      name="relatedStaff1"
                      placeholder="Inputer"
                      value={inputer}
                      onChange={(e) => {
                        if (!/[0-9]/.test(e.target.value)){
                          setInputer(e.target.value);
                        }
                      }}
                      // value={props.selectedRegister.relatedStaff1}
                    />
                  </FormGroup>
                </Col>
                <Col className="col-1">
                  <FormGroup>
                    <Label htmlFor="r"></Label>
                  </FormGroup>
                  <i className="fa fa-compress fa-lg" aria-hidden="true"></i>
                </Col>

                <Col>
                  <FormGroup>
                    <Label htmlFor="relatedStaff2"></Label>
                    <Input
                      id="relatedStaff2"
                      name="relatedStaff2"
                      className="mt-2"
                      placeholder="Authorizer"
                      value ={authorizer}
                      onChange = { e => {
                        if (!/[0-9]/.test(e.target.value)){
                          setAuthorizer(e.target.value);
                        }
                      }}
                      // value={props.relatedStaff2}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col>
              <FormGroup>
                <Label htmlFor="tracedDate">{language.TRACECD_DATE}</Label>
                <Input required id="tracedDate" name="tracedDate" type="date" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="tracedBy">{language.RISK_TRACECD_BY}</Label>
                <Input required type="select" id="tracedBy" name="tracedBy">
                  <option value="Others">Others (specify in remarks)</option>
                  {props.riskTracedBy.map((tracedBy, i) => {
                    return <option key={i}>{tracedBy.name}</option>;
                  })}
                </Input>
              </FormGroup>
            </Col>

            <Col>
              <FormGroup>
                <Label htmlFor="rectificationDate">
                  {language.RECTIFICATION_DATE}
                </Label>

                <Input
                  id="rectificationDate"
                  name="rectificationDate"
                  type="date"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {props.isRemarksMandatory.riskTrigger ||
            props.isRemarksMandatory.tracedBy ||
            props.isRemarksMandatory.riskAreaParticularDetail ? (
              <Col>
                <FormGroup>
                  <Label htmlFor="remarks">{language.REMARKS}</Label>
                  <Input
                    required
                    id="remarks"
                    name="remarks"
                    placeholder="Remarks is required !"
                  />
                </FormGroup>
              </Col>
            ) : (
              <Col>
                <FormGroup>
                  <Label htmlFor="remarks">{language.REMARKS}</Label>
                  <Input id="remarks" name="remarks" />
                </FormGroup>
              </Col>
            )}
          </Row>
        </CardBody>
        <CardFooter>
          <Button
            color="success"
            type="submit"
            size="sm"
            id="submit-risk-register"
          >
            {language.SUBMIT}
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
};

export default RiskRegisterForm;
