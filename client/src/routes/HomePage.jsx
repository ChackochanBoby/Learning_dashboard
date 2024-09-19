import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

function HomePage() {
  const userFromRedux = useSelector(state => state.loginReducer.user)
  const [user,setUser]=useState({})
  useEffect(() => {
    setUser(userFromRedux)
  },[userFromRedux])


  return (
    <main>
      <h1>{`Hello${user ? " " + user.name : ""}`}</h1>
      {user && Array.isArray(user.role) && user.role.includes("instructor") ? (
        <>true</>
      ) : null}
    </main>
  )
}

export default HomePage