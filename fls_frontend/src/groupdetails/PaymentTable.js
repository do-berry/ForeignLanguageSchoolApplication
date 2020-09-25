import React, {useEffect, useState} from 'react';
import './PaymentTable.css';
import {NewPayment} from "./NewPayment";

export const PaymentTable = (props) => {
    const [payments, setPayments] = useState([]);
    const [paymentsCounter, setPaymentsCounter] = useState(0);
    const [toPay, setToPay] = useState(0);
    const [newPayment, setNewPayment] = useState(false);

    function handleClick() {
        setNewPayment(!newPayment);

        // fetch('http://127.0.0.1:8000/payment/createpayment', {
        //     method: 'post',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         person: { id: sessionStorage.getItem('userId') },
        //         group: { id: props.group },
        //         to_pay: toPay,
        //         paid: true
        //     })
        // }).then(res => res.json());
        // window.location.reload(false);
    }

    useEffect(() => {
        fetch('http://127.0.0.1:8000/payment/findpaymentbypersonandgroup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "person": sessionStorage.getItem("userId"),
                "group": props.group
            })
        })
            .then(response => response.json())
            .then(data => {
                data.map(item => {
                    payments.push(item)
                });
                setPaymentsCounter(data.length);
            });
    }, []);

    return (
        <div>
            <h4>Platnosci uzytkownika</h4>
            <table id='paymentTable'>
                <tr>
                    <th>Nr</th>
                    <th>Kwota</th>
                    <th>Zaplacono</th>
                </tr>
                {paymentsCounter > 0 &&
                payments.map((value, index) => {
                    return (
                        <tr key={index}>
                            <td>{++index}</td>
                            <td>{value.fields.to_pay}</td>
                            <td>
                                <input type="checkbox" id="scales" name="scales"
                                       checked={value.fields.paid}/>
                            </td>
                        </tr>
                    );
                })
                }
            </table>
            <br/>
            <button onClick={handleClick}>Dodaj platnosc</button>
            {newPayment &&
            <NewPayment group={props.group}/>}
        </div>
    );
}