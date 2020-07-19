import React from 'react';
import { Route } from 'react-router-dom';

import Login from './login/Login.js';

const BaseRouter = () => (
    <div>
        <Route exact path='/login' component={Login} />
    </div>
);

export default BaseRouter;