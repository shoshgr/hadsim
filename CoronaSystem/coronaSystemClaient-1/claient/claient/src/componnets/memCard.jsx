import React, { useState } from 'react'; // שינוי כאן - הוספת סוגריים מסולסלים סביב React והוספת useState
import { Link } from 'react-router-dom';
import Member from './memberDetails';
import '../cssFiles/mem.css';


const Mem = (props) => {
    console.log(props.mem);
    const url = 'http://localhost:8080/api/members';
    const member = props.mem;

    const deleteMember = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this member?');
        if (!confirmDelete) {
            return;
        }
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.status!=200) {
                throw new Error('Network response was not ok');
            }
            const updatedMembers = props.members.filter(member => member.ID !== id);
            props.setMembers(updatedMembers);
            console.log('Member deleted successfully');
            alert("Member deleted successfully")
        })
        .catch(error => {
            alert("member didnt deleted");
            console.error('Error deleting member:', error);
        });
    };

    
        return (
            <div className="member-card">
              
                <h3>{member.FirstName}</h3>
                <h2>{member.LastName}</h2>
                <div className="buttons-container">
                    <button className="delete-button" onClick={() => deleteMember(member.ID)}>
                        Delete
                    </button>
                    <Link to={`/member/${member.FirstName}`} state={{ Id: member.ID }}>
                        <button className="details-button">More Details</button>
                    </Link>
                </div>
            </div>
        
        );
}

export default Mem;
