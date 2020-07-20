import web3 from './web3';
import superAdmin from '../ethereum/build/superAdmin.json';

const instance = new web3.eth.Contract(
    JSON.parse(superAdmin.interface),
    '0x41A54250cc28b79E2F0F07cC52AcCCD52eb1F6Ee'
);

export default instance ;