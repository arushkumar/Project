import React, { useEffect, useState } from 'react';
import './ab434.css';
//import axios from "axios";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { Stepper } from "@progress/kendo-react-layout";
import GenralInfo from "./genralInformation";
import ProjectBudget from "./projectBudget";
import Funding from "./funding"
import ProjectManagement from "./projectManagement";
import LegislativeInformation from "./LegislativeInformation";
import Contact from "./Contact";
import CooperatingEntities from "./CooperatingEntities";
import PerformanceMeasure from "./PerformanceMeasure";
import Attachment from "./Attachment";
import Questionnaire from "./Questionnaire";
import Preview from './preview';

import { useHistory } from "react-router-dom";
import nofaServices from '../services/nofaServices';
import Swal from 'sweetalert2';

function App(props) {

  const [loader, setLoader] = React.useState(false)
  const [step, setStep] = React.useState(0);
  const history = useHistory();
  const [orientation, setOrientation] = React.useState("vertical");
  const [steps, setSteps] = React.useState([
    {
      label: "General Information",
      isValid: undefined,
    },
    {
      label: "Project Budget",
      isValid: undefined,
    },
    {
      label: "Funding",
      isValid: undefined,
    },
    {
      label: "Project Management",
      isValid: undefined,
    },
    {
      label: "Legislative Information",
      isValid: undefined,
    },
    {
      label: "Contacts",
      isValid: undefined,
    },
    {
      label: "Cooperating Entities",
      isValid: undefined,
    },
    {
      label: "Questionnaire",
      isValid: undefined,
    },
    {
      label: "Attachments",
      isValid: undefined,
    },
    {
      label: "Performance Measurement",
      isValid: undefined,
    },
    {
      label: "Preview",
      isValid: undefined,
    },


  ]);
  const lastStepIndex = steps.length - 1;
  const isLastStep = lastStepIndex === step;
  const [user, setUser] = React.useState();
  const [sid, setSid] = React.useState();


  useEffect(() => {
    console.log("pass id", props.match.params.id)
    setLoader(true)


    if (props.match.params.id === undefined) {
      setLoader(false)
     } else {
      window.sessionStorage.setItem("Partyid", props.match.params.id);
      const datavalue = {
        party_id: props.match.params.id

      }

      nofaServices.getAllDataByPartyIDIdAndRfpId(datavalue).then(
        response => {
          setLoader(false)

          const setValue = response.data;

          sessionStorage.setItem('RfpResponceID', response.data.RFPResponceId)
          setUser(setValue);

          // var newVal = 5

         

        },
        error => {

        }
      );


    }

  }, []);

  const [formState, setFormState] = React.useState({});
  

  const isPreviousStepsValid = steps.slice(0, step).findIndex((currentStep) => currentStep.isValid === false) === -1;

  const handleChange = (e) => {
  
    setStep(e.value);
  };


  const onStepSubmit = React.useCallback(
    (event) => {

      const { isValid, values } = event;
      const currentSteps = steps.map((currentStep, index) => ({
        ...currentStep,
        isValid: index === step ? isValid : currentStep.isValid,
      }));
      setSteps(currentSteps);

      if (!isValid) {
        return;
      }
      setStep(() => Math.min(step + 1, lastStepIndex));
      setFormState(values);


      if (isPreviousStepsValid && isValid) {

        if (step === 0) {


          const NofaId = sessionStorage.getItem('NofaId');
          const Createdby = sessionStorage.getItem('username');
          const RfpResponceID = sessionStorage.getItem('RfpResponceID');
          const parties_ID = sessionStorage.getItem('parties_ID');
          console.log(RfpResponceID);
          setLoader(true)
          const datavalue = {
            "name": Createdby,
            "title": values.project_title,
            "description": values.project_desc,
            "watershed": values.watershed,
            "county": values.project_county,
            "responsible_water_board": values.Responsible_Reg,
            "latitude": "34.08515",
            "longitude": "-118.05502",
            "nofa_id": NofaId,
            "party_id": props.match.params.id,
            "rfp_response_ID": RfpResponceID

          }
          console.log(datavalue);
          nofaServices.createApplicantOrg(datavalue).then(
            res => {
              setLoader(false)
              sessionStorage.setItem('RfpResponceID', res.RfpResponceID);
              sessionStorage.setItem('RfpID', res.RfpID);
              // alert("Organization Created successfully",res)


            },
            error => {
            }
          );

        }
        else if (step === 1) {
          const RfpResponceId = sessionStorage.getItem('RfpResponceID');
          const RfpID = sessionStorage.getItem('RfpID');
          setLoader(true)
          const datavalue = {
            fund_request: values.fund_request,
            local_cost: values.local_cost,
            total_budget: values.total_budget,
            duns_no: values.duns_no,
            rfp_id: RfpID,
            rfp_responce_id: RfpResponceId
          }
          nofaServices.createProgectBudget(datavalue).then(
            res => {
              setLoader(false)
            },
            error => {
            }
          );
        }
        else if (step === 2) {
          setLoader(true)
          const RfpResponceId = sessionStorage.getItem('RfpResponceID');
          const RfpID = sessionStorage.getItem('RfpID');
          if (values.fund_request_check == true) {
            const datavalue = {
              rfp_id: RfpID,
              rfp_responce_id: RfpResponceId
            }
            nofaServices.createFundingProgram(datavalue).then(
              res => {
                setLoader(false)
                if (res.value == 'exist') {

                } else {

                }

              },
              error => {
              }
            );
          } else {
           
            const datavalue = {
              rfp_id: RfpID,
              rfp_responce_id: RfpResponceId
            }
            nofaServices.deleteRfpFundItem(datavalue).then(
              res => {
                console.log("itm", res.value)
                if (res.value == 'exist') {
                } else {
                  // alert(" Item deleted")
                  setLoader(false)
                }

              },
              error => {
              }
            );

          }
        }
        else if (step === 3) {
          setLoader(true)
          const RfpResponceId = sessionStorage.getItem('RfpResponceID');
        
          if (values.pd_first_name || values.pd_last_name || values.pd_phone || values.pd_fax || values.pd_email) {

            console.log("pd done", (!values.pd_fax) ? "" : values.pd_fax)
            const datavalue = {
              first_name: (!values.pd_first_name) ? "" : values.pd_first_name,
              last_name: (!values.pd_last_name) ? "" : values.pd_last_name,
              phone: (!values.pd_phone) ? "" : values.pd_phone,
              fax: (!values.pd_fax) ? "" : values.pd_fax,
              email: (!values.pd_email) ? "" : values.pd_email,
              rfp_responce_id: RfpResponceId,
              management_role_type: "PROJECT DIRECTOR",
            }
            nofaServices.UpdatContactMechanisms(datavalue).then(
              res => {

                //alert("Created Successfully")

              },
              error => {
              }
            );

            if (values.pm_first_name || values.pm_last_name || values.pm_phone || values.pm_fax || values.pm_email) {
              console.log("pm done")

              const datavalue = {
                first_name: (!values.pm_first_name) ? "" : values.pm_first_name,
                last_name: (!values.pm_last_name) ? "" : values.pm_last_name,
                phone: (!values.pm_phone) ? "" : values.pm_phone,
                fax: (!values.pm_fax) ? "" : values.pm_fax,
                email: (!values.pm_email) ? "" : values.pm_email,
                rfp_responce_id: RfpResponceId,
                management_role_type: "PROJECT MANAGER",
              }
              nofaServices.UpdatContactMechanisms(datavalue).then(
                res => {
                  // alert("Created Successfully")
                  setLoader(false)
                },
                error => {
                }
              );

            }

          } else {
            // console.log("only pm done")

            const datavalue = {
              first_name: (!values.pm_first_name) ? "" : values.pm_first_name,
              last_name: (!values.pm_last_name) ? "" : values.pm_last_name,
              phone: (!values.pm_phone) ? "" : values.pm_phone,
              fax: (!values.pm_fax) ? "" : values.pm_fax,
              email: (!values.pm_email) ? "" : values.pm_email,
              rfp_responce_id: RfpResponceId,
              management_role_type: "PROJECT MANAGER",
            }
            nofaServices.UpdatContactMechanisms(datavalue).then(
              res => {
                setLoader(false)
                // alert("Created Successfully")
              },
              error => {
              }
            );
          }

        }
        else if (step === 4) {
          setLoader(true)
          const RfpResponceId = sessionStorage.getItem('RfpResponceID');
          console.log("assembly_value", values.assembly_value)
          console.log("legislative_value", values.legislative_value)
          console.log("us_cong_value", values.us_cong_value)
         
          if (values.assembly_value) {
            const datavalue2 = {
              legislative_value: values.assembly_value,
              rfp_leg_type_id: 2,
              rfp_responce_id: RfpResponceId,
              leg_type_id: 4,
            }
            nofaServices.createAdditionalLegInfo(datavalue2).then(
              res => {
                //console.log("assembly_value Successfully")
                setLoader(false)
              },
              error => {
              }
            );
          }
          if (values.us_cong_value) {
            const datavalue3 = {
              legislative_value: values.us_cong_value,
              rfp_leg_type_id: 2,
              rfp_responce_id: RfpResponceId,
              leg_type_id: 2,
            }
            nofaServices.createAdditionalLegInfo(datavalue3).then(
              res => {
                console.log("us_cong_value Successfully")
                setLoader(false)
              },
              error => {
              }
            );
          }
          if (values.legislative_value) {
            const datavalue3 = {
              legislative_value: values.legislative_value,
              rfp_leg_type_id: 2,
              rfp_responce_id: RfpResponceId,
              leg_type_id: 3,
            }
            nofaServices.createAdditionalLegInfo(datavalue3).then(
              res => {
                console.log("legislative_value Successfully")
                setLoader(false)
              },
              error => {
              }
            );
          }

        }

        else if (step === 5) {
          setLoader(true)
          const RfpResponceId = sessionStorage.getItem('RfpResponceID');
          const RfpID = sessionStorage.getItem('RfpID');

          const datavalue = {
            org_name: values.cont_org_name,
            first_name: values.cont_first_name,
            last_name: values.cont_last_name,
            email: values.cont_email,
            phone: values.cont_phone,
            management_role_type: "PROJECT_CONTACT",
            rfp_id: RfpID,
            rfp_responce_id: RfpResponceId
          }
          nofaServices.createContact(datavalue).then(
            res => {
              //alert("Created Successfully")
              setLoader(false)
            },
            error => {
            }
          );

        }
        else if (step === 6) {
          setLoader(true)
          const RfpResponceId = sessionStorage.getItem('RfpResponceID');
          const RfpID = sessionStorage.getItem('RfpID');

          const datavalue = {
            org_name: values.co_org_name,
            first_name: values.co_first_name,
            last_name: values.co_last_name,
            email: values.co_email,
            phone: values.co_cotect_ph,
            management_role_type: "PROJECT_COOPERATING",
            rfp_id: RfpID,
            rfp_responce_id: RfpResponceId
          }
          nofaServices.createCooperating(datavalue).then(
            res => {
              //alert("Created Successfully")
              setLoader(false)

            },
            error => {
            }
          );

        }
        else if (step === 7) {
          setLoader(true)
          const RfpResponceId = sessionStorage.getItem('RfpResponceID');
          if (values.purpose_of_request) {
            // console.log("purpose",values.purpose_of_request)
            const datavalue = {
              rfp_responce_id: RfpResponceId,
              questions: 'purpose_of_request',
              ans1: values.purpose_of_request
            }
            nofaServices.createQuestionnaire(datavalue).then(
              response => {
                console.log(response);
                setLoader(false)
              },
              error => {

              }
            );
          }
          if (values.background) {
            const datavalue1 = {
              rfp_responce_id: RfpResponceId,
              questions: 'background',
              ans1: values.background
            }
            nofaServices.createQuestionnaire(datavalue1).then(
              response => {
                console.log(response);
                setLoader(false)
              },
              error => {

              }
            );
          }
          if (values.community_impact_area) {
            const datavalue2 = {
              rfp_responce_id: RfpResponceId,
              questions: 'community_impact_area',
              ans1: values.community_impact_area
            }
            nofaServices.createQuestionnaire(datavalue2).then(
              response => {
                console.log(response);
                setLoader(false)
              },
              error => {

              }
            );
          }
          if (values.project_waste_area) {
            const datavalue3 = {
              rfp_responce_id: RfpResponceId,
              questions: 'project_waste_area',
              ans1: values.project_waste_area
            }
            nofaServices.createQuestionnaire(datavalue3).then(
              response => {
                console.log(response);
                setLoader(false)
              },
              error => {

              }
            );
          }
          if (values.water_quality_area) {
            const datavalue4 = {
              rfp_responce_id: RfpResponceId,
              questions: 'water_quality_area',
              ans1: values.water_quality_area
            }
            nofaServices.createQuestionnaire(datavalue4).then(
              response => {
                console.log(response);
                setLoader(false)
              },
              error => {

              }
            );
          }
          if (values.responsible_party_area) {
            const datavalue5 = {
              rfp_responce_id: RfpResponceId,
              questions: 'responsible_party_area',
              ans1: values.responsible_party_area
            }
            nofaServices.createQuestionnaire(datavalue5).then(
              response => {
                console.log(response);
                setLoader(false)
              },
              error => {

              }
            );
          }
          if (values.has_any_portion === true) {
            if (values.cleanup_abatement) {
              const datavalue6 = {
                rfp_responce_id: RfpResponceId,
                questions: 'cleanup_abatement',
                ans1: values.cleanup_abatement
              }
              nofaServices.createQuestionnaire(datavalue6).then(
                response => {
                  console.log(response);
                  setLoader(false)
                },
                error => {

                }
              );
            }
            if (values.has_any_portion_area) {
              const datavalue7 = {
                rfp_responce_id: RfpResponceId,
                questions: 'has_any_portion_area',
                ans1: values.has_any_portion_area
              }
              nofaServices.createQuestionnaire(datavalue7).then(
                response => {
                  console.log(response);
                  setLoader(false)
                },
                error => {

                }
              );
            }
          }
          if (values.project_fund === true) {
            if (values.project_fund_area) {
              const datavalue8 = {
                rfp_responce_id: RfpResponceId,
                questions: 'project_fund_area',
                ans1: values.project_fund_area
              }
              nofaServices.createQuestionnaire(datavalue8).then(
                response => {
                  console.log(response);
                  setLoader(false)
                },
                error => {

                }
              );
            }
          }
          if (values.regional_bord_fund === true) {
            if (values.regional_bord_fund_ans) {
              const datavalue9 = {
                rfp_responce_id: RfpResponceId,
                questions: 'regional_bord_fund_ans',
                ans1: values.regional_bord_fund_ans
              }
              nofaServices.createQuestionnaire(datavalue9).then(
                response => {
                  console.log(response);
                  setLoader(false)
                },
                error => {

                }
              );
            }
          }
          if (values.other_list === true) {
            if (values.consists_area) {
              const datavalue10 = {
                rfp_responce_id: RfpResponceId,
                questions: 'consists_area',
                ans1: values.consists_area
              }
              nofaServices.createQuestionnaire(datavalue10).then(
                response => {
                  console.log(response);
                  setLoader(false)
                },
                error => {

                }
              );
            }
            if (values.estimated_area) {
              const datavalue11 = {
                rfp_responce_id: RfpResponceId,
                questions: 'estimated_area',
                ans1: values.estimated_area
              }
              nofaServices.createQuestionnaire(datavalue11).then(
                response => {
                  setLoader(false)
                  console.log(response);
                },
                error => {

                }
              );
            }
          }
          //}
          // else{
          // delete cleanup_abatement and has_any_portion_area
          // }
        }
        else if (step === 8) {
          setLoader(true)
          const RfpResponceId = sessionStorage.getItem('RfpResponceID');

          const datavalue = {
            attach_title : values.attach_title === undefined ? null : values.attach_title,
            attach_category:values.project_attach === undefined ? null : values.project_attach,
            rfp_responce_id:RfpResponceId
          }
          console.log(datavalue)
          nofaServices.createAttachements(datavalue).then(
            res => {
              setLoader(false)
              //console.log("Update Successfully")

            },
            error => {
            }
          );
        }
        else if(step === 9){
          const meaval = values.purpose_name
          console.log("measurValue", meaval);
        }

      }
    },
    [steps, isLastStep, isPreviousStepsValid, step, lastStepIndex]
  );
  const onPrevClick = React.useCallback(
    (event) => {
      event.preventDefault();
      setStep(() => Math.max(step - 1, 0));
      
    },
    [step, setStep],
    window.scrollTo({ top: 0, behavior: 'smooth' })

  );
 const myFunction=()=> {
    history.push("/nofa-submission");
  }
  return (
    <div>

      {sid ? <div className="container">
        <div className="row">

          <div className="col-md-12">
            <div className='subidsection'>
              <p>Submission ID: {sid} </p>
            </div>
          </div>
        </div>
      </div> : <></>
      }


      <div className="AB434-CSS12">

        <div className="row">
          {loader ?
            <div className="loader-wrapper">
              <div className="loader"></div>

            </div>
            :
            <></>

          }
        </div>
        <div className="row">

          <div className="col-md-12">
            <div className='header-align'>
              <h1 className="headsec">Faast Nofa Application</h1>
              <a className="text-align-right positon-ab" onClick={myFunction}> <i className="fa fa fa-angle-double-left" aria-hidden="true"></i> Back</a>
            </div>
          </div>
        </div>
        <div className="AB434-CSS">
          <div className="row">

            <div className="col-md-2"
            >
              <Stepper
                onChange={handleChange} value={step} items={steps} orientation={orientation} />
            </div>
            <div className="col-md-10">


              <Form
                initialValues={user}
                key={JSON.stringify(user)}
                // validator={arrayLengthValidator}
                onSubmitClick={onStepSubmit}
                render={(formRenderProps) => (
                  <div className="button-bootm"
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    <FormElement>
                      {step === 0 && <GenralInfo />}
                      {step === 1 && <ProjectBudget />}
                      {step === 2 && <Funding />}
                      {step === 3 && <ProjectManagement />}
                      {step === 4 && <LegislativeInformation />}
                      {step === 5 && <Contact />}
                      {step === 6 && <CooperatingEntities />}
                      {step === 7 && <Questionnaire
                        hasAnyPortion={formRenderProps.valueGetter("has_any_portion")}
                        ProjectFund={formRenderProps.valueGetter("project_fund")}
                        RegionalBordFund={formRenderProps.valueGetter("regional_bord_fund")}
                        OtherList={formRenderProps.valueGetter("other_list")}
                        OlderThen_5={formRenderProps.valueGetter("older_then_5")}


                      />}
                      {step === 8 && <Attachment />}
                      {step === 9 && <PerformanceMeasure />}
                      {step === 10 && <Preview 
                      partyID = {props.match.params.id}
                      />}


                      <span
                        style={{
                          marginTop: "40px",
                        }}
                        className={"k-form-separator"}
                      />
                      <div
                        style={{
                          justifyContent: "space-between",
                          alignContent: "center",
                        }}
                        className={"k-form-buttons k-buttons-end"}
                      >
                        <span
                          style={{
                            alignSelf: "center",
                          }}
                        >
                          Step {step + 1} of 11
                        </span>
                        <div className="btn123">

                          {step !== 0 ? (
                            <Button
                              style={{
                                marginRight: "16px",
                              }}
                              onClick={onPrevClick}
                            >
                              Previous
                            </Button>
                          ) : undefined}
                          <Button
                            primary={true}
                            //  disabled={
                            //    (step === 1 && !formRenderProps.valueGetter('mhp_bool') && !formRenderProps.valueGetter('iig_bool') && !formRenderProps.valueGetter('vhhp_bool') && !formRenderProps.valueGetter('fwhg_bool'))
                            //   }
                            disabled={isLastStep ? !isPreviousStepsValid : false}
                            onClick={formRenderProps.onSubmit}
                          >
                            {isLastStep ? "Submit" : "Next"}
                          </Button>
                        </div>
                      </div>
                    </FormElement>
                  </div>
                )}
              />
            </div>

          </div>

        </div>


      </div>


    </div>
  );
};
export default App;