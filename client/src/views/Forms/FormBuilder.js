import React, { useState, useEffect } from "react";
import {
  Card,
  CardFooter,
  CardBody,
  Button,
  CardHeader,
  Input,
  FormGroup,
  Label,
  Row,
  Col,
} from "reactstrap";
import FormBuilder from "react-form-builder2";
import { editForm, getForm } from "./api/form";
import toolbarItems from "./components/ToolBarItems";
import { getId } from "../../_url";
import query from "querystring";
import HTMLFormRender from "./components/HTMLFormRender";
import { toast } from "react-toastify";

const MyFormBuilder = (props) => {
  const qs = query.parse(props.location.search);
  const formId = getId(qs["?i"]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({});
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    getForm(formId).then((form) => {
      setForm({ ...form });
      setFormData(form.formData);
      setLoading(false);
    });
  }, []); //eslint-disable-line
  const onLoad = async () => {
    setFormData(JSON.parse(formData));
    return JSON.parse(formData);
  };
  const onPost = (data) => {
    setFormData(data.task_data);
  };
  const submitForm = () => {
    const finalForm = () => {
      switch (form.type) {
        case "html":
          return {
            ...form,
            formData,
          };
        case "dynamic":
          return {
            ...form,
            formData: JSON.stringify(formData),
          };
        default:
          return form;
      }
    };
    editForm(finalForm(), (err, json) => {
      if (err) {
        toast.error("Error!!");
      } else {
        toast.success("Form Updated");
      }
    });
    props.history.push("/forms");
  };
  if (!formId) {
    props.history.push("/forms");
    return null;
  } else {
    return (
      <>
        <Card>
          <CardHeader>
            <FormGroup>
              <Label>Name</Label>
              <Input
                onChange={({ target: { value } }) => {
                  setForm({
                    ...form,
                    name: value,
                  });
                }}
                value={form.name || ""}
                type="text"
                name="name"
                placeholder="Name"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input
                onChange={({ target: { value } }) => {
                  setForm({
                    ...form,
                    description: value,
                  });
                }}
                value={form.description || ""}
                type="textarea"
                name="description"
                placeholder="Description"
                required
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  onChange={({ target: { checked } }) => {
                    setForm({
                      ...form,
                      isActive: checked,
                    });
                  }}
                  checked={form.isActive || false}
                  type="checkbox"
                  name="isActive"
                  required
                />
                Active
              </Label>
            </FormGroup>
          </CardHeader>
          {loading ? (
            <CardBody>
              <h1 className="blink_me">Loading ...</h1>
            </CardBody>
          ) : (
            <CardBody>
              {form.type === "html" ? (
                <Row>
                  <Col>
                    <Input
                      style={{ minHeight: 400 }}
                      type="textarea"
                      value={formData}
                      onChange={({ target: { value } }) => {
                        setFormData(value);
                      }}
                    />
                  </Col>
                  <Col>
                    <HTMLFormRender formData={formData} />
                  </Col>
                </Row>
              ) : null}
              {form.type === "dynamic" ? (
                <FormBuilder.ReactFormBuilder
                  toolbarItems={toolbarItems}
                  onLoad={onLoad}
                  onPost={onPost}
                />
              ) : null}
            </CardBody>
          )}
          <CardFooter>
            <Button
              onClick={() => window.history.back()}
              type="button"
              size="sm"
              color="info"
              className="mx-2 text-white"
            >
              Cancel
            </Button>
            <Button onClick={submitForm} size="sm" color="success">
              Submit
            </Button>
          </CardFooter>
        </Card>
      </>
    );
  }
};

export default MyFormBuilder;
