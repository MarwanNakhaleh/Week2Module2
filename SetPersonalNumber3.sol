// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

contract SetPersonalNumber {

    // Variables Go Here
    struct PersonalNumberData {
        address registeredAddress;
        uint256 personalNumber;
    }

    PersonalNumberData[] personalNumberData;

    constructor (uint256 number) {
        personalNumberData.push(PersonalNumberData(msg.sender, personalNumber));
    }

    function addPersonalNumber (
        // Inputs go here
        uint256 personalNumber
    ) public {
        // Functionality Goes Here
        personalNumberData.push(PersonalNumberData(msg.sender, personalNumber));
    }

    function checkPersonalNumber (
        // Inputs go here
    ) public view returns(uint256) {
        for (uint i = 0; i < 10; i++) {
            
        }
        // Functionality Goes Here
    }

}