import React from "react";
import { Col, Row, Table, Input } from "reactstrap";
import { populateLikelihoodTable, populateImpactTable } from "./util";

const RiskRuleRange = props => {
  const riskParticular = props.riskParticular;
  const index = props.index;
  return (
    <Row>
      <Col lg={6}>
        <Table
          striped
          responsive>
          <thead>
            <tr>
              <th style={{ minWidth: '150px' }}>Likelihood</th>
              <th style={{ minWidth: '150px' }}>Lower Limit</th>
              <th style={{ minWidth: '150px' }}>Upper Limit</th>
            </tr>
          </thead>
          <tbody>
            {props.likelihoods.map((likelihood, idx) => {
              const likelihoodRule = populateLikelihoodTable(
                riskParticular.risk_area_likelihood_rules,
                likelihood.id
              );
              return (
                <tr key={idx}>
                  <td key={likelihood.name + idx}>{likelihood.name}</td>
                  <td>
                    <Input
                      name={
                        riskParticular.type +
                        "-" +
                        index +
                        "-likelihood-lower-" +
                        likelihood.id
                      }
                      key={likelihood.id}
                      value={likelihoodRule.lowerLimit ? Number(likelihoodRule.lowerLimit).toLocaleString('en') : ''}
                      onChange={props.onChange}
                    />
                  </td>
                  <td>
                    <Input
                      name={
                        riskParticular.type +
                        "-" +
                        index +
                        "-likelihood-upper-" +
                        likelihood.id
                      }
                      key={likelihood.id}
                      value={likelihoodRule.upperLimit ? Number(likelihoodRule.upperLimit).toLocaleString('en') : ''}
                      onChange={props.onChange}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

      </Col>
      <Col lg={6}>
        <Table
          striped
          responsive>
          <thead>
            <tr>
              <th style={{ minWidth: '150px' }}>Impact</th>
              <th style={{ minWidth: '150px' }}>Lower Limit</th>
              <th style={{ minWidth: '150px' }}>Upper Limit</th>
            </tr>
          </thead>
          <tbody>
            {props.impacts.map((impact, idx) => {
              const impactRule = populateImpactTable(
                riskParticular.risk_area_impact_rules,
                impact.id
              );
              return (
                <tr key={idx}>
                  <td key={impact.name + idx}>{impact.name}</td>
                  <td key={impact.id}>
                    <Input
                      value={impactRule.lowerLimit ? Number(impactRule.lowerLimit).toLocaleString('en') : ''}
                      name={
                        riskParticular.type +
                        "-" +
                        index +
                        "-impact-lower-" +
                        impact.id
                      }
                      key={impact.id}
                      onChange={props.onChange}
                    />
                  </td>
                  <td>
                    <Input
                      value={impactRule.upperLimit ? Number(impactRule.upperLimit).toLocaleString('en') : ''}
                      name={
                        riskParticular.type +
                        "-" +
                        index +
                        "-impact-upper-" +
                        impact.id
                      }
                      key={impact.id}
                      onChange={props.onChange}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default RiskRuleRange;
