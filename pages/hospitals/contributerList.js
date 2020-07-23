import React from 'react';
import {Card,Button,Grid} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Hospital from '../../ethereum/hospital';
import {Link} from '../../routes';

class contributerList extends React.Component {
    static async getInitialProps(props) {
        const { address} = props.query;
        const hospital = Hospital(address);
        const contributerCount = await hospital.methods.contributersCount().call();
        const values = await hospital.methods.getContributersValue().call();

        const contributers = await Promise.all(
            Array(parseInt(contributerCount))
              .fill()
              .map((element,index) => {
                return hospital.methods.contributersList(index).call();
              })
        );
        return {contributers, values};
    }
    
    renderList() {
        const items = this.props.contributers.map(address => {
            return {
                header: address,
                description: "Address of contributer ",
                fluid: true
            };
        });
        return <Card.Group items={items} />
    }
    rendervalue() {
        const items = this.props.values.map(donation => {
            return {
                header: donation,
                description:"Amount(in wei)",
                fluid: true
            };
        });
        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <div>
                    <h2>Contributers List</h2>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10}>
                             {this.renderList()}
                            </Grid.Column>
                            <Grid.Column width={6}>
                                {this.rendervalue()}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    
                </div>
            </Layout>
        );
    }

}

export default contributerList;