import React from 'react'
import {Button }from "react-bootstrap"

interface NavBarLoggedInViewProps{
    onSignUpClicked:()=>void,
    onLoginClicked:()=>void,
}
const NavBarLoggedOutView = ({onSignUpClicked,onLoginClicked}:NavBarLoggedInViewProps) => {
  return (
    <>
    <Button onClick={onSignUpClicked}>Log In</Button>
    <Button onClick={onLoginClicked}>Sign Up</Button>
    </>
  )
}

export default NavBarLoggedOutView