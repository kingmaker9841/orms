import React, { Component } from 'react';
import { getFormData } from '../../util/form';
import { addRiskArea } from './api';
import RiskAreaForm from './RiskAreaForm';

class AddRiskArea extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        riskAreas: []
    }

    handleSubmit = e => {
        e.preventDefault();
        const form = getFormData(e);
        addRiskArea(form, (err, data) => {
            if (err) return;
            this.props.history.push("/risk-areas")
        });
    }

    render() {

        return (
            <RiskAreaForm
                title="Add Risk Area"
                handleSubmit={this.handleSubmit}
                riskAreas={this.state.riskAreas}
                {...this.props} />
        )
    }
}

export default AddRiskArea;
