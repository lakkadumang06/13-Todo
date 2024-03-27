import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SignUpForm from '../../component/SignUpForm';
import LoginForm from '../../component/Login';

const form = () => {
  return (
    <div className='d-flex justify-content-center'>
<div className='col-4'>
<Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="home" title="signup">
  <SignUpForm/>
      </Tab>
      <Tab eventKey="profile" title="login">
   <LoginForm/>
      </Tab>
      
    </Tabs>
</div>
    </div>
  )
}

export default form
