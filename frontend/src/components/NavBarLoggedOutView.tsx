import React from 'react'
import {Button }from "react-bootstrap"

interface NavBarLoggedInViewProps{
    onSignUpClicked:()=>void,
    onLoginClicked:()=>void,
}
const NavBarLoggedOutView = ({onSignUpClicked,onLoginClicked}:NavBarLoggedInViewProps) => {
  return (
    <>
    <Button onClick={onSignUpClicked}>Sign Up</Button>
    <Button onClick={onLoginClicked}>Log In</Button>
    </>
  )
}

export default NavBarLoggedOutView