import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  color: #333;
  position: relative; // Added to position the close button
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
`;

const PhoneInputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const CountryCode = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem;
  background: #f5f5f5;
  border-right: 1px solid #ddd;
  
  img {
    width: 24px;
    margin-right: 8px;
  }
`;

const PhoneInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: none;
  font-size: 1rem;
  
  &:focus {
    outline: none;
  }
`;

const ContinueButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #E74C3C;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  opacity: ${props => props.disabled ? 0.7 : 1};
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.disabled ? '#E74C3C' : '#C0392B'};
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: #666;
  
  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #ddd;
  }
  
  span {
    padding: 0 1rem;
  }
`;

const SocialLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const TermsText = styled.p`
  font-size: 0.8rem;
  color: #666;
  text-align: center;
  margin-top: 1.5rem;
  
  a {
    color: #E74C3C;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const OTPContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin: 1rem 0;
`;

const OTPInput = styled.input`
  width: 40px;
  height: 40px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1.2rem;
  
  &:focus {
    outline: none;
    border-color: #E74C3C;
  }
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  color: #E74C3C;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const EmailInputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  background: #ffffff;
  padding: 0;
  height: 48px;
`;

const EmailInput = styled.input`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0.8rem;
  border: none;
  font-size: 1rem;
  background: transparent;
  color: #333;
  
  &:focus {
    outline: none;
    border-color: #E74C3C;
  }

  &::placeholder {
    color: #999;
  }
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  text-align: center;
  margin: 1rem 0;
  font-size: 1rem;
  font-weight: 500;
`;

function AuthModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const handleContinue = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/generate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setShowOTP(true);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP');
    }
  };

  const handleOTPChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOtp(newOTP);
      
      // Auto-focus next input
      if (value && index < 5) {  // Changed from 3 to 5
        const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/generate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      alert('Failed to resend OTP');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const enteredOTP = otp.join('');
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          otp: enteredOTP
        }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setVerificationSuccess(true);
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userEmail', email); // Store user email
        if (onLogin) {
          onLogin(true); // Notify parent component about successful login
        }
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Failed to verify OTP');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CloseButton onClick={onClose}>✕</CloseButton>
            <Title>Sign up/Login now to</Title>
            {!showOTP ? (
              <>
                <form onSubmit={handleContinue}>
                  <EmailInputContainer>
                    <EmailInput
                      type="email"
                      placeholder="Enter Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      autoFocus
                    />
                  </EmailInputContainer>
                  <ContinueButton 
                    type="submit" 
                    disabled={!email || !email.includes('@')}
                  >
                    CONTINUE
                  </ContinueButton>
                </form>

                <Divider>
                  <span>Or Login/Signup With</span>
                </Divider>

                <SocialLoginContainer>
                  <SocialButton>
                  <img src="https://cdn-icons-png.flaticon.com/512/720/720255.png"  alt="Google" />
                  </SocialButton>
                  <SocialButton>
                    <img src="https://cdn-icons-png.flaticon.com/512/724/724664.png"  alt="Email" />
                  </SocialButton>
                </SocialLoginContainer>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Title>Enter OTP</Title>
                <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  We've sent an OTP to {email}
                </p>
                <OTPContainer>
                  {otp.map((digit, index) => (
                    <OTPInput
                      key={index}
                      type="text"
                      maxLength={1}
                      name={`otp-${index}`}
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                    />
                  ))}
                </OTPContainer>
                {verificationSuccess && (
                  <SuccessMessage>OTP Verified Successfully!</SuccessMessage>
                )}
                <ContinueButton 
                  onClick={handleVerifyOTP}
                  disabled={otp.some(digit => !digit) || verificationSuccess}
                >
                  VERIFY
                </ContinueButton>
                <ResendButton onClick={handleResendOTP}>
                  Resend OTP
                </ResendButton>
              </motion.div>
            )}

            <TermsText>
              By proceeding, you agree to our{' '}
              <a href="/privacy">Privacy Policy</a>,{' '}
              <a href="/user-agreement">User Agreement</a> and{' '}
              <a href="/terms">T&Cs</a>
            </TermsText>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}

export default AuthModal;