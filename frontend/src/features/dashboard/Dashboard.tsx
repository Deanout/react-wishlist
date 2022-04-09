import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { User } from '../sessions/sessionSlice'

function Dashboard() {
  const sessionSelector = useSelector((state: RootState) => state.session)

  const [currentUser, setCurrentUser] = useState<User | undefined | null>(null)
  const [accessToken, setAccessToken] = useState<string | undefined | null>("")
  const [refreshToken, setRefreshToken] = useState<string | undefined | null>("")


  useEffect(() => {
    setCurrentUser(sessionSelector.currentUser)
  }, [sessionSelector.currentUser])
  useEffect(() => {
    setAccessToken(sessionSelector.accessToken)
  }, [sessionSelector.accessToken])
  useEffect(() => {
    setRefreshToken(sessionSelector.refreshToken)
  }, [sessionSelector.refreshToken])

  return (
    <section>

    <div>Dashboard</div>
    <ul>
      <li>User: 
      <ul>
        <li>Id: {currentUser?.id}</li>
        <li>Email: {currentUser?.email}</li>
        <li>Role: {currentUser?.role}</li>
        <li>Created At: {currentUser?.createdAt}</li>
      </ul>
      </li>
      <li>Access Token: {accessToken}</li>
      <li>Refresh Token: {refreshToken}</li>
    </ul>
    </section>
  )
}

export default Dashboard