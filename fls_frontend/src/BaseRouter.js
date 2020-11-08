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
import {PageNotFound} from "./pagenotfound/PageNotFound";
import {Redirect} from "react-router";
import {UserType} from "./static/UserType";
import {LogOut} from "./login/LogOut";
import {Payments} from "./payments/Payments";
import {Homepage} from "./homepage/Homepage";

const BaseRouter = () => (
    <div>
        <Route exact path='/login' component={Login}/>
        <ProtectedRoute path='/register' component={Register} type={[UserType.CUSTOMER_ASSISTANT]}/>
        <ProtectedRoute path='/school/allgroups' component={AllGroups} type={[UserType.CUSTOMER_ASSISTANT]}/>
        <ProtectedRoute path='/school/allusers' component={AllUsers} type={[UserType.CUSTOMER_ASSISTANT]}/>
        <ProtectedRoute path='/school/creategroup' component={CreateGroup} type={[UserType.CUSTOMER_ASSISTANT]}/>
        <ProtectedRoute path='/user/profile' component={UserProfile} type={[UserType.STUDENT, UserType.TEACHER,
            UserType.CUSTOMER_ASSISTANT]}/>
        <ProtectedRoute path='/school/group/:id' component={GroupDetails} type={[UserType.STUDENT, UserType.TEACHER,
            UserType.CUSTOMER_ASSISTANT]}/>
        <ProtectedRoute path='/school/group/lesson/note' component={LessonDetails}
                        type={[UserType.STUDENT, UserType.TEACHER,
                            UserType.CUSTOMER_ASSISTANT]}/>
        <ProtectedRoute path='/user/:id/payments' component={Payments} type={[UserType.CUSTOMER_ASSISTANT,
            UserType.STUDENT]}/>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/404' component={PageNotFound}/>
        <Route exact path='/logout' component={LogOut}/>
    </div>
);

// type -> an array contains type of users
const ProtectedRoute = ({component: Component, type: type, ...rest}) => (
    <Route {...rest} render={props => (
        type.length > 0 ? (
            sessionStorage.getItem('userType') !== null
            && type.includes(sessionStorage.getItem('userType').toString()) ? (
                <Component {...props} />) : (
                <Redirect to={{pathname: '/404'}}/>
            )) : (<Redirect to={{pathname: '/404'}}/>))}/>
);

export default BaseRouter;