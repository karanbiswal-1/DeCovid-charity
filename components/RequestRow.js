import React from 'react';
import {Table,Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Hospital from '../ethereum/hospital';
import Layout from './Layout';

class RequestRow extends React.Component {

onApprove = async () => {
    const hospital = Hospital(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await hospital.methods.approveRequest(this.props.id).send({
        from: accounts[0]
    });
};


render() {
    const {Row, Cell} = Table;
    const {id, request} = this.props;

    return (
        <Row disabled={request.complete} >
            <Cell>{id}</Cell>
            <Cell>{request.description}</Cell>
            <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
            <Cell>{request.recipent}</Cell>
            <Cell>
                {request.complete ? null : (
                    <Button color="green" basic onClick={this.onApprove}>
                        Approve
                    </Button>
                )}
            </Cell>
        </Row>
    );
 }
}

export default RequestRow;