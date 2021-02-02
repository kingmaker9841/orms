import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHash } from "../../_url";
import { getForms } from "./api/form";
import { Table, Button } from "reactstrap";
import { deleteFormReport } from "./api/formView";
import { toast } from "react-toastify";

const FormReport = (props) => {
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getForms((err, data) => {
      if (err) return;
      else setFormList(data);
    });
  };

  const deleteReport = (id) => {
    deleteFormReport(id, (err, json) => {
      if (err) {
        toast.error("Error!!");
      } else {
        toast.success(json);
      }
      getData();
    });
  };

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th>Form Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formList.map((formList) =>
            formList.hasReport ? (
              <tr>
                <td>
                  <Link to={"/report/view/" + "?i=" + getHash(formList.id)}>
                    {formList.name}
                  </Link>
                </td>
                <td>{formList.description}</td>
                <td>
                  <Button
                    onClick={() => deleteReport(formList.id)}
                    title="Delete"
                    size="sm"
                    color="danger"
                  >
                    <i className="fa fa-trash" />
                  </Button>
                </td>
              </tr>
            ) : (
              ""
            )
          )}
        </tbody>
      </Table>
    </>
  );
};

export default FormReport;
