import React from "react";
import PropTypes from "prop-types";
import "./check-ticket.scss";

const CheckTicket = props => {
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
    <div className="vm-check-ticket-section">
      <input
        name="ticket-number"
        type="text"
        onChange={onChange}
        placeholder="Enter Booking Code"
        value={ticketNo}
        className={`${ticketFieldWidth} ticket-field-input`}
      />
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

CheckTicket.propTypes = {
  ticketFieldWidth: PropTypes.string.isRequired
};

export default CheckTicket;
