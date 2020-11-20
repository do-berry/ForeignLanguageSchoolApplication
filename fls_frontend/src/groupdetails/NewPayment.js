import React, {useState} from 'react';

export const NewPayment = (props) => {
    const [amount, setAmount] = useState(0);
    const [details, setDetails] = useState("");
    const [paid, setPaid] = useState(false);
    const [group, setGroup] = useState(1);

    function newPayment() {
        setGroup(1);
        fetch('http://127.0.0.1:8000/payment/createpayment', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                details: details,
                amount: amount,
                paid: Boolean(paid),
                student: {
                    id: props.user
                },
                assistant: {
                    id: sessionStorage.getItem("userId")
                }
            })
        });
        window.location.reload(false);
    }

    return (
        <div>
            <br/>
            <label>Kwota:</label>{'   '}
            <input type='number' placeholder='kwota'
                   value={amount} onChange={e => setAmount(e.target.value)}/>
            <br/>
            <label>Opis:</label>{'     '}
            <input type='text' placeholder='opis'
                   value={details} onChange={e => setDetails(e.target.value)}/>
            <br/>
            <label>Wplacono:</label>{'    '}
            <input type="checkbox" id="paid" value={paid}
                   onChange={e => setPaid(e.target.value)}
            />
            <br/>
            <button onClick={newPayment}>Zapisz</button>
        </div>
    );
}