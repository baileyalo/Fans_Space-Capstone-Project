import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Routes ,Route  } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';
import CreateToken from './components/CreateToken';
import './App.css';


class App extends Component {
  render() {
    return (
    <Router>
        <div>
		<h2 style={{color: "Green"}}>Welcome To Fans-Space </h2>
          <nav className="navbar navbar-expand-lg navbar-light navbar-toggler ">
          <ul className="navbar-nav">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
			      <li><Link to={'/login'} className="nav-link"> Sign In</Link></li>
            <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
            <li><Link to={'/about'} className="nav-link">About</Link></li>
          </ul>
          </nav>
		  <hr  style={{
    color: '#008000',
    backgroundColor: '#008000',
    height: 5,
    borderColor : '#008000',
	width:1000,
	marginLeft: 60
         }}/>
          <Routes>
              <Route exact path='/' element={<Home/>} />
			        <Route path='/login' element={<Login/>} />
              <Route path='/contact' element={<Contact/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/createtoken' element={<CreateToken/>} />
	      	</Routes> 
        </div>
      </Router>
    );
  }
}

export default App;