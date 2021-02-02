import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Button,
    Col,
    Row,
    Input,
    Form,
    FormGroup,
    Label
} from 'reactstrap';

const DepartmentForm = (props) => {
    return (
        <div className="animated fadeIn">
            <Row>
                <Col lg={12}>
                    <Card>
                        <Form id={props.formId} onSubmit={props.handleSubmit}>
                            <CardHeader>
                                <strong><i className="icon-briefcase pr-2"></i>{props.title}</strong>
                            </CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label htmlFor="name">Name</Label>
                                    <Input type="text" name="name" id="name" placeholder="Enter department name" required />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="parent">Parent Department</Label>
                                    <Input type="select" name="parent" id="parent" placeholder="Select a parent department">
                                        <option value="">-- None --</option>
                                        {props.departments.map(d => {
                                            let padding = "- ";
                                            let level = d.level;
                                            while (level-- > 0) {
                                                padding += "--> ";
                                            }
                                            return (
                                                <option key={d.id} value={d.id + "-" + d.level}
                                                    selected={props.department ? props.department.parentId === d.id : false}>
                                                    {padding + d.name}
                                                </option>
                                            );
                                        })}
                                    </Input>
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                <Button className="ml-2" type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default DepartmentForm;