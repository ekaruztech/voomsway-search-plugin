import React from "react";
import PropTypes from "prop-types";

const Ticket = props => {
  const { ticketFieldWidth } = props;
  const [ticketNo, setTicketNo] = React.useState("");

  const onChange = event => {
    setTicketNo(event.target.value);
  };

  const checkTicket = () => {
    if (ticketNo) {
      window.location.href = `${window.location.origin}/vway/trips/receipt/${ticketNo}`;
    }
  };

  return (
    <div className="vm-ticket-section">
      <div className={ticketFieldWidth}>
        <input
          name="ticket-number"
          type="text"
          onChange={onChange}
          placeholder="Enter Booking Code"
          value={ticketNo}
          className="text-field-input"
        />
      </div>

      <div className={ticketFieldWidth}>
        <button
          type="submit"
          className="vm-btn-primary"
          onClick={checkTicket}
          disabled={!ticketNo}
        >
          Search
        </button>
      </div>
    </div>
  );
};

Ticket.propTypes = {
  ticketFieldWidth: PropTypes.string.isRequired
};

export default Ticket;
