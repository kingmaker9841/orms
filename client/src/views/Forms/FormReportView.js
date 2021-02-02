import React, { useEffect, useState } from "react";
import { getFormReport } from "./api/formView";
import query from "querystring";
import { getId } from "../../_url";
import { Table, Card, CardHeader, CardBody, Label } from "reactstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import _ from "lodash";

const FormReportView = (props) => {
  const [form, setForm] = useState({});
  const [formData, setFormData] = useState([]);
  const [formReport, setFormReport] = useState([]);

  const tableHeaderName = [];

  useEffect(() => {
    const qs = query.parse(props.location.search);
    const id = getId(qs["?i"]);
    getData(id);
  }, []);

  const getData = (id) => {
    getFormReport(id, (err, data) => {
      if (err) return;
      else {
        const { form, formReport } = data;
        if (form.type === "dynamic") {
          const formData = JSON.parse(form.formData);
          setFormData(formData);
        }
        setForm(form);
        setFormReport(formReport);
      }
    });
  };

  const getValue = (rowItem) => {
    let value = "";
    if (form.type === "dynamic") {
      const name = rowItem.name;
      const formValue = JSON.parse(rowItem.value);
      if (formValue.length === 1) {
        const fieldObject = _.find(formData, { field_name: name });
        formValue.map((item) => {
          const radioValue = _.find(fieldObject.options || [], { key: item });
          value += radioValue.text;
        });
      } else {
        value = formValue;
      }
    } else {
      value = rowItem.value.slice(1, -1);
    }
    return value;
  };

  const splitKey = (key) => {
    let string = String.fromCharCode(Number(key.charCodeAt(0)) - 32);
    for (let i = 1; i < key.length; i++) {
      if (key.charCodeAt(i) < 97) {
        string += " ";
      }
      string += key.charAt(i);
    }
    return string;
  };

  const reportValues = formReport[0] ? formReport[0].form_report_values : "";

  if (form.type === "dynamic") {
    _.sortBy(formData, "field_name").map((headerName) => {
      tableHeaderName.push(headerName.label);
    });
  }

  return !formReport[0] ? (
    ""
  ) : (
    <>
      <Card>
        <CardHeader className="bg-light">
          <div className="float-right">
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              table="reportTable"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Download"
              className="btn btn-sm btn-primary text-white"
            />
          </div>
          <div>
            <h5>
              <strong>
                {" "}
                <i className="icon-chart"></i> Form Report
              </strong>
            </h5>
          </div>
        </CardHeader>
        <CardHeader>
          <div className="ml-4">
            <Label>
              <strong>Name:</strong> {form.name}
            </Label>
            <br />
            <Label>
              <strong>Description:</strong> {form.description}
            </Label>
          </div>
        </CardHeader>
        <CardBody>
          <Table responsive id="reportTable" className="table-bordered">
            <thead>
              {form.type === "dynamic" ? (
                <tr>
                  {tableHeaderName.map((name) => (
                    <th>{name}</th>
                  ))}
                </tr>
              ) : (
                <tr>
                  {reportValues.map((value) => (
                    <th>{splitKey(value.name)}</th>
                  ))}
                </tr>
              )}
            </thead>
            <tbody>
              {formReport.map((values) => (
                <tr>
                  {_.sortBy(values.form_report_values, "name").map(
                    (rowItem) => (
                      <td>{getValue(rowItem)}</td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
};

export default FormReportView;
