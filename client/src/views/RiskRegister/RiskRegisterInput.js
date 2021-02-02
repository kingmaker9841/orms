import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAll } from "../../util/api";
import { getFormData } from "../../util/form";
import RiskRegisterEditForm from "./RiskRegisterEditForm";
import RiskRegisterInputForm from "./RiskRegisterInputForm";
import { modifyRiskParticular } from "./util";
import { animateScroll as scroll } from "react-scroll";
import { getStringId } from "../../_url";
import {
  getRiskAreaData,
  getRiskRegisters,
  addRiskRegister,
  submitRiskRegister,
} from "./api";
import { Collapse } from "reactstrap";
import moment from "moment";
import RiskRegisterTable from "./RiskRegisterTable";
import MakerBranchSummary from "./MakerBranchSummary";

const RiskRegisterInputt = (props) => {
  const [isRemarksMandatory, setIsRemarksMandatory] = useState({
    riskTrigger: true,
    tracedBy: true,
    riskAreaParticularDetail: true,
  });
  const [riskAreaCode, setRiskAreaCode] = useState();
  const [branchId, setBranchId] = useState();
  const [riskRegisters, setRiskRegisters] = useState([]);
  const [riskParticulars, setRiskParticulars] = useState([]);
  const [riskTriggers, setRiskTriggers] = useState([]);
  const [riskTracedBy, setRiskTracedBy] = useState([]);
  const [selectedRegister, setSelectedRegister] = useState({});
  const [baseUnits, setBaseUnits] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [amountTiming, setAmountTiming] = useState();
  const [financialImpact, setFinancialImpact] = useState();
  const [branches, setBranches] = useState([]);
  const p = props.permissions;
  const { length: count } = riskRegisters;

  useEffect(() => {
    const riskAreaCode = props.selectedRiskAreaCode;
    const branchId = getStringId(props.selectedBranchId);
    setBranchId(branchId);
    setRiskAreaCode(riskAreaCode);
    getAll((err, data) => {
      if (err) return;
      setBranches(data.branches);
      setBaseUnits(data.baseUnits);
    });
    getRiskAreaData(
      { riskAreaCode: riskAreaCode, branchId: branchId },
      (err, data) => {
        if (err) {
          props.history.push("/risk-register");
        } else {
          try {
            data.riskParticulars = modifyRiskParticular(data.riskParticulars);
            setRiskParticulars(data.riskParticulars);
            setRiskTriggers(data.riskTriggers);
            setRiskTracedBy(data.riskTracedBy);
          } catch (err) {
            toast.error("Oops! Something went wrong");
            props.history.push("/risk-register");
          }
        }
      }
    );
    updateData();
  }, [props.selectedBranchId, props.selectedRiskAreaCode]);

  const updateData = () => {
    const selectedRiskAreaCode = props.selectedRiskAreaCode;
    const selectedBranchId = props.selectedBranchId;
    getRiskRegisters(
      {
        riskAreaCode: selectedRiskAreaCode,
        branchId: selectedBranchId,
      },
      (err, data) => {
        if (err) toast.error("Oops! Something went wrong.");
        setRiskRegisters(data);
      }
    );
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (
      name === "riskTrigger" ||
      name === "riskAreaParticularDetail" ||
      name === "tracedBy"
    ) {
      if (value === "Others") {
        setIsRemarksMandatory({ ...isRemarksMandatory, [name]: true });
      } else {
        setIsRemarksMandatory({ ...isRemarksMandatory, [name]: false });
      }
    }
    switch (name) {
      case "riskAreaParticularDetail":
        const [
          riskParticularName,
          riskParticularCode,
          baseUnitId,
        ] = value.split("-");
        if (!riskParticularCode) {
          selectedRegister.riskAreaParticular = "";
          selectedRegister.riskAreaParticularCode = "";
          selectedRegister.baseUnitId = "";
        } else {
          selectedRegister.riskAreaParticular = riskParticularName;
          selectedRegister.riskAreaParticularCode = riskParticularCode;
          selectedRegister.baseUnitId = baseUnitId;
        }
        const baseUnit = baseUnits.filter((b) =>
          b.id === Number(baseUnitId) ? 1 : 0
        )[0];
        document.getElementById("baseUnitLabel").innerText = baseUnit
          ? baseUnit.unit
          : "";
        break;
      case "relatedStaff-0":
        let relatedStaffs = selectedRegister.relatedStaff.split("/");
        relatedStaffs[0] = value;
        let relatedStaff =
          (relatedStaffs[0] ? relatedStaffs[0] : "") +
          "/" +
          (relatedStaffs[1] ? relatedStaffs[1] : "");
        selectedRegister.relatedStaff = relatedStaff;
        break;
      case "relatedStaff-1":
        relatedStaffs = selectedRegister.relatedStaff.split("/");
        relatedStaffs[1] = value;
        relatedStaff =
          (relatedStaffs[0] ? relatedStaffs[0] : "") +
          "/" +
          (relatedStaffs[1] ? relatedStaffs[1] : "");
        selectedRegister.relatedStaff = relatedStaff;
        break;
      case "relatedStaff1":
        selectedRegister[name] = value.replace(/[0-9]/g, "");
        break;
      case "relatedStaff2":
        selectedRegister[name] = value.replace(/[0-9]/g, "");
        break;
      default:
        selectedRegister[name] = value;
        break;
    }
    if (selectedRegister.id) {
      setSelectedRegister({ ...selectedRegister });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("submit-risk-register").disabled = true;
    const form = await getFormData(e);
    form.riskAreaCode = riskAreaCode;
    const [name, code, baseUnitId] = form.riskAreaParticularDetail.split("-");
    form.riskAreaParticular = name;
    form.riskAreaParticularCode = code;
    form.amountTiming = form.amountTiming
      ? form.amountTiming.split(",").join("")
      : 0;
    form.financialImpact = form.financialImpact
      ? form.financialImpact.split(",").join("")
      : 0;
    form.baseUnitId = baseUnitId ? baseUnitId : 1; // rupees by default
    form.relatedStaff =
      form.relatedStaff2 && form.relatedStaff1
        ? form.relatedStaff1 + "/" + form.relatedStaff2
        : form.relatedStaff1 || form.relatedStaff2;

    if (moment(form.tracedDate).isSameOrAfter(form.transactionDate, "day")) {
      if (
        !form.rectificationDate ||
        moment(form.rectificationDate).isSameOrAfter(form.tracedDate, "day")
      ) {
        addRiskRegister(form, async (err, done) => {
          console.log(form);
          if (err) {
            toast.error("Error!");
            document.getElementById("submit-risk-register").disabled = false;
            return;
          }
          try {
            updateData();
            toast.success("Risk Register added successfully.");
            document.getElementById("create-course-form").reset();
            document.getElementById("submit-risk-register").disabled = false;
          } catch (ex) {
            toast.error("Some exception occurred!");
          }
        });
      } else {
        document.getElementById("submit-risk-register").disabled = false;
        toast.warn(
          "Rectification date must be later or same than traced date!"
        );
      }
    } else {
      document.getElementById("submit-risk-register").disabled = false;
      toast.warn("Traced date must be later or same than transaction date!");
    }
  };

  const handleChangeCurrency = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const currency = String(value).split(",").join("");
    if (Number(currency)) {
      if (name === "amountTiming") {
        setAmountTiming(currency);
        setSelectedRegister({ ...selectedRegister, amountTiming: currency });
      } else if (name === "financialImpact") {
        setFinancialImpact(currency);
        setSelectedRegister({ ...selectedRegister, financialImpact: currency });
      }
    } else {
      if (Number(currency) === 0) {
        if (name === "amountTiming") {
          setAmountTiming(currency);
          setSelectedRegister({ ...selectedRegister, amountTiming: currency });
        } else if (name === "financialImpact") {
          setFinancialImpact(currency);
          setSelectedRegister({
            ...selectedRegister,
            financialImpact: currency,
          });
        }
      } else {
        if (name === "amountTiming") {
          setAmountTiming("");
          setSelectedRegister({ ...selectedRegister, amountTiming: "" });
        } else if (name === "financialImpact") {
          setFinancialImpact("");
          setSelectedRegister({ ...selectedRegister, financialImpact: "" });
        }
      }
    }
  };

  const handleAllSubmit = (e) => {
    e.preventDefault();
    const filtered = [];
    riskRegisters.forEach((r) =>
      r.isChecked ? filtered.push({ id: r.id, status: r.status }) : null
    );
    submitRiskRegister(e.target.id, filtered, (isCompleted) => {
      if (isCompleted) {
        updateData();
      } else {
        toast.error("Oops! Something went wrong.");
      }
    });
  };

  const handleCheckChange = (e) => {
    const registers = riskRegisters.map((check, i) => {
      if (Number(e.target.name) === i) {
        check.isChecked = e.target.checked;
      }
      return check;
    });
    setRiskRegisters(registers);
  };

  const handleCheckAllChange = (e) => {
    const isChecked = Boolean(e.target.checked);
    const registers = riskRegisters.map((d) => {
      d.isChecked = isChecked;
      return d;
    });
    setRiskRegisters(registers);
  };

  const handleEditClick = (data) => {
    scroll.scrollTo(10);
    setIsEdit(true);
    setSelectedRegister(data);
  };

  return (
    <>
      <Collapse isOpen={isEdit}>
        {isEdit ? (
          <RiskRegisterEditForm
            handleChange={handleChange}
            updateData={updateData}
            handleChangeCurrency={handleChangeCurrency}
            toggleEdit={() => {
              setIsEdit(false);
              setSelectedRegister({});
            }}
            tracedBies={riskTracedBy}
            register={selectedRegister}
            riskParticulars={riskParticulars}
            riskTriggers={riskTriggers}
            amountTiming={amountTiming}
            financialImpact={financialImpact}
          />
        ) : null}
      </Collapse>

      <Collapse isOpen={!isEdit && (p.isMaker || p.isChecker)}>
        {!isEdit && (p.isMaker || p.isChecker) ? (
          <RiskRegisterInputForm
            {...props}
            amountTiming={amountTiming}
            financialImpact={financialImpact}
            handleChangeCurrency={handleChangeCurrency}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            riskParticulars={riskParticulars}
            riskTriggers={riskTriggers}
            riskTracedBy={riskTracedBy}
            selectedRegister={selectedRegister}
            isRemarksMandatory={isRemarksMandatory}
            register={selectedRegister}
          />
        ) : null}
      </Collapse>
      <RiskRegisterTable
        {...props}
        count={count}
        handleEditClick={handleEditClick}
        handleCheckChange={handleCheckChange}
        handleCheckAllChange={handleCheckAllChange}
        handleAllSubmit={handleAllSubmit}
        riskRegisters={riskRegisters}
        branches={branches}
        baseUnits={baseUnits}
      />
    </>
  );
};

export default RiskRegisterInputt;
