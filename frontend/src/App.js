import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Routes ,Route  } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';

class App extends Component {
  render() {
    return (
    <Router>
        <div>
		<h2 style={{color: "Green"}}>Welcome To Fans-Space </h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
			<li><Link to={'/login'} className="nav-link"> Login </Link></li>
            <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
            <li><Link to={'/about'} className="nav-link">About</Link></li>
          </ul>
          </nav>
		  <hr  style={{
    color: '#008000',
    backgroundColor: '#008000',
    height: .4,
    borderColor : '#008000',
	width:1200,
	marginLeft: 60
         }}/>
          <Routes>
              <Route exact path='/' element={<Home/>} />
			  <Route path='/login' element={<Login/>} />
              <Route path='/contact' element={<Contact/>} />
              <Route path='/about' element={<About/>} />
		</Routes> 
        </div>
      </Router>
    );
  }
}

export default App;