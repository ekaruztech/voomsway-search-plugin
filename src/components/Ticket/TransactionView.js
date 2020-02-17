import React from 'react';
import { Row, Col, Card, CardBody, Badge } from 'reactstrap';
import moment from 'moment';
import { Table, Alert } from 'reactstrap';
import { capitalizeFirstLetter } from '../../utils/helpers';

class TransactionView extends React.Component {
  render () {
    const { data, htmlRef, account, loading } = this.props;
    const { customer, amount, currency, status, payment_option, payment_date, transaction_type, user_ref, trip } =
      data || {};

    const renderTravelPath = () => {
      const { source, destination, paths } = (trip && trip.travelPath) || {};
      return (
        <div>
          <div>{`${capitalizeFirstLetter(source && source.state)}, ${capitalizeFirstLetter(source && source.city)}
              -> ${capitalizeFirstLetter(destination && destination.state)}, ${capitalizeFirstLetter(
            destination && destination.city
          )}`}</div>
          <div>
            {paths &&
              paths.map(path => {
                return (
                  <span className="badge badge-pill badge-primary mr-1 mb-1" key={path._id}>{`${path.source
                    .city}-to-${path.destination.city}`}</span>
                );
              })}
          </div>
        </div>
      );
    };

    return (
      <div ref={htmlRef}>
        <Card>
          <CardBody>
            <Row>
              <Col md="12">
                {account && (
                  <div className="brand">
                    <img src={account.logo.url} width="80" alt="company logo" />
                    <h3>{account.account.basic_information.organization_name}</h3>
                  </div>
                )}
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Customer's Name</th>
                      <th>Amount Paid</th>
                      <th>Payment Date</th>
                      <th>Transaction Type</th>
                      <th>Payment Option</th>
                      <th>Transaction Ref</th>
                      <th>Payment Status</th>
                      <th>Travel Path</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      loading ? <tr>
                        <td colSpan={9}>
                          <p className="text-center">Loading ...</p>
                        </td>
                      </tr> :
                      !data ? <tr>
                        <td colSpan={9}>
                          <Alert color="info" className="text-center">
                            The transaction ID you provided does not match any booking, Please check and try again...
                          </Alert>
                        </td>
                      </tr> :
                      <tr>
                        <th scope="row">1</th>
                        <td>
                          {
                            customer ? `${capitalizeFirstLetter(customer.first_name)} ${capitalizeFirstLetter(
                              customer.last_name
                            )}` :
                            'N/A'}
                        </td>
                        <td>{`${currency} ${amount}`}</td>
                        <td>
                          {
                            payment_date ? moment(payment_date).format('LL, h:mm a') :
                            'N/A'}
                        </td>
                        <td>
                          {
                            transaction_type ? transaction_type :
                            'N/A'}
                        </td>
                        <td>
                          {
                            payment_option ? payment_option :
                            'N/A'}
                        </td>
                        <td>
                          {
                            user_ref ? user_ref :
                            'N/A'}
                        </td>
                        <td>
                          <Badge color="success">
                            {
                              status ? status :
                              'N/A'}
                          </Badge>
                        </td>
                        <td>{renderTravelPath()}</td>
                      </tr>}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default TransactionView;
