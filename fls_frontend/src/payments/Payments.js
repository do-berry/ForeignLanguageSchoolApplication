import React from 'react';
import {PaymentTable} from "../groupdetails/PaymentTable";

export const Payments = (props) => {
    return (
        <div>
            <h1>Platnosci</h1>
            <PaymentTable user={props.match.params.id}/>
        </div>
    );
}