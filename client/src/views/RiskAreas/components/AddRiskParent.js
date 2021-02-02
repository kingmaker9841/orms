import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { getFormData } from "../../../util/form";
import { addRiskAreaParent } from "../api/risk_parent";
import { toast } from "react-toastify";

const AddRiskParent = (props) => {
  const submit = (e) => {
    e.preventDefault();
    const formData = getFormData(e);
    addRiskAreaParent(formData, (err, json) => {
      if (err) {
        toast.error("Error");
      } else {
        props.toggleAdd();
        props.updateData();
        toast.success("Done");
      }
    });
  };
  return (
    <Modal isOpen={props.isAdd} toggle={props.toggleAdd}>
      <ModalHeader>Add</ModalHeader>
      <ModalBody>
        <Form onSubmit={submit}>
          <FormGroup>
            <Label>Name</Label>
            <Input type="text" name="name" required />
          </FormGroup>
          <FormGroup>
            <Label>Code</Label>
            <Input type="text" name="code" required />
          </FormGroup>
          <FormGroup>
            <Label>Active</Label>
            <Input
              type="select"
              name="isActive"
              id="isActive"
              disabled={
                !props.permissions.isApprover || !props.permissions.isApprover
              }
              required
            >
              <option value="false">Inactive</option>
              <option value="true">Active</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Button size="sm" color="success">
              Submit
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddRiskParent;
