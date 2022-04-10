import React, { Component } from 'react';

class About extends Component {


  render() {

    const styleObj = {
      fontSize: 18,
      color: "black",
      textAlign: "center",
      paddingTop: "10px",
      marginLeft: .5,
      fontWeight: "bold" ,  
      fontStyle: 'italic' 
    
    }
    const head = {
      fontSize:40 ,
      color: "Green",
      marginLeft: 200.5,
      textAlign: "left",
      paddingTop: "5px",
      fontWeight: "bold" ,  
      fontStyle: "italic" 
          
    }
    return (
        <div>
        <h2 style={head}>About</h2>
          <div>
            <div className='text'>
      		<pre style={styleObj}> Fans Space is a Decentralized Application Built on Ethereum Blockchain network<br/>
          <br/>
            that is designed to allows Fans from sporting events to be able to purchase tokens that <br/>
            <br/>
            are made available by the sports teams. These tokens have a infinite lifetime and allows<br/>
            <br/> 
            fans to be able to make decision on their teams through voting polls, VIP access to teams<br/>
            <br/>
            unlimited perks for global fans and can also be traded with other token holders.
          </pre>
          </div>
      	</div>
        </div>
    );
  }
}

export default About;