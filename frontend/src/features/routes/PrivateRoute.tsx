import React, {  useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({children} : any) {
    const loading = useState(false)
    const loggedIn = useState(false)
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
      // dispatch(getCurrentUser())
    }, [])
  if (loggedIn) {
    return children;
  } else if (loading) {
    return <p>Loading...</p>;
  } else {
      return <Navigate to="/login" state={{from: location}} replace />;
  }
}

export default PrivateRoute