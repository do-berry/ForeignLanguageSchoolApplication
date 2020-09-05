import React from 'react';

export const UserData = (props) => {
    const [name, setName] = useState(props.name);
    const [surname, setSurname] = useState(props.surname);
    const [mobileNumber, setMobileNumber] = useState(props.mobileNumber);
    const [address, setAddress] = useState(props.address);
}