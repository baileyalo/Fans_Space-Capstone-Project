import React, {Component} from "react";
import TokenGenerator from "../contracts/TokenGenerator.json";
import getWeb3 from "../getWeb3";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";


class createToken extends Component {
	state = {
		deployedTokenAddressList: [],
		web3: null,
		accounts: null,
		alAccounts: null,
		contract: null,
		name: "",
		symbol: "",
		decimals: 0,
		address: "",
		message: "",
		msgColor: "black",
		totalSupply: 0,
		loader: false,
	};
    componentDidMount = async () => {
		
		try {
		
			// Get network provider and web3 instance.
			const web3 = await getWeb3();
			// Use web3 to get the user's accounts.
			const accounts = await web3.user.eth.getAccounts();
			// const alAccounts = process.env.REACT_APP_ACCOUNT;
			const alAccounts = process.env.REACT_APP_ACCOUNT;		
			// Get the contract instance.
			const networkId = await web3.al.eth.net.getId();
			const deployedNetwork = TokenGenerator.networks[networkId];
			const instance = new web3.al.eth.Contract(
				TokenGenerator.abi,
				deployedNetwork.address,
				{
					from: alAccounts,
					gasLimit: 3000000,
				}
			);	
			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState({ web3, accounts, alAccounts, contract: instance });
			const addressess = await this.state.contract.methods
				.getAllAddresses()
				.call();
			this.setState({ deployedTokenAddressList: addressess });			
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`
			);
			
		}
	};

    makeToken = async (event) => {
		//const promises = [];
		console.log(
		 	this.state.name +
				this.state.symbol +
				this.state.decimals +
			this.state.totalSupply
		);
		this.setState({ message: "Generating new token...", loader: true });
		let encodedABI = this.state.contract.methods.generateToken(
				this.state.name,
				this.state.symbol,
				this.state.decimals,
				this.state.totalSupply,
				this.state.accounts[0]
			).encodeABI();
		 console.log(encodedABI);	
		const tx = await this.state.web3.al.eth.accounts.signTransaction(
			
			{				
				to: this.state.contract.options.address,
				gas: "2000000",				
				data: encodedABI,
				chainId: 4,
				from: "0x35E95CFa48001B9025b560D0865E4F8540313d8d",
				chain: "rinkeby",
				hardfork: "petersburg",
				},
				 process.env.REACT_APP_PVT_KEY
				
		); 
	
		console.log("9");	
		console.log(tx.rawTransaction);
		const resp = await this.state.web3.al.eth.sendSignedTransaction(
			tx.rawTransaction
			
		);
		console.log(resp);	


		this.setState({ message: "Generated new token", loader: false });
		const addressess = await this.state.contract.methods
			.getAllAddresses()
			.call();
		this.setState({ deployedTokenAddressList: addressess });
		this.setState({
			address: this.state.deployedTokenAddressList[
				this.state.deployedTokenAddressList.length - 1
				
			],
		});

		
	};
	
    render() {
		if (!this.state.web3) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
		

			
			<div
		
				className="App container bg-white"
				style={{ marginTop: "10px", marginBottom: "10px" , marginLeft: "30px", width: "100vh"}}
			>	
			
				<div
						style={{
						padding: "2px",
						
					}}

					>
				
					<h1> Create Token </h1>
					<Form
						style={{ paddingTop: 50 }}onSubmit={(event) => {this.makeToken();event.preventDefault();
						}}
					>
						<Form.Group controlId="tokenName">
							<Form.Label>Token Name</Form.Label>
							<Form.Control value={this.state.name} onChange={(event) => {this.setState({ name: event.target.value });
									// console.log(this.state.name);
								}}
								type="text"
								placeholder="Enter Token Name"
							/>
						</Form.Group>

						<Form.Group controlId="tokenSymbol">
							<Form.Label>Token Symbol</Form.Label>
							<Form.Control value={this.state.symbol}	onChange={(event) => {this.setState({ symbol: event.target.value });
								}}
								type="text"
								placeholder="Enter Token Symbol"
							/>
						</Form.Group>

						<Form.Group controlId="tokenDecimals">
							<Form.Label>Decimal Places</Form.Label>
							<Form.Control value={this.state.decimals} onChange={(event) => {this.setState({ decimals: event.target.value });
								}}
								type="int"
								placeholder="Enter Decimal Places"
							/>
						</Form.Group>

						<Form.Group controlId="totalSupply">
							<Form.Label>Total Supply</Form.Label>
							<Form.Control	value={this.state.totalSupply} onChange={(event) => {var temp = event.target.value;
									this.setState({ totalSupply: temp });
								}}
								type="int"
								placeholder="Enter Total Supply"
							/>
						</Form.Group>
							<br/>		
						<Button variant="success" type="submit">
							Submit
						</Button>
					</Form>

					<div>
						<div>
							The{" "}
							<span style={{ color: this.state.name ? "red" : "black" }}>
								{" "}
								{this.state.name ? this.state.name : "[Token-name]"}{" "}
							</span>{" "}
							Token with Symbol{" "}
							<span style={{ color: this.state.symbol ? "red" : "black" }}>
								{this.state.symbol ? this.state.symbol : "[symbol]"}{" "}
							</span>{" "}
							with{" "}
							<span style={{ color: this.state.totalSupply ? "red" : "black" }}>
								{this.state.totalSupply
									? this.state.totalSupply
									: "[Total Supply]"}{" "}
							</span>{" "}
							Tokens Generated at Address{" "}
							<span style={{ color: this.state.address ? "red" : "black" }}>
								{" "}
								{this.state.address ? this.state.address : "[Address]"}{" "}
							</span>
						</div>
						{this.state.loader ? (
							<div style={{ color: this.state.msgColor }}>
								Message: {this.state.message}
								<Spinner>
								<Spinner animation="border" variant="success" role="status" />
								
								</Spinner>
							</div>
						) : (
							<p></p>
						)}
					</div>
				</div>
			
			</div>
		);
	}

}    
export default createToken;
