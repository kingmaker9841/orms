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
import { getRiskAreas, deleteRiskArea } from "./api";
import { getHash, getId } from "../../_url";
import { VIEW_EDIT, VIEW_EDIT_DELETE } from "../Roles/util";

class RiskAreas extends Component {
  state = {
    riskAreas: [],
  };

  handleDelete = (id) => {
    if (
      window.confirm(
        "Do you want to delete the Risk Area? The action is irreversible!"
      )
    ) {
      deleteRiskArea(id, (err, data) => {
        if (err) return;
        window.location.reload();
      });
    }
  };

  componentDidMount() {
    const riskParentId = getId(this.props.match.params.riskParentId);
    getRiskAreas({ riskAreaParentId: riskParentId }, (err, riskAreas) => {
      if (err) return;
      this.setState({
        riskAreas: riskAreas,
      });
    });
  }

  render() {
    const p = this.props.permissions ? this.props.permissions : {};
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-layer-group"></i> RiskAreas
              </CardHeader>
              <CardBody className="table-responsive">
                <Table>
                  <thead>
                    <tr>
                      <th>S.N.</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Created</th>
                      <th>Updated</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.riskAreas.map((riskArea, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{riskArea.name}</td>
                        <td>{riskArea.risk_area_parent.name}</td>
                        <td>{riskArea.updatedAt}</td>
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
                            <Link
                              className="btn btn-info btn-sm text-white mr-2"
                              to={"/risk-areas/edit/" + getHash(riskArea.id)}
                            >
                              <i className="fa fa-edit" />
                            </Link>
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

export default RiskAreas;
