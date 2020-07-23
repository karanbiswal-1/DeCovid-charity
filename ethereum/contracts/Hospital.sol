pragma solidity ^0.4.17;

contract superAdmin{
    address[] public registeredHospital;
    address[] public validHospital;
    address public developer;
    address[] public managers;
    mapping(address => bool) public validOne;
    
    function superAdmin() public {
        developer=msg.sender;
    }
    
    function RegisterHospital(string name,string location,uint no) public {
        address newHospital = new Hospital(msg.sender,name,location,no);
        registeredHospital.push(newHospital);
        managers.push(msg.sender);
    }
    function getRegisterdHospital() public view returns(address[]){
        return registeredHospital;
    }
    function validateHospital(address unvalid) public {
        require(msg.sender == developer);
        validHospital.push(unvalid);
        validOne[unvalid] = true;
    } 
    
    function getValidHospitals() public view returns(address[]) {
        return validHospital;
    }
    function getManagers() public view returns(address[]){
        return managers;
        }
}

contract Hospital{
    address public manager;
    address public superAddress;

    struct Details {
        string  nameOfHospital;
        string location;
        uint noCovidPatient;
    }
    Details details;

    struct Request{
        string description;
        uint value;
        address recipent;
        bool complete;
    }
    Request[] public requests; 
    
    address[] public contributersList;
    uint[] public contributersValue;
    mapping(address => bool) contributers;
    uint public contributersCount;
    mapping(address => bool) public isManager;
    
    function Hospital(address owner,string name,string location,uint no) public {
        manager = owner;
        details.nameOfHospital = name;
        details.location = location;
        details.noCovidPatient = no;
        
    }
    function addressSuper(address b) public {
         superAddress = b;
     }
     
    function getManagersList() public   {
         superAdmin s = superAdmin(superAddress);
         address[] memory allManager = s.getManagers();
          for(uint i=0;i<allManager.length;i++){
              isManager[allManager[uint(i)]] = true;
          }
          
     }
    modifier onlyOwner{
        require(msg.sender ==  manager);
        _;
    }
    modifier onlyManagers{
        require(isManager[msg.sender]=true);
        _;
    }
    
    function contribute() public payable {
        contributers[msg.sender] = true ;
        contributersList.push(msg.sender);
        contributersCount++;
        contributersValue.push(msg.value);
    }
    function withdrawDonation(uint amount) public onlyOwner {
    
        manager.transfer(amount);
    }

    function createRequest(string description,uint value,address recipent) public onlyManagers {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipent: recipent,
            complete: false
            });
         requests.push(newRequest);
    }
    function approveRequest(uint index) public onlyOwner {
        Request storage request = requests[index];
        require(!request.complete);
        request.recipent.transfer(request.value);
        request.complete = true;
        }
    function getRequestCount() public view returns(uint) {
        return requests.length;
    }  

    function getDetails() public view returns(
        address,string,uint,string,uint,uint
    ) {
        return (
            manager,
            details.nameOfHospital,
            details.noCovidPatient,
            details.location,
            contributersCount,
            this.balance
        );
    }

    function getContributersValue() public view returns(uint[]) {
        return contributersValue;
    }
}    