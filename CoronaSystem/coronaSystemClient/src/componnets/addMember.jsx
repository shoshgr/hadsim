import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../cssFiles/addMem.css'; // יבוא קובץ ה-CSS

const AddMem = () => {
  const url = 'http://localhost:8080/api/members/';
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    IDNumber: '',
    AddressCity: '',
    AddressStreet: '',
    AddressNumber: '',
    BirthDate: '',
    Phone: '',
    MobilePhone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePhoneNumber = (number) => {
    return /^\d+$/.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidPhone = validatePhoneNumber(formData.Phone);
    const isValidMobilePhone = validatePhoneNumber(formData.MobilePhone)||"";
 ;

    if (!isValidPhone) {
      alert('Invalid Phone number. Please enter only digits.');
      return;
    }

    if (!isValidMobilePhone) {
      alert('Invalid Mobile Phone number. Please enter only digits.');
      return;
    }

    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        mode: 'cors'
      });
      if (response.status === 200) {
        alert('The member was added successfully');
        navigate("/memberList");
      }
      else{
        alert("the Network respons was not ok , heck your details again");
      }
    } catch (error) {
      alert(error);
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-member-container">
      <button className="back-button" onClick={() => { navigate(-1) }}>
        Back
      </button>
      <h2>Add Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="FirstName">First Name:</label>
          <input type="text" id="FirstName" name="FirstName" value={formData.FirstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="LastName">Last Name:</label>
          <input type="text" id="LastName" name="LastName" value={formData.LastName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="IDNumber">ID Number:</label>
          <input type="text" id="IDNumber" name="IDNumber" value={formData.IDNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="AddressCity">City:</label>
          <input type="text" id="AddressCity" name="AddressCity" value={formData.AddressCity} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="AddressStreet">Street:</label>
          <input type="text" id="AddressStreet" name="AddressStreet" value={formData.AddressStreet} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="AddressNumber">House Number:</label>
          <input type="text" id="AddressNumber" name="AddressNumber" value={formData.AddressNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="BirthDate">Birth Date:</label>
          <input type="date" id="BirthDate" name="BirthDate" value={formData.BirthDate} onChange={handleChange} max={new Date().toISOString().split('T')[0]} required />
        </div>
        <div className="form-group">
          <label htmlFor="Phone">Phone:</label>
          <input type="tel" id="Phone" name="Phone" value={formData.Phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="MobilePhone">Mobile Phone (Optional):</label>
          <input type="tel" id="MobilePhone" name="MobilePhone" value={formData.MobilePhone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddMem;
