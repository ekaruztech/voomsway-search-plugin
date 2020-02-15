import React from 'react';
import { Row, Col, Card, CardBody, Badge } from 'reactstrap';
import moment from 'moment';
import { capitalizeFirstLetter } from '../../utils/helpers';

class TransactionView extends React.Component {
  render() {
    const { data, htmlRef } = this.props;
    const {
      customer,
      amount,
      currency,
      status,
      payment_option,
      payment_date,
      transaction_type,
      user_ref,
    } = data;

    return (
      <div ref={htmlRef}>
        <Card>
          <CardBody>
            <Row className="border-bottom">
              <Col md="12" className="border-bottom p-3">
                <img
                  src="./assets/logo@2x.png"
                  alt="Voomsway logo"
                  height="36px"
                />
              </Col>
              <Col md="4" className="border-right p-3">
                <h4>Customer's Name</h4>
                {customer && (
                  <p>
                    {capitalizeFirstLetter(customer.first_name)}{' '}
                    {capitalizeFirstLetter(customer.last_name)}
                  </p>
                )}
              </Col>
              <Col md="3" className="border-right p-3">
                <h4>Amount Paid</h4>
                <p>
                  <span className="currency">{currency}</span>
                  {amount}
                </p>
              </Col>
              <Col md="5" className="p-3">
                <h4>Payment Date</h4>
                <p>
                  {payment_date
                    ? moment(payment_date).format('LL, h:mm a')
                    : null}
                </p>
              </Col>
            </Row>
            <Row>
              <Col md="3" className="border-right p-3">
                <h4>Transaction Type</h4>
                <p>{transaction_type ? transaction_type : null}</p>
              </Col>
              <Col md="3" className="border-right p-3">
                <h4>Payment Option</h4>
                <p>{payment_option ? payment_option : null}</p>
              </Col>
              <Col md="3" className="border-right p-3">
                <h4>Transaction Ref</h4>
                <p>{user_ref ? user_ref : null}</p>
              </Col>
              <Col md="3" className="p-3">
                <h4>Payment Status</h4>
                <Badge color="success">{status ? status : null}</Badge>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default TransactionView;
