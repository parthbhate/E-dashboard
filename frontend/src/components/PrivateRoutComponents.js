
//we are using private components coz  we  want to private  some  features  that only can be accessed by user after login

import React from 'react';
import {Navigate,Outlet} from  'react-router-dom'

const PrivateRoutComponents=()=>{
   const auth = localStorage.getItem('user')
    return auth?<Outlet />:<Navigate to="/signup"/>
    
}

export default PrivateRoutComponents