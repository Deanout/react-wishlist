import { Button } from "@mui/material";
import { useEffect } from "react";
import axios from "../../api/axios";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { refreshAccessToken } from "./sessionSlice";

function useRefreshToken() {
  const dispatch = useAppDispatch();
  const refreshToken = useAppSelector((state) => state.session.refreshToken);
  useEffect(() => {
    if (!refreshToken) {
      return;
    }
    dispatch(refreshAccessToken({}));
  }, [])
  return (
    <></>
  );
};

export default useRefreshToken;
