import React from 'react';
import {Route} from 'react-router-dom';

import Login from './login/Login.js';
import Register from './registration/Register.js';

const BaseRouter = () => (
    <div>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
    </div>
);

export default BaseRouter;