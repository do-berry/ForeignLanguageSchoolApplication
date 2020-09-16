import React from 'react';
import {Route} from 'react-router-dom';

import Login from './login/Login.js';
import Register from './registration/Register.js';
import AllGroups from "./allgroups/AllGroups";
import AllUsers from "./allusers/AllUsers";
import {CreateGroup} from "./creategroup/CreateGroup";
import {UserProfile} from "./userprofile/UserProfile";
import {GroupDetails} from "./groupdetails/GroupDetails";
import {LessonDetails} from "./lessondetails/LessonDetails";

const BaseRouter = () => (
    <div>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/school/allgroups' component={AllGroups}/>
            <Route exact path='/school/allusers' component={AllUsers}/>
            <Route exact path='/school/creategroup' component={CreateGroup}/>
            <Route exact path='/user/profile' component={UserProfile}/>
            <Route exact path='/school/group/:id' component={GroupDetails}/>
            <Route exact path='/school/group/lesson/note' component={LessonDetails}/>
    </div>
);

export default BaseRouter;