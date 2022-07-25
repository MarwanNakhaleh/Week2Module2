// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

contract SetPersonalNumber {

    // Variables Go Here
    mapping(address => uint256) registeredAddresses;

    constructor (uint256 number) {
        registeredAddresses[msg.sender] = number;
        // Functionality Goes Here
    }

    function addPersonalNumber (
        // Inputs go here
        uint256 personalNumber
    ) public {
        // Functionality Goes Here
        registeredAddresses[msg.sender] = personalNumber;
    }

    function checkPersonalNumber (
        // Inputs go here
    ) public view returns(uint256) {
        return registeredAddresses[msg.sender];
        // Functionality Goes Here
    }

}