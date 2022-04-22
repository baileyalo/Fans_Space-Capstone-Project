import React, { Component } from 'react';

class Home extends Component {
  render() {

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
      <div  className="home">
      <h2 style={head}>FANS-SPACE </h2>
      <br/>
      <div>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/rgewGwATU-s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/rgewGwATU-s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
      </div>

      
    );
  }
}

export default Home;