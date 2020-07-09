import React, { useState } from 'react';
import {
  Col,
  Container,
  Row,
  FormGroup,
  Input,
  Label,
  Alert,
} from 'reactstrap';
import axiosInstance from '../../utils/axios';
import { charterUrl } from '../../utils/helpers';

const Charter = props => {
  const defaultFormValues = {
    email: '',
    first_name: '',
    last_name: '',
    mobile: '',
    no_of_vehicle: 0,
    pick_up: '',
    note: '',
  };

  const [charterFormValues, setCharterFormValues] = useState(defaultFormValues);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const onChange = event => {
    const { name, value } = event.target;
    if (name === 'no_of_vehicle' && (value === 0 || value < 0)) return;
    setCharterFormValues({ ...charterFormValues, [name]: value });
  };

  const {
    email,
    first_name,
    last_name,
    mobile,
    no_of_vehicle,
    pick_up,
    note,
  } = charterFormValues;

  const fetchResources = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      setShowError(false);
      await axiosInstance.post(charterUrl, charterFormValues);
      console.log(charterFormValues);
      setError(false);
      setLoading(false);
      setShowError(true);
      setCharterFormValues(defaultFormValues);
    } catch (error) {
      console.log('error :', error);
      setError(true);
      setLoading(false);
      setShowError(true);
    }
  };

  const renderErrorMessage = () => {
    let message =
      'Your request is successful, Check email for further notification or login to view request log and track progress. ';

    if (error) message = 'Some problem with the server, please try again.';

    return message;
  };
  return (
    <form className="vm-charter-form" onSubmit={fetchResources}>
      <Container fluid>
        <Row>
          <Col sm="1" md="3">
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="enter email"
                onChange={onChange}
                value={email}
              />
            </FormGroup>
          </Col>
          <Col sm="1" md="9">
            <Row>
              <Col sm="1" md="3">
                <FormGroup>
                  <Label for="first_name">First Name</Label>
                  <Input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="Enter your first name"
                    onChange={onChange}
                    value={first_name}
                  />
                </FormGroup>
              </Col>
              <Col sm="1" md="3">
                <FormGroup>
                  <Label for="last_name">Last Name</Label>
                  <Input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Enter your last name"
                    onChange={onChange}
                    value={last_name}
                  />
                </FormGroup>
              </Col>
              <Col sm="1" md="3">
                <FormGroup>
                  <Label for="mobile">Mobile</Label>
                  <Input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    placeholder="Enter mobile number"
                    onChange={onChange}
                    value={mobile}
                  />
                </FormGroup>
              </Col>
              <Col sm="1" md="3">
                <FormGroup>
                  <Label for="no_of_vehicle">Number of Vehicle</Label>
                  <Input
                    type="number"
                    name="no_of_vehicle"
                    id="no_of_vehicle"
                    placeholder="Enter number of vehicle"
                    onChange={onChange}
                    value={no_of_vehicle}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm="1" md="6">
            <FormGroup>
              <Input
                type="textarea"
                name="pick_up"
                id="pick_up"
                placeholder="Enter pickup"
                onChange={onChange}
                value={pick_up}
              />
            </FormGroup>
          </Col>
          <Col sm="1" md="6">
            <FormGroup>
              <Input
                type="textarea"
                name="note"
                id="note"
                placeholder="Write a short note here. Tell us more on what you expect"
                onChange={onChange}
                value={note}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="vm-charter-submit-btn-container">
            {loading ? (
              <div className="vm-charter-loading-wrap">
                <p>loading ...</p>
              </div>
            ) : (
              showError && (
                <Alert color={error ? 'danger' : 'success'}>
                  {renderErrorMessage()}
                </Alert>
              )
            )}
            <div className="vm-charter-submit-btn-wrap">
              <button
                type="submit"
                className="vm-submit-btn"
                disabled={
                  loading ||
                  !email ||
                  !note ||
                  !first_name ||
                  !last_name ||
                  !mobile ||
                  no_of_vehicle === 0
                }
              >
                Submit
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </form>
  );
};

export default Charter;
