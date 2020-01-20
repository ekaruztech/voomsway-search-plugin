import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

const Ticket = props => {
  const [ticketNo, setTicketNo] = React.useState('');

  const onChange = event => {
    setTicketNo(event.target.value);
  };

  const checkTicket = () => {
    if (ticketNo) {
      window.location.href = `${window.location.origin}/vway/trips/receipt/${ticketNo}`;
    }
  };

  return (
    <Container fluid>
      <Row className="vm-ticket-container">
        <Col md="12" lg="5" className="input-container">
          <label
            htmlFor=""
            className=""
          >
            Booking Reference
          </label>
          <input
            name="ticket-number"
            type="text"
            onChange={onChange}
            placeholder="Type in here"
            value={ticketNo}
            className="input-control"
          />
        </Col>

        <Col className="vm-ticket-submit-btn-wrap">
          <button
            type="submit"
            className="vm-submit-btn"
            onClick={checkTicket}
            disabled={!ticketNo}
          >
            Search Ticket
          </button>
        </Col>
      </Row>
    </Container>
  );
};

Ticket.propTypes = {
  // ticketFieldWidth: PropTypes.string.isRequired
};

export default Ticket;
