import React, { Component } from 'react';
import { getFormData } from '../../util/form';
import { getDepartments, addDepartment } from './api';
import DepartmentForm from './DepartmentForm';

class AddDepartment extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        departments: []
    }

    componentDidMount() {
        getDepartments((err, departments) => {
            if (err) return;
            this.setState({ departments: departments });
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const form = getFormData(e);
        if (!form.parent) {
            form.level = 0;
        } else {
            const [parentId, level] = form.parent.split("-");
            form.parentId = parentId;
            form.level = Number(level) + 1;
            delete form.parent;
        }
        addDepartment(form, (err, data) => {
            if (err) return;
            this.props.history.push("/departments")
        });
    }

    render() {

        return (
            <DepartmentForm
                title="Add Department"
                handleSubmit={this.handleSubmit}
                departments={this.state.departments}
                {...this.props} />
        )
    }
}

export default AddDepartment;
