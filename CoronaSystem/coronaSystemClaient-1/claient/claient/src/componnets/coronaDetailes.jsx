import React, { useState } from "react";
import "../cssFiles/coronaDetails.css"; // יש להיות מקובץ css מתאים

const CoronaDetailes = (props) => {
    const [addDisplay, setAddDisplay] = useState(false);
    const [formData, setFormData] = useState({
        PositiveTestDate: props.illness && props.illness.PositiveTestDate || "",
        RecoveryDate: props.illness && props.illness.RecoveryDate || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const updateIlness = async (e) => {
        e.preventDefault();
        if (!e.target || !e.target.querySelector) {
            console.error('Invalid event or target');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/members/corona/illness/${props.memberId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ RecoveryDate: e.target.querySelector('#AddRecoveryDate').value }),
            });
            if (!response.ok) {
                throw new Error('Failed to add recovery data');
            }
            alert('Recovery data added successfully!');
            setAddDisplay(false);
            setFormData({
                PositiveTestDate: props.illness.PositiveTestDate,
                RecoveryDate: e.target.querySelector('#AddRecoveryDate').value,
            });
            props.setIlness({
                PositiveTestDate: props.illness.PositiveTestDate,
                RecoveryDate: e.target.querySelector('#AddRecoveryDate').value,
            });
        } catch (error) {
            console.error('Error updating member data:', error);
            alert('An error occurred while updating member data');
        }
    };

    return (
        <div className="corona-details">
            <div className="vaccines-container">
                <h3>Vaccines:</h3>
                <div className="vaccine-list">
                    {props.vaccines.map((v, index) => (
                        <div key={index} className="vaccine-item">
                            <p>Date: {new Date(v.VaccinationDate).toLocaleDateString('en-US')}</p>
                            <p>Manufacturer: {v.VaccineManufacturer}</p>
                        </div>
                    ))}
                </div>
            </div>
            {props.illness && (
                <div className="illness-info">
                    <h3>Illness Information:</h3>
                    <label htmlFor="PositiveTestDate">Positive Test Date:</label>
                    <input type="text" id="PositiveTestDate" name="PositiveTestDate" readOnly value={new Date(formData.PositiveTestDate).toLocaleDateString('en-US')} onChange={handleChange} />
                    <label htmlFor="RecoveryDate">Recovery Date:</label>
                    <input type="text" id="RecoveryDate" name="RecoveryDate" readOnly={formData.RecoveryDate} value={formData.RecoveryDate && new Date(formData.RecoveryDate).toLocaleDateString('en-US') || "Add your recovery date"} />
                </div>
            )}
            {props.illness &&!props.illness.RecoveryDate && (
                <button onClick={() => { setAddDisplay(true) }}>Add Recovery Date</button>
            )}
            {addDisplay && (
                <form className="add-recovery-form" onSubmit={updateIlness}>
                    <label htmlFor="AddRecoveryDate">Add Recovery Date:</label>
                    <input type="date" id="AddRecoveryDate" />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}

export default CoronaDetailes;

