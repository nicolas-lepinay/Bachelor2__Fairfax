import React from 'react'
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faChartBar, faNewspaper, faUsers, faListUl, faTimes } from "@fortawesome/free-solid-svg-icons";
import adminMenu from './adminMenu.css';
import AdminContent from '../content/AdminContent.jsx';
import AdminContext from "../context/adminContext";

function AdminMenu(props) {

    const [contentType, setContentType] = useState("Charts");
    const context = useContext(AdminContext);

    useEffect(() => {
        console.log(contentType);
    }, [contentType]);

    return (
        <main>
            <h1>Administration - <span className="text-blue">{contentType}</span></h1>
            <div id="contentContainer">
                <ul id="catList">
                    <li className="catBtn" data-table="Charts" onClick={() => setContentType("Charts")} style={{ backgroundColor: `${contentType == "Charts" ? '#615dfa' : ''}`, color: `${contentType == "Charts" ? 'white' : ''}` }}><FontAwesomeIcon icon={faChartBar} />
                        <p>Charts</p>
                    </li>
                    <li className="catBtn" data-table="Posts" onClick={() => setContentType("Posts")} style={{ backgroundColor: `${contentType == "Posts" ? '#615dfa' : ''}`, color: `${contentType == "Posts" ? 'white' : ''}` }}><FontAwesomeIcon icon={faNewspaper} />
                        <p>Posts</p>
                    </li>
                    <li className="catBtn" data-table="Comments" onClick={() => setContentType("Comments")} style={{ backgroundColor: `${contentType == "Comments" ? '#615dfa' : ''}`, color: `${contentType == "Comments" ? 'white' : ''}` }}><FontAwesomeIcon icon={faComment} />
                        <p>Comments</p>
                    </li>
                    <li className="catBtn" data-table="Users" onClick={() => setContentType("Users")} style={{ backgroundColor: `${contentType == "Users" ? '#615dfa' : ''}`, color: `${contentType == "Users" ? 'white' : ''}` }}><FontAwesomeIcon icon={faUsers} />
                        <p>Users</p>
                    </li>
                    <li className="catBtn" data-table="Categories" onClick={() => setContentType("Categories")} style={{ backgroundColor: `${contentType == "Categories" ? '#615dfa' : ''}`, color: `${contentType == "Categories" ? 'white' : ''}` }}><FontAwesomeIcon icon={faListUl} />
                        <p>Categories</p>
                    </li>
                </ul>
                <AdminContent type={contentType} style={{ width: '100%', minWidth: '100%' }} id="adminContentCont" />

            </div>

        </main>
    )
}

export default AdminMenu

