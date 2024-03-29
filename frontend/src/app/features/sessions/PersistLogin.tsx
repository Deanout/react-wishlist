import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../../store";
import { refreshAccessToken } from "./sessionSlice";

function PersistLogin() {
  const isLoading = useSelector((state: RootState) => state.session.loading);
  const dispatch = useDispatch();
  const accessToken = useSelector((state : RootState) => state.session.accessToken);
  const refreshToken = useSelector((state : RootState) => state.session.refreshToken);
  useEffect(() => {
    function verifyRefreshToken() {
      try {
        dispatch(refreshAccessToken(refreshToken));
      } catch (error) {
        console.log(error);
      }
    }
    if (!accessToken) {
      verifyRefreshToken();
    }
  }, [accessToken, refreshToken]);
  
  return (
  <>
    {isLoading ? <p>Loading...</p> : <Outlet />}
  </>);
}

export default PersistLogin;
