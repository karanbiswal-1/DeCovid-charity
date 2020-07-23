import React from 'react';
import Layout from '../../components/Layout';
import Hospital from '../../ethereum/hospital';
import web3 from '../../ethereum/web3';
import {Card,Grid,Button} from 'semantic-ui-react';
import admin from '../../ethereum/admin';

import {Link } from '../../routes';




class validationDetail extends React.Component {
    state = {
        disabled: false,
        loading: false,
    
    };
     
    static async getInitialProps(props) {
        const hospital = Hospital(props.query.address);
        
        const summary = await hospital.methods.getDetails().call();
       return {
            address: props.query.address,
            manager: summary[0],
            name: summary[1],
            no: summary[2],
            location: summary[3],
            contributersCount: summary[4],
            balance: summary[5]
            

        };
    }

    renderCards() {
        
        const {
            manager,
            name,
            no,
            location,
            contributersCount,
            balance
        }= this.props;

        const items = [
            {
                header: name,
                meta:"Name Of The Hospital",
                description:"one of the prestigious hospital of the city "
            },
            {
                header:manager,
                meta:"Manager Of The Hospital",
                description:" he/she can only withdraw the donation for the wel being of covid 19 positive paitients",
                style: { overflowWrap: 'break-word'}
            },
            {
                header:no,
                meta:"Number Of Covid Paitients",
                description:" now its spreading very fast "
            },
            {
                header:location,
                meta:"Address Of The Hospital",
                description:"bhubaneswar"
            },
            {
                header:contributersCount,
                meta:"Number Of Helpers",
                description:"be the first to help "
                
            },
            {
                header:balance,
                meta:"funds",
                description:"total donation available"
            }
       
        ];
        return <Card.Group items={items} />
    }

    onClick = async event => {
        event.preventDefault();

        this.setState({loading: true});

        const accounts =  await web3.eth.getAccounts();
        await admin.methods.validateHospital(this.props.address).send({
            from: accounts[0]
        });

        
        this.setState({loading: false, disabled:true });
    

    };

    render() {
        return (
            <Layout>
                <h3>Hospital Details</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <h2>Hello Developer</h2>
                            <h3>This hospital claims to be valid hospital</h3>
                            <Button disabled={this.state.disabled} loading={this.state.loading} onClick={this.onClick} >
                                 validate
                                 </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }

}

export default validationDetail;