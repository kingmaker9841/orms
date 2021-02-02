import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Input, Table, Label, Button } from "reactstrap";

const RiskTracedBy = props => {
  const riskTracedBy = props.riskTracedBy;

  return (
    <Card>
      <CardHeader className="font-weight-bold">
        Traced By
      </CardHeader>
      <CardBody>
        <Table>
          <tbody>
            {riskTracedBy.map((tracedBy, indx) => {
              return (
                <tr key={indx}>
                  <td>
                    <Label htmlFor={"tracedBy-" + indx}>
                      <strong>{indx + 1}</strong>
                    </Label>
                  </td>
                  <td>
                    <Input
                      id={"tracedBy-" + indx}
                      key={indx}
                      valid
                      name={indx}
                      value={tracedBy.name}
                      onChange={props.handleRiskTracedByChange}
                      required />
                  </td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => props.deleteRiskTracedBy(indx)}>
                      <i className="fa fa-trash" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </CardBody>
      <CardFooter>
        <Button color="info" className="font-weight-bold text-white" onClick={props.addRiskTracedBy}>
          +
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RiskTracedBy;
