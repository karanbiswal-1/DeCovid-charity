import React from 'react';
import {Form , Input, Button, Message} from 'semantic-ui-react';
import Hospital from '../ethereum/hospital';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class contributeForm extends React.Component {
    state = {
        value:'',
        errorMessage:'',
        loading: false
    };

    onSubmit = async event => {
        event.preventDefault();

        const hospital = Hospital(this.props.address);

        this.setState({loading: true, errorMessage:''});

        try{
            const accounts = await web3.eth.getAccounts();
            await hospital.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value,'ether')
            });
            Router.replaceRoute(`/hospitals/${this.props.address}`);
        } catch(err) {
            this.setState({errorMessage: err.message });
        }
        this.setState({ loading: false, value: '' });
    };

    render() {
        return(
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount To Contribute</label>
                    <Input
                    value={this.state.value}
                    onChange={ event => this.setState({ value: event.target.value })}
                    label='ether'
                    labelPosition="right"
                    />
                </Form.Field>
                <Message error header="Oops! something went wrong" content={this.state.errorMessage} />
                <Button color="grey" icon="add" loading={this.state.loading}>
                    Contribute!
                </Button>
            </Form>
        );
    }

}

export default contributeForm;