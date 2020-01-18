import React from 'react';
import PropTypes from 'prop-types';

const Ticket = props => {
  const { ticketFieldWidth } = props;
  const [ ticketNo, setTicketNo ] = React.useState('');

  const onChange = event => {
    setTicketNo(event.target.value);
  };

  const checkTicket = () => {
    if (ticketNo) {
      window.location.href = `${window.location.origin}/vway/trips/receipt/${ticketNo}`;
    }
  };

  return (
    <div className="vm-ticket-container">
      <div className="input-container">
        <label htmlFor="">Booking Reference</label>
        <input
          name="ticket-number"
          type="text"
          onChange={onChange}
          placeholder="Type in here"
          value={ticketNo}
          className="input-control"
        />
      </div>

      <div className="vm-ticket-submit-btn-wrap">
        <button type="submit" className="vm-submit-btn" onClick={checkTicket} disabled={!ticketNo}>
          Search Ticket
        </button>
      </div>
    </div>
  );
};

Ticket.propTypes = {
  ticketFieldWidth: PropTypes.string.isRequired
};

export default Ticket;
