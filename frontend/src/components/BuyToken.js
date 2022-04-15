import React, { Component } from "react";
import getWeb31 from "../getWeb31";
import TokenGenerator from "../contracts/TokenGenerator.json";
import FanTokenSale from "../contracts/FanTokenSale.json";
import KycContract from "../contracts/KycContract.json";

import "../App.css";

class BuyToken extends Component {
  state = {
    loaded: false,
    kycAddress: "0x618...",
    tokenSaleAddress: null,
    userTokens: 0,

  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb31();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();
		console.log (this.accounts);
      // Get the contract instance.
	 
      this.networkId = await this.web3.eth.net.getId();

      this.tokendeployedNetwork = TokenGenerator.networks[this.networkId];
      this.tokenInstance = new this.web3.eth.Contract(
        TokenGenerator.abi,
        this.tokendeployedNetwork && this.tokendeployedNetwork.address
      );

      this.tokensaledeployedNetwork =
        FanTokenSale.networks[this.networkId];
      this.tokenSaleInstance = new this.web3.eth.Contract(
        FanTokenSale.abi,
        this.tokensaledeployedNetwork && this.tokensaledeployedNetwork.address
      );

      this.KycSaleDeployedNetwork = KycContract.networks[this.networkId];
      this.kycInstance = new this.web3.eth.Contract(
        KycContract.abi,
        this.KycSaleDeployedNetwork && this.KycSaleDeployedNetwork.address
      );

      this.listenToTokenTransfer();
      this.setState({
        loaded: true,
        tokenSaleAddress: this.tokensaledeployedNetwork.address,
        updateUserTokens: this.updateUserTokens,
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  updateUserTokens = async () => {
    let userTokens = await this.tokenInstance.methods
      .balanceOf(this.accounts[0])
      .call();
    this.setState({ userTokens });
  };

  listenToTokenTransfer = () => {
    this.tokenInstance.events.methods
      .transfer({ to: this.accounts[0] })
      .on("data", this.updateUserTokens);
  };

  handleBuyTokens = async () => {
    await this.tokenSaleInstance.methods
      .buyTokens(this.accounts[0])
      .send({
        from: this.accounts[0],
        value: this.web3.utils.toWei("1", "wei"),
      });
  };

  handleInputChange = (e) => {
    const target = e.target;
    const value = e.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleKycWhitelisting = async () => {
    await this.kycInstance.methods
      .setKycCompleted(this.state.kycAddress)
      .send({ from: this.accounts[0] });
    alert("KYC for " + this.state.kycAddress + " is completed");
  };

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>FANS-Space Token Sale </h1>
        <br />
        <h2>KYC Whitelisting</h2>
        <br />
        Address to allow :
        <input
          type="text"
          name="kycAddress"
          value={this.state.kycAddress}
          onChange={this.handleInputChange}
        ></input>
        <button type="button" onClick={this.handleKycWhitelisting}>
          Add to Whitelist
        </button>
        <h2>Buy Tokens</h2>
        <p>Send Wei to this address for Token: {this.state.tokenSaleAddress}</p>
        <p> You Currently Have: {this.state.userTokens} FAN Tokens</p>
        <button type="button" onClick={this.handleBuyTokens}>
          Buy More Tokens
        </button>
      </div>
    );
  }
}

export default BuyToken;