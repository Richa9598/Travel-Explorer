import React from 'react';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import AuthContext, { AuthContextType } from '../context/AuthContext';

const Register = () => {

  const auth = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordError2, setPasswordError2] = useState('');
  const [emailError, setEmailError] = useState('');
  const [addressError, setAddressError] = useState('');

  const [username, setUsername] = useState('');
  const [userpass, setUserpass] = useState('');
  const [userpass2, setUserpass2] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const [error, setError] = useState();

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    setUsername(e.target.value);
  };
  const handleChangeUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    setUserpass(e.target.value);
  };
  const handleChangeUserPassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    setUserpass2(e.target.value);
  };
  const handleChangeUserEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    setEmail(e.target.value);
  };
  const handleChangeUserAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    setAddress(e.target.value);
  };


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formValid = true;

    let emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (username === '') {
      formValid = false;
      setUsernameError('Please enter username');
    }
    else if (userpass == '') {
      formValid = false;
      setPasswordError('Please enter password');
    }
    else if (userpass.length < 7) {
      formValid = false;
      setPasswordError('Password lenght should be minimum 7 character')
    }
    else if (userpass2 == '') {
      formValid = false;
      setPasswordError2('Please Re-enter password');
    }
    else if (userpass2.length < 7) {
      formValid = false;
      setPasswordError2('Password lenght should be minimum 7 character')
    } else if (userpass != userpass2) {
      formValid = false;
      setPasswordError2('Password does not match')
    } else if (email == '') {
      formValid = false;
      setEmailError('Please enter email')
    }
    else if (!email.match(emailPattern)) {
      formValid = false;
      setEmailError('Please enter email in valid format');
    }
    else if (address == '') {
      formValid = false;
      setAddressError('Please enter address  ')
    }
    else {
      formValid = true;
      setUsernameError('');
      setPasswordError('');
      setPasswordError2('');
      setEmailError('');
      setAddressError('');
    }

    if (formValid) {
      let config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let data = {
        username: username,
        userpass: userpass,
        email: email,
        address: address
      };
      try {
        axios.defaults.baseURL = 'http://localhost:3000'
        //console.log(axios.defaults.baseURL);
        const response = await axios.post(
          '/register', data, config
        );
        console.log(response);
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        auth.login();
        navigate('/login');
      } catch (err: any) {
        console.log(err);
        setError(err.response.data.error || 'something went wrong');
      }
    }
  };
  return (
    <>
        <Modal.Dialog >
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Modal.Body>
            <Form onSubmit={(e) => onSubmit(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="glyphicon glyphicon-user">Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username  " name='username' value={username} onChange={handleChangeUsername} />
              </Form.Group>
              {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" name='password' value={userpass} onChange={handleChangeUserPassword} />
              </Form.Group>
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

              <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" name='password2' value={userpass2} onChange={handleChangeUserPassword2} />
              </Form.Group>
              {passwordError2 && <p style={{ color: 'red' }}>{passwordError2}</p>}

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={handleChangeUserEmail} />
              </Form.Group>
              {emailError && <p style={{ color: 'red' }}>{emailError}</p>}

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label> Address</Form.Label>
                <Form.Control placeholder="1234 Main St" value={address} onChange={handleChangeUserAddress} />
              </Form.Group>
              {addressError && <p style={{ color: 'red' }}>{addressError}</p>}

              <Button variant="primary" type="submit" value='Register'>
                Register
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>

            Already registered<Link to='/login'>Login here</Link>

          </Modal.Footer>
        </Modal.Dialog>
    </>
  );
};

export default Register;
