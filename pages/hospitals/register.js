import React from 'react';
import Layout from '../../components/Layout';
import { Form ,Button ,Checkbox,Message } from 'semantic-ui-react';
import admin from '../../ethereum/admin';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';


class hospitalRegister extends React.Component {
    state = {
        nameHospital: '',
        addressHospital: '',
        noPaitients: '',
        errorMessage: '',
        loading: false
    };

    onSubmit =  async event => {
        event.preventDefault();
        this.setState({loading: true , errorMessage: '' });

        try{
        const accounts = await web3.eth.getAccounts();
        await admin.methods.RegisterHospital(this.state.nameHospital,this.state.addressHospital,this.state.noPaitients)
        .send({
            from: accounts[0]
        });
        Router.pushRoute('/hospitalList');
        } catch(err) {
            this.setState({errorMessage: err.message})
        }
        this.setState({ loading: false});
    };


    render() {
        return(
            <Layout>
                <h3> Register your Hospital</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                     <Form.Field>
                        <label>Name Of The Hospital</label>
                        <input 
                            placeholder='name'
                            value = {this.state.nameHospital}
                            onChange={ event => 
                            this.setState({ nameHospital: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Address</label>
                        <input 
                        placeholder='Location'
                        value = {this.state.addressHospital}
                        onChange={ event => 
                        this.setState({ addressHospital: event.target.value })}
                        />
                     </Form.Field>
                     <Form.Field>
                         <label>Number Of Covid Paitients</label>
                         <input
                         placeholder="number"
                          value = {this.state.noPaitients}
                          onChange={ event => 
                          this.setState({ noPaitients: event.target.value })}
                          />
                     </Form.Field>
                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <Message error header="Oops! something went wrong" content={this.state.errorMessage} />
                    <Button type='submit' secondary loading={this.state.loading}>Submit</Button>
              </Form>
            </Layout>
        );

    }
}

export default hospitalRegister;