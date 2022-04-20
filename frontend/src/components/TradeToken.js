import React, { useState}  from "react";
import TradeToken from "../contracts/TradeToken.json";
import {
  Form,
  FormGroup,  
  Label,
  Input,
} from 'reactstrap';
import Button from "react-bootstrap/Button";
import '../App.css';

function TradeToken(){

  const head = {
    fontSize:40 ,
    color: "Green",
    marginLeft: 200.5,
    textAlign: "left",
    paddingTop: "5px",
    fontWeight: "bold" ,  
    fontStyle: "italic" 
        
  }
const [sportsname, setSportsname] = useState('');
const [amount, setAmount] = useState('');
const [address, setAddress] = useState('');



const handleTeamChange = (e) => {
    setSportsname(e.target.value);
}

const handleAmountChange = (e) => {
    setAmount(e.target.value);
}
const handleAddressChange = (e) => {
    setAddress(e.target.value);
}


Trade = async (event) => {
  //const promises = [];

  this.setState({ message: "Token trade...", loader: true });
  let encodedABI = this.state.contract.methods.transfer(
    this.state.name,
    this.state.symbol,
    this.state.decimals,
    this.state.accounts[0]
    ).encodeABI();
   console.log(encodedABI);	
  const tx = await this.state.web3.al.eth.accounts.signTransaction(
    
    {				
      to: this.state.contract.options.address,
      gas: "2000000",				
      data: encodedABI,
      chainId: 4,
      chain: "rinkeby",
      hardfork: "petersburg",
      },
       process.env.REACT_APP_PVT_KEY
      
  ); 

  //console.log(tx.rawTransaction);
  const resp = await this.state.web3.al.eth.sendSignedTransaction(
    tx.rawTransaction
    
  );
  console.log(resp);	


  this.setState({ message: "New Poll Generated", loader: false });
    
};
    return (
      <div  	className="App container bg-white"
				style={{ marginTop: "10px", marginBottom: "10px" , marginLeft: "30px", width: "100vh"}}
			>	
        <h2 style={head}> Trade Token </h2>
        <Form className="form" onSubmit={(event) => {this.Trade();event.preventDefault(); 
        >
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="sportsname"
              name="sportsname"
              id="sportsname"
              placeholder="sportsname"
              value={sportsname}
              onChange={handleTeamChange}
            />
         <br/>
          </FormGroup>
          <FormGroup>
            <Label for="amount">Amount</Label>
            <Input
              type="amount"
              name="amount"
              id="exampleamount"
              placeholder="amount"
              value={amount}
              onChange={handleAmountChange}
            />
          </FormGroup> 
          <FormGroup>
            <Label for="Address">Address</Label>
            <Input
              type="Address"
              name="Address"
              id="exampleAddress"
              placeholder="amount"
              value={address}
              onChange={handleAddressChange}
            />
          </FormGroup> 
          <br/>
          <Button variant="success" type="submit"> Submit</Button>
        </Form>
      </div>
    ); 

    }

export default TradeToken;