import React from 'react';
import { Button , Form, Message ,Input } from 'semantic-ui-react';
import Hospital from '../../ethereum/hospital';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import {Link,Router} from '../../routes';


class withdraw extends React.Component {
    state ={
        value:'',
        loading:'',
        errorMessage:''
    };
    static async getInitialProps(props) {
        const { address } = props.query;
        return {address};
    }
    onSubmit = async event => {
        event.preventDefault();

        const hospital = Hospital(this.props.address);
        const {value} = this.state;
        
        this.setState({loading:true,errorMessage:''});

        try{
           const accounts = await web3.eth.getAccounts(); 
           await hospital.methods.withdrawDonation(web3.utils.toWei(value,'ether'))
        .send({ from: accounts[0] });

        Router.pushRoute(`/hospitals/${this.props.address}`);
        }catch(err){
            this.setState({ errorMessage: err.message })
        }

        this.setState({ loading: false })
    };


    render(){
        return(
            <Layout>
                <Link route={`/hospitals/${this.props.address}`}>
                    <a>BACK</a>
                </Link>
                <h2>Hello Manager</h2>
                <h3> Seems Like You Want To Withdraw Some Donation</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Amount In Ether</label>
                        <Input
                          value={this.state.value}
                          onChange={event =>
                           this.setState({value: event.target.value })}
                           />
                    </Form.Field>
                    <Message error header="Oops! something went wrong" content={this.state.errorMessage}/>
                    <Button
                      color="grey"
                      loading={this.state.loading}>
                          Withdraw
                      </Button>
                </Form>
            </Layout>
        );
    }
}

export default withdraw;
