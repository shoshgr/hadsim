import './App.css';
import { BrowserRouter as Router,Navigate, Route, Routes } from 'react-router-dom';

import MemberList from './componnets/memberList';

import Member from './componnets/memberDetails'
import AddMember from './componnets/addMember'
function App() {
  return (
    <Router>      
       <Routes>
          <Route path="/addMember" element={<AddMember />}/>
          <Route path="/" element={<MemberList /> } /> 
          <Route path="member/:name" element={<Member />} /> 
          <Route  path="/memberList" element={<MemberList />} />
      </Routes>
    </Router>
    
  );
}

export default App;
