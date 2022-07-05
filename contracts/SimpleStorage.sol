// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SimpleStorage {
  uint256 favoriteNumber; // Defaults to 0

  function store(uint256 _favoriteNumber) public virtual {
    favoriteNumber = _favoriteNumber;
  }

  People public person = People({favoriteNumber: 3, name: "Habeeb"});

  mapping(string => uint256) public nameToFavoriteNumber;

  struct People {
    string name;
    uint256 favoriteNumber;
  }

  People[] public people;

  function retrieve() public view returns (uint256) {
    return favoriteNumber;
  }

  function addPerson(string memory _name, uint256 _favoriteNumber) public {
    People memory newPerson = People({
      name: _name,
      favoriteNumber: _favoriteNumber
    });
    people.push(newPerson);
    // people.push(People({name: _name, favoriteNumber: _favoriteNumber}));
    // people.push(People(_name, _favoriteNumber));
    nameToFavoriteNumber[_name] = _favoriteNumber;
  }

  function returnPeople() public view returns (People[] memory) {
    return (people);
  }

  function mappedName(string memory name) public view returns (uint256) {
    return (nameToFavoriteNumber[name]);
  }

  // function peopleSize() public view returns (uint256) {
  //   return (people.length);
  // }
}

// 0xd2a5bC10698FD955D1Fe6cb468a17809A08fd005
