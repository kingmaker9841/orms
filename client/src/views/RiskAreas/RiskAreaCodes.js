import React from 'react';
import { Input, InputGroup, InputGroupAddon, Card, CardHeader, CardBody, CardFooter, Col, Row, Table, Button, Collapse, Form } from 'reactstrap';
import { getRiskAreaCodes, editRiskAreaCodes } from './api';
import { splitText } from './util';

export default class RiskAreaCodes extends React.Component {

    state = {
        riskAreaCodes: []
    }

    toggleParticularCodes = id => {
        const riskAreaCodes = this.state.riskAreaCodes.map(r => {
            switch (id) {
                case "close":
                    return { ...r, isClosed: true };
                case "open":
                    return { ...r, isClosed: false };
                default:
                    return r.id === id ? { ...r, isClosed: !r.isClosed } : r;
            }
        });
        this.setState({
            riskAreaCodes: riskAreaCodes,
        });
    }

    handleChange = e => {
        const [name, riskAreaId, riskParticularId] = e.target.name.split('-');
        const value = e.target.value;
        const riskAreaCodes = this.state.riskAreaCodes.map(rA => {
            if (rA.id === Number(riskAreaId)) {
                rA.risk_area_particulars = rA.risk_area_particulars.map(rP => {
                    return rP.id === Number(riskParticularId) ? { ...rP, [name]: value } : rP;
                });
            }
            return rA;
        });
        this.setState({
            riskAreaCodes: riskAreaCodes,
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        editRiskAreaCodes(this.state.riskAreaCodes, (err, json) => {
            if (err) return;
            window.location.reload();
        });
    }

    componentDidMount() {
        getRiskAreaCodes((err, data) => {
            if (err) return;
            this.setState({
                riskAreaCodes: data
            });
        });
    }

    render() {
        return (
            <div className="animate fadeIn">
                <Card>
                    <Form>
                        <CardHeader>
                            <Row>
                                <Col>
                                    Risk Area Codes
                                </Col>
                                <Col>
                                    <Button color="warning" size="sm"
                                        onClick={() => this.toggleParticularCodes("open")}
                                        onDoubleClick={() => this.toggleParticularCodes("close")}>
                                        <i className="fa fa-bars text-white" />
                                    </Button>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {this.state.riskAreaCodes.map(rA => {
                                const riskParticulars = rA.risk_area_particulars ? rA.risk_area_particulars : [];
                                return (
                                    <React.Fragment key={rA.id}>
                                        <Row className="my-2">
                                            <Col md={6}>
                                                <strong>
                                                    {rA.name}
                                                </strong>
                                            </Col>
                                            <Col md={6}>
                                                <Button color="info" size="sm" onClick={() => this.toggleParticularCodes(rA.id)}>
                                                    <i className="fa fa-bars text-white" />
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Collapse isOpen={!rA.isClosed}>
                                            <Table>
                                                <tbody>
                                                    {riskParticulars.map(rP => {
                                                        return (
                                                            <tr key={rP.id}>
                                                                <td style={{ width: 300 }}>
                                                                    <InputGroup className="mb-2">
                                                                        <InputGroupAddon addonType="prepend">
                                                                            <Button color="primary" type="button">
                                                                                Code
                                                                            </Button>
                                                                        </InputGroupAddon>
                                                                        <Input
                                                                            type="text"
                                                                            className="font-italic"
                                                                            name={"code-" + rA.id + "-" + rP.id}
                                                                            value={rP.code ? rP.code : ""}
                                                                            onChange={this.handleChange}
                                                                            placeholder="Enter Risk Particular Code"
                                                                            required />
                                                                    </InputGroup>
                                                                </td>
                                                                <td>
                                                                    {rP.name.split(splitText).map((name, i) => {
                                                                        return (
                                                                            <React.Fragment key={i}>
                                                                                <span>
                                                                                    {name}
                                                                                </span>
                                                                                <br />
                                                                            </React.Fragment>
                                                                        )
                                                                    })}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Collapse>
                                    </React.Fragment>
                                )
                            })}
                        </CardBody>
                        <CardFooter>
                            <Button color="success" size="sm" onClick={this.handleSubmit} type="submit">
                                <i className="fa fa-dot-circle-o" /> Submit
                        </Button>
                        </CardFooter>
                    </Form>
                </Card>
            </div>
        )
    }

}