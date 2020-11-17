import React from 'react';
import {PaymentTable} from "../groupdetails/PaymentTable";

export const Payments = (props) => {
    return (
        <div>
            <h1>Płatności</h1>
            <PaymentTable user={props.match.params.id}/>
        </div>
    );
}