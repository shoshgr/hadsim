import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddVaccine from "./addVaccien";
import AddIlness from "./addIlness";
import '../cssFiles/member.css';
import CoronaDetailes from "./coronaDetailes";

const Member = () => {
    const url = 'http://localhost:8080/api/members';
    const location = useLocation();
    const memberId = location.state.Id;
    const [member, setMem] = useState();
    const [toUpdate, setToUpdate] = useState(false);
    const [vaccineForm, setVaccineForm] = useState(false);
    const [ilnessForm, setIlnessForm] = useState(false);
    const [vaccines, setVaccines] = useState(null);
    const [illness, setIlness] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        id: '',
        citi: '',
        street: '',
        houseNO: '',
        birthDate: '',
        phone: '',
        mobile: '',
    });
    const [showCorona, setCorona] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (memberId) {
            fetch(`${url}/${memberId}`)
                .then(response => response.json())
                .then(data => {
                    setMem(data[0]);
                    setIlness(data[1].Illness[0]);
                    setVaccines(data[2].Vaccinations);
                    setFormData({
                        firstName: data.FirstName,
                        lastName: data.LastName,
                        id: data.IDNumber,
                        citi: data.AddressCiti,
                        street: data.AddressStreet,
                        houseNO: data.AddressNumber,
                        birthDate: new Date(data.BirthDate).toLocaleDateString('en-GB'),
                        phone: data.Phone,
                        mobile: data.MobilePhone,
                    });
                }).then(res=>(res.status!=200)?alert("error while getting member details"):null)
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [memberId]);

    const handleUpdateClick = () => {
        setToUpdate(prevState => !prevState);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'mobile' && !/^\d+$/.test(value)) {
            alert("mobile can only be numbers");
            return;
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/${memberId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to update member data');
            }
            alert('Member data updated successfully!');
            setToUpdate(false);
            setMem(formData);
        } catch (error) {
            console.error('Error updating member data:', error);
            alert('An error occurred while updating member data');
        }
    };

    return (<>
    <button className="back-button" onClick={() => { navigate(-1) }}>
    Back
</button>
        <div className="member-container">
           

            {member && (
                <div className="member-details">
                    {console.log(member)}
                    <h2> {member.FirstName} details</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">First Name:</label>
                        <input type="text" id="name" name="firstName" readOnly={!toUpdate} placeholder={formData.firstName || member.FirstName} onChange={handleChange} />
                        <label htmlFor="lastname">Last Name:</label>
                        <input type="text" id="lastname" name="lastName" readOnly={!toUpdate} value={formData.lastName || member.LastName} onChange={handleChange} />
                        <label htmlFor="id">ID:</label>
                        <input type="text" id="id" name="id" readOnly={!toUpdate} value={formData.id || member.IDNumber} onChange={handleChange} />
                        <label htmlFor="citi">City:</label>
                        <input type="text" id="citi" name="citi" readOnly={!toUpdate} value={formData.citi || member.AddressCity} onChange={handleChange} />
                        <label htmlFor="street">Street:</label>
                        <input type="text" id="street" name="street" readOnly={!toUpdate} value={formData.street || member.AddressStreet} onChange={handleChange} />
                        <label htmlFor="houseNO">House Number:</label>
                        <input type="text" id="houseNO" name="houseNO" readOnly={!toUpdate} value={formData.houseNO || member.AddressNumber} onChange={handleChange} />
                        <label htmlFor="birthDate">Birth Date:</label>
                        <input type={(!toUpdate) ? "text" : "data"} id="birthDate" name="birthDate" readOnly={!toUpdate} value={new Date(member.BirthDate).toLocaleDateString('en-US')} onChange={handleChange} />
                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" id="phone" name="phone" readOnly={!toUpdate} value={formData.phone || member.Phone} onChange={handleChange} />
                        <label htmlFor="mobile">Mobile:</label>
                        <input type="tel" id="mobile" name="mobile" readOnly={!toUpdate} value={formData.mobile || member.MobilePhone} onChange={handleChange} />
                        {toUpdate && <button type="submit">Submit</button>}
                    </form>
                    <button onClick={handleUpdateClick}>{toUpdate ? 'Cancel Update' : 'Update My Details'}</button>
                    {(vaccines&&vaccines.length || illness) && <button onClick={() => setCorona(!showCorona)}>{showCorona?"hide corona details":"Show Corona Details"}</button>}
                    {console.log(vaccines)}

                    {(vaccines.length < 4) ? <button onClick={() => { setVaccineForm(true) }}>add vaccine</button> : null}
                    {(!illness) ? <button onClick={() => { setIlnessForm(true) }}>add ilness</button> : null}

                    {(vaccineForm) ? <AddVaccine setVaccines={setVaccines} vaccines={vaccines} setVaccineForm={setVaccineForm} memberId={memberId} /> : null}

                    {(ilnessForm) ? <AddIlness setIlness={setIlness} illness={illness} setIlnessForm={setIlnessForm} memberId={memberId} /> : null}
                    {showCorona &&
                        <CoronaDetailes memberId={memberId} illness={illness} setVaccines={setVaccines} vaccines={vaccines} setIlness={setIlness} />
                    }


                </div>
            )}
        </div>
        </>);
}

export default Member;

