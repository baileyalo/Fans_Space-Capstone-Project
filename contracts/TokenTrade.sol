//SPDX-License-Identifier: MIT


pragma solidity 0.8.13;


contract TokenTrade {

uint public initialSupply;
//Tracking the count of total tokens transferred
uint public tokenTransfered;
//Mapping the tracks the balance of tokens for each account
mapping(address => uint) public balanceOf;

constructor(uint _initialSupply) {
balanceOf[msg.sender] = _initialSupply;
initialSupply = _initialSupply;
}

//Event Transfer to notify everyone on the network
event Transfer (
    address from,
    address to,
    uint amount
);


//Transfer Function
function transfer(address _to, uint _amount) public returns (bool){
require(balanceOf[msg.sender] >= _amount);
balanceOf[msg.sender] -= _amount;
balanceOf[_to] += _amount;
tokenTransfered += _amount;
emit Transfer(msg.sender, _to, _amount);
return true;
}
}