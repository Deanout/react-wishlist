import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import  {logout}  from '../sessions/sessionSlice';

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(logout());
        navigate('/login');
    }, [])
  return (
    <div>Logout</div>
  )
}

export default Logout