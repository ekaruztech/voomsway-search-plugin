import React, { Fragment, useState, useRef } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { savePDF } from '@progress/kendo-react-pdf';
import ReactToPrint from 'react-to-print';
import TransactionView from './TransactionView';
import axiosInstance from '../../utils/axios';

class PDFService {
  createPdf = (html, companyName = 'Voomsway Innovations Limited') => {
    savePDF(html, {
      scale: 1.0,
      paperSize: 'Letter',
      fileName: 'transaction.pdf',
      repeatHeaders: true,
      margin: '10mm',
      title: 'manifest',
      date: new Date(),
      producer: companyName,
      creator: companyName,
      author: companyName,
    });
  };
}

const Ticket = ({ settings }) => {
  const [ticketNo, setTicketNo] = React.useState('');
  const [transaction, setTransaction] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [modal, setModal] = useState(false);

  const componentRef = useRef();
  const htmlRef = useRef();

  const Doc = new PDFService();
  const createPdf = () => Doc.createPdf(htmlRef.current);

  const toggle = () => {
    setModal(!modal);
    if (!modal) fetchResources();
  };

  const onChange = event => {
    setTicketNo(event.target.value);
  };

  const root = document.getElementById('voomsway-search-root');
  const apiClientKey = root.dataset.apiClientKey;

  const requestString = `/transactions/${ticketNo}/verifyByRef/Booking?apiClientKey${apiClientKey ||
    process.env
      .REACT_APP_CLIENT_KEY}&population=[{"path": "transaction_objects", "populate": [{"path": "trip"}] }, {"path": "account"}, {"path": "customer"}, {"path": "trip"}]`;

  const fetchResources = async () => {
    try {
      setLoading(true);
      const transactionResult = await axiosInstance.get(requestString);
      setTransaction(transactionResult.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setTransaction(null);
    }
  };

  const renderModal = () => (
    <div>
      <Modal isOpen={modal} toggle={toggle} className="vm-modal modal-lg">
        <ModalHeader toggle={toggle} />
        <ModalBody>
          <TransactionView
            account={settings}
            data={transaction}
            ref={componentRef}
            htmlRef={htmlRef}
            loading={loading}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className="pull-right "
            color="primary"
            onClick={() => createPdf()}
          >
            Download to Pdf
          </Button>
          <ReactToPrint
            trigger={() => (
              <Button className="pull-right mr-3 btn-dark">
                Print receipt
              </Button>
            )}
            content={() => htmlRef.current}
            bodyClass="style"
          />
        </ModalFooter>
      </Modal>
    </div>
  );

  return (
    <Fragment>
      <Container fluid>
        <Row className="vm-ticket-container">
          <Col md="12" lg="5" className="input-container">
            <label htmlFor="" className="">
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
              onClick={toggle}
              disabled={!ticketNo || !settings}
            >
              Search Ticket
            </button>
          </Col>
        </Row>
      </Container>
      {renderModal()}
    </Fragment>
  );
};

Ticket.propTypes = {
  // ticketFieldWidth: PropTypes.string.isRequired
};

export default Ticket;
