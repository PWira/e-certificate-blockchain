// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract Cert {
    
    address admin;

    // Modified event without indexed string
    event Issued(string course, uint256 indexed id, string grade);
    
    constructor() {
        admin = msg.sender;    
    }
    
    modifier onlyAdmin {
        require(msg.sender == admin, "Access Denied");
        _;
    }
    
    struct Certificate {
        string name;
        string course;
        string grade;
        string date;
        bool exists;  // Add this to track if certificate exists
    }
    
    mapping (uint256 => Certificate) public Certificates;
    
    function issue(
        uint256 _id,
        string memory _name,
        string memory _course,
        string memory _grade,
        string memory _date
    ) public onlyAdmin {
        require(_id > 0, "Invalid ID");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_course).length > 0, "Course cannot be empty");
        require(bytes(_grade).length > 0, "Grade cannot be empty");
        require(bytes(_date).length > 0, "Date cannot be empty");
        
        Certificates[_id] = Certificate(_name, _course, _grade, _date, true);
        emit Issued(_course, _id, _grade);
    }
    
    // Add a function to check if certificate exists
    function certificateExists(uint256 _id) public view returns (bool) {
        return Certificates[_id].exists;
    }
}