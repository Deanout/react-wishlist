import React, {  useState } from 'react'
import { Navigate } from 'react-router-dom';

function PrivateRoute({children} : any) {
    const loading = useState(false)
    const loggedIn = useState(false)
  if (loggedIn) {
    return children;
  } else if (loading) {
    return <p>Loading...</p>;
  } else {
      return <Navigate to="/login" />;
  }
}

export default PrivateRoute