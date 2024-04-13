import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/alertslice";
import { setUser } from "../redux/features/userSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch=useDispatch() ;
  const  {user}=useSelector(state=>state.user);
  const getUser=async ()=>{
    try {
      dispatch(showLoading())
      const res=await axios.post("/api/v1/me" ,{token:
        localStorage.getItem("token")
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")} `
        }
      } )
      dispatch(hideLoading())
      if(res.data.success){
        dispatch(setUser(res.data.data))
      }
      else{
        <Navigate to="/login" />
        localStorage.clear()
      }
    } catch (error) {
      dispatch(hideLoading())
      localStorage.clear()
      console.log(error)
    }
  }
  useEffect(() => {
  if(!user){
    getUser();
  }
  }, [user,getUser])
  
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;