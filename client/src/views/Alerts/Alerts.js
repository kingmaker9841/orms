import React, { Component } from "react";
import { editMailingDays, getMailingDays } from "./api";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  Input,
  Label,
  Button,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import { getFormData } from "../../util/form";

class Alerts extends Component {
  state = {
    mailingDays: {}
  };
  componentDidMount() {
    getMailingDays((err, data) => {
      if (err) alert("Not available for Right Now");
      this.setState({ mailingDays: data });
    });
  }
  handleChange = ({ target: input }) => {
    const mailingDays = { ...this.state.mailingDays };
    mailingDays[input.name] = input.value;
    this.setState({ mailingDays });
  };
  handleSubmit = e => {
    e.preventDefault();
    const form = getFormData(e);
    // console.log(form);
    editMailingDays(form, (err, done) => {
      if (err) return alert("Something Failed!");
    });
  };
  render() {
    const { mailingDays } = this.state;

    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <CardHeader className="lead">
            <strong>Mailing Days</strong>
          </CardHeader>
          <CardBody>
            <InputGroup className="mb-2 col-6">
              <Label for="makerDays" className="ml-4 mr-5 col-3">
                <strong>Maker</strong>
              </Label>

              <InputGroupAddon addonType="prepend">
                <Button
                  color="primary"
                  type="button"
                  disabled
                  style={{ border: "1px solid black" }}
                >
                  In Days
                </Button>
              </InputGroupAddon>
              <Input
                type="text"
                style={{ border: "1px solid black" }}
                name="makerDays"
                className="font-italic"
                value={mailingDays.makerDays ? mailingDays.makerDays : ""}
                onChange={this.handleChange}
                required
              />
            </InputGroup>
            <InputGroup className="mb-2 col-6">
              <Label for="checkerDays" className="ml-4 mr-5 col-3">
                <strong>Checker</strong>
              </Label>

              <InputGroupAddon addonType="prepend">
                <Button
                  color="primary"
                  type="button"
                  disabled
                  style={{ border: "1px solid black" }}
                >
                  In Days
                </Button>
              </InputGroupAddon>
              <Input
                type="text"
                style={{ border: "1px solid black" }}
                className="font-italic"
                name="checkerDays"
                value={mailingDays.checkerDays ? mailingDays.checkerDays : ""}
                onChange={this.handleChange}
                required
              />
            </InputGroup>
            <InputGroup className="mb-2 col-6">
              <Label for="approverDays" className="ml-4 mr-5 col-3">
                <strong>Approver</strong>
              </Label>

              <InputGroupAddon addonType="prepend">
                <Button
                  color="primary"
                  type="button"
                  disabled
                  style={{ border: "1px solid black" }}
                >
                  In Days
                </Button>
              </InputGroupAddon>
              <Input
                type="text"
                style={{ border: "1px solid black" }}
                name="approverDays"
                className="font-italic"
                value={mailingDays.approverDays ? mailingDays.approverDays : ""}
                onChange={this.handleChange}
                required
              />
            </InputGroup>
          </CardBody>
          <CardFooter>
            <Button type="submit" color="info">
              Submit
            </Button>
          </CardFooter>
        </Form>
      </Card>
    );
  }
}

export default Alerts;
