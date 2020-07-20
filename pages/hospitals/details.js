import React from 'react';
import Layout from '../../components/Layout';
import Hospital from '../../ethereum/hospital';
import web3 from '../../ethereum/web3';
import {Card,Grid,Button} from 'semantic-ui-react';
import ContributeForm from '../../components/contributeForm';
import {Link } from '../../routes';


class hospitalDetails extends React.Component {
     
    static async getInitialProps(props) {
        const hospital = Hospital(props.query.address);
        const summary = await hospital.methods.getDetails().call();
       return {
            address: props.query.address,
            manager: summary[0],
            name: summary[1],
            no: summary[2],
            location: summary[3],
            contributersCount: summary[4]
        };
    }

    renderCards() {
        const {
            manager,
            name,
            no,
            location,
            contributersCount
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
                
            }
        ];
        return <Card.Group items={items} />
    }
 
    render() {
        return (
            <Layout>
                <h3> Hospital Details </h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={10}>
                    <Link route={`/hospitals/${this.props.address}/withdraw`}>           
                    <a> <Button
                    style={{ marginTop: '30px' }}
                    content="Withdraw Donation"
                    icon="key"
                    color='grey'
                      /></a>
                      </Link>
                      
                          <Link route={`/hospitals/${this.props.address}/contributerList`}>
                             <a><Button
                              style={{ marginTop: '30px', marginLeft: "30px" }}
                              content="view contributer list"
                              icon="list ul"
                              color="grey"/></a>
                               </Link>
                      </Grid.Column>
                    </Grid.Row>
                </Grid>      
            </Layout>
        );
    }
}

export default hospitalDetails;