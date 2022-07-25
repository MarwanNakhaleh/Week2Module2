// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.5.0;

// old standard
import "@openzeppelin/contracts@2.5.1/token/ERC20/ERC20.sol";

contract MyNewToken is ERC20 {
    // old standard
    constructor() ERC20("MyToken", "MYT") {
        _mint(msg.sender, 1000000);
    }
}