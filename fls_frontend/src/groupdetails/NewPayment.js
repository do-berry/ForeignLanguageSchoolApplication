import React, {useState} from 'react';

export const NewPayment = (props) => {
    const [cost, setCost] = useState(0);
    const [paid, setPaid] = useState(false);

    function newPayment() {
        fetch('http://127.0.0.1:8000/payment/createpayment', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                person: { id: sessionStorage.getItem('userId') },
                group: { id: props.group },
                to_pay: cost,
                paid: Boolean(paid)
            })
        });
        window.location.reload(false);
    }

    return (
        <div>
            <br/>
            <label>Kwota:</label>{'   '}
            <input type='number' placeholder='kwota'
                   value={cost} onChange={e => setCost(e.target.value)}/>
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