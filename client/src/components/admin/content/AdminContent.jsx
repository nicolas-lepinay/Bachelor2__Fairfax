import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Datatable from "datatables.net-searchpanes";
import tinymce from 'tinymce/tinymce';
import $ from 'jquery';
import CountUp from '../../../vendor/countUp.js';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faChartBar, faNewspaper, faUsers, faListUl, faTimes } from "@fortawesome/free-solid-svg-icons";


function AdminContent(props) {

    function GeneratedContent(props) {
 if(props.type === "Chart") {
     return <div>
         <div id="cardsContainer" className="hidden">
     <div id="topCont">
         <div className="card" data-chart="Post">
             <div className="rounded-icon">
             <FontAwesomeIcon icon={faNewspaper}/>
             </div>
             <div>
                 <p id="postCount"></p>
                 <p>published articles</p>
             </div>
         </div>
         <div className="card" data-chart="Category">
             <div className="rounded-icon">
             <FontAwesomeIcon icon={faListUl}/>
             </div>
             <div>
                 <p id="categoryCount"></p>
                 <p>category created</p>
             </div>
         </div>
         <div className="card" data-chart="User">
             <div className="rounded-icon">
             <FontAwesomeIcon icon={faUsers}/>
             </div>
             <div>
                 <p id="usersCount"></p>
                 <p>registered users</p>
             </div>
         </div>
         <div className="card" data-chart="Comment">
             <div className="rounded-icon">
                 <FontAwesomeIcon icon={faComment}/>
             </div>
             <div>
                 <p id="commentCount"></p>
                 <p>comment posted</p>
             </div>
         </div>
     </div>
     <Chart id="chartCont" className="card">
         <p id="defaultMessage">Select a category to view its statistics.</p>
     </Chart>
 </div>
     </div>;
 } else {
     return <Datatable><div className="card hidden" id="table">
     <table id="tableAdmin" className="table" style={{minWidth:100+'%'}}></table>
 </div></Datatable>;
 }

    }

return (
<>
<div>
<GeneratedContent/>
</div>
{/*
<div id="topCont">
    <h1>{props.type}</h1>
    <div className="card" data-chart="Post">
        <div className="rounded-icon">
        <FontAwesomeIcon icon={faNewspaper}/>
        </div>
        <div>
            <p id="postCount"></p>
            <p>published articles</p>
        </div>
    </div>
    <div className="card" data-chart="Category">
        <div className="rounded-icon">
        <FontAwesomeIcon icon={faListUl}/>
        </div>
        <div>
            <p id="categoryCount"></p>
            <p>category created</p>
        </div>
    </div>
    <div className="card" data-chart="User">
        <div className="rounded-icon">
        <FontAwesomeIcon icon={faUsers}/>
        </div>
        <div>
            <p id="usersCount"></p>
            <p>registered users</p>
        </div>
    </div>
    <div className="card" data-chart="Comment">
        <div className="rounded-icon">
            <FontAwesomeIcon icon={faComment}/>
        </div>
        <div>
            <p id="commentCount"></p>
            <p>comment posted</p>
        </div>
    </div>
</div>
<div id="chartCont" className="card">
    <p id="defaultMessage">Select a category to view its statistics.</p>
</div>
*/}
</>
)
}

export default AdminContent