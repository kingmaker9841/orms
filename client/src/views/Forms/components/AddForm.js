import React from "react";
import {
  Modal,
  ModalHeader,
  Form,
  Input,
  Button,
  ModalBody,
  FormGroup,
  Label,
} from "reactstrap";

const AddForm = (props) => {
  return (
    <Modal isOpen={props.isOpen}>
      <ModalHeader toggle={props.close}>Add Form</ModalHeader>
      <ModalBody>
        <Form onSubmit={props.onSubmit}>
          <FormGroup>
            <Label>Name</Label>
            <Input type="text" name="name" placeholder="Name" required />
          </FormGroup>
          <FormGroup>
            <Label>Tag</Label>
            <Input type="text" name="tag" placeholder="Tag" required />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="textarea"
              name="description"
              placeholder="Description"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Type</Label>
            <Input type="select" name="type" placeholder="Type" required>
              <option value="dynamic">Dynamic</option>
              {/* <option value="html">HTML</option> */}
            </Input>
          </FormGroup>
          <Button size="sm" type="submit" color="success">
            Submit
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddForm;
