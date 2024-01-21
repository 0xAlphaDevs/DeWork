// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract GHO is ERC20, Ownable, ERC20Permit {
    constructor()
        ERC20("GHO Token", "GHO")
        Ownable()
        ERC20Permit("GHO Token")
    {}

    mapping(address => bool) public minters;

    modifier onlyMinter() {
        require(minters[msg.sender] == true, "Caller is not a minter");
        _;
    }

    function addMinter(address minter) public onlyOwner {
        minters[minter] = true;
    }

    function mint(address to, uint256 amount) public onlyMinter {
        _mint(to, amount);
    }
}
