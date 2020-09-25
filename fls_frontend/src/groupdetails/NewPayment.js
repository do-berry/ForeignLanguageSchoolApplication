import React, {useState} from 'react';

export const NewPayment = (props) => {
    const [cost, setCost] = useState(0);
    const [paid, setPaid] = useState(false);

    return (
        <div>
            <br/>
            <label>Wplacona kwota:</label>
            <input type='number' placeholder='kwota'
                   value={cost} onChange={e => setCost(e.target.value)}/>
            <br/>
            <label>Wplacono:</label>
            <input type="checkbox" id="paid" value={paid}
                   onChange={e => setPaid(e.target.value)}/>
        </div>
    );
}