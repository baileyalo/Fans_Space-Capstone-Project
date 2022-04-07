import React, { Component } from "react";
import TokenGenerator from "./contracts/TokenGenerator.json";
import getWeb3 from "./getWeb3";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


class App extends Component {
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
			// console.log("api key" + process.env.REACT_APP_API_KEY);
			// Get network provider and web3 instance.
			const web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			const accounts = await web3.user.eth.getAccounts();
			// const raghuAccounts = process.env.REACT_APP_ACCOUNT;
			const alAccounts =
				"0x7c91d48ed875a53b803ed0f9F825eCF20F1DF619" ||
				process.env.REACT_APP_ACCOUNT;
			// console.log(accounts);
			// console.log(alAccounts);

			// Get the contract instance.
			const networkId = await web3.al.eth.net.getId();
			// console.log("id" + networkId);
			const deployedNetwork = TokenGenerator.networks[networkId];
			const instance = new web3.al.eth.Contract(
				TokenGenerator.abi,
				deployedNetwork.address,
				{
					from: alAccounts,
					gasLimit: 3000000,
				}
			);

			// console.log(instance.options.address);

			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState({ web3, accounts, alAccounts, contract: instance });
			const addressess = await this.state.contract.methods
				.getAllAddresses()
				.call();
			this.setState({ deployedTokenAddressList: addressess });
			 //console.log(this.state.deployedTokenAddressList);
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`
			);
			// console.error(error);
		}
	};

    makeToken = async (event) => {
		// console.log(
		// 	this.state.name +
		// 		this.state.symbol +
		// 		this.state.decimals +
		// 		this.state.totalSupply
		// );
		// console.log(this.state.raghuAccounts + " " + this.state.accounts[0]);
		this.setState({ message: "Generating new token...", loader: true });
		var encodedABI = this.state.contract.methods
			.generateToken(
				this.state.name,
				this.state.symbol,
				this.state.decimals,
				this.state.totalSupply,
				this.state.accounts[0]
			)
			.encodeABI();
		// console.log(encodedABI);
		// var nonce = (await this.state.web3.raghu.eth.getTransactionCount(this.state.raghuAccounts));
		// nonce += 16;
		// console.log(nonce);
		// console.log(this.state.contract.options.address);
		// var _nonce = nonce.toString(16);
		const tx = await this.state.web3.al.eth.accounts.signTransaction(
			{
				// nonce:'0x' + _nonce,
				to: this.state.contract.options.address,
				gas: "2000000",
				// gasPrice: '60',
				data: encodedABI,
				chainId: 4,
				chain: "rinkeby",
				hardfork: "petersburg",
			},
			"ca2f734914dd47c35f4fab98972e919d47f96ceffdb47a212a0ebf3175e69e89" ||
				process.env.REACT_APP_PVT_KEY
		); // replace with process.env.REACT_APP_PVT_KEY
		// console.log(tx);
		// console.log(
		// 	await this.state.web3.raghu.eth.accounts.recoverTransaction(
		// 		tx.rawTransaction
		// 	)
		// );

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
		// this.setState({ name: "", symbol: "", decimals: "", totalSupply: "" });
	};

    render() {
		if (!this.state.web3) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<div
				className="App container bg-white"
				style={{ marginTop: "50px", marginBottom: "50px" }}
			>
				<Image
					style={{ width: "50%" }}
					src={require("./images/logo.png")}
					rounded
				/>

				<div
					style={{
						padding: "20px",
					}}
				>
					<h1> Create Token </h1>
					<Form
						style={{ paddingTop: 50 }}
						onSubmit={(event) => {
							this.makeToken();
							event.preventDefault();
						}}
					>
						<Form.Group controlId="tokenName">
							<Form.Label>Token Name</Form.Label>
							<Form.Control
								value={this.state.name}
								onChange={(event) => {
									this.setState({ name: event.target.value });
									// console.log(this.state.name);
								}}
								type="text"
								placeholder="Enter Token Name"
							/>
						</Form.Group>

						<Form.Group controlId="tokenSymbol">
							<Form.Label>Token Symbol</Form.Label>
							<Form.Control
								value={this.state.symbol}
								onChange={(event) => {
									this.setState({ symbol: event.target.value });
								}}
								type="text"
								placeholder="Enter Token Symbol"
							/>
						</Form.Group>

						<Form.Group controlId="tokenDecimals">
							<Form.Label>Decimal places</Form.Label>
							<Form.Control
								value={this.state.decimals}
								onChange={(event) => {
									this.setState({ decimals: event.target.value });
								}}
								type="int"
								placeholder="Enter Decimal Places"
							/>
						</Form.Group>

						<Form.Group controlId="totalSupply">
							<Form.Label>Total Supply</Form.Label>
							<Form.Control
								value={this.state.totalSupply}
								onChange={(event) => {
									var temp = event.target.value;
									this.setState({ totalSupply: temp });
								}}
								type="int"
								placeholder="Enter Total Supply"
							/>
						</Form.Group>

						<Button variant="primary" type="submit">
							Generate Token
						</Button>
					</Form>

					<div>
						<div>
							The{" "}
							<span style={{ color: this.state.name ? "red" : "black" }}>
								{" "}
								{this.state.name ? this.state.name : "[Token-name]"}{" "}
							</span>{" "}
							Token with symbol{" "}
							<span style={{ color: this.state.symbol ? "red" : "black" }}>
								{this.state.symbol ? this.state.symbol : "[symbol]"}{" "}
							</span>{" "}
							with{" "}
							<span style={{ color: this.state.totalSupply ? "red" : "black" }}>
								{this.state.totalSupply
									? this.state.totalSupply
									: "[Total Supply]"}{" "}
							</span>{" "}
							Tokens generated at address{" "}
							<span style={{ color: this.state.address ? "red" : "black" }}>
								{" "}
								{this.state.address ? this.state.address : "[Address]"}{" "}
							</span>
						</div>
						{this.state.loader ? (
							<div style={{ color: this.state.msgColor }}>
								Message: {this.state.message}
								<Spinner animation="border" role="status">
									<span className="sr-only">Loading...</span>
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
export default App;
