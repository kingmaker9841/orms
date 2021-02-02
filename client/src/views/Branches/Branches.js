import React, { Component } from "react";
import { toast } from "react-toastify";
import { Input, Label, FormGroup, Button } from "reactstrap";
import {
  Card,
  CardBody,
  CardFooter,
  Col,
  Row,
  Table,
  CardHeader,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { getBranches, getProvinces, editProvinceBranch } from "./api";
import { getFormData } from "../../util/form";
import _ from "lodash";
import moment from "moment";

class Branches extends Component {
  state = {
    branches: [],
    provinces: [],
    selectedProvince: null,
    dropdownOpen: false,
    sortColumn: { path: "branch", order: "asc" },
    searchQuery: "",
    unAllocatedBranches: []
  };

  componentDidMount() {
    getBranches((err, branches) => {
      if (err) return;

      this.setState({
        branches: branches
      });
    });
    getProvinces((err, provinces) => {
      if (err) return;
      this.setState({
        provinces: provinces
      });
    });
  }

  toggle = () => {
    const dropdownOpen = this.state.dropdownOpen;
    this.setState({ dropdownOpen: !dropdownOpen });
  };

  onItemSelect = provinceNo => {
    this.setState({ selectedProvince: provinceNo ? provinceNo : "" });
  };

  handleAllSelect = () => {
    this.setState({
      selectedProvince: ""
    });
  };

  //onSort
  onSort = path => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };

  renderSortIcon = column => {
    const { sortColumn } = this.state;

    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  handleSearchQuery = query => {
    this.setState({ searchQuery: query.target.value });
  };

  handleSelect = e => {
    this.setState({ selectedBranch: e.target.value });
  };

  addBranchToProvince = async e => {
    e.preventDefault();
    const form = getFormData(e);
    const branchId = Number(form.branchId);
    const provinces = this.state.provinces.map(p => {
      if (this.state.selectedProvince === p.id) {
        p.province_to_branches.push({
          provinceId: p.id,
          branchId: branchId
        });
      }
      return p;
    });

    let filteredBranches = this.state.unAllocatedBranches.filter(
      p => Number(p.id) === Number(this.state.selectedBranch)
    );
    filteredBranches = await filteredBranches.map(d => d.id);

    const unAllocatedBranches = this.state.unAllocatedBranches.filter(
      p => p.id !== filteredBranches[0]
    );

    this.setState({
      provinces: provinces,
      unAllocatedBranches
    });
  };
  //handle submit of the branches to the province
  handleSubmit = e => {
    e.preventDefault();
    editProvinceBranch(this.state.provinces, (err, data) => {
      if (err) return;
      toast.success("Success !");
    });
  };

  handleFilter = () => {
    const arr1 = [];
    const arr2 = [];
    this.state.provinces.forEach(data => {
      data.province_to_branches.forEach(element => arr1.push(element.branchId));
    });

    this.state.branches.forEach(data => arr2.push(data.id));
    const unAllocatedBranches = arr2.filter(data => !arr1.includes(data));
    const fBranch = this.state.branches.filter(data =>
      unAllocatedBranches.includes(data.id)
    );

    this.setState({ unAllocatedBranches: fBranch });
  };

  handleRemove = async e => {
    const provinces = this.state.provinces;
    const arr1 = [];
    arr1.push(e.id);
    this.state.provinces.map(p => {
      return (p = _.remove(p.province_to_branches, obj =>
        arr1.includes(obj.branchId)
      ));
    });
    this.setState({ provinces });
    const unAllocatedBranches = this.state.unAllocatedBranches;
    unAllocatedBranches.push(e);
    this.setState({ unAllocatedBranches });
  };

  render() {
    const { branches, searchQuery } = this.state;
    const p = this.props.permissions;
    let province = this.state.provinces.filter(p =>
      p.id === this.state.selectedProvince ? 1 : 0
    )[0];
    let filtered = branches;

    if (searchQuery) {
      filtered = branches.filter(
        m =>
          m.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.address.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    //selected province
    const selProv = this.state.provinces.filter(
      province => this.state.selectedProvince === province.id
    );
    const selPro = selProv.map(p => p.name);
    const provinces = _.orderBy(this.state.provinces, ["id"], ["asc"]);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="2">
                    <Dropdown
                      isOpen={this.state.dropdownOpen}
                      toggle={this.toggle}
                    >
                      <DropdownToggle caret onClick={this.handleFilter}>
                        Province
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={this.handleAllSelect}>
                          All Province
                        </DropdownItem>
                        {provinces.map(data => {
                          return (
                            <DropdownItem
                              key={data.id}
                              onClick={() => this.onItemSelect(data.id)}
                              className={
                                data.id === this.state.selectedProvince
                                  ? "active"
                                  : ""
                              }
                            >
                              {data.name ? data.name : ""}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </Dropdown>
                  </Col>
                  <Col xs="2">
                    <Input disabled value={selPro ? selPro : "All"} />
                  </Col>
                  <Col></Col>
                  {branches ? (
                    <Col xs={4}>
                      <Input
                        type="text"
                        aria-label="Search"
                        placeholder="Search"
                        className="mr-0"
                        value={this.state.searchQuery}
                        onChange={this.handleSearchQuery}
                      />
                    </Col>
                  ) : (
                      ""
                    )}
                </Row>
              </CardHeader>
              <CardBody className="mt-0">
                <Table responsive className="mt-0" bordered striped>
                  <thead>
                    <tr>
                      <th>Branch Name</th>
                      <th
                        onClick={() => this.onSort("")}
                        style={{ cursor: "pointer" }}
                      >
                        Date registered {this.renderSortIcon()}
                      </th>
                      <th
                        onClick={() => this.onSort("address")}
                        style={{ cursor: "pointer" }}
                      >
                        Address {this.renderSortIcon()}
                      </th>
                      <th style={{ width: "30px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((branch, idx) => {
                      let found = false;
                      if (province) {
                        //eslint-disable-next-line
                        for (const p2b of province.province_to_branches) {
                          if (p2b.branchId === branch.id) {
                            found = true;
                            break;
                          }
                        }
                      } else {
                        found = true;
                      }

                      if (found) {
                        return (
                          <tr key={idx}>
                            <td>{branch.name}</td>
                            <td>
                              {moment(branch.createdAt).format("MMM Do YY")}
                            </td>
                            <td>{branch.address}</td>
                            <td>
                              {this.state.selectedProvince && p.isApprover && p.isAdmin ? (
                                <Button
                                  size="sm"
                                  color="danger"
                                  onClick={() => this.handleRemove(branch)}
                                >
                                  <i
                                    className="fa fa-minus-circle"
                                    aria-hidden="true"
                                  ></i>
                                </Button>
                              ) : null}
                            </td>
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tbody>
                </Table>
                {this.state.selectedProvince && p.branch >= 2 ? (
                  <form className="row" onSubmit={this.addBranchToProvince}>
                    <Col>
                      <FormGroup>
                        <Label for="branch">
                          <strong>Add Branches</strong>
                        </Label>
                        <Input
                          type="select"
                          name="branchId"
                          required
                          onChange={this.handleSelect}
                        >
                          <option value="">--Please select a branch--</option>
                          {this.state.unAllocatedBranches.map(branch => (
                            <option key={branch.id} value={branch.id}>
                              {branch.name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col xs={3}>
                      <Button
                        size="md"
                        type="submit"
                        color="danger"
                        className="mt-4"
                      >
                        {" "}
                        +
                      </Button>
                    </Col>
                  </form>
                ) : null}
              </CardBody>
              {p.branch >= 2 ? (
                <CardFooter>
                  {this.state.selectedProvince &&
                    //  eslint-disable-next-line
                    this.state.unAllocatedBranches != '' ? (
                      <Button color="success" onClick={this.handleSubmit}>
                        <i className="fa fa-dot-circle-o" /> Submit
                    </Button>
                    ) : (
                      ""
                    )}
                </CardFooter>
              ) : null}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Branches;
