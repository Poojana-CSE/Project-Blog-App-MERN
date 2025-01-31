import React, { useState } from 'react';
import HeadMain from '../../HeadMain';
import Footer from '../../Footer';
import './SubscribePage.css';
const SubscribePage = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleFeedbackChange = (e) => setFeedback(e.target.value);
  const handleClick = () => {
    if (email && feedback) {
      const subject = "Subscription Confirmation";
      const body = `Thank you for subscribing to our service!\n\nFeedback:\n${feedback}`;
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    } else {
      alert('Please provide both email and feedback.');
    }
  };
  return (
    <div className="subpage-container">
      <HeadMain />
      <h2 className="subpage-heading">Subscribe Here!</h2>
      <div className="subpage-input-group">
        <label className="subpage-label">Email: </label>
        <input
          type="email"
          className="subpage-input"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="subpage-input-group">
        <label className="subpage-label">Feedback: </label>
        <textarea
          className="subpage-textarea"
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Enter your feedback"
          required
        />
      </div>
      <button className="subpage-button" onClick={handleClick}>Send Email via Gmail</button>
      <Footer />
    </div>
  );
};

export default SubscribePage;
