import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  // Form Validation
  const form = useRef(null);
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const checkFormValidity = () => {
    const formFields = form.current.elements;
    let isValid = true;

    for (let i = 0; i < formFields.length; i++) {
      if (formFields[i].required && formFields[i].value.trim() === '') {
        isValid = false;
        break;
      }
    }
    setSubmitDisabled(!isValid);
  };

// Email Validation
const checkFormEmail = () => {
  const emailInput = form.current.elements.user_email;
  const emailValue = emailInput.value.trim();

  if (emailValue && /^\S+@\S+\.\S+$/.test(emailValue)) {
   return true;
  } else if (emailValue && !/^\S+@\S+\.\S+$/.test(emailValue)) {
    // You can use a more robust email validation regex here.
    return false;
  }

};

  // User Feedback on Submit
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div className="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    alertPlaceholder.append(wrapper)
  }
  

// Email Sending func from Email.js
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_kce3qj8', 'template_ly42cay', form.current, 'Ydor8Sa-i_rkpp1N-')
      .then((result) => {
        console.log(result.text);
        console.log('message sent!');

      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <div className="main-content-2 container p-5 ">
      <div className="row ">
        <div className=" col-md-6 align-self-top">
          <h2 className='lemme-know text-left'>Let me know if you'd like to get in touch!</h2>
        </div>
      </div>
      <div className='row'>
        <div className="col-md-6">
          <div className='py-2'>

            <form ref={form} onSubmit={sendEmail}>
              <div className='form-group'>
                <label className='d-block py-1 cust-form'>Name</label>
                <input className='form-control' type="text" name="user_name" required onChange={checkFormValidity}/>
              </div>
              <div className='form-group'>
                <label className='d-block py-1 cust-form'>Email</label>
                <input className='form-control' type="email" name="user_email" required onChange={checkFormValidity}/>
              </div>
              <div className='form-group'>
                <label className='d-block py-1 cust-form'>Message</label>
                <textarea className='form-control' name="message" required onChange={checkFormValidity}/>
              </div>
              <input id="liveAlertBtn" className='d-block btn btn-dark mt-2 mb-5 custom-btn ' type='submit' value='Send' disabled={isSubmitDisabled} onClick={() =>  checkFormEmail() ? appendAlert('Email sent, thank you so much!', 'success') : appendAlert('Please Check Your Email!', 'danger')} />
            </form>
            <div id="liveAlertPlaceholder"></div>
          </div>
        </div>

        <div className='resume col-md-6 right-column ps-5 pb-4'>
          <div className='d-flex resume-mobile justify-content-center'>
            <div className=' text-center'>
              <a href='https://drive.google.com/file/d/1HlaUy4XvOPrr71nVoHc6f0C318e-93Z9/view?usp=sharing' target='_none' className='resume'>
                <svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' fill='currentColor' className='bi bi-file-earmark-arrow-down' viewBox='0 0 16 16'>
                  <path d='M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z' />
                  <path d='M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z' />
                </svg>
              </a>
              <a href='https://drive.google.com/file/d/1HlaUy4XvOPrr71nVoHc6f0C318e-93Z9/view?usp=sharing' target='_none' className='resume'>
                <h3 className=' pt-3'>
                  My Resume
                </h3>
              </a>
              <a className='resume' href='https://drive.google.com/file/d/1HlaUy4XvOPrr71nVoHc6f0C318e-93Z9/view?usp=sharing' target='_none'>(It's a Google Drive link)</a>
            </div>
          </div>
          <div className=' justify-content-center pt-5  icon-container'>
            <a className='hvr-float contact-icons' href='https://www.linkedin.com/in/arian-rezvani' target='_blank' rel='noreferrer'>
              <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' fill='currentColor' className='bi bi-linkedin me-2' viewBox='0 0 16 16'>
                <path d='M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z' />
              </svg>
            </a>
            <a className='hvr-float contact-icons' href='https://github.com/Servbt' target='_blank' rel='noreferrer'>
              <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' fill='currentColor' className='bi bi-github me-2 custom-link' viewBox='0 0 16 16'>
                <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
              </svg>
            </a>
            <a className='hvr-float contact-icons' href='https://2ubootcampnetwork.slack.com/team/U0428GK7U3H' target='_blank' rel='noreferrer'>
              <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' fill='currentColor' className='bi bi-slack m-1 custom-link' viewBox='0 0 16 16'>
                <path d='M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z' />
              </svg>
            </a>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ContactUs;