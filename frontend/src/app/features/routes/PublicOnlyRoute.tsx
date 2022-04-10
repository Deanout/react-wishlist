import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../store';

function PublicOnlyRoute({children} : any) {
    const accessToken = useSelector((state : RootState) => state.session.accessToken); 
    const loading = useSelector((state : RootState) => state.session.loading);
    const location = useLocation();
    
  if (!accessToken) {
    return children;
  } else if (loading) {
    return <p>Loading...</p>;
  } else {
    let fromLocation = (location.state as any)?.from;
      let previousLocation = location.state ? fromLocation : { pathname: '/' };
      return <Navigate to={previousLocation} state={{from: location}} replace />;
  }
}

export default PublicOnlyRoute 