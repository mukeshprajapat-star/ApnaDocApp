import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import  {BrowserRouter as Router,Routes,Route} from "react-router-dom" 
import { useSelector } from 'react-redux'
import Spinner from './components/Spinner'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import ApplyDocter from './pages/ApplyDocter'
import Notification from './pages/Notification'
import Doctors from './pages/admin/Doctors'
import Users from './pages/admin/Users'
import Profile from './pages/doctor/Profile'
import BookingPage from './pages/BookingPage'
import Appointments from './pages/Appointments'
import DoctorAppointment from './pages/doctor/DoctorAppointment'

const App = () => {
  const {loading}=useSelector(state=>state.alerts)
  return (  
    <Router>
      {loading ? (
      <Spinner/>
      ):(
      <Routes>
        <Route path="/" element={<ProtectedRoute> <Home/></ProtectedRoute>} />
        <Route path="/apply-doctor" element={<ProtectedRoute> <ApplyDocter/></ProtectedRoute>} />
        <Route path="/notification" element={<ProtectedRoute> <Notification/></ProtectedRoute>} />
        <Route path="/admin/doctors" element={<ProtectedRoute> <Doctors/></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute> <Users/></ProtectedRoute>} />
        <Route path="/doctor/profile/:id" element={<ProtectedRoute> <Profile/></ProtectedRoute>} />
        <Route path="/doctor/book-appointment/:doctorId" element={<ProtectedRoute> <BookingPage/></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute> <Login/></PublicRoute>} />
        <Route path="/register" element={<PublicRoute> <Register/></PublicRoute>} />
        <Route path="/appointments" element={<ProtectedRoute> <Appointments/></ProtectedRoute>} />
        <Route path="/doctor-appointments" element={<ProtectedRoute> <DoctorAppointment/></ProtectedRoute>} />


      </Routes> 
      )
      }
    </Router> 
  )
}

export default App