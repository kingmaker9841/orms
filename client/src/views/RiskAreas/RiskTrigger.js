import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Table,
  Label,
  Button,
} from "reactstrap";

const RiskTrigger = (props) => {
  const riskTriggers = props.riskTriggers;
  return (
    <Card>
      <CardHeader className="font-weight-bold">Risk Triggers</CardHeader>
      <CardBody>
        <Table>
          <tbody>
            {riskTriggers.map((riskTrigger, indx) => {
              return (
                <tr key={indx}>
                  <td>
                    <Label htmlFor={"trigger-" + indx}>
                      <strong>{indx + 1}</strong>
                    </Label>
                  </td>
                  <td>
                    <Input
                      id={"trigger-" + indx}
                      key={indx}
                      valid
                      name={indx}
                      value={riskTrigger.name}
                      onChange={props.handleTriggerChange}
                      required
                    />
                  </td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => props.deleteRiskTrigger(indx)}
                    >
                      <i className="fa fa-trash" />
                    </Button>
                  </td>
                  <td>
                    <Input
                      onChange={props.handleLossDataChange}
                      type="select"
                      name="lossDatabaseCategoryId"
                      className="font-italic"
                      id={"lossData-" + indx}
                      value={
                        riskTrigger.lossDatabaseCategoryId === 4? 'people': (
                          riskTrigger.lossDatabaseCategoryId === 5? 'process': (
                            riskTrigger.lossDatabaseCategoryId === 6? 'system': (
                              riskTrigger.lossDatabaseCategoryId === 7? 'external': null
                            )
                          )
                        )
                      }
                    >
                      <option value="">Select</option>
                      <option value="people" >People</option>
                      <option value="process" >Process</option>
                      <option value="system" >System</option>
                      <option value="external" >External</option>
                    </Input>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </CardBody>
      <CardFooter>
        <Button
          color="info"
          className="font-weight-bold text-white"
          onClick={props.addRiskTrigger}
        >
          +
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RiskTrigger;
