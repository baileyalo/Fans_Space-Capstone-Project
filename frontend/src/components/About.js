import React, { Component } from 'react';

class About extends Component {


  render() {

    const styleObj = {
      fontSize: 25,
      color: "black",
      textAlign: "left",
      paddingTop: "5px",
      paddingLeft: "8px",
      marginLeft: .5,
      fontWeight: "bold" ,  
      fontStyle: 'italic' 
    
    }
    const head = {
      fontSize:40 ,
      color: "Green",
      marginLeft: 200.5,
      textAlign: "left",
      paddingTop: ".5px",
      fontWeight: "bold" ,  
      fontStyle: "italic" 
          
    }
    return (
      <div  className="about">
     <div>
        <h2 style={head}>About</h2>
          <div>
            <div className='text'>
      		<pre style={styleObj}>Fans Space is a Decentralized Application<br/>Built on Ethereum Blockchain network
          <br/>
            that is designed to allows Fans from sporting events <br/>to be able to purchase tokens that <br/>
            
            are made available by the sports teams.    <br/> <br/>These tokens have a infinite lifetime and allows<br/>
            
            fans to be able to make decision on their teams <br/>through voting polls, VIP access to teams<br/>
         
            unlimited perks for global fans and <br/>can also be traded with other token holders.
          </pre>
          </div>
      	</div>
        </div>
        </div>
    );
  }
}

export default About;