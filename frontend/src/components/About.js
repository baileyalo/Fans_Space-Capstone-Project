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
      fontWeight: "normal" ,  
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
  <div  	className="App container bg-white"
				style={{ marginTop: "10px", marginBottom: "5px" , marginLeft: "30px", width: "150vh"}}
			>	
      		<pre style={styleObj}>Fans Space is a Decentralized Application Built on Ethereum Blockchain <br/>network
        
            that is designed to allows Fans from sporting events to be able<br/>to purchase tokens that
            
            are made available by the sports teams.<br/> <br/>These tokens have a infinite lifetime and allows
            
            fans to be able to make<br/>decision on their teams through voting polls, VIP access to teams<br/>

            unlimited perks for global fans and can also be traded with <br/> other token holders.
          </pre>
          </div>
      	</div>
        </div>
        </div>
    );
  }
}

export default About;