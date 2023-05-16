import React, { useEffect } from 'react';
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { filterBy } from "@progress/kendo-data-query";
import { GridCommandCell, GridDeleteCell } from '../ListData/gridCommandCell'
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { Link } from 'react-router-dom'
import nofaServices from '../services/nofaServices';
import moment from "moment";
import '../ListData/homepage.css';


import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
// import { useMsal } from '@azure/msal-react'
// import { useIsAuthenticated } from '@azure/msal-react';

const editField = "inEdit";
const deleteField = "inDelete";
const initialFilter1 = {
    logic: "and",
    filters: [
        {
            field: "created_by",
            operator: "contains",
            value: "",
        },
    ],
};
const initialDataState1 = {
    skip: 0,
    take: 10,
};

function FormList() {

    const history = useHistory();
    const [filter1, setFilter1] = React.useState(initialFilter1);
    const [page1, setPage1] = React.useState(initialDataState1);
    const [issue, setIssue] = React.useState([])
    const [loader, setLoader] = React.useState(false)
    const NofaId = sessionStorage.getItem('NofaId');
    const Nofa = sessionStorage.getItem('Nofa');

    const completeFunction = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (NofaId) {
            const datavalue = {
                nofa_id: NofaId
            }
            setLoader(true)
            nofaServices.getOrganizationByNofaId(datavalue)
                .then(({ data: issue }) => {
                   
                    
                     for (var i in issue.data) {
                        let x = issue.data[i];
                        var date= moment(x.START_DATE).utc().format('yyyy-MM-DD hh:mm:ss')
                        x.date = date                                           
                    }                   
                    
                    setIssue(issue);
                    setLoader(false)
                    console.log(issue.data)
                });
        } else {
            return null;
        }
    }
   

    useEffect(() => {
        setTimeout(function () {
            
            completeFunction();
        }, 1000);

    }, []);

    const pageChange1 = (event) => {
        setPage1(event.page);
    };

   
    const itemChange = (event) => {
        
        const newData = issue.map((item) =>
            item.id === event.dataItem.id
                ? { ...item, [event.field || ""]: event.value }
                : item
        );
        setIssue(newData);
    };
    const CommandCell = (props) => (
        <GridCommandCell
            {...props}
            edit={enterEdit}
            editField={editField}
        />
    );
    const deleteCell = (props) => (
        <GridDeleteCell
            {...props}
            delete={enterDelete}
            deleteField={deleteField}

        />
    );

    const backtonofa = () => {

        history.push({
            pathname: '/'
        });
    };
    return (
        <div>

            <div className="container">

                <div className="row">
                    {loader ?
                        <div className="loader-wrapper">
                            <div className="loader"></div>

                        </div>
                        :
                        <></>

                    }
                </div>
                <div className="prviewcss">
                <div className="position-relative row form-group">
                    <div className="col-lg-9">
                        <h4><i className="fa fa-home" aria-hidden="true"></i> {Nofa}</h4></div>
                        <div className="col-lg-3">

                        <a className="text-align-right" onClick={backtonofa}><i className="fa fa fa-angle-double-left" aria-hidden="true"></i> Back </a>
                       
                    </div>
                </div>
                <div className="row">

                   

                   
                            <Grid pageable={false} sortable={true} filterable={false} style={{ height: "" }}
                               
                                data={issue}
                               
                                id='employee' className="table"
                                onItemChange={itemChange}
                                editField={editField}

                            >
                                <Column field="ID" title="ID" width="70px" />
                                <Column field="NAME" title="PROJECT NAME" />
                                
                                <Column field="date" title="CREATED DATE" width="250px" />
                                <Column
                                    width="200px"
                                    field="1"
                                  
                                    filterable={false}
                                    title="OPERATIONS"
                                    cell={(props) => (
                                        <td className='opration2'>
                                            <Link to={"/apply/edit/" + props.dataItem.ORG_PARTY_ID} className="fourth btn btn-primary"><i className="fa fa-edit" aria-hidden="true"></i>  Edit</Link>
                                        </td>
                                    )}
                                />

                            </Grid>
                       

                </div>
                </div>
            </div>
        </div>
    )
}

export default FormList