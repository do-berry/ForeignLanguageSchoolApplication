import React from 'react';
import {Route} from 'react-router-dom';

import Login from './login/Login.js';
import Register from './registration/Register.js';
import AllGroups from "./allgroups/AllGroups";
import AllUsers from "./allusers/AllUsers";
import {CreateGroup} from "./creategroup/CreateGroup";

const BaseRouter = () => (
    <div>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register}/>
        <Route exact path='/school/allgroups' component={AllGroups}/>
        <Route exact path='/school/allusers' component={AllUsers}/>
        <Route exact path='/school/creategroup' component={CreateGroup}/>
    </div>
);

export default BaseRouter;