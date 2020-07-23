import React from 'react';
import admin from '../ethereum/admin';
import {Form,Input,Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import {Router} from '../routes';

class validationForm extends React.Component {
    state={
        loading: false
    };
    onSubmit = async event => {
        event.preventDefault();

        this.setState({loading: true});

        const accounts =  await web3.eth.getAccounts();
        await admin.methods.validateHospital(this.props.address).send({
            from: accounts[0]
        });

        
        this.setState({loading: false});

    };

    render() {
        return(
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <h2>Hello develor</h2>
                    <h3>This hospital claims to be a valid hospital </h3>
                    <label>kkkk</label>
                    <Input />
                </Form.Field>
                <Button secondary>
                    Validate
                </Button>
            </Form>
        );
    }
}

export default validationForm;