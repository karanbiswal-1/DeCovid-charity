import React from 'react';
import {Form ,Button, Message, Input } from 'semantic-ui-react';
import Hospital from '../../../ethereum/hospital';
import web3 from '../../../ethereum/web3';
import Layout from '../../../components/Layout';
import {Link, Router} from '../../../routes';
import hospital from '../../../ethereum/hospital';

class RequestNew extends React.Component {
    state ={
        value: '',
        description: '',
        recipent: '',
        loading: false,
        errorMessage: ''
    };
    static getInitialProps(props) {
        const {address} = props.query;
        return {address};
    }
    onSubmit = async event => {
        event.preventDefault();
        const hospital = Hospital(this.props.address);
        const {description,value,recipent} = this.state;
        this.setState({loading:true , errorMessage:''});

        try{
            const accounts = await web3.eth.getAccounts();
            await hospital.methods.addressSuper("0xa4529C7922Ae747A79A343ABba78594893179Da2").send({ from: accounts[0] });
            await hospital.methods.getManagersList().send({ from: accounts[0] });
            await hospital.methods
                .createRequest(description, web3.utils.toWei(value,'ether'), recipent)
                .send({ from: accounts[0] });

            Router.pushRoute(`/hospitals/${this.props.address}`);    
        } catch(err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false});
    };

    render() {
        return(
            <Layout>
                <Link route={`/hospitals/${this.props.address}`}>
                    <a>Back</a>
                </Link>
               <h3>Send A Request</h3>
               <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                   <Form.Field>
                       <label>Description</label>
                       <Input 
                       value={this.state.description}
                       onChange={event =>
                            this.setState({description: event.target.value })}
                         />
                   </Form.Field>
                   <Form.Field>
                       <label>Amount</label>
                       <Input 
                       value={this.state.value}
                       onChange={event =>
                            this.setState({value: event.target.value })}
                       />
                   </Form.Field>
                   <Form.Field>
                       <label>Recipent</label>
                       <Input 
                       value={this.state.recipent}
                       onChange={event =>
                            this.setState({recipent: event.target.value })}
                       />
                   </Form.Field>
                   <Message error header="Oops something went wrong" content={this.state.errorMessage} />
                   <Button secondary loading={this.state.loading}>Send</Button>
               </Form>
            </Layout>
        );
    }
}

export default RequestNew;