import React, { useState } from "react";

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


    <form onSubmit={handleSubmit}>
      <div>
    <h2 style={head}>Contact Us</h2>
</div>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" required />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" required />
      </div>
      <button type="submit">{status}</button>
    </form>
  );
};

export default Contact;