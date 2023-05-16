import React, { useState } from "react";
import {
  BrowserRouter as Router, Route,Switch
} from "react-router-dom";

import Index from './ListData/Index';
import NofaProgram from './NofaProgram/main';
import ViewData from './ListData/viewData';
import { useIsAuthenticated } from '@azure/msal-react';
import Login from './Login/Index';
import Admin from './NofaProgram/Admin/Index';
import UserData from './NofaProgram/Admin/userData';
import nofaCreation from './NofaProgram/nofa-creation';
import formList from './NofaProgram/form-List';

export function Navigation(props) {
  const isAuthenticated = useIsAuthenticated()

  return (
    <Router basename="/nofa">
     
      <div className="navcss">
        <div className="container-fluid">
          <div className="App1">
          {/* <Route path="/" exact component={homepage} /> */}           
            {isAuthenticated ?
              <div>            
                
                <Route path="/admin" exact component={Admin} />
                <Route path="/apply" exact component={NofaProgram} />
                <Route path="/apply/edit/:id" exact component={NofaProgram} />
                <Route path="/nofaCreation" exact component={nofaCreation} />
                <Route path="/submission/view/:id" exact component={ViewData} />
                <Route path="/Admin/view/:id" exact component={UserData} />              
                <Route path="/nofa-form" exact component={Index} />               
                <Route path="/" exact component={nofaCreation} />                
                <Route path="/nofa-submission" component={formList} />
                
              </div>
              :
              <div>
                <Route path="/" component={Login} />
                
            </div>
            }
          </div>
        </div>
      </div>      
      
    </Router>
  );
}