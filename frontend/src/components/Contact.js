import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Contact = () => {
  const head = {
    fontSize:40 ,
    color: "Green",
    marginLeft: 200.5,
    textAlign: "left",
    paddingTop: "5px",
    fontWeight: "bold" ,  
    fontStyle: "italic" 
        
  }
  const [status, setStatus] = useState("Submit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    let response = await fetch("https://submit-form.com/0wZE9uUu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
  };
  return (

<div  	className="App container bg-white"
				style={{ marginTop: "10px", marginBottom: "10px" , marginLeft: "30px", width: "100vh"}}
			>	
    <Form style={{ paddingTop: 10 }} onSubmit={handleSubmit}>

      
      <div>
    <h2 style={head}>CONTACT US</h2>
</div>
      <div>
      <Form.Group className="mb-3" controlId="formGroupEmail">
    <Form.Label>Name</Form.Label>
    <Form.Control type="name" placeholder="Enter Full Name" />
  </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Message</Form.Label>
    <Form.Control as="textarea" rows={4} />
  </Form.Group>
      </div>
      <Button variant="success" type="submit">{status}</Button>
      </Form>
      </div>
  );
};

export default Contact;