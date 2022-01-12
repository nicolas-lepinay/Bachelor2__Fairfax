import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Datatable from "datatables.net-searchpanes"; 
import tinymce from 'tinymce/tinymce';
import $ from 'jquery';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faChartBar, faNewspaper, faUsers, faListUl, faTimes } from "@fortawesome/free-solid-svg-icons";
import adminMenu from './adminMenu.css';
import AdminContent from '../content/AdminContent.jsx';

function AdminMenu(props) {

    const [contentType, setContentType] = useState("Chart");

    useEffect(() => {
        console.log(contentType);
    }, [contentType]);

    return (
        <main>
            <h1>Administration</h1>
            <div id="contentContainer">
                <ul id="catList">
                    <li className="catBtn" data-table="Charts" onClick={() => setContentType("Chart")}><FontAwesomeIcon icon={faChartBar}/>
                        <p>Charts</p>
                    </li>
                    <li className="catBtn" data-table="Post" onClick={() => setContentType("Post")}><FontAwesomeIcon icon={faNewspaper}/>
                        <p>post</p>
                    </li>
                    <li className="catBtn" data-table="Comment" onClick={() => setContentType("Comment")}><FontAwesomeIcon icon={faComment}/>
                        <p>comment</p>
                    </li>
                    <li className="catBtn" data-table="User" onClick={() => setContentType("User")}><FontAwesomeIcon icon={faUsers}/>
                        <p>Users</p>
                    </li>
                    <li className="catBtn" data-table="Category" onClick={() => setContentType("Category")}><FontAwesomeIcon icon={faListUl}/>
                        <p>category</p>
                    </li>
                </ul>
                <AdminContent type={contentType}/>
                

                {/* Modal 
                <div className="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="updateModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <FontAwesomeIcon icon={faTimes}/>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form method="post" action="" entype="multipart/form-data" id="updateForm">

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-blue">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>*/}
            </div>

        </main>
    )
}

export default AdminMenu

