import React from 'react';
import admin from '../ethereum/admin'
import {Card,Button} from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link} from '../routes';

class hospitalList extends React.Component {
    static async getInitialProps() {
        const hospitals = await admin.methods.getRegisterdHospital().call();
        return {hospitals};
    }
    renderHospitals() {
        const items = this.props.hospitals.map(address => {
            return{
                header: address,
                description:( 
                <Link route={`/hospitals/${address}`}>
                <a>view hospital</a>
                </Link>
                ),
                fluid: true
            };
        });
        return <Card.Group items={items} />;
    }
   

    render(){
        return (
        <Layout>
            <div>
                <h3>Open Charity</h3>
               
                <Button
                    style={{ marginTop: '10px' }}
                    content="Register As hospital"
                    icon="share square"
                    color='grey'
                    floated='right'
                />
                {this.renderHospitals()}
            </div>;
        </Layout>
        );    
    }
}

export default hospitalList;