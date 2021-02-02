import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
  Table,
  Button,
} from "reactstrap";
import { getRiskAreaParents, deleteRiskAreaParent } from "./api/risk_parent";
import { getHash } from "../../_url";
import { VIEW_EDIT, VIEW_EDIT_DELETE } from "../Roles/util";
import AddRiskParent from "./components/AddRiskParent";
import EditRiskParent from "./components/EditRiskParent";

class RiskAreaParents extends Component {
  state = {
    riskAreaParents: [],
    isAdd: false,
    isEdit: false,
    riskAreaParentId: null,
  };

  handleDelete = (id) => {
    if (
      window.confirm(
        "Do you want to delete the Risk Area? The action is irreversible!"
      )
    ) {
      deleteRiskAreaParent(id, (err, data) => {
        if (err) return;
        this.updateData();
      });
    }
  };

  updateData = () => {
    getRiskAreaParents((err, riskAreaParents) => {
      if (err) return;
      this.setState({
        riskAreaParents: riskAreaParents,
      });
    });
  };

  componentDidMount() {
    this.updateData();
  }

  toggleAdd = () => {
    this.setState({
      isAdd: !this.state.isAdd,
    });
  };

  toggleEdit = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  render() {
    const p = this.props.permissions ? this.props.permissions : {};
    return (
      <div className="animated fadeIn">
        {p.riskArea === VIEW_EDIT ||
          p.riskArea === VIEW_EDIT_DELETE ||
          p.isAdmin ? (
            <>
              <Button
                className="mb-2"
                color="success"
                size="sm"
                onClick={this.toggleAdd}
              >
                Add Risk Category Level 1
            </Button>
              <Link className="btn btn-info btn-sm mb-2 ml-2 text-white" to="/risk-areas/add">
                Add Risk Category Level 2
            </Link>
              <Link
                className="btn btn-warning btn-sm mb-2 ml-2 text-white"
                to="/risk-areas/code"
              >
                Risk Area Codes
            </Link>
            </>
          ) : null}
        <Row>
          <AddRiskParent
            updateData={this.updateData}
            toggleAdd={this.toggleAdd}
            isAdd={this.state.isAdd}
            {...this.props}
          />
          <EditRiskParent
            updateData={this.updateData}
            toggleEdit={this.toggleEdit}
            isEdit={this.state.isEdit}
            riskAreaParentId={this.state.riskAreaParentId}
            {...this.props}
          />
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-layer-group"></i> Risk Area Parents
              </CardHeader>
              <CardBody className="table-responsive">
                <Table>
                  <thead>
                    <tr>
                      <th>S.N.</th>
                      <th>Level 1</th>
                      <th>Level 2</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.riskAreaParents.map((riskArea, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <Link to={"/risk-areas/" + getHash(riskArea.id)}>
                            {riskArea.name} ({riskArea.code})
                          </Link>
                        </td>
                        <td>
                          {riskArea.risk_areas.map((r) => (
                            <React.Fragment>
                              {p.riskArea === VIEW_EDIT ||
                                p.riskArea === VIEW_EDIT_DELETE ||
                                p.isAdmin ? (
                                  <Link to={"/risk-areas/edit/" + getHash(r.id)}>
                                    {r.name} ({r.code})
                                  </Link>
                                ) : (
                                  r.name
                                )}
                              <br />
                            </React.Fragment>
                          ))}
                        </td>
                        <td>
                          {riskArea.isActive ? (
                            <span className="text-white btn btn-sm btn-success">
                              Active
                            </span>
                          ) : (
                              <span className="text-white btn btn-sm btn-warning">
                                Inactive
                              </span>
                            )}
                        </td>
                        <td>
                          {p.riskArea === VIEW_EDIT ||
                            p.riskArea === VIEW_EDIT_DELETE ||
                            p.isAdmin ? (
                              <Button
                                className="btn btn-info btn-sm text-white mr-2"
                                onClick={() =>
                                  this.setState({
                                    isEdit: true,
                                    riskAreaParentId: riskArea.id,
                                  })
                                }
                              >
                                <i className="fa fa-edit" />
                              </Button>
                            ) : null}
                          {p.riskArea === VIEW_EDIT_DELETE || p.isAdmin ? (
                            <Button
                              size="sm"
                              color="danger"
                              onClick={() => this.handleDelete(riskArea.id)}
                            >
                              <i className="fa fa-trash" />
                            </Button>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RiskAreaParents;
