import React, { useRef } from "react";

const AddIlness = (props) => {
    const url = 'http://localhost:8080/api/members';
    const PositiveTestDate = useRef();
    const RecoveryDate = useRef();

    const addIlness = (e) => {
        e.preventDefault();

        const positiveTestDateValue = PositiveTestDate.current.value;
        const recoveryDateValue = RecoveryDate.current.value;
        const currentDate = new Date().toISOString().split('T')[0]; // תאריך נוכחי בפורמט YYYY-MM-DD

        // בדיקה שהתאריך של החלמה והתאריך של הבדיקה אינם אחרי התאריך הנוכחי
        if (recoveryDateValue > currentDate || positiveTestDateValue > currentDate) {
            alert("Dates cannot be after today's date.");
            return;
        }

        // בדיקה שהתאריך של החלמה יהיה אחרי תאריך המחלה
        if (recoveryDateValue&&recoveryDateValue <= positiveTestDateValue) {
            alert("Recovery Date must be after Positive Test Date.");
            return;
        }

        const ilness = {
            PositiveTestDate: positiveTestDateValue,
            RecoveryDate: recoveryDateValue
        }

        fetch(`${url}/corona/illness/${props.memberId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ilness),
            mode: 'cors'
        }).then((res) => {
            if (res.status === 200) {
                alert("The illness was successfully added");
                props.setIlnessForm(false);
                props.setIlness(ilness);
            }
        }).catch(err => alert(err));
    }

    return (
        <form onSubmit={addIlness}>
            <label htmlFor="PositiveTestDate">PositiveTestDate:</label>
            <input type="date" name="PositiveTestDate" id="PositiveTestDate" ref={PositiveTestDate} />
            <label htmlFor="RecoveryDate">RecoveryDate:</label>
            <input type="date" id="RecoveryDate" name="RecoveryDate" ref={RecoveryDate} />
            <button type="submit">Submit</button>
        </form>
    );
}

export default AddIlness;

