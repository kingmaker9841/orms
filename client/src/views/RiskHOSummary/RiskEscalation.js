import React from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Form, Table, Input } from 'reactstrap';
import { getRiskEscalation, editRiskEscalation, } from './api';
import { VIEW_EDIT, VIEW_EDIT_DELETE } from '../Roles/util';

export default class RiskEscalation extends React.Component {

    state = {
        isDisabled: true,
        riskCategories: [],
    }

    handleChange = e => {
        const [parent, child] = e.target.name.split("-");
        const value = e.target.value;
        const riskCategories = this.state.riskCategories.map(rI => {
            if (rI.id === Number(parent)) {
                let flagFound = false;
                rI.risk_escalation_functions = rI.risk_escalation_functions.map(rE => {
                    if (rE.riskCategorizationFunctionId === Number(child)) {
                        flagFound = true;
                        rE.lowerLimit = value;
                    }
                    return rE;
                });
                if (!flagFound) {
                    rI.risk_escalation_functions.push({
                        riskCategorizationId: rI.id,
                        riskCategorizationFunctionId: Number(child),
                        lowerLimit: value,
                    });
                }
            }
            return rI;
        });
        this.setState({
            riskCategories: riskCategories
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        editRiskEscalation({
            riskCategories: this.state.riskCategories
        }, (err, _) => {
            if (err) return;
            window.location.reload();
        });
    }

    componentDidMount() {
        getRiskEscalation((err, data) => {
            if (err) return;
            this.setState({
                riskCategories: data
            });
        });
    }

    render() {
        const p = this.props.permissions ? this.props.permissions : {};
        return (
            <Card>
                <Form onSubmit={this.handleSubmit}>
                    <CardHeader>
                        {p.riskEstimationHo === VIEW_EDIT || p.riskEstimationHo === VIEW_EDIT_DELETE || p.isAdmin ?
                            <Button color="info" className="mr-2" size="sm" onClick={() => this.setState({ isDisabled: !this.state.isDisabled })}>
                                <i className="fa fa-edit text-white"></i>
                            </Button>
                            : null}
                        Risk Escalation
                    </CardHeader>
                    <CardBody>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    {this.state.riskCategories.map((r, i) =>
                                        <th key={i}>{r.name}</th>

                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.riskCategories.map((r, i) =>
                                    <tr key={i}>
                                        <td>{r.name}</td>
                                        {this.state.riskCategories.map((rJ, j) => {
                                            let escalation = r.risk_escalation_functions.filter(e => rJ.id === e.riskCategorizationFunctionId ? 1 : 0)[0];
                                            escalation = escalation ? escalation : {};
                                            return (
                                                <td key={j}>
                                                    <Input
                                                        name={r.id + //PARENT CATEGORY ID
                                                            "-" +
                                                            rJ.id   //CHILD CATEGORY ID
                                                        }
                                                        disabled={this.state.isDisabled}
                                                        onChange={this.handleChange}
                                                        value={escalation.lowerLimit ? escalation.lowerLimit : ''} />
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        {this.state.isDisabled ?
                            null :
                            p.riskEstimationHo === VIEW_EDIT || p.riskEstimationHo === VIEW_EDIT_DELETE || p.isAdmin ?
                                <Button size="sm" color="success" type="submit">
                                    <i className="fa fa-dot-circle-o" /> Submit
                                </Button>
                                : null
                        }
                    </CardFooter>
                </Form>
            </Card >
        )
    }

}