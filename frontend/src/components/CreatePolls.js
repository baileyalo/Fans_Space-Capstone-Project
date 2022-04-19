import React, {Component} from "react";
import TokenGenerator from "../contracts/TokenGenerator.json";
import getWeb3 from "../getWeb3";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";


class createPolls extends Component {
	state = {
		deployedTokenAddressList: [],
		web3: null,
		accounts: null,
		alAccounts: null,
		contract: null,
		name: "",
		poll: "",
		selection: "",
		message: "",
		msgColor: "black",
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

    makePoll = async (event) => {
		//const promises = [];
	
		this.setState({ message: "creating new poll...", loader: true });
		let encodedABI = this.state.contract.methods.generatePoll(
				this.state.name,
				this.state.poll,
				this.state.message,
                this.state.selection,
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


		this.setState({ message: "New Poll Generated", loader: false });
			
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
				
					<h1> Create Poll </h1>
					<Form
						style={{ paddingTop: 50 }}onSubmit={(event) => {this.makeToken();event.preventDefault();
						}}
					>
						<Form.Group controlId="teamName">
							<Form.Label>Sports Team</Form.Label>
							<Form.Control value={this.state.name} onChange={(event) => {this.setState({ name: event.target.value });
									// console.log(this.state.name);
								}}
								type="text"
								placeholder="Enter Team Name"
							/>
						</Form.Group>

						<Form.Group controlId="pollNAme">
							<Form.Label>Poll Name</Form.Label>
							<Form.Control value={this.state.poll}	onChange={(event) => {this.setState({ poll: event.target.value });
								}}
								type="text"
								placeholder="Poll name "
							/>
						</Form.Group>

						<Form.Group controlId="Selection">
							<Form.Label>Selection</Form.Label>
							<Form.Control value={this.state.selection} onChange={(event) => {this.setState({ selection: event.target.value });
								}}
								type="int"
								placeholder="Selections"
							/>
						</Form.Group>					
							<br/>		
						<Button variant="success" type="submit">
							Submit
						</Button>
					</Form>
                    <Spinner>
					<Spinner animation="border" variant="success" role="status" />
								
					</Spinner>
				
				</div>
			
			</div>
		);
	}

}    
export default createPolls;
