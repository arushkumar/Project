import React, { Component, useState } from 'react';
import { Field } from '@progress/kendo-react-form';
import { FormUpload, FormCheckbox } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";

import { Col, FormGroup } from 'reactstrap';
import nofaServices from '../services/nofaServices'
import { required } from './validators';
import Tabs from './TabComponent/Tabs'

const API_URL = `${process.env.REACT_APP_URL}` + 'api/test/';
const API_URL_NEW = `${process.env.REACT_APP_URL}` + 'api/';
class ProjectOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      sid: "",
      isDisabled: false,
      checked: false,
      jointchecked1: false,
      jointchecked: false,

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeJoint = this.handleChangeJoint.bind(this);
    this.handleChangeJoint1 = this.handleChangeJoint1.bind(this);
  }
  handleChange() {
    this.setState({
      checked: !this.state.checked
    })
  }
  handleChangeJoint() {
    this.setState({
      jointchecked: !this.state.jointchecked
    })
  }
  handleChangeJoint1() {
    this.setState({
      jointchecked1: !this.state.jointchecked1
    })
  }
  componentDidMount() {
    const sidValue = sessionStorage.getItem('submissionId');
    const sss = sidValue;
    if (sss === null) {

    } else {
      this.setState({ sid: sss })
      this.AllDataCtrl = () => {
        nofaServices.getFilesOnly(sidValue).then(
          response => {
            // window.scrollTo(0, 0)
            var ad = response.data;
            this.setState({ value: ad })
            console.log(ad)

          },
          error => {

          }
        );
      }
      this.AllDataCtrl();
      this.downloadFileCtrl = (e, fieldname, val) => {

        nofaServices.downloadFiles(this.state.sid, fieldname, val).then(
          response => {
            //window.open(API_URL_NEW + 'files/' + this.state.sid + '/' + fieldname + '/' +val);

          },
          error => {

          }
        );
      }
      this.deleteFileCtrl = (e, fieldname, val) => {

        nofaServices.deleteFiles(sidValue, fieldname, val).then(
          response => {
            this.AllDataCtrl();
            // window.open(API_URL+'file/'+this.state.sid+'/'+val);
          },
          error => {

          }
        );
      }
    }


  }

  render() {

    // console.log("mydata", this.state.sid)

    return (

      <div>
        <center><h3>Project Overview Documents</h3></center>

        <Tabs >
          <div label="Project Tab 1">
            <FormGroup row>
              <Col xs="12" lg="12">
                {/* <h3>Tab 1</h3> */}
              </Col>
              <Col xs="12" lg="6">

                <Field
                  // type="upload"
                  key={"cip_int_qip"}
                  id={"cip_int_qip"}
                  name="cip_int_qip"
                  component={FormUpload}

                  label="64. Capital Improvement Project"
                  subtitle="Applicant narrative and documentation evidencing the Locality requiring the CIP."
                  batch={true}
                  defaultFiles={[]}
                  multiple={true}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/cip_int_qip"}
                />
                {this.state.value.cip_int_qip ?
                  <div className='img-css'>
                    {this.state.value.cip_int_qip.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'cip_int_qip', step)} download>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'cip_int_qip', step)} className="deleteButton">
                          <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                    ))}
                  </div>
                  : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="urban_area"
                  key={"urban_area"}
                  id={"urban_area"}
                  component={FormUpload}
                  label="65. Urban Area"
                  subtitle="Provide documentation of location in an Urbanized Area."
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  multiple={true}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/urban_area"}
                />

                {this.state.value.urban_area ?
                  <div className='img-css'>
                    {this.state.value.urban_area.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'urban_area', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'urban_area', step)} className="deleteButton">
                          <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                    ))}
                  </div>
                  : <></>}
              </Col>
            </FormGroup>
          </div>

          <div label="Project Tab 2">
            <FormGroup row>
              <Col xs="12" lg="6">
                {/* <h3>VHHP</h3> */}

                <Field
                  type="upload"
                  name="transitional_housing"
                  component={FormUpload}
                  label=" 66. Transitional Housing Project"
                  subtitle="documents describing how housing will accommodate ready conversion to permanent housing at minimum cost. "
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/transitional_housing"}
                />
                {this.state.value.transitional_housing ?
                  <div className='img-css'>
                    {this.state.value.transitional_housing.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'transitional_housing', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'transitional_housing', step)} className="deleteButton">
                          <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                    ))}
                  </div>
                  : <></>}

              </Col>
              <Col xs="12" lg="6">

              </Col>
            </FormGroup>



            <FormGroup row>

              <Col xs="12" lg="6">
                {/* <h3>New Community-based Developer</h3> */}
                <Field
                  type="upload"
                  name="ncbd_exp"
                  component={FormUpload}
                  label="67. New Community-based Developer Experience"
                  subtitle="Attached documentation satisfying"
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/ncbd_exp"}
                />

                {this.state.value.ncbd_exp ?
                  <div className='img-css'>
                    {this.state.value.ncbd_exp.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'ncbd_exp', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'ncbd_exp', step)} className="deleteButton">
                          <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                    ))}
                  </div>
                  : <></>}
              </Col>
              <Col xs="12" lg="6">
                {/* <h3>Community-based Developer</h3> */}
                <Field
                  type="upload"
                  name="cdb_exp"
                  component={FormUpload}
                  label="68. Community-based Developer Experience"
                  subtitle="Attached documentation satisfying"
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/cdb_exp"}
                />

                {this.state.value.cdb_exp ?
                  <div className='img-css'>
                    {this.state.value.cdb_exp.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'cdb_exp', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'cdb_exp', step)} className="deleteButton">
                          <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                    ))}
                  </div>
                  : <></>}
              </Col>
              <Col xs="12" lg="6">
                {/* <h3>Emerging Developer</h3> */}
                <Field
                  type="upload"
                  name="ed_exp"
                  component={FormUpload}
                  label="69. Emerging Developer Experience"
                  subtitle="Attached documentation satisfying"
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/ed_exp"}
                />

                {this.state.value.ed_exp ?
                  <div className='img-css'>
                    {this.state.value.ed_exp.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'ed_exp', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'ed_exp', step)} className="deleteButton">
                          <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                    ))}
                  </div>
                  : <></>}
              </Col>
            </FormGroup>
          </div>
          <div label="Project Tab 3">
            <FormGroup row>
              <Col xs="12" lg="6">
                {/* <h3>Tribal Applicant</h3> */}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" lg="6">

                <Field
                  type="upload"
                  name="indian_country"
                  component={FormUpload}
                  label="8a. Indian Country Verification"
                  subtitle="Documentation verifying land is located in Indian Country as defined by 18 USC 1151"
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/indian_country"}
                />

                {this.state.value.indian_country ?
                  <div className='img-css'>
                    {this.state.value.indian_country.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'indian_country', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'indian_country', step)} className="deleteButton">
                          <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                    ))}
                  </div>
                  : <></>}

              </Col>

              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="fee_land"
                  component={FormUpload}
                  label="8b. Fee Land Verification"
                  subtitle="Documentation verifying land is located on Fee Land."
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/fee_land"}
                />

                {this.state.value.fee_land ?
                  <div className='img-css'>
                    {this.state.value.fee_land.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'fee_land', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'fee_land', step)} className="deleteButton">
                          <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                    ))}
                  </div>
                  : <></>}

              </Col>
            </FormGroup>
            <br /><br />
            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="spondev_cont_agree"
                  component={FormUpload}
                  label="70. Sponsor Developer Contract Agreement"
                  subtitle="Attached contract agreement between Sponsor and Experience Developer"
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/spondev_cont_agree"}
                />

                {this.state.value.spondev_cont_agree ?
                  <div className='img-css'>
                    {this.state.value.spondev_cont_agree.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'spondev_cont_agree', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'spondev_cont_agree', step)} className="deleteButton">
                          <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                    ))}
                  </div>
                  : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="leg_letter"
                  component={FormUpload}
                  label="3. Letter to Legislative or Tribal Governing Body"
                  subtitle="Per Health &amp; Safety Code §50675.7(e) Sponsor must notify the Tribal governing body or local legislative body (City Council or County Board of Supervisors) of the Sponsor’s loan application prior to application submission."
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/leg_letter"}

                />

                {this.state.value.leg_letter ?
                  <div className='img-css'>
                    {this.state.value.leg_letter.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'leg_letter', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'leg_letter', step)} className="deleteButton">
                          <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                    ))}
                  </div>
                  : <></>}

              </Col>
            </FormGroup>
          </div>


          <div label="Project Tab 4">
            <FormGroup row>

              <Col xs="12" lg="6">
                {/* <h3>Rehabilitation Projects</h3> */}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" lg="6">

                <Field
                  type="upload"
                  name="proj_timeline"
                  component={FormUpload}
                  label="71. Emergency Repair Prior to Program Award"
                  subtitle="Attach explanation how the project meet the exceptions specified in program guidelines."
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/proj_timeline"}
                />

                {this.state.value.proj_timeline ?
                  <div className='img-css'>
                    {this.state.value.proj_timeline.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'proj_timeline', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'proj_timeline', step)} className="deleteButton">
                          <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                    ))}
                  </div>
                  : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="rehab_desc"
                  component={FormUpload}
                  label="42. Rehabilitation Description"
                  subtitle="Narrative description of current condition of structure(s) and overall scope of work."
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/rehab_desc"}
                />

                {this.state.value.rehab_desc ?
                  <div className='img-css'>
                    {this.state.value.rehab_desc.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'rehab_desc', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'rehab_desc', step)} className="deleteButton">
                          <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                    ))}
                  </div>
                  : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="pna_cna"
                  component={FormUpload}
                  label="43. Physical or Capital Needs Assessment Report"
                  subtitle="PNA or CNA prepared by a qualified independent third party contractor."
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/pna_cna"}
                />

                {this.state.value.pna_cna ?
                  <div className='img-css'>
                    {this.state.value.pna_cna.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'pna_cna', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'pna_cna', step)} className="deleteButton">
                          <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                    ))}
                  </div>
                  : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="rent_roll"
                  component={FormUpload}
                  label="44. Rent Roll"
                  subtitle="Current rent roll, including household income &amp; size for each unit."
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/rent_roll"}
                />

                {this.state.value.rent_roll ?
                  <div className='img-css'>
                    {this.state.value.rent_roll.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'rent_roll', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'rent_roll', step)} className="deleteButton">
                          <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                    ))}
                  </div>
                  : <></>}
              </Col>
            </FormGroup>
            <br /><br />
            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="tax_reserve"
                  component={FormUpload}
                  label="72. Tax Credit Reservation"
                  subtitle="If the Project has already received a tax credit reservation, upload documentation."
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/tax_reserve"}
                />

                {this.state.value.tax_reserve ?
                  <div className='img-css'>
                    {this.state.value.tax_reserve.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'tax_reserve', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'tax_reserve', step)} className="deleteButton">
                          <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                    ))}
                  </div>
                  : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="rural_status_det"
                  component={FormUpload}
                  label="35. Rural Status Determination"
                  subtitle="TCAC Method for determining rural status."
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/rural_status_det"}
                />

                {this.state.value.rural_status_det ?
                  <div className='img-css'>
                    {this.state.value.rural_status_det.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'rural_status_det', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'rural_status_det', step)} className="deleteButton">
                          <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                    ))}
                  </div>
                  : <></>}
              </Col>
            </FormGroup>



            <FormGroup row>

              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="opp_area_doc"
                  component={FormUpload}
                  label="31. Opportunity Area"
                  subtitle="Documentation of TCAC Opportunity Area status at time of application."
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/opp_area_doc"}
                />
                {this.state.value.opp_area_doc ?
                  <div className='img-css'>{
                    this.state.value.opp_area_doc.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'opp_area_doc', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'opp_area_doc', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x">
                        </span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>
          </div>

        </Tabs>


        <PanelBar>
          <PanelBarItem expanded={true} title={"Sponsor #1"}>

            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="spon1_cert_legal"
                  component={FormUpload}
                  label="4a. Sponsor 1 Certification & Legal Disclosure "
                  subtitle={"Reference Sponsor Certification Worksheet."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/spon1_cert_legal"}

                />
                {this.state.value.spon1_cert_legal ?
                  <div className='img-css'>
                    {this.state.value.spon1_cert_legal.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'spon1_cert_legal', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'spon1_cert_legal', step)} className="deleteButton">
                          <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                    ))}</div> : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="spon1_auth_res"
                  component={FormUpload}
                  label="4b. Sponsor 1 Authorizing Resolution"
                  subtitle={"Reference: Program webpage for Sponsor Authorizing Resolution Document."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/spon1_auth_res"}

                />
                {this.state.value.spon1_auth_res ?
                  <div className='img-css'>{
                    this.state.value.spon1_auth_res.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'spon1_auth_res', step)}>{step}</a>
                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'spon1_auth_res', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="spon1_org_docs"
                  component={FormUpload}
                  label="4c. Sponsor 1 Organization Document 1, Organization Document 2, etc."
                  subtitle={"Reference Entity Org Docs worksheet."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/spon1_org_docs"}

                />
                {this.state.value.spon1_org_docs ?
                  <div className='img-css'>{this.state.value.spon1_org_docs.split(',').map((step, i) => (
                    <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'spon1_org_docs', step)}>{step}</a>
                      <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'spon1_org_docs', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                  ))}</div> : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="spon1_org_chart"
                  component={FormUpload}
                  label="4d. Sponsor 1 Organization Chart"
                  subtitle={"Sponsor Organization Chart."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/spon1_org_chart"}

                />
                {this.state.value.spon1_org_chart ? <div className='img-css'>{this.state.value.spon1_org_chart.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'spon1_org_chart', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>


            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="spon1_sig_block"
                  component={FormUpload}
                  label="4e. Sponsor 1 Signature Block"
                  subtitle={"Signature Block - upload in Microsoft Word Document."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/spon1_sig_block"}

                />
                {this.state.value.spon1_sig_block ? <div className='img-css'>{this.state.value.spon1_sig_block.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'spon1_sig_block', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'spon1_sig_block', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="spon1_cert_stand"
                  component={FormUpload}
                  label="4f. Sponsor 1 Certification of Good Standing"
                  subtitle={"Certificate of Good Standing must be dated 30 days or less from the application due date."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/spon1_cert_stand"}

                />
                {this.state.value.spon1_cert_stand ? <div className='img-css'>{this.state.value.spon1_cert_stand.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'spon1_cert_stand', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'spon1_cert_stand', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="spon1_tax_exempt"
                  component={FormUpload}
                  label="4g. Sponsor 1 Tax-Exempt Status"
                  subtitle={"Evidence of tax-exempt status from IRS and FTB for Corporations. (Non-Profits Only)"}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/spon1_tax_exempt"}

                />
                {this.state.value.spon1_tax_exempt ? <div className='img-css'>{this.state.value.spon1_tax_exempt.split(',').map((step, i) => (
                  <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'spon1_tax_exempt', step)}>{step}</a>
                    <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'spon1_tax_exempt', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>
          </PanelBarItem>
        </PanelBar>

        <Field
          id={"sponsor_2"}
          key={"sponsor_2"}
          component={FormCheckbox}
          onChange={this.handleChange}
          type="checkbox"
          name="sponsor_2"
          label="Sponsor #2"
          checked={this.state.checked}
        />
        {this.state.checked ?
          <PanelBar>
            <PanelBarItem expanded={true} title={"Sponsor #2"}>

              <FormGroup row>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="spon2_cert_legal"
                    component={FormUpload}
                    label="5a. Sponsor 2 Certification & Legal Disclosure"
                    subtitle={"Reference Sponsor Certification Worksheet."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/spon2_cert_legal"}
                  // validator={required}

                  />
                  {this.state.value.spon2_cert_legal ? <div className='img-css'>{this.state.value.spon2_cert_legal.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'spon2_cert_legal', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'spon2_cert_legal', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="spon2_auth_res"
                    component={FormUpload}
                    label="5b. Sponsor 2 Authorizing Resolution"
                    subtitle={"Reference: Program webpage for Sponsor Authorizing Resolution Document."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/spon2_auth_res"}
                  // validator={required}

                  />
                  {this.state.value.spon2_auth_res ?
                    <div className='img-css'>{this.state.value.spon2_auth_res.split(',').map((step, i) => (
                      <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'spon2_auth_res', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'spon2_auth_res', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="spon2_org_docs"
                    component={FormUpload}
                    label="5c.Sponsor 2 Organization Document 1, Organization Document 2, etc."
                    subtitle={"Reference Entity Org Docs worksheet."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/spon2_org_docs"}
                  // validator={required}

                  /> {this.state.value.spon2_org_docs ? <div className='img-css'>{this.state.value.spon2_org_docs.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'spon2_org_docs', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'spon2_org_docs', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="spon2_org_chart"
                    component={FormUpload}
                    label="5d.Sponsor 2 Organization Chart"
                    subtitle={"Sponsor Organization Chart."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/spon2_org_chart"}

                  /> {this.state.value.spon2_org_chart ? <div className='img-css'>{this.state.value.spon2_org_chart.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'spon2_org_chart', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'spon2_org_chart', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
              </FormGroup>


              <FormGroup row>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="spon2_sig_block"
                    component={FormUpload}
                    label="5e. Sponsor 2 Signature Block"
                    subtitle={"Signature Block - upload in Microsoft Word Document."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/spon2_sig_block"}

                  />
                  {this.state.value.spon2_sig_block ? <div className='img-css'>{this.state.value.spon2_sig_block.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'spon2_sig_block', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'spon2_sig_block', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}
                  </div> : <></>
                  }
                </Col>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="spon2_cert_stand"
                    component={FormUpload}
                    label="5f. Sponsor 2 Certification of Good Standing"
                    subtitle={"Certificate of Good Standing must be dated 30 days or less from the application due date."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/spon2_cert_stand"}


                  /> {this.state.value.spon2_cert_stand ? <div className='img-css'>{this.state.value.spon2_cert_stand.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'spon2_cert_stand', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'spon2_cert_stand', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="spon2_tax_exempt"
                    component={FormUpload}
                    label="5g. Sponsor 2 Tax-Exempt Status"
                    subtitle={"Evidence of tax-exempt status from IRS and FTB for Corporations. (Non-Profits Only)"}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/spon2_tax_exempt"}

                  />
                  {this.state.value.spon2_tax_exempt ? <div className='img-css'>{this.state.value.spon2_tax_exempt.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'spon2_tax_exempt', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'spon2_tax_exempt', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
              </FormGroup>
            </PanelBarItem>
          </PanelBar>
          : null}
        <Field
          id={"JointVanture_1"}
          key={"JointVanture_1"}
          component={FormCheckbox}
          onChange={this.handleChangeJoint1}
          type="checkbox"
          name="JointVanture_1"
          label="Joint Venture Entity #1"
          checked={this.state.jointchecked1}
        />
        {this.state.jointchecked1 ?

          <PanelBar>
            <PanelBarItem expanded={true} title={"Joint Venture Entity #1"}>

              <FormGroup row>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="joint_venture"
                    component={FormUpload}
                    label="6a. Joint Venture Agreement"
                    subtitle={"Provide an executed copy stating the terms of your joint venture agreement."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/joint_venture"}

                  />
                  {this.state.value.joint_venture ? <div className='img-css'>{this.state.value.joint_venture.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'joint_venture', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'joint_venture', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="jv1_cert_legal"
                    component={FormUpload}
                    label="6b. Joint Venture 1 Certification & Legal Disclosure"
                    subtitle={"Reference Sponsor Certification Worksheet."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/jv1_cert_legal"}

                  />
                  {this.state.value.jv1_cert_legal ? <div className='img-css'>{this.state.value.jv1_cert_legal.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'jv1_cert_legal', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'jv1_cert_legal', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="jv1_auth_res"
                    component={FormUpload}
                    label="6c. Joint Venture 1 Authorizing Resolution"
                    subtitle={"Reference: Program webpage for Sponsor Authorizing Resolution Document."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/jv1_auth_res"}

                  /> {this.state.value.jv1_auth_res ? <div className='img-css'>{this.state.value.jv1_auth_res.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'jv1_auth_res', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'jv1_auth_res', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="jv1_org_docs "
                    component={FormUpload}
                    label="6d. Joint Venture 1 Organization Document 1, Organization Document 2, etc."
                    subtitle={"Reference Entity Org Docs worksheet."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/jv1_org_docs"}

                  />
                  {this.state.value.jv1_org_docs ? <div className='img-css'>{this.state.value.jv1_org_docs.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'jv1_org_docs', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'jv1_org_docs', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
              </FormGroup>


              <FormGroup row>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="jv1_org_chart"
                    component={FormUpload}
                    label="6e. Joint Venture 1 Organization Chart"
                    subtitle={"Sponsor Organization Chart."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/jv1_org_chart"}

                  />
                  {this.state.value.jv1_org_chart ? <div className='img-css'>{this.state.value.jv1_org_chart.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'jv1_org_chart', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'jv1_org_chart', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="jv1_sig_block "
                    component={FormUpload}
                    label="6f. Joint Venture 1 Signature Block"
                    subtitle={"Signature Block - upload in Microsoft Word Document."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/jv1_sig_block"}

                  />
                  {this.state.value.jv1_sig_block ? <div className='img-css'>{this.state.value.jv1_sig_block.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'jv1_sig_block', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'jv1_sig_block', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="jv1_cert_stand"
                    component={FormUpload}
                    label="6g. Joint Venture 1 Certification of Good Standing"
                    subtitle={"Certificate of Good Standing must be dated 30 days or less from the application due date."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/jv1_cert_stand"}

                  />
                  {this.state.value.jv1_cert_stand ? <div className='img-css'>{this.state.value.jv1_cert_stand.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'jv1_cert_stand', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'jv1_cert_stand', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="jv1_tax_exempt"
                    component={FormUpload}
                    label="6h. Joint Venture 1 Tax-Exempt Status"
                    subtitle={"Evidence of tax-exempt status from IRS and FTB for Corporations. (Non-Profits Only)"}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/jv1_tax_exempt"}

                  />
                  {this.state.value.jv1_tax_exempt ? <div className='img-css'>{this.state.value.jv1_tax_exempt.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'jv1_tax_exempt', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'jv1_tax_exempt', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
              </FormGroup>
            </PanelBarItem>
          </PanelBar>
          : null}
        {/* </div>

          <div label="Joint Vanture #2"> */}
        <Field
          id={"JointVanture_2"}
          key={"JointVanture_2"}
          component={FormCheckbox}
          onChange={this.handleChangeJoint}
          type="checkbox"
          name="JointVanture_2"
          label="Joint Venture Entity #2"
          checked={this.state.jointchecked}
        />
        {this.state.jointchecked ?
          <PanelBar>
            <PanelBarItem expanded={true} title={"Joint Venture Entity #2"}>
              <FormGroup row>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="jv2_cert_legal"
                    component={FormUpload}
                    label="7a. Joint Venture 2 Certification & Legal Disclosure "
                    subtitle={"Reference Sponsor Certification Worksheet."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/jv2_cert_legal"}

                  />
                  {this.state.value.jv2_cert_legal ? <div className='img-css'>{this.state.value.jv2_cert_legal.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'jv2_cert_legal', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'jv2_cert_legal', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="jv2_auth_res"
                    component={FormUpload}
                    label="7b. Joint Venture 2 Authorizing Resolution"
                    subtitle={"Reference: Program webpage for Sponsor Authorizing Resolution Document."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/jv2_auth_res"}

                  /> {this.state.value.jv2_auth_res ? <div className='img-css'>{this.state.value.jv2_auth_res.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'jv2_auth_res', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'jv2_auth_res', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="jv2_org_docs"
                    component={FormUpload}
                    label="7c.Joint Venture 2 Organization Document 1, Organization Document 2, etc."
                    subtitle={"Reference Entity Org Docs worksheet."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/jv2_org_docs"}

                  /> {this.state.value.jv2_org_docs ? <div className='img-css'>{this.state.value.jv2_org_docs.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'jv2_org_docs', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'jv2_org_docs', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="jv2_org_chart"
                    component={FormUpload}
                    label="7d. Joint Venture 2 Organization Chart"
                    subtitle={"Sponsor Organization Chart."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/jv2_org_chart"}

                  /> {this.state.value.jv2_org_chart ? <div className='img-css'>{this.state.value.jv2_org_chart.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'jv2_org_chart', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'jv2_org_chart', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="jv2_sig_block"
                    component={FormUpload}
                    label="7e. Joint Venture 2 Signature Block"
                    subtitle={"Signature Block - upload in Microsoft Word Document."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/jv2_sig_block"}

                  /> {this.state.value.jv2_sig_block ? <div className='img-css'>{this.state.value.jv2_sig_block.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'jv2_sig_block', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'jv2_sig_block', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="jv2_cert_stand"
                    component={FormUpload}
                    label="7f. Joint Venture 2 Certification of Good Standing"
                    subtitle={"Certificate of Good Standing must be dated 30 days or less from the application due date."}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/jv2_cert_stand"}

                  /> {this.state.value.jv2_cert_stand ? <div className='img-css'>{this.state.value.jv2_cert_stand.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'jv2_cert_stand', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'jv2_cert_stand', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12" lg="6">
                  <Field
                    type="upload"
                    name="jv2_tax_exempt"
                    component={FormUpload}
                    label="7g. Joint Venture 2 Tax-Exempt Status"
                    subtitle={"Evidence of tax-exempt status from IRS and FTB for Corporations. (Non-Profits Only)"}
                    batch={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={API_URL + "sid/" + this.state.sid + "/jv2_tax_exempt"}

                  /> {this.state.value.jv2_tax_exempt ? <div className='img-css'>{this.state.value.jv2_tax_exempt.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'jv2_tax_exempt', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'jv2_tax_exempt', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
                </Col>
              </FormGroup>
            </PanelBarItem>
          </PanelBar>
          : null}

        <PanelBar>
          <PanelBarItem expanded={true} title={"Owner/Borrower Entity"}>
            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="borrower_cert_legal"
                  component={FormUpload}
                  label="9a. Borrower Certification & Legal Disclosure"
                  subtitle={"Reference Sponsor Certification Worksheet."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/borrower_cert_legal"}
                /> {this.state.value.borrower_cert_legal ? <div className='img-css'>{this.state.value.borrower_cert_legal.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'borrower_cert_legal', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'borrower_cert_legal', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="borrower_org_docs"
                  component={FormUpload}
                  label="9b. Borrower Organization Document 1, Organization Document 2, etc."
                  subtitle={"Reference Entity Org Docs worksheet."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/borrower_org_docs"}
                /> {this.state.value.borrower_org_docs ? <div className='img-css'>{this.state.value.borrower_org_docs.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'borrower_org_docs', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'borrower_org_docs', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="borrower_org_chart"
                  component={FormUpload}
                  label="9c. Borrower Organization Chart"
                  subtitle={"Must demonstrate Sponsor control of the Borrower consistent with UMR §8313.2."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/borrower_org_chart"}
                />
                {this.state.value.borrower_org_chart ? <div className='img-css'>{this.state.value.borrower_org_chart.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'borrower_org_chart', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'borrower_org_chart', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="borrower_sig_block"
                  component={FormUpload}
                  label="9d. Borrower Signature Block"
                  subtitle={"Signature Block - upload in Microsoft Word Document."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/borrower_sig_block"}
                /> {this.state.value.borrower_sig_block ? <div className='img-css'>{this.state.value.borrower_sig_block.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'borrower_sig_block', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'borrower_sig_block', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="borrower_payee_data"
                  component={FormUpload}
                  label="9e. Borrower STD 204 Payee Data Record"
                  subtitle={"Reference Payee Data Record STD-204 on the  webpage."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/borrower_payee_data"}
                /> {this.state.value.borrower_payee_data ? <div className='img-css'>{this.state.value.borrower_payee_data.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'borrower_payee_data', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'borrower_payee_data', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="bwr_fical_hcd"
                  component={FormUpload}
                  label="9f. Borrower Fi$CAL TIN Form"
                  subtitle={"Reference Taxpayer Identification Number (TIN) (public entities ONLY) on the  webpage."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/bwr_fical_hcd"}
                /> {this.state.value.bwr_fical_hcd ? <div className='img-css'>{this.state.value.bwr_fical_hcd.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'bwr_fical_hcd', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'bwr_fical_hcd', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="borrower_ein"
                  component={FormUpload}
                  label="9g. Borrower EIN Verification"
                  subtitle={"IRS Form SS4."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/borrower_ein"}
                /> {this.state.value.borrower_ein ? <div className='img-css'>{this.state.value.borrower_ein.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'borrower_ein', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'borrower_ein', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="borrower_cert_stand"
                  component={FormUpload}
                  label="9h. Borrower Certification of Good Standing"
                  subtitle={"Certificate of Good Standing must be dated 30 days or less from the application due date."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/borrower_cert_stand"}
                /> {this.state.value.borrower_cert_stand ? <div className='img-css'>{this.state.value.borrower_cert_stand.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'borrower_cert_stand', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'borrower_cert_stand', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="borrower_tax_exempt"
                  component={FormUpload}
                  label="9i. Borrower Tax-Exempt Status"
                  subtitle={"Evidence of tax-exempt status from IRS and evidence of tax-exempt status from FTB for Corporations. (if applicable)"}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/borrower_tax_exempt"}
                /> {this.state.value.borrower_tax_exempt ? <div className='img-css'>{this.state.value.borrower_tax_exempt.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'borrower_tax_exempt', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'borrower_tax_exempt', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>
          </PanelBarItem>
        </PanelBar>

        <PanelBar>
          <PanelBarItem expanded={true} title={"Managing General Partner"}>
            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="mgp_cert_legal"
                  component={FormUpload}
                  label="10a. Managing General Partner Certification & Legal Disclosure "
                  subtitle={"Reference Sponsor Certification Worksheet."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/mgp_cert_legal"}
                /> {this.state.value.mgp_cert_legal ? <div className='img-css'>{this.state.value.mgp_cert_legal.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'mgp_cert_legal', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'mgp_cert_legal', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>

              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="mgp_org_docs"
                  component={FormUpload}
                  label="10c.Managing General Partner Organization Document 1, Organization Document 2, etc."
                  subtitle={"Reference Entity Org Docs worksheet."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/mgp_org_docs"}
                /> {this.state.value.mgp_org_docs ? <div className='img-css'>{this.state.value.mgp_org_docs.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'mgp_org_docs', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'mgp_org_docs', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="mgp_org_chart"
                  component={FormUpload}
                  label="10d.Managing General Partner Organization Chart"
                  subtitle={"Managing General Partner Organization Chart."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/mgp_org_chart"}
                /> {this.state.value.mgp_org_chart ? <div className='img-css'>{this.state.value.mgp_org_chart.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'mgp_org_chart', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'mgp_org_chart', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="mgp_sig_block"
                  component={FormUpload}
                  label="10e. Managing General Partner Signature Block"
                  subtitle={"Signature Block - upload in Microsoft Word Document."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/mgp_sig_block"}
                /> {this.state.value.mgp_sig_block ? <div className='img-css'>{this.state.value.mgp_sig_block.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'mgp_sig_block', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'mgp_sig_block', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="mgp_cert_stand"
                  component={FormUpload}
                  label="10f. Managing General Partner Certification of Good Standing"
                  subtitle={"Certificate of Good Standing must be dated 30 days or less from the application due date."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/mgp_cert_stand"}
                /> {this.state.value.mgp_cert_stand ? <div className='img-css'>{this.state.value.mgp_cert_stand.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'mgp_cert_stand', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'mgp_cert_stand', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>

              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="mgp_tax_exempt"
                  component={FormUpload}
                  label="10g. Managing General Partner Tax-Exempt Status"
                  subtitle={"Evidence of tax-exempt status from IRS and FTB for Corporations. (Non-Profits Only)"}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/mgp_tax_exempt"}
                /> {this.state.value.mgp_tax_exempt ? <div className='img-css'>{this.state.value.mgp_tax_exempt.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'mgp_tax_exempt', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'mgp_tax_exempt', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>

          </PanelBarItem>
        </PanelBar>

        <PanelBar>
          <PanelBarItem expanded={true} title={"Administrative General Partner #1"}>

            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="agp1_cert_legal"
                  component={FormUpload}
                  label="11a. Administrative General Partner 1 Certification & Legal Disclosure "
                  subtitle={"Reference Sponsor Certification Worksheet."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/agp1_cert_legal"}
                />
                {this.state.value.agp1_cert_legal ? <div className='img-css'>{this.state.value.agp1_cert_legal.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'agp1_cert_legal', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'agp1_cert_legal', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>

              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="agp1_org_docs"
                  component={FormUpload}
                  label="11c.Administrative General Partner 1 Organization Document 1, Organization Document 2, etc."
                  subtitle={"Reference Entity Org Docs worksheet."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/agp1_org_docs"}
                /> {this.state.value.agp1_org_docs ? <div className='img-css'>{this.state.value.agp1_org_docs.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'agp1_org_docs', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'agp1_org_docs', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="agp1_org_chart"
                  component={FormUpload}
                  label="11d.Administrative General Partner 1 Organization Chart"
                  subtitle={"Administrative General Partner  Organization Chart."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/agp1_org_chart"}
                /> {this.state.value.agp1_org_chart ? <div className='img-css'>{this.state.value.agp1_org_chart.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'agp1_org_chart', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'agp1_org_chart', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="agp1_sig_block"
                  component={FormUpload}
                  label="11e. Administrative General Partner 1 Signature Block"
                  subtitle={"Signature Block - upload in Microsoft Word Document."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/agp1_sig_block"}
                /> {this.state.value.agp1_sig_block ? <div className='img-css'>{this.state.value.agp1_sig_block.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'agp1_sig_block', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'agp1_sig_block', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="agp1_cert_stand"
                  component={FormUpload}
                  label="11f. Administrative General Partner 1 Certification of Good Standing"
                  subtitle={"Certificate of Good Standing must be dated 30 days or less from the application due date."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/agp1_cert_stand"}
                /> {this.state.value.agp1_cert_stand ? <div className='img-css'>{this.state.value.agp1_cert_stand.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'agp1_cert_stand', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'agp1_cert_stand', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>

              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="agp1_tax_exempt"
                  component={FormUpload}
                  label="11g. Administrative General Partner 1 Tax-Exempt Status"
                  subtitle={"Evidence of tax-exempt status from IRS and FTB for Corporations. (Non-Profits Only)"}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/agp1_tax_exempt"}
                /> {this.state.value.agp1_tax_exempt ? <div className='img-css'>{this.state.value.agp1_tax_exempt.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'agp1_tax_exempt', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'agp1_tax_exempt', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>

          </PanelBarItem>
        </PanelBar>

        <PanelBar>
          <PanelBarItem expanded={true} title={"Administrative General Partner #2"}>

            <FormGroup row>
              <Col xs="22" lg="6">
                <Field
                  type="upload"
                  name="agp2_cert_legal"
                  component={FormUpload}
                  label="12a. Administrative General Partner 2 Certification & Legal Disclosure "
                  subtitle={"Reference Sponsor Certification Worksheet."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/agp2_cert_legal"}
                /> {this.state.value.agp2_cert_legal ? <div className='img-css'>{this.state.value.agp2_cert_legal.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'agp2_cert_legal', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'agp2_cert_legal', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>

              <Col xs="22" lg="6">
                <Field
                  type="upload"
                  name="agp2_org_docs"
                  component={FormUpload}
                  label="12c.Administrative General Partner 2 Organization Document 2, Organization Document 2, etc."
                  subtitle={"Reference Entity Org Docs worksheet."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/agp2_org_docs"}
                /> {this.state.value.agp2_org_docs ? <div className='img-css'>{this.state.value.agp2_org_docs.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'agp2_org_docs', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'agp2_org_docs', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="22" lg="6">
                <Field
                  type="upload"
                  name="agp2_org_chart"
                  component={FormUpload}
                  label="12d.Administrative General Partner 2 Organization Chart"
                  subtitle={"Administrative General Partner  Organization Chart."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/agp2_org_chart"}
                />
                {this.state.value.agp2_org_chart ? <div className='img-css'>{this.state.value.agp2_org_chart.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'agp2_org_chart', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'agp2_org_chart', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
              <Col xs="22" lg="6">
                <Field
                  type="upload"
                  name="agp2_sig_block"
                  component={FormUpload}
                  label="12e. Administrative General Partner 2 Signature Block"
                  subtitle={"Signature Block - upload in Microsoft Word Document."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/agp2_sig_block"}
                />
                {this.state.value.agp2_sig_block ? <div className='img-css'>{this.state.value.agp2_sig_block.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'agp2_sig_block', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'agp2_sig_block', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="22" lg="6">
                <Field
                  type="upload"
                  name="agp2_cert_stand"
                  component={FormUpload}
                  label="12f. Administrative General Partner 2 Certification of Good Standing"
                  subtitle={"Certificate of Good Standing must be dated 30 days or less from the application due date."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/agp2_cert_stand"}
                /> {this.state.value.agp2_cert_stand ? <div className='img-css'>{this.state.value.agp2_cert_stand.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'agp2_cert_stand', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'agp2_cert_stand', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>

              <Col xs="22" lg="6">
                <Field
                  type="upload"
                  name="agp2_tax_exempt"
                  component={FormUpload}
                  label="12g. Administrative General Partner 2 Tax-Exempt Status"
                  subtitle={"Evidence of tax-exempt status from IRS and FTB for Corporations. (Non-Profits Only)"}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/agp2_tax_exempt"}
                /> {this.state.value.agp2_tax_exempt ? <div className='img-css'>{this.state.value.agp2_tax_exempt.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'agp2_tax_exempt', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'agp2_tax_exempt', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>
          </PanelBarItem>
        </PanelBar>

        <PanelBar>
          <PanelBarItem expanded={true} title={"Site Control"}>
            <FormGroup row>
              <Col xs="22" lg="6">
                <Field
                  type="upload"
                  name="site_control"
                  component={FormUpload}
                  label="13. Site Control"
                  subtitle={"Provide documentation of site control in accordance with UMR §8303."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/site_control"}

                /> {this.state.value.site_control ? <div className='img-css'>{this.state.value.site_control.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'site_control', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'site_control', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
              <Col xs="22" lg="6">
                <Field
                  type="upload"
                  name="prelim_title_report"
                  component={FormUpload}
                  label="14. Preliminary Title Report"
                  subtitle={"Provide a preliminary report. (dated within 30 days of application due date)"}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/prelim_title_report"}

                /> {this.state.value.prelim_title_report ? <div className='img-css'>{this.state.value.prelim_title_report.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'prelim_title_report', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'prelim_title_report', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
              <Col xs="22" lg="6">
                <Field
                  type="upload"
                  name="appraisal"
                  component={FormUpload}
                  label="45. Appraisal"
                  subtitle={"If land cost or value is included in the development budget, an appraisal report supporting the cost or value is required."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/appraisal"}

                /> {this.state.value.appraisal ? <div className='img-css'>{this.state.value.appraisal.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'appraisal', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'appraisal', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>
          </PanelBarItem>
        </PanelBar>

        <PanelBar>
          <PanelBarItem expanded={true} title={"Source for utility allowances"}>
            <FormGroup row>
              <Col xs="22" lg="6">
                <Field
                  type="upload"
                  name="utility_allowance"
                  component={FormUpload}
                  label="32. Utility Allowance"
                  subtitle={"Schedule of Utility Allowances."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/utility_allowance"}
                />
                {this.state.value.utility_allowance ? <div className='img-css'>{this.state.value.utility_allowance.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'utility_allowance', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'utility_allowance', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>
          </PanelBarItem>
        </PanelBar>

        <PanelBar>
          <PanelBarItem expanded={true} title={"Relocation"}>
            <FormGroup row>
              <Col xs="22" lg="6">
                <Field
                  type="upload"
                  name="relocation"
                  component={FormUpload}
                  label="18. Relocation"
                  subtitle={"Relocation Plan."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/relocation"}
                /> {this.state.value.relocation ? <div className='img-css'>{this.state.value.relocation.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'relocation', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'relocation', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>
          </PanelBarItem>
        </PanelBar>

        <PanelBar>
          <PanelBarItem expanded={true} title={"Environmental Requirements & Reports"}>
            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="env_report_47"
                  component={FormUpload}
                  label="47. Environmental Report 1"
                  subtitle={"Phase I (prepared or updated no earlier than 12 months prior to the application due date)."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/env_report_47"}

                /> {this.state.value.env_report_47 ? <div className='img-css'>{this.state.value.env_report_47.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'env_report_47', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'env_report_47', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="env_report_48"
                  component={FormUpload}
                  label="48. Environmental Report 2"
                  subtitle={"Phase II (prepared or updated no earlier than 12 months prior to the application due date)."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/env_report_48"}

                /> {this.state.value.env_report_48 ? <div className='img-css'>{this.state.value.env_report_48.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'env_report_48', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'env_report_48', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>

            </FormGroup>
            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="env_report_49"
                  component={FormUpload}
                  label="49. Env. Report 3"
                  subtitle={"Lead Based Paint Report (for structures built prior to 1978) (rehab only)."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/env_report_49"}
                /> {this.state.value.env_report_49 ? <div className='img-css'>{this.state.value.env_report_49.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'env_report_49', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'env_report_49', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="env_report_50"
                  component={FormUpload}
                  label="50. Env. Report 4"
                  subtitle={"Mold Report (rehab only)."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/env_report_50"}
                />
                {this.state.value.env_report_50 ? <div className='img-css'>{this.state.value.env_report_50.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'env_report_50', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'env_report_50', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="env_report_51"
                  component={FormUpload}
                  label="51. Env. Report 5"
                  subtitle={"Asbestos Report (for structures built prior to 1978) (rehab only)."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/env_report_51"}
                />
                {this.state.value.env_report_51 ? <div className='img-css'>{this.state.value.env_report_51.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'env_report_51', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'env_report_51', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="env_report_52"
                  component={FormUpload}
                  label="52. Env. Report 6"
                  subtitle={"Other Environmental Report."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/env_report_52"}
                />
                {this.state.value.env_report_52 ? <div className='img-css'>{this.state.value.env_report_52.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'env_report_52', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'env_report_52', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>
          </PanelBarItem>
        </PanelBar>

        <PanelBar>
          <PanelBarItem expanded={true} title={"Article XXXIV"}>

            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="art_xxxiv_legal"
                  component={FormUpload}
                  label="15. Article XXXIV Legal Opinion"
                  subtitle={"Legal opinion regarding Article XXXIV, prepared in accordance with NOFA Section IV."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/art_xxxiv_legal"}

                />
                {this.state.value.art_xxxiv_legal ? <div className='img-css'>{this.state.value.art_xxxiv_legal.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'art_xxxiv_legal', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'art_xxxiv_legal', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="art_xxxiv_auth"
                  component={FormUpload}
                  label="16. Article XXXIV Authority"
                  subtitle={"Documentation of Article XXXIV Authority prepared in accordance with NOFA Section IV."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/art_xxxiv_auth"}

                />
                {this.state.value.art_xxxiv_auth ? <div className='img-css'>{this.state.value.art_xxxiv_auth.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'art_xxxiv_auth', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'art_xxxiv_auth', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
              <Col xs="12" lg="6">
                <Field
                  type="upload"
                  name="fair_housing_legal"
                  component={FormUpload}
                  label="17. Fair Housing Legal Opinion"
                  subtitle="Attach a Project-specific legal opinion labeled &quot;Fair Housing Legal Opinion&quot; with supporting materials describing how the Project complies with fair housing laws."
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/fair_housing_legal"}
                />
                {this.state.value.fair_housing_legal ? <div className='img-css'>{this.state.value.fair_housing_legal.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'fair_housing_legal', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'fair_housing_legal', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}
              </Col>
            </FormGroup>

            <strong><p>Addition Documentation</p></strong>
            <p>explanatory documentation for any item listed in the Excel application's Project Overview sheet where a "No" response resulted in a red-shaded cell.  This "No" response indicates that a program requirement is not being met.</p>

            <FormGroup row>

              <Col lg="6">
                <Field
                  type="upload"
                  name="loe"
                  component={FormUpload}
                  label="63. LOE"
                  subtitle={"Letter of Explanation(s)."}
                  batch={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={API_URL + "sid/" + this.state.sid + "/loe"}
                />
                {this.state.value.loe ? <div className='img-css'>{this.state.value.loe.split(',').map((step, i) => (<div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'loe', step)}>{step}</a><button type="button" onClick={(e) => this.deleteFileCtrl(e, 'loe', step)} className="deleteButton"> <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>))}</div> : <></>}

              </Col>
            </FormGroup>
          </PanelBarItem>
        </PanelBar>

      </div>

    )
  }
}
export default ProjectOverview