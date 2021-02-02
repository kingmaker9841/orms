import React, { Component } from 'react';
import { getFormData, loadDataInsideForm } from '../../util/form';
import { getDepartment, getDepartments, editDepartment } from './api';
import DepartmentForm from './DepartmentForm';
import { getId } from '../../_url';

const formId = "edit-department-form";
class EditDepartment extends Component {

    state = {
        id: null,
        department: {},
        departments: [],
    }

    componentDidMount() {
        const id = getId(this.props.match.params.id);
        if (!Number(id)) {
            this.props.history.push("/departments");
            return;
        }
        getDepartment(id, (err, json) => {
            if (err) return;
            this.setState({ department: json.data }, () => {
                loadDataInsideForm(this.state.department);
            });
        });
        getDepartments((err, departments) => {
            if (err) return;
            this.setState({ departments: departments });
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const form = { ...this.state.department, ...getFormData(e) };
        if (!form.parent) {
            form.level = 0;
        } else {
            const [parentId, level] = form.parent.split("-");
            form.parentId = parentId;
            form.level = Number(level) + 1;
            delete form.parent;
        }
        editDepartment(form, (err, data) => {
            if (err) return;
            this.props.history.push("/departments")
        });
    }

    render() {
        return (
            <DepartmentForm
                title="Edit Department"
                formId={formId}
                department={this.state.department}
                handleSubmit={this.handleSubmit}
                departments={this.state.departments}
                {...this.props} />
        )
    }
}

export default EditDepartment;