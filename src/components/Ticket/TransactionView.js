import React from 'react';
import { Row, Col, Card, CardBody, Alert, Badge } from 'reactstrap';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { capitalizeFirstLetter } from '../../utils/helpers';
import 'react-tabs/style/react-tabs.scss';
import './ticket.scss';

class TransactionView extends React.Component {
  render() {
    const { data, htmlRef, account, loading } = this.props;
    console.log(data);
    const {
      customer,
      amount,
      currency,
      status,
      payment_option,
      payment_date,
      transaction_type,
      transaction_objects,
      user_ref,
      trip,
    } = data || {};

    const renderTravelPath = () => {
      const { source, destination, paths } = (trip && trip.travelPath) || {};
      return (
        <div>
          <div>{`${capitalizeFirstLetter(
            source && source.state
          )}, ${capitalizeFirstLetter(source && source.city)}
              -> ${capitalizeFirstLetter(
                destination && destination.state
              )}, ${capitalizeFirstLetter(
            destination && destination.city
          )}`}</div>
          <div>
            {paths &&
              paths.map(path => {
                return (
                  <span
                    className="badge badge-pill badge-primary mr-1 mb-1"
                    key={path._id}
                  >{`${path.source.city}-to-${path.destination.city}`}</span>
                );
              })}
          </div>
        </div>
      );
    };

    return (
      <div ref={htmlRef}>
        <Card className="shadow border-0 card-width mx-auto">
          <CardBody>
            <Row>
              <Col md="12">
                {account && (
                  <div className="brand text-center mt-3 mb-4">
                    <img src={account.logo.url} width="50" alt="company logo" />
                    <h5>
                      {account.account.basic_information.organization_name}
                    </h5>
                    <p className="border border-muted mx-1 mt-4"></p>
                  </div>
                )}
                {loading ? (
                  <div>
                    <p className="text-center">Loading ...</p>
                  </div>
                ) : !data ? (
                  <div>
                    <Alert color="info" className="text-center">
                      The transaction ID you provided does not match any
                      booking, Please check and try again...
                    </Alert>
                  </div>
                ) : (
                  <Row>
                    <Col md="12">
                      <p className="float-left mb-2 paraFont">
                        Customer's Name:
                      </p>
                      {customer ? (
                        <span className="spanFont float-right">
                          {capitalizeFirstLetter(customer.first_name)}{' '}
                          {capitalizeFirstLetter(customer.last_name)}
                        </span>
                      ) : null}
                    </Col>
                    <Col md="12">
                      <p className="float-left mb-2 paraFont"> Email:</p>
                      {customer ? (
                        <span className="spanFont float-right">
                          {capitalizeFirstLetter(customer.email)}{' '}
                        </span>
                      ) : null}
                    </Col>
                    <Col md="12">
                      <p className="float-left paraFont">Reference:</p>
                      <span className=" spanFont float-right">{user_ref}</span>
                    </Col>
                    <Col md="12">
                      <p className="float-left paraFont"> Seat no: </p>
                      <span className="float-right spanFont">
                        {transaction_objects?.[0]?.seats
                          ? transaction_objects[0].seats.map(item => (
                              <span
                                className="badge badge-pill badge-dark mr-1"
                                key={item}
                              >
                                {item}{' '}
                              </span>
                            ))
                          : null}
                      </span>
                    </Col>
                    <Col md="12">
                      <p className="float-left paraFont"> Payment Date: </p>
                      <span className="float-right spanFont">
                        {payment_date
                          ? moment(payment_date).format('DD-MM-YYYY h:mm a')
                          : null}
                      </span>
                    </Col>
                    <Col md="12">
                      <p className="float-left paraFont"> Payment method: </p>
                      <span className="float-right spanFont">
                        {data?.payment_information?.payment_option ? (
                          <span>{data.payment_information.payment_option}</span>
                        ) : null}
                      </span>
                    </Col>
                    <Col md="12">
                      <p className="float-left paraFont"> Payment For: </p>
                      <span className="float-right spanFont">
                        {data?.transaction_objects?.[0]?.seats ? (
                          <span>
                            {data.transaction_objects[0].seats.length} seat(s)
                          </span>
                        ) : null}
                      </span>
                    </Col>
                    <Col md="12">
                      <p className="float-left paraFont"> Trip price: </p>
                      <span className="float-right spanFont">
                        {data?.transaction_objects?.[0]?.trip_price ? (
                          <span>
                            &#8358;
                            <NumberFormat
                              value={Number(
                                data.transaction_objects[0].trip_price
                              )}
                              displayType="text"
                              thousandSeparator
                            />
                          </span>
                        ) : null}
                      </span>
                    </Col>
                    <Col md="12">
                      <p className="float-left paraFont"> Cost: </p>
                      <span className="float-right spanFont">
                        {data?.transaction_objects?.[0] ? (
                          <span>
                            {data.transaction_objects[0].seats?.length} seats{' '}
                            <i className="fa fa-times text-muted" />{' '}
                            <span>&#8358;</span>
                            {data.transaction_objects[0].trip_price}
                          </span>
                        ) : null}
                      </span>
                    </Col>
                    <Col md="12">
                      <p className="float-left paraFont"> Coupon code: </p>
                      <span className="float-right spanFont">
                        {data?.transaction_objects?.[0].coupon ? (
                          <span>{data.transaction_objects[0].coupon}</span>
                        ) : (
                          <span>None</span>
                        )}
                      </span>
                      <p className="border border-muted mx-3 mt-5"></p>
                    </Col>
                    <Col md="12">
                      <p className="float-left paraFont"> Departure: </p>
                      {data?.trip?.travelPath?.source ? (
                        <span className="float-right spanFont">
                          {data.trip.travelPath.source.city},{' '}
                          {data.trip.travelPath.source.state}
                        </span>
                      ) : null}
                    </Col>
                    <Col md="12">
                      <p className="float-left paraFont"> Arrival: </p>
                      {data?.trip?.travelPath?.destination ? (
                        <span className="float-right spanFont">
                          {data.trip.travelPath.destination.city},{' '}
                          {data.trip.travelPath.destination.state}
                        </span>
                      ) : null}
                    </Col>
                    <Col md="12">
                      <p className="float-left paraFont"> Departure time: </p>
                      {data?.trip?.departureTime ? (
                        <span className="float-right spanFont">
                          {moment(data.trip.departureTime).format(
                            'DD-MM-YYYY h:mm a'
                          )}
                        </span>
                      ) : null}
                    </Col>
                    <Col md="12">
                      <p className="float-left paraFont"> Original cost: </p>
                      {data?.transaction_objects?.[0]?.actual_amount ? (
                        <span className="float-right spanFont">
                          <span>&#8358;</span>
                          <NumberFormat
                            value={Number(
                              data.transaction_objects[0].actual_amount
                            )}
                            displayType="text"
                            thousandSeparator
                          />
                        </span>
                      ) : null}
                      <p className="border border-muted mx-3 mt-5"></p>
                    </Col>
                    <Col md="12">
                      <p className="float-left paraFont"> Total: </p>
                      {data.amount ? (
                        <span className="float-right spanFont">
                          <span>&#8358;</span>
                          <NumberFormat
                            value={Number(data.amount)}
                            displayType="text"
                            thousandSeparator
                          />
                        </span>
                      ) : null}
                      <p className="border border-muted mx-3 mt-4"></p>
                    </Col>

                    <Col md="12">
                      <div className="paraFont text-center">
                        <p className="mt-2 paraFont font-weight-bold">
                          No refunds
                        </p>
                        <p className="paraFont">
                          Thank you for travelling <br /> with us
                        </p>
                      </div>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default TransactionView;
