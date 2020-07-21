import React from "react";

class UserCredentials extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            is_student: false,
            is_teacher: false,
            is_customer_assistant: false,
            is_admin: false,
        }
    }
}

export default new UserCredentials();