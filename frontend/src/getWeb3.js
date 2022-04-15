import Web3 from "web3";
// import HDWalletProvider from "@truffle/hdwallet-provider";

const getWeb3 = () =>
	new Promise((resolve, reject) => {
		// Wait for loading completion to avoid race conditions with web3 injection timing.
		window.addEventListener("load", async () => {
			// Modern dapp browsers...
			let web3, web3Al;
			if (window.ethereum) {
				web3 = new Web3(window.ethereum);
				try {
					// Request account access if needed
					await window.ethereum.enable();
					// Acccounts now exposed
					// resolve(web3);
				} catch (error) {
					reject(error);
				}
			}

				 // Legacy dapp browsers...
			 // else if (window.web3) {
			   // Use Mist/MetaMask's provider.
			  // const web3 = window.web3;
			 //   console.log("Injected web3 detected.");
			 //  resolve(web3);
			// }
			 // Fallback to localhost; use dev console port by default...

			//  const provider = new HDWalletProvider(
			 // "round claim canal social snake concert forest goose blast lift attend paddle",
			//  "https://rinkeby.infura.io/v3/b8c123d7c5ac4e6284451514c5c24efc"
		//	)
			// web3Al = new Web3(provider);

			

			web3Al = new Web3(
				new Web3.providers.HttpProvider(
					"https://rinkeby.infura.io/v3/b8c123d7c5ac4e6284451514c5c24efc" ||
						process.env.REACT_APP_API_KEY
				)
			);

			// console.log("No web3 instance injected, using Local web3.");
			 // resolve(web3Al);
			resolve({ user: web3, al: web3Al });
			
		});
	
	});

export default getWeb3;