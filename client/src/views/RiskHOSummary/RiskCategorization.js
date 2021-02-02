import React from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Form, Table, Input } from 'reactstrap';
import { getRiskCategories, editRiskCategories } from './api';
import { VIEW_EDIT, VIEW_EDIT_DELETE } from '../Roles/util';

export default class RiskCategorization extends React.Component {

    state = {
        isDisabled: true,
        riskCategories: [],
    }

    handleChange = e => {
        const [name, index] = e.target.name.split("-");
        const value = e.target.value;
        const riskCategories = this.state.riskCategories.map((r, i) => {
            if (i === Number(index)) {
                r[name] = value;
            }
            return r;
        });
        this.setState({ riskCategories: riskCategories });
    }

    handleSubmit = e => {
        e.preventDefault();
        editRiskCategories({
            riskCategories: this.state.riskCategories,
        }, (err, message) => {
            if (err) return;
            window.location.reload();
        });
    }

    handleAdd = () => {
        const riskCategories = this.state.riskCategories;
        riskCategories.push({
            name: '',
            lowerLimit: '',
            upperLimit: '',
        });
        this.setState({ riskCategories: riskCategories });
    }

    handleDelete = index => {
        const riskCategories = this.state.riskCategories.filter((r, idx) => idx === index ? 0 : 1);
        this.setState({ riskCategories: riskCategories });
    }

    updateData() {
        getRiskCategories((err, data) => {
            if (err) return;
            this.setState({
                riskCategories: data,
            });
        });
    }

    componentDidMount() {
        this.updateData();
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
                        Risk Categorization
                    </CardHeader>
                    <CardBody>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Lower Limit</th>
                                    <th>Upper Limit</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.riskCategories.map((r, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>
                                                <Input disabled={this.state.isDisabled} name={"name-" + idx} value={r.name} onChange={this.handleChange} />
                                            </td>
                                            <td>
                                                <Input disabled={this.state.isDisabled} name={"lowerLimit-" + idx} type="number" value={r.lowerLimit} onChange={this.handleChange} />
                                            </td>
                                            <td>
                                                <Input disabled={this.state.isDisabled} name={"upperLimit-" + idx} type="number" value={r.upperLimit} onChange={this.handleChange} />
                                            </td>
                                            <td>
                                                {this.state.isDisabled ? null :
                                                    p.riskEstimationHo === VIEW_EDIT_DELETE || p.isAdmin ?
                                                        <Button size="sm" color="danger" onClick={() => this.handleDelete(idx)}>
                                                            <i className="fa fa-trash" />
                                                        </Button>
                                                        : null
                                                }
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        {this.state.isDisabled ? null :
                            p.riskEstimationHo === VIEW_EDIT || p.riskEstimationHo === VIEW_EDIT_DELETE || p.isAdmin ?
                                <Button className="text-white" size="sm" color="warning" type="button" onClick={this.handleAdd}>
                                    +
                                </Button>
                                : null}
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
        );
    }

}