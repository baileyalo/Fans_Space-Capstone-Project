import React, { useState}  from "react";
import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormGroup,  
  Label,
  Input,
} from 'reactstrap';
import Button from "react-bootstrap/Button";
import '../App.css';

function Login(){

  const head = {
    fontSize:40 ,
    color: "Green",
    marginLeft: 200.5,
    textAlign: "left",
    paddingTop: "5px",
    fontWeight: "bold" ,  
    fontStyle: "italic" 
        
  }
const [username, setUsername] = useState('');
const [password, setPasswordInput] = useState('');

const navigate = useNavigate();

const handleUserChange = (e) => {
  setUsername(e.target.value);
}

const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
}

const handleLoginSubmit = (e) => {
    e.preventDefault();    
    let hardcodedCred = {
      username: 'admin',
      password: 'admin123'
  }

  if ((username === hardcodedCred.username) && (password=== hardcodedCred.password)) {
      
      const token = '123456abcdef';
      sessionStorage.setItem('auth-token', token);
     
      navigate('/CreateToken');
  } else {
      //bad combination
      alert('wrong email or password combination');
  }


}
    return (
      <div  	className="App container bg-white"
				style={{ marginTop: "10px", marginBottom: "10px" , marginLeft: "30px", width: "100vh"}}
			>	
        <h2 style={head}> SIGN IN </h2>
        <Form className="form" onSubmit={handleLoginSubmit}>
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="username"
              name="username"
              id="exampleusername"
              placeholder="username"
              value={username}
              onChange={handleUserChange}
            />
         <br/>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormGroup> <br/>
          <Button variant="success" type="submit"> Submit</Button>
        </Form>
      </div>
    );
  
}

export default Login;