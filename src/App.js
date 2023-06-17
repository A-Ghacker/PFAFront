import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import { useState, useEffect } from 'react';
import AdminSideNav from './components/admin/AdminSideNav';
import ProfilePage from './components/admin/ProfilePage';
import CategoryCrudComponent from './components/admin/UsersCategory';
import UserListComponent from './components/admin/Users';
import AdminProjects from './components/admin/AdminProjects';
import AdminDashboard from './components/admin/AdminDashboard';
import ProjectManagerProfile from './components/project_manager/ProjectMangerProfile';
import ProjectManagerProjects from './components/project_manager/ProjectManagerProjects';
import ProjectManagerSideNav from './components/project_manager/ProjectManagerSideNav';
import TeamMemberSideNav from './components/team_member/TeamMemberSideNav';
import TeamMemberProfile from './components/team_member/TeamMemberProfile';
import TeamMemberProject from './components/team_member/TeamMemberProject';

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Retrieve the role from local storage or state variable
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  return (
    <Router>
      {/* Render the AdminSidebar and ProfilePage only for the administrator */}
      {role === 'Admin' && (
        <div className="app-container">
          <AdminSideNav />
          <Routes>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/users/category" element={<CategoryCrudComponent />} />
            <Route path="/users" element={<UserListComponent />} />
            <Route path='/projects' element={<AdminProjects />} />
            <Route path='/dashboard' element={<AdminDashboard />} />
          </Routes>
        </div>
      )}

      {role === 'Project Manager' && (
        <div className="app-container">
          <ProjectManagerSideNav />
          <Routes>
            <Route path="/profileProjectManger" element={<ProjectManagerProfile />} />
            <Route path='/ProjectManagerProjects' element={<ProjectManagerProjects />} />
          </Routes>
        </div>
      )}

      {role !== 'Project Manager' && role !=='Admin' && localStorage.getItem('role')!==null && (
        <div className="app-container">
          <TeamMemberSideNav />
          <Routes>
            <Route path="/profileTeamMember" element={<TeamMemberProfile />} />
            <Route path='/TeamMemberProjects' element={<TeamMemberProject />} />
          </Routes>
        </div>
      )}


      <Routes>
        <Route path="/RegisterForm" element={<RegisterForm />} />
        <Route path="/LoginForm" element={<LoginForm />} />
      </Routes>

    </Router>
  );
}

export default App;
