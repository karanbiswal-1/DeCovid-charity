import web3 from './web3';
import superAdmin from '../ethereum/build/superAdmin.json';

const instance = new web3.eth.Contract(
    JSON.parse(superAdmin.interface),
    '0xa4529C7922Ae747A79A343ABba78594893179Da2'
);

export default instance ;