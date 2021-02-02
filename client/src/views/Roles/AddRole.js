import React, { Component } from 'react';
import { getFormData } from '../../util/form';
import { addRole } from './api';
import RoleForm from './RoleForm';

class AddDepartment extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();
        const form = getFormData(e);
        addRole(form, (err, data) => {
            if (err) return;
            this.props.history.push("/roles")
        });
    }

    render() {

        return (
            <RoleForm
                title="Add Role"
                handleSubmit={this.handleSubmit}
                {...this.props} />
        )
    }
}

export default AddDepartment;
