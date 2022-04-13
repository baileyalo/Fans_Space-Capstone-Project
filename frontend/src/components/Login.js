import { Component } from 'react';
import {
  Form,
  FormGroup,  
  Label,
  Input,
} from 'reactstrap';
import Button from "react-bootstrap/Button";
import '../App.css';
 
class Login extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      validate: {
        usernameState: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  
 
  handleChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
 
    this.setState({
      [name]: value,
    });
  };
 
 /* validateEmail(e) {
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 
    const { validate } = this.state;
 
    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success';
    } else {
      validate.emailState = 'has-danger';
    }
 
    this.setState({ validate });
  }
 */
  submitForm(e) {
    e.preventDefault();
    console.log(`Username: ${this.state.username}`);
  }
 
  render() {
    const { username, password } = this.state;
    const head = {
      fontSize:40 ,
      color: "Green",
      marginLeft: 180,
      textAlign: "left",
      paddingTop: "5px",
      fontWeight: "bold" ,  
      fontStyle: "italic" 
          
    }
    return (
      <div  	className="App container bg-white"
				style={{ marginTop: "10px", marginBottom: "10px" , marginLeft: "30px", width: "100vh"}}
			>	
        <h2 style={head}> SIGN IN </h2>
        <Form className="form" onSubmit={(e) => this.submitForm(e)}>
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="username"
              name="username"
              id="exampleusername"
              placeholder="username"
              valid={this.state.validate.usernameState === "has-success"}
              invalid={this.state.validate.usernameState === "has-danger"}
              value={username}
              onChange={(e) => {
                //this.validateEmail(e);
                this.handleChange(e);
              }}
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
              onChange={(e) => this.handleChange(e)}
            />
          </FormGroup> <br/>
          <Button variant="success" type="submit"> Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Login;