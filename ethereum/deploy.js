const HDWalletprovider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledAdmin = require('../ethereum/build/superAdmin.json');

const provider = new HDWalletprovider(
    'output alter alcohol puppy crouch couch senior stay guitar cool away ivory',
    'https://rinkeby.infura.io/v3/e62d960b3b744b4aba66f37e5a249aa6'
    );


const web3 = new Web3(provider);

const deploy = async () => {
const accounts = await web3.eth.getAccounts();

console.log('attempting to deploy contract from account', accounts[0]);

const result = await new web3.eth.Contract(JSON.parse(compiledAdmin.interface))
.deploy({ data: compiledAdmin.bytecode })
.send({ from: accounts[0], gas: '1000000' });



console.log('contract is deplyed at adress', result.options.address);
};
deploy();