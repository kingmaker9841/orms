import React, { useState, useEffect } from "react";
import AddForm from "./components/AddForm";
import {
  Button,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import { VIEW_EDIT, VIEW_EDIT_DELETE } from "../Roles/util";
import { getHash } from "../../_url";
import { getForms, deleteForm, addForm } from "./api/form";
import { getFormData } from "../../util";
import { toast } from "react-toastify";

const FormList = (props) => {
  const [isAdd, setIsAdd] = useState(false);
  const [forms, setForms] = useState([]);
  const p = props.permissions || {};

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getForms((err, data) => {
      if (err) console.log("Error!");
      else setForms(data);
    });
  };

  const onDeleteForm = (formId) => {
    if (window.confirm("Do you want to remove this form?")) {
      deleteForm(formId, (err, json) => {
        if (err) {
          toast.error("Error");
        } else {
          toast.success(json);
        }
        getData();
      });
    }
  };

  const onAddForm = (e) => {
    e.preventDefault();
    const form = getFormData(e);
    addForm(form, (err, data) => {
      if (err) {
        toast.err("Error");
      } else {
        toast.success("Form Added successfully!");
      }
      setIsAdd(false);
      getData();
    });
  };

  return (
    <>
      <AddForm
        isOpen={isAdd}
        onSubmit={onAddForm}
        close={() => setIsAdd(false)}
      />
      {p.form === VIEW_EDIT || p.form === VIEW_EDIT_DELETE ? (
        <Button
          className="m-3"
          size="sm"
          color="success"
          onClick={() => setIsAdd(true)}
        >
          Create New Form
        </Button>
      ) : (
        ""
      )}
      <Row>
        {forms.map((form) =>
          form.isActive ||
          p.form === VIEW_EDIT ||
          p.form === VIEW_EDIT_DELETE ? (
            <Col md={4} sm={6} key={form.id}>
              <Card>
                <CardHeader>
                  {form.name}{" "}
                  {form.isActive ? null : (
                    <span className="badge badge-warning text-white">
                      Inactive
                    </span>
                  )}
                </CardHeader>
                <CardBody
                  className="pb-2"
                  style={{ height: 100, overflow: "hidden" }}
                >
                  {form.description}
                </CardBody>
                <CardFooter>
                  {p.form === VIEW_EDIT_DELETE ? (
                    <Button
                      title="Delete"
                      onClick={() => onDeleteForm(form.id)}
                      className="float-right mx-1"
                      size="sm"
                      color="danger"
                    >
                      <i className="fa fa-trash text-white" />
                    </Button>
                  ) : null}
                  {p.form === VIEW_EDIT || p.form === VIEW_EDIT_DELETE ? (
                    <Link
                      title="Edit"
                      to={"/forms/builder" + "?i=" + getHash(form.id)}
                      className="float-right mx-1 btn btn-sm btn-info"
                    >
                      <i className="fa fa-edit text-white" />
                    </Link>
                  ) : null}
                  {form.isActive ? (
                    <Link
                      title="View"
                      to={"/forms/view" + "?i=" + getHash(form.id)}
                      className="float-right mx-1 btn btn-sm btn-success"
                    >
                      <i className="fa fa-upload text-white" />
                    </Link>
                  ) : null}
                </CardFooter>
              </Card>
            </Col>
          ) : null
        )}
      </Row>
    </>
  );
};

export default FormList;
