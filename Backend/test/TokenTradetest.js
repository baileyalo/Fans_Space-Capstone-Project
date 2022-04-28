let TokenTrade = artifacts.require('./TokenTrade');

contract("Token Trade Contract", function(accounts){
    let TokenTradeInstance;
    let buyer = accounts[1]
    let tokenAmount = 100000
 it("Able to Transfer Tokens", function(){
     return TokenTrade.deployed().then(function(instance){
        TokenTradeInstance = instance;
         //transfer tokens from one account to another
         return TokenTradeInstance.transfer(buyer, tokenAmount, {from : accounts[0]})
     }).then(function(reciept){
         //checking the event occured
         assert.equal(reciept.logs.length, 1, "An Event Occured")
         assert.equal(reciept.logs[0].event, "Transfer", "Event Name Check")
         assert.equal(reciept.logs[0].args.from, accounts[0], "Sender Address Check")
         assert.equal(reciept.logs[0].args.to, buyer, "Buyer Address Check")
         assert.equal(reciept.logs[0].args.amount, tokenAmount, "Amount Transffered Check")
         return TokenTradeInstance.balanceOf(buyer)
     }).then(function(balance){
         assert.equal(balance.toNumber(), tokenAmount, "Checking Balance Of The Buyer")
         //checking that the require condition failed in the contract due to low balance
         return TokenTradeInstance.transfer(buyer, tokenAmount, {from : accounts[0]})
     }).then(assert.fail).catch(function(err){
         assert(err.message.indexOf('revert') >= 0, "Asserting that the transfer failed due lowbalance in senders account")
     })
 })
})