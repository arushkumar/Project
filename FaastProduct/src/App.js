import React, {useEffect} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './scss/style.css';
import './theme/nofa.css';
import { Navigation } from './Navigation';
import Header from "./components/azure/Header";

function App() {
 const Home = async () => {
    window.location.href = "/nofa";
};  
    return (
      <div>
        <div className="home-header" style={{ backgroundImage: `url(${`/nofa/images/istock_000018283527_full.jpg`})` }}>
        <div className="container-fluid">
            <div className="row">

              <div className="col-lg-4">
                <div className="logoicon logoicon22">
                <img src={`/nofa/images/hqsft-logo_1.png`} alt="Hcd" />
                </div>

              </div>
              <div className="col-lg-1">
                <div className="logoicon">
                {/* <img src={`/images/hqsft-logo_1.png`} alt="Hcd" /> */}
                </div>
              </div>
              <div className="col-lg-5 textc">


                <div className="org-top-row">
                
                </div>
                <div className="org-top-row1">
                HQ Software Consulting
                </div>
              </div>
              <div className="col-lg-1">
                <div className="org-top-row">
                  {/* Login */}


                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className=" fullwidh">
            <div className="container-fluid fullsize">
              <div className="container">
                <div className="row">
                  <div className="col-md-3 col-xs-3">

                    <div className="Logincss text-align-left" onClick={() => Home()}> <i className="fa fa-home" aria-hidden="true"></i> Home</div>

                  </div>

                  <div className="col-md-9 col-xs-9">
                  <Header title="ADB2C"></Header>
                  
                   </div>

                </div>
              </div>
              {/* <Form onSubmit={this.result} /> */}

            </div>
            <div className="navsection padding-22">
              
              <Navigation />


            </div>
          </div>
        </div>
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="copyrights">
                  <div className="container">
                    <div className="clearfix ">
                     
                     
                      <div className="copyright12">Copyright © HQSFT</div>
                      <div className="copyright12">Version 0.1.0</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

    );
  }

export default App;
