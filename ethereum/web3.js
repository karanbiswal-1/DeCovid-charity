import Web3 from 'web3';

let web3 ;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //we are in broser and metamask is running
    web3 = new Web3(window.web3.currentProvider);
    } else {
        //we areon server or the user is not running metamask
        const provider = new Web3.providers.HttpProvider(
            'https://rinkeby.infura.io/v3/e62d960b3b744b4aba66f37e5a249aa6'
        );
        web3 = new Web3(provider);
    }

export default web3;    