import React, { useState, useEffect } from "react";
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
import { editRiskAreaParent, getRiskAreaParent } from "../api/risk_parent";
import { toast } from "react-toastify";

const EditRiskParent = (props) => {
  const [riskParent, setRiskParent] = useState({});
  useEffect(() => {
    if (props.riskAreaParentId) {
      getRiskAreaParent(props.riskAreaParentId, (err, data) => {
        if (err) {
          props.toggleEdit();
          toast.error("Error");
        } else {
          setRiskParent(data);
        }
      });
    }
  }, [props.riskAreaParentId]); //eslint-disable-line
  const submit = (e) => {
    e.preventDefault();
    editRiskAreaParent(riskParent, (err, json) => {
      if (err) {
        toast.error("Error");
      } else {
        props.toggleEdit();
        props.updateData();
        toast.success("Done");
      }
    });
  };
  return (
    <Modal isOpen={props.isEdit} toggle={props.toggleEdit}>
      <ModalHeader>Add</ModalHeader>
      <ModalBody>
        <Form onSubmit={submit}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              required
              value={riskParent.name || ""}
              onChange={({ target: { value } }) =>
                setRiskParent({ ...riskParent, name: value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>Code</Label>
            <Input
              type="text"
              name="code"
              required
              value={riskParent.code || ""}
              onChange={({ target: { value } }) =>
                setRiskParent({ ...riskParent, code: value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>Active</Label>
            <Input
              type="select"
              name="isActive"
              id="isActive"
              value={riskParent.isActive || ""}
              disabled={
                !props.permissions.isApprover || !props.permissions.isApprover
              }
              onChange={({ target: { value } }) =>
                setRiskParent({ ...riskParent, isActive: value })
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

export default EditRiskParent;
