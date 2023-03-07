import React, { useState } from 'react';
import Layout from "../components/Layout";
import styled from 'styled-components';

const LoginContainer = styled.div`
  height: 100%;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 2rem;
  width: 35%;
  margin: auto;
  border-radius:10px;
  height:30%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width:70%;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  border-bottom: 2px solid #ada9a8;
  font-size: 1rem;
  outline: none;
`;

const Button = styled.button`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 0;
  font-size: 1rem;
  background: linear-gradient(to bottom, #8c8c8c, #cfcfcf, #ff8c00);
  color: #fff;
  cursor: pointer;
`;

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
    fetch(`${process.env.REACT_APP_API_URL}/user/login`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then((response)=> {
      response.json().then((data)=> {
        document.cookie = `token=${data.token}; path=/`;
        window.location.href = '/';
      })
      .catch(err=> {
        console.log("Error",err);
      })
    })
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Layout>
    <LoginContainer>
      <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          autoComplete="off"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
        />
      </FormGroup>
      <Button type="submit">Login</Button>
    </Form>
    </LoginContainer>
    </Layout>

  );
};

export default Login;
