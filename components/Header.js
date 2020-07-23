import React from 'react';
import { Menu,Dropdown,Segment } from 'semantic-ui-react';
import {Link} from '../routes';


export default () => {
    return(
        <Segment inverted>
        <Menu inverted secondary>
            <Link route="/"><a>
            <Menu.Item>
                DeCovid
                charity
            </Menu.Item></a></Link>
            <Menu.Menu position='right'>
             
             <Dropdown item text='REGISTER'>
            <Dropdown.Menu>
              <Link route="/validHospitalList"><a className="item">Contribute</a></Link>
              <Link route="/hospitals/register"><a className="item">As A Hospital</a></Link>
            </Dropdown.Menu>
          </Dropdown>
             <a href="/help" className="item"> help</a>
            </Menu.Menu>
        </Menu>
        </Segment>
    );  
};