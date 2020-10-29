import React, {useState} from 'react';
import {NewPayment} from "./NewPayment";

export const AddPayment = (props) => {
    const [payments, setPayments] = useState([]);
    const [paymentsCounter, setPaymentsCounter] = useState(0);
    const [toPay, setToPay] = useState(0);
    const [paid, setPaid] = useState(false);
    const [newPayment, setNewPayment] = useState(false);
    const [edit, setEdit] = useState(false);
    const [acceptButtonText, setAcceptButtonText] = useState("Zatwierdz platnosci");

    function addPayment() {
        setNewPayment(!newPayment);
    }

    function acceptPayments() {
        setEdit(!edit);
        setAcceptButtonText(() => buttonText());

        if (edit) {
            fetch('http://127.0.0.1:8000/payment/setpaid', {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(getObjArray())
            }).then(res => res.json())
                .then(res => console.log(res));
        }
    }

    function getObjArray() {
        let arr = [];
        payments.map(payment => {
            arr.push({id: payment.pk, paid: payment.fields.paid})
        });
        return arr;
    }

    function paymentsToString() {
        let result = '';
        payments.forEach(payment => {
            result += objToString(payment);
        });
        return result.substring(0, result.length - 1);
    }

    function objToString(obj) {
        return '{"id":' + obj.pk + ', "paid":' + obj.fields.paid + '},';
    }

    function buttonText() {
        return edit ? "Zatwierdz platnosci" : "Zapisz";
    }

    function checkCheckbox(obj) {
        obj.fields.paid = !obj.fields.paid;
        let newState = Object.assign([], payments);
        Object.assign(newState.find(x => x['pk'] === obj['pk']), obj);
        setPayments(newState);
    }

    return (
        <div>
            <br/>
            <button onClick={addPayment}>Dodaj platnosc</button>
            {'   '}
            <button onClick={acceptPayments}>{acceptButtonText}</button>
            {newPayment &&
            <NewPayment group={props.group}/>}
        </div>
    );
};