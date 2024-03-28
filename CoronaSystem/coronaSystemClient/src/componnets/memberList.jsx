import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Mem from "./memCard";
import '../cssFiles/MemberList.css';

const MemberList = () => {
    const [members, setMembers] = useState([]);
    const url = 'http://localhost:8080/api/members';
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${url}`)
            .then(response => response.json())
            .then(data => setMembers(data)).then(res => (res.status!=200)?alert("error while getting data from the server"):null)
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="member-list-container">
            <h4>member list</h4>
            <div className="member-list-scroll">
                {members.length > 0 ? (
                    members.map(member => (
                        <Mem className="memDive" key={member.ID} mem={member} setMembers={setMembers} members={members} />
                    ))
                ) : (
                    <p>No members found. Please add members.</p>
                )}
            </div>
            <Link to={"/addMember"} className='add-member-link'>Add Member</Link>
        </div>
    );
}

export default MemberList;

