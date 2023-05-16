import React, { useState } from "react";
import { useMsal } from '@azure/msal-react'
import { useIsAuthenticated } from '@azure/msal-react';
import './login.css';
function Login() {
  const { instance, accounts, inProgress } = useMsal()
  const isAuthenticated = useIsAuthenticated()

  const LoginHandler = () => {
    // console.log("Trying to login via popup")
    try {
      const loginResponse = instance.loginRedirect().then(response => {
        console.log("Login Response: " + response.json())
      });

      console.log(loginResponse)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className="wrapper ">
        <div id="formContent">
          {inProgress === 'none' ?
            <></>
            :
            <div className="loader-wrapper">
              <div className="loader"></div>

            </div>

          }<div className=" first">
            <img src={`/nofa/images/hqsft-logo_1.png`} alt="Hcd" />
            <p>HQ Software Consulting</p>
          </div>

          <button onClick={LoginHandler} type="submit" className=" fourth btnlogin btn btn-primary"><i className="fa fa-sign-out" aria-hidden="true"></i> Login</button>
          <div id="formFooter">
            <a className="underlineHover" >Login to your account.</a>
          </div>

        </div>
      </div>
    </div>
  );
}


export default Login;
