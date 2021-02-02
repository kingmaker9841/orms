import React, { Component } from "react";
import {
  Label,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Col,
  Card,
  CardHeader,
  Form,
  Button,
  CardBody,
  CardFooter
} from "reactstrap";
import { editRiskRegister } from "./api";
import moment from "moment";
import { toast } from "react-toastify";
import language from '../../config/language';

class RiskRegisterEditForm extends Component {
 
  componentDidMount() {
    var today = new Date().toISOString().split("T")[0];
    document.getElementsByName("transactionDate")[0].setAttribute("max", today);
    document.getElementsByName("tracedDate")[0].setAttribute("max", today);
    document.getElementsByName("rectificationDate")[0].setAttribute("max", today);
  }
  state = {
    register: {},
    value: ""
  };

  handleChange = (e) => {
    if (!/[0-9]/.test(e.target.value)){
      this.props.handleChange(e);
    }
  };

  handleChangeCurrency = (e) => {
    this.props.handleChangeCurrency(e);
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = this.props.register;
    this.props.toggleEdit();
    if (moment(data.tracedDate).isSameOrAfter(data.transactionDate, "day") && (!data.rectificationDate || moment(data.rectificationDate).isSameOrAfter(data.tracedDate, "day"))) {
      editRiskRegister(this.props.register.id, data);
      this.props.updateData();
    } else {
      toast.error("Date mismatch !");
    }
  };

  render() {
    const { register, riskTriggers, riskParticulars, tracedBies } = this.props;
    const {
      transactionDate,
      occurrence,
      amountTiming,
      financialImpact,
      nonFinancialImpact,
      relatedAccount,
      riskTrigger,
      riskAreaParticular,
      riskAreaParticularCode,
      baseUnitId,
      rectificationDate,
      relatedStaff,
      tracedBy,
      tracedDate,
      remarks
    } = register;
    const relatedStaffs = relatedStaff ? relatedStaff.toString().split("/") : "";

    return (
      <Card>
        <CardHeader>Edit Risk Register</CardHeader>
        <Form onSubmit={this.handleSubmit}>
          <CardBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="transactionDate">{language.TRANSACTION_DATE}</Label>
                  <Input
                    name="transactionDate"
                    id="transactionDate"
                    value={moment(transactionDate).format("YYYY-MM-DD")}
                    type="date"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <Label for="riskAreaParticularDetail">
                  {language.RISK_PARTICULAR}
                  </Label>

                  <Input
                    type="select"
                    name="riskAreaParticularDetail"
                    id="riskAreaParticularDetail"
                    value={
                      riskAreaParticularCode ?
                        (riskAreaParticular +
                          "-" +
                          riskAreaParticularCode +
                          "-" +
                          baseUnitId)
                        : ""
                    }
                    onChange={this.handleChange}
                  >
                    <option value="Others">Others (specify in remarks)</option>
                    {riskParticulars.map((particular, indx) => {
                      return (
                        <option
                          key={indx}
                          value={
                            particular.name +
                            "-" +
                            particular.code +
                            "-" +
                            particular.baseUnitId
                          }>
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
                  <Label for="riskTrigger">{language.RISK_TRIGER}</Label>
                  <Input
                    type="select"
                    name="riskTrigger"
                    id="riskTrigger"
                    value={riskTrigger}
                    onChange={this.handleChange}
                  >
                    <option value="Others">Others (specify in remarks)</option>
                    {riskTriggers.map((trigger, indx) => {
                      return (
                        <option
                          key={indx}>
                          {trigger.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="occurrence">{language.OCCURRENCE}</Label>

                  <Input
                    name="occurrence"
                    id="occurrence"
                    value={occurrence ? occurrence : ""}
                    onChange={this.handleChange}
                    type="number"
                    min="0"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="amountTiming">{language.AMOUNT_TIMING}</Label>
                  <InputGroup className="mb-2">
                    <Input
                      name="amountTiming"
                      id="amountTiming"
                      value={
                        amountTiming
                          ? Number(amountTiming).toLocaleString("en")
                          : 0
                      }
                      onChange={this.props.handleChangeCurrency}
                      min="0"
                    />
                    <InputGroupAddon addonType="append">
                      <Button
                        color="primary"
                        type="button"
                        id="baseUnitLabel"
                      >
                        rupees
                        </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <Label for="financialImpact">{language.FINANCIAL_IMPACT}</Label>
                  <Input
                    name="financialImpact"
                    id="financialImpact"
                    type="text"
                    value={
                      financialImpact
                        ? Number(financialImpact).toLocaleString("en")
                        : 0
                    }
                    onChange={this.handleChangeCurrency}
                    min="0"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="nonFinancialImpact">{language.NON_FINANCIAL_IMPACT}</Label>

                  <Input
                    name="nonFinancialImpact"
                    id="nonFinancialImpact"
                    value={nonFinancialImpact ? nonFinancialImpact : ''}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="relatedAccount">{language.RELATED_ACCOUNT}</Label>
                  <Input
                    name="relatedAccount"
                    id="relatedAccount"
                    value={relatedAccount}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col className="col-5">
                    <FormGroup>
                      <Label for="relatedStaff-0">{language.RELATED_STAFF}</Label>
                      <Input
                        name="relatedStaff-0"
                        id="relatedStaff-0"
                        value={relatedStaffs[0] ? relatedStaffs[0] : ""}
                        onChange={this.handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="col-1 mt-3">
                    <FormGroup>
                      <Label htmlFor="r"></Label>
                      <i className="fa fa-compress fa-lg"
                        aria-hidden="true"
                      ></i>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="relatedStaff-1"></Label>
                      <Input
                        name="relatedStaff-1"
                        id="relatedStaff-1"
                        value={relatedStaffs[1] ? relatedStaffs[1] : ""}
                        onChange={this.handleChange}
                        className="form-control mt-2"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="tracedDate">{language.TRACECD_DATE}</Label>

                  <Input
                    name="tracedDate"
                    id="tracedDate"
                    value={moment(tracedDate).format("YYYY-MM-DD")}
                    type="date"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="tracedBy">{language.RISK_TRACECD_BY}</Label>

                  <Input
                    type="select"
                    name="tracedBy"
                    id="tracedBy"
                    onChange={this.handleChange}
                    value={tracedBy}>
                    <option value="Others">Others (specify in remarks)</option>
                    {tracedBies.map((traced, indx) => {
                      return (
                        <option
                          key={indx}
                          value={traced.name}>
                          {traced.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <Label for="rectificationDate">{language.RECTIFICATION_DATE}</Label>

                  <Input
                    name="rectificationDate"
                    id="rectificationDate"
                    value={rectificationDate ? moment(rectificationDate).format("YYYY-MM-DD") : ''}
                    type="date"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              {!riskTrigger && !riskAreaParticularCode && !tracedBy ? (
                <Col>
                  <FormGroup>
                    <Label for="remarks">{language.REMARKS}</Label>
                    <Input
                      name="remarks"
                      id="remarks"
                      value={remarks ? remarks : ""}
                      placeholder="Remark is required !"
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
              ) : (
                  <Col>
                    <FormGroup>
                      <Label for="remarks">{language.REMARKS}</Label>
                      <Input
                        name="remarks"
                        id="remarks"
                        value={remarks ? remarks : ""}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Col>
                )}
            </Row>
          </CardBody>
          <CardFooter>
            <Button color="success" size="sm" type="submit">
            {language.UPDATE}
            </Button>
          </CardFooter>
        </Form>
      </Card>
    );
  }
}

export default RiskRegisterEditForm;
