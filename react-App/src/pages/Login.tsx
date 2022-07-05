
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, FormControlProps, Modal } from 'react-bootstrap';
import AuthContext, { AuthContextType } from '../context/AuthContext';


const Login = () => {
  //state variables for form data
  const auth = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [username, setUsername] = useState('');
  const [userpass, setUserpass] = useState('');


  const [error, setError] = useState();

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    setUsername(e.target.value);
  };
  const handleChangeUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    setUserpass(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formValid = true;
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
    else {
      formValid = true;
      setUsernameError('');
      setPasswordError('');
    }
    if (formValid) {
      let config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let data = {
        uname: username,
        password: userpass,
      };

      try {
        axios.defaults.baseURL = 'http://localhost:3000'
        //console.log(axios.defaults.baseURL);
        const response = await axios.post(
          '/login', data, config
        );
        console.log(response);
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        auth.login();
        navigate('/');
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
          <Modal.Title>Login</Modal.Title>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="glyphicon glyphicon-user">Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username  " name='uname' value={username} onChange={handleChangeUsername}
              />
              
            </Form.Group>
            {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" name='password' value={userpass} onChange={handleChangeUserPassword}
              />
            </Form.Group>
            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="primary" type="submit" value='Login'>
              Login
            </Button>
          </Form></Modal.Body>
        <Modal.Footer>

          Not a member? <Link to='/register'>Register here</Link>
          Forgot <Link to='#'> Password? </Link>

        </Modal.Footer>
      </Modal.Dialog>
    </>
  );
};

export default Login;

// function decode(token: any): any {
//   throw new Error('Function not implemented.');
// }
