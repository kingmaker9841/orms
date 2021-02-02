import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Col,
  Row,
  Input,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { options, optionsPage, optionsBoolean } from "./util";

const RoleForm = (props) => {
  const isEdit = !!props.isEdit;
  const role = props.role ? props.role : {};
  const roleControls = role.role_controls ? role.role_controls : [];
  const renderOptions = (type) => {
    switch (type) {
      case "page":
        return optionsPage.map((o, i) => {
          return (
            <option key={i} value={o.value}>
              {o.label}
            </option>
          );
        });
      case "boolean":
        return optionsBoolean.map((o, i) => {
          return (
            <option key={i} value={o.value}>
              {o.label}
            </option>
          );
        });
      default:
        return null;
    }
  };
  return (
    <div className="animated fadeIn">
      <Row>
        <Col md={6}>
          <Card>
            <Form id={props.formId} onSubmit={props.handleSubmit}>
              <CardHeader>
                <strong>
                  <i className="icon-briefcase pr-2"></i>
                  {props.title}
                </strong>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  {isEdit ? (
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter role name"
                      required
                      value={role.name ? role.name : ""}
                      onChange={props.handleChange}
                    />
                  ) : (
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter role name"
                      required
                    />
                  )}
                </FormGroup>
                {isEdit ? (
                  <Row>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            onChange={props.handleChange}
                            checked={role.isMaker ? role.isMaker : false}
                            name="radio-button"
                            value="isMaker"
                          />{" "}
                          Maker
                        </Label>
                      </FormGroup>
                      {/* <FormGroup check className="checkbox my-3">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          id="isMaker"
                          onChange={props.handleChange}
                          checked={!!role.isMaker}
                          name="isMaker"
                        />
                        <Label
                          check
                          className="form-check-label"
                          htmlFor="isMaker"
                        >
                          Maker
                        </Label>
                      </FormGroup> */}
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            onChange={props.handleChange}
                            checked={role.isChecker ? role.isChecker : false}
                            name="radio-button"
                            value="isChecker"
                          />{" "}
                          Checker
                        </Label>
                      </FormGroup>
                      {/* <FormGroup check className="checkbox my-3">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          id="isChecker"
                          onChange={props.handleChange}
                          checked={!!role.isChecker}
                          name="isChecker"
                        />
                        <Label
                          check
                          className="form-check-label"
                          htmlFor="isChecker"
                        >
                          Checker
                        </Label>
                      </FormGroup> */}
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            onChange={props.handleChange}
                            checked={role.isApprover ? role.isApprover : false}
                            name="radio-button"
                            value="isApprover"
                          />{" "}
                          Approver
                        </Label>
                      </FormGroup>
                      {/* <FormGroup check className="checkbox my-3">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          id="isApprover"
                          onChange={props.handleChange}
                          name="isApprover"
                        />
                        <Label
                          check
                          className="form-check-label"
                          htmlFor="isApprover"
                        >
                          Approver
                        </Label>
                      </FormGroup> */}
                    </Col>
                  </Row>
                ) : null}
                {isEdit && props.roleTypes
                  ? props.roleTypes.map((rT, i) => {
                      let roleControl = roleControls.filter((rC) =>
                        Number(rC.roleTypeId) === rT.id ? 1 : 0
                      )[0];
                      roleControl = roleControl ? roleControl : {};
                      return (
                        <FormGroup key={i}>
                          <Label htmlFor={i}>{rT.name}</Label>
                          <Input
                            title={rT.description ? rT.description : ""}
                            type="select"
                            id={i}
                            name={"control-" + rT.id}
                            value={roleControl.value}
                            onChange={props.handleChange}
                          >
                            {/* {options.map((o, i) => {
                              return (
                                <option key={i} value={o.value}>
                                  {o.label}
                                </option>
                              );
                            })} */}
                            {renderOptions(rT.type || "page")}
                          </Input>
                        </FormGroup>
                      );
                    })
                  : null}
                {isEdit ? (
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      onChange={props.handleChange}
                      checked={role.isProvinceAdmin? role.isProvinceAdmin : false}
                      name="checkbox"
                      value="isProvinceAdmin"
                    />
                    <Label>Is Province Manager</Label>
                  </FormGroup>
                ) : null}
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="success">
                  <i className="fa fa-dot-circle-o"></i> Submit
                </Button>
                <Button className="ml-2" type="reset" size="sm" color="danger">
                  <i className="fa fa-ban"></i> Reset
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RoleForm;
