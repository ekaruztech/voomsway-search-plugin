import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row, FormGroup, Input, Label, Alert } from 'reactstrap';
import axiosInstance from '../../utils/axios';
import { charterUrl } from '../../utils/helpers';

const Charter = props => {
  const defaultFormValues = {
    email: '',
    first_name: '',
    last_name: '',
    mobile: '',
    no_of_vehicle: 0
  };

  const [ charterFormValues, setCharterFormValues ] = useState(defaultFormValues);
  const [ error, setError ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ showError, setShowError ] = useState(false);
  console.log('charterFormValues :', charterFormValues);

  const onChange = event => {
    const { name, value } = event.target;
    if (name === 'no_of_vehicle' && (value === 0 || value < 0)) return;
    setCharterFormValues({ ...charterFormValues, [name]: value });
  };

  const { email, first_name, last_name, mobile, no_of_vehicle } = charterFormValues;

  const fetchResources = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      setShowError(false);
      await axiosInstance.post(charterUrl, charterFormValues);
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
        <Row xs="1" md="5">
          <Col>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" placeholder="enter email" onChange={onChange} value={email} />
            </FormGroup>
          </Col>
          <Col>
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
          <Col>
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
          <Col>
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
          <Col>
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
        <Row>
          <Col className="vm-charter-submit-btn-container">
            {
              loading ? <div className="vm-charter-loading-wrap">
                <p>loading ...</p>
              </div> :
              showError && (
                <Alert
                  color={

                      error ? 'danger' :
                      'success'
                  }
                >
                  {renderErrorMessage()}
                </Alert>
              )}
            <div className="vm-charter-submit-btn-wrap">
              <button
                type="submit"
                className="vm-submit-btn"
                disabled={loading || !email || !first_name || !last_name || !mobile || no_of_vehicle === 0}
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

Charter.propTypes = {};

export default Charter;
