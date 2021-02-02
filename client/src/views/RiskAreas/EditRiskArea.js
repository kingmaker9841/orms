import React, { Component } from "react";
import { loadDataInsideForm } from "../../util/form";
import { getRiskArea, editRiskArea, getLikelihoodAndImpacts } from "./api";
import RiskAreaForm from "./RiskAreaForm";
import { getId } from "../../_url";

const formId = "edit-risk-area-form";
class ViewRiskArea extends Component {
  state = {
    id: null,
    riskArea: {},
    isEdit: true,
    likelihoods: [],
    impacts: [],
    baseUnits: [],
  };

  componentDidMount() {
    const id = getId(this.props.match.params.id);
    if (!Number(id)) {
      this.props.history.push("/risk-areas");
      return;
    }
    getLikelihoodAndImpacts((err, data) => {
      if (err) return;
      this.setState(data);
    });
    getRiskArea(id, (err, data) => {
      if (err) return;
      this.setState(
        {
          riskArea: data,
          instanceVisible: data.risk_area_likelihood_instance_rules.length > 0,
        },
        () => {
          loadDataInsideForm(this.state.riskArea);
        }
      );
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("submit-button-risk-area-form").disabled = true;
    const form = this.state.riskArea;
    editRiskArea(form, (err, data) => {
      if (err) return;
      window.location.reload();
    });
  };

  handleRiskAreaChange = (e) => {
    const riskArea = this.state.riskArea;
    riskArea[e.target.name] = e.target.value;
    this.setState({ riskArea: riskArea });
  };

  // HANDLE CHANGE MAIN
  handleChangeRiskRule = (e) => {
    const riskArea = this.state.riskArea;
    const name = e.target.name;
    const value = String(e.target.value).split(",").join("");
    const [type, riskParticularIndex, likOrImp, lowOrUp, itemId] = name.split(
      "-"
    );
    if (type === "range") {
      riskArea.risk_area_particulars = riskArea.risk_area_particulars.map(
        (r, index) => {
          const riskParticular = r;
          if (index === Number(riskParticularIndex)) {
            if (likOrImp === "likelihood") {
              let flagFound = false;
              riskParticular.risk_area_likelihood_rules = riskParticular.risk_area_likelihood_rules.map(
                (lik) => {
                  const likelihood = lik;
                  if (Number(likelihood.likelihoodId) === Number(itemId)) {
                    flagFound = true;
                    if (lowOrUp === "lower") {
                      likelihood.lowerLimit = value;
                    } else if (lowOrUp === "upper") {
                      likelihood.upperLimit = value;
                    }
                  }
                  return likelihood;
                }
              );
              if (!flagFound) {
                riskParticular.risk_area_likelihood_rules.push({
                  riskAreaParticularId: Number(riskParticular.id),
                  likelihoodId: itemId,
                  lowerLimit: lowOrUp === "lower" ? value : null,
                  upperLimit: lowOrUp === "upper" ? value : null,
                });
              }
            } else if (likOrImp === "impact") {
              let flagFound = false;
              riskParticular.risk_area_impact_rules = riskParticular.risk_area_impact_rules.map(
                (impact) => {
                  if (Number(impact.impactId) === Number(itemId)) {
                    flagFound = true;
                    if (lowOrUp === "lower") {
                      impact.lowerLimit = value;
                    } else if (lowOrUp === "upper") {
                      impact.upperLimit = value;
                    }
                  }
                  return impact;
                }
              );
              if (!flagFound) {
                riskParticular.risk_area_impact_rules.push({
                  riskAreaParticularId: Number(riskParticular.id),
                  impactId: itemId,
                  lowerLimit: lowOrUp === "lower" ? value : null,
                  upperLimit: lowOrUp === "upper" ? value : null,
                });
              }
            }
          }
          return riskParticular;
        }
      );
    }
    if (type === "instance") {
      let flagFound = false;
      riskArea.risk_area_likelihood_instance_rules = riskArea.risk_area_likelihood_instance_rules.map(
        (riskInstanceRule) => {
          if (
            likOrImp === "likelihood" &&
            riskInstanceRule.likelihoodId === Number(itemId)
          ) {
            flagFound = true;
            if (lowOrUp === "lower") {
              riskInstanceRule.lowerLimit = value;
            }
            if (lowOrUp === "upper") {
              riskInstanceRule.upperLimit = value;
            }
          }
          return riskInstanceRule;
        }
      );
      if (!flagFound) {
        riskArea.risk_area_likelihood_instance_rules.push({
          riskAreaId: Number(riskArea.id),
          likelihoodId: Number(itemId),
          lowerLimit: lowOrUp === "lower" ? value : null,
          upperLimit: lowOrUp === "upper" ? value : null,
        });
      }
    }
    this.setState({
      riskArea: riskArea,
    });
  };

  // ADD RISK AREA PARTICULAR TABLE
  addRiskAreaParticularTable = (e) => {
    const riskArea = this.state.riskArea;
    const type = document.getElementById("type").value;
    if (type === "range") {
      riskArea.risk_area_particulars.push({
        name: "",
        type: "range",
        riskAreaId: riskArea.id,
        risk_area_likelihood_rules: [],
        risk_area_impact_rules: [],
      });
    } else if (type === "instance") {
      if (this.state.instanceVisible) {
        window.alert("You cannot have multiple instance tables");
      } else {
        this.setState({
          instanceVisible: true,
        });
      }
    }
    this.setState({
      riskArea: riskArea,
    });
  };

  deleteRiskParticularTable = (type, index) => {
    const riskArea = this.state.riskArea;
    if (type === "range") {
      riskArea.risk_area_particulars = riskArea.risk_area_particulars.filter(
        (r, i) => (i === Number(index) ? 0 : 1)
      );
    } else if (type === "instance") {
      if (index) {
        riskArea.risk_area_particulars = riskArea.risk_area_particulars.filter(
          (r, i) => (i === Number(index) ? 0 : 1)
        );
      } else {
        riskArea.risk_area_particulars = riskArea.risk_area_particulars.filter(
          (r, i) => (r.type === type ? 0 : 1)
        );
        riskArea.risk_area_likelihood_instance_rules = [];
        this.setState({
          instanceVisible: false,
        });
      }
    }
    this.setState({
      riskArea: riskArea,
    });
  };

  // RISK TRACED BY
  addRiskTracedBy = (e) => {
    e.preventDefault();
    const riskArea = this.state.riskArea;
    const riskTracedBy = riskArea.risk_area_traced_bies;
    riskTracedBy.push({
      name: "",
      riskAreaId: riskArea.id,
    });
    this.setState({ riskArea });
  };

  deleteRiskTracedBy = (indx) => {
    const riskArea = { ...this.state.riskArea };
    const riskTracedBy = riskArea.risk_area_traced_bies;
    if (indx !== -1) {
      riskTracedBy.splice(indx, 1);
      this.setState({ riskArea });
    }
  };

  handleRiskTracedByChange = (e) => {
    const riskArea = this.state.riskArea;
    const index = e.target.name;
    const value = e.target.value;
    riskArea.risk_area_traced_bies = riskArea.risk_area_traced_bies.map(
      (riskTracedBy, i) => {
        if (i === Number(index)) {
          riskTracedBy.name = value;
        }
        return riskTracedBy;
      }
    );
    this.setState({ riskArea });
  };

  // RISK TRIGGER
  addRiskTrigger = (e) => {
    e.preventDefault();
    const riskArea = this.state.riskArea;
    const riskTrigger = riskArea.risk_area_triggers;
    riskTrigger.push({
      name: "",
      riskAreaId: riskArea.id,
    });
    this.setState({ riskArea });
  };

  handleLossDataChange = (e) => {
    const riskArea = this.state.riskArea;
    console.log("riskArea.risk_area_triggers", riskArea.risk_area_triggers);
    console.log("id", e.target.id);
    const [name, id] = e.target.id.split("-");
    riskArea.risk_area_triggers = riskArea.risk_area_triggers.map((triggers, idx) => {
      if (Number(id) === idx) {
        triggers[name] = e.target.value;
        return triggers;
      }
      return triggers;
    });
    this.setState({ riskArea });
  };

  handleTriggerChange = (e) => {
    const riskArea = this.state.riskArea;
    const index = e.target.name;
    const value = e.target.value;
    riskArea.risk_area_triggers = riskArea.risk_area_triggers.map(
      (trigger, i) => {
        if (i === Number(index)) {
          trigger.name = value;
        }
        return trigger;
      }
    );
    this.setState({ riskArea });
  };

  deleteRiskTrigger = (indx) => {
    const riskArea = this.state.riskArea;
    const riskTrigger = riskArea.risk_area_triggers;
    if (indx !== -1) {
      riskTrigger.splice(indx, 1);
      riskArea.risk_area_triggers = riskTrigger;
      this.setState({ riskArea });
    }
  };

  // RISK PARTICULAR NAME CHANGE
  handleRiskParticularNameChange = (e) => {
    const riskArea = this.state.riskArea;
    const [name, index] = e.target.name.split("-");
    const value = e.target.value;
    riskArea.risk_area_particulars = riskArea.risk_area_particulars.map(
      (particular, i) => {
        if (Number(index) === i) {
          particular[name] = value;
          return particular;
        }
        return particular;
      }
    );
    this.setState({
      riskArea: riskArea,
    });
  };

  //RISK PARTICULAR PROP CHANGE
  handleRiskParticularPropChange = (e) => {
    const riskArea = this.state.riskArea;
    const [name, index] = e.target.name.split("-");
    const value = e.target.value;
    riskArea.risk_area_particulars = riskArea.risk_area_particulars.map(
      (particular, i) => {
        if (Number(index) === i) {
          particular[name] = value;
          return particular;
        }
        return particular;
      }
    );
    this.setState({
      riskArea: riskArea,
    });
  };

  // HANDLE ADD IMPACT INSTANCES
  handleAddImpact = (impactId) => {
    const riskArea = this.state.riskArea;
    riskArea.risk_area_particulars.push({
      name: "",
      type: "instance",
      riskAreaId: riskArea.id,
      risk_area_likelihood_rules: [],
      risk_area_impact_rules: [
        {
          impactId: Number(impactId),
        },
      ],
    });
    this.setState({
      riskArea: riskArea,
    });
  };

  render() {
    return (
      <RiskAreaForm
        title="Edit Risk Area"
        formId={formId}
        isEdit={this.state.isEdit}
        // MAIN
        riskArea={this.state.riskArea}
        handleRiskAreaChange={this.handleRiskAreaChange}
        handleSubmit={this.handleSubmit}
        // RISK TRACED BY
        addRiskTracedBy={this.addRiskTracedBy}
        deleteRiskTracedBy={this.deleteRiskTracedBy}
        handleRiskTracedByChange={this.handleRiskTracedByChange}
        // RISK TRIGGER
        addRiskTrigger={this.addRiskTrigger}
        deleteRiskTrigger={this.deleteRiskTrigger}
        handleTriggerChange={this.handleTriggerChange}
        handleLossDataChange={this.handleLossDataChange}
        // RISK PARTICULAR
        handleRiskParticularNameChange={this.handleRiskParticularNameChange}
        handleRiskParticularPropChange={this.handleRiskParticularPropChange}
        handleChangeRiskRule={this.handleChangeRiskRule}
        // ADD IMPACT INSTANCE
        handleAddImpact={this.handleAddImpact}
        instanceVisible={this.state.instanceVisible}
        //Add RANGE or INSTANCE
        addRiskAreaParticularTable={this.addRiskAreaParticularTable}
        deleteRiskParticularTable={this.deleteRiskParticularTable}
        // LIKELIHOODS and IMPACTS
        likelihoods={this.state.likelihoods ? this.state.likelihoods : []}
        impacts={this.state.impacts ? this.state.impacts : []}
        baseUnits={this.state.baseUnits ? this.state.baseUnits : []}
        {...this.props}
      />
    );
  }
}

export default ViewRiskArea;
