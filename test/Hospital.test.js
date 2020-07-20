const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledAdmin = require('../ethereum/build/superAdmin.json');
const compiledHospital = require('../ethereum/build/Hospital.json');

let accounts;
let admin;
let hospitalAddress;
let hospital;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    admin = await new web3.eth.Contract(JSON.parse(compiledAdmin.interface))
    .deploy({ data: compiledAdmin.bytecode })
    .send({ from: accounts[0], gas: '1000000'});

    await admin.methods.RegisterHospital('nanavati','manchesar','100').send({
        from: accounts[0],
        gas: '1000000'
    });

    [hospitalAddress] = await admin.methods.getRegisterdHospital().call();

    hospital = await new web3.eth.Contract(
        JSON.parse(compiledHospital.interface),
        hospitalAddress
    );
});

describe('hospitals', () => {
    it('deploys a admin and hospital', () => {
        assert.ok(admin.options.address);
        assert.ok(hospital.options.address);
    });

    it('marks caller as hospital manager', async () => {
        const manager = await hospital.methods.manager().call();
        assert.equal(accounts[0],manager);
    });

    it('allow a doner to contribute money and mark them as contributer',async () => {
        await hospital.methods.contribute().send({
            value: '200',
            from: accounts[1],
            gas: '1000000'
        });
        const isContributer = await hospital.methods.contributersList(0).call();
        assert.equal(accounts[1],isContributer);
    });

    it('hospital manager can withdraw the money', async () => {
        await hospital.methods.contribute().send({
            value: web3.utils.toWei('10', 'ether'),
            gas: '1000000',
            from: accounts[1]
        });
        await hospital.methods.withdrawDonation( web3.utils.toWei('5','ether') ).send({
            from: accounts[0],
            gas: '1000000'   
        });
         let balance = await web3.eth.getBalance(accounts[0]);
         balance = web3.utils.fromWei(balance, 'ether');
         balance = parseFloat(balance);

         assert(balance > 103);
    });
});