pragma solidity ^0.4.17;

contract superAdmin{
    address[] public registeredHospital;
    
    function RegisterHospital(string name,string location,uint no) public {
        address newHospital = new Hospital(msg.sender,name,location,no);
        registeredHospital.push(newHospital);
    }
    function getRegisterdHospital() public view returns(address[]){
        return registeredHospital;
    }
}

contract Hospital{
    address public manager;
    
    struct Details {
        string  nameOfHospital;
        string location;
        uint noCovidPatient;
    }
    
    Details details;
    
    address[] public contributersList;
    mapping(address => bool) contributers;
    uint public contributersCount;
    
    function Hospital(address owner,string name,string location,uint no) public {
        manager = owner;
        details.nameOfHospital = name;
        details.location = location;
        details.noCovidPatient = no;
        
    }
    modifier onlyOwner{
        require(msg.sender ==  manager);
        _;
    }
    
    function contribute() public payable {
        contributers[msg.sender] = true ;
        contributersList.push(msg.sender);
        contributersCount++;
    }
    function withdrawDonation(uint amount) public onlyOwner {
    
        manager.transfer(amount);
    }

    function getDetails() public view returns(
        address,string,uint,string,uint
    ) {
        return (
            manager,
            details.nameOfHospital,
            details.noCovidPatient,
            details.location,
            contributersCount
        );
    }
}    