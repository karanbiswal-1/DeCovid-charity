import React from 'react';
import {Card,Button} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Hospital from '../../ethereum/hospital';
import {Link} from '../../routes';

class contributerList extends React.Component {
    static async getInitialProps(props) {
        const { address} = props.query;
        const hospital = Hospital(address);
        const contributerCount = await hospital.methods.contributersCount().call();

        const contributers = await Promise.all(
            Array(parseInt(contributerCount))
              .fill()
              .map((element,index) => {
                return hospital.methods.contributersList(index).call();
              })
        );
        return {contributers};
    }
    
    renderList() {
        const items = this.props.contributers.map(address => {
            return {
                header: address,
                description: " ",
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
                    {this.renderList()}
                </div>
            </Layout>
        );
    }

}

export default contributerList;