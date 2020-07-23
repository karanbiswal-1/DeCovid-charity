import React from 'react';
import Layout from '../components/Layout';
import {Button} from 'semantic-ui-react';
import { Link } from '../routes';


class homePage extends React.Component {
    render() {
        return(
            <div>
     
            <Layout>
             <div>
             <h1 
             style={{textAlign: "center",
            color:"dimgrey",
            fontSize:"50px",
            marginTop:"17%"
            }}
             >DeCovid Charity</h1>
             <h3
             style={{
                 textAlign:"center",
                 color:"darkgrey"
             }}
             >A Decentralised Transparent Charitable Trust For Covid Paitients</h3>
            <Link route="/validHospitalList">
             <a><Button 
             style={{width:"300px",
            marginTop:"40px",
            marginLeft:"200px"
            }}
             basic color="grey">Be A Helper</Button></a>
            </Link>
            <Link route="/hospitals/register">
             <a>   <Button 
             style={{width:"300px",
            marginTop:"40px",
            marginLeft:"100px"
            }}
             basic color="grey">Register As Hospital</Button></a>
             </Link>
         </div>
         </Layout>
         </div>
        );
    }
}

export default homePage;