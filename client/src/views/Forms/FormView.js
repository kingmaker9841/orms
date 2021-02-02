import React, { useState, useEffect } from "react";
import {
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  Label,
  Form,
  Button,
} from "reactstrap";
import FormBuilder from "react-form-builder2";
import query from "querystring";
import { getId } from "../../_url";
import { getForm } from "./api/form";
import HTMLFormRender from "./components/HTMLFormRender";
import { getFormData } from "../../util";
import { addFormReport } from "./api/formView";
import { toast } from "react-toastify";

const FormView = (props) => {
  const qs = query.parse(props.location.search);
  const formId = getId(qs["?i"]);
  const [form, setForm] = useState({});
  const [formData, setFormData] = useState([]);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    if (!formId) {
      props.history.push("/forms");
    } else {
      getForm(formId).then((form) => {
        setMounted(true);
        setForm({ ...form });
        switch (form.type) {
          case "html":
            setFormData(form.formData);
            break;
          case "dynamic":
            setFormData(JSON.parse(form.formData));
            break;
          default:
            console.log("Error");
            break;
        }
      });
    }
  }, []);

  const submitFormHTML = (e) => {
    e.preventDefault();
    const formData = getFormData(e);
    const formValues = Object.keys(formData).map((key) => ({
      name: key,
      // label: key.label,
      value: formData[key],
    }));
    const values = {
      formId: form.id,
      formValues: formValues,
    };
    submitForm(values);
  };

  const submitFormBuilder = (data) => {
    const formValues = data;
    const values = {
      formId: form.id,
      formValues: formValues,
    };
    submitForm(values);
  };

  const submitForm = (value) => {
    addFormReport(value, (err, json) => {
      if (err) {
        toast.error("Error!!");
      } else {
        toast.success("Form Submitted");
      }
      props.history.push("/forms");
    });
  };

  return !isMounted ? null : (
    <Card>
      <CardHeader>
        <Label>Name: {form.name}</Label>
        <br />
        <Label>Description: </Label>
        <p>{form.description}</p>
      </CardHeader>
      <CardBody>
        {form.type === "html" ? (
          <Form onSubmit={submitFormHTML}>
            <HTMLFormRender formData={formData} />
            <Button type="submit" size="sm" color="success">
              <i className="fa fa-check" /> Submit
            </Button>
          </Form>
        ) : null}
        {form.type === "dynamic" ? (
          <FormBuilder.ReactFormGenerator
            onSubmit={submitFormBuilder}
            answer_data={[]}
            data={formData}
          />
        ) : null}
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default FormView;
