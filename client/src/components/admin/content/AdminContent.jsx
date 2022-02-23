import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import DataTable from 'react-data-table-component'
/*import tinymce from 'tinymce/tinymce';
import $ from 'jquery';*/
import CountUp from '../../../vendor/countUp.js';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faChartBar, faNewspaper, faUsers, faListUl, faTimes } from "@fortawesome/free-solid-svg-icons";


function AdminContent(props) {

    const type = props.type;
    const [data, setData] = useState(type);

    const getData = async () => {
        try {
            const res = await axios.get(`/admin/${data}`);
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    function GeneratedContent(props) {
        if (type === "chart") {
            return <div>
                <div id="cardsContainer">
                    <div id="topCont">
                        <div className="card" data-chart="post">
                            <div className="rounded-icon">
                                <FontAwesomeIcon icon={faNewspaper} />
                            </div>
                            <div>
                                <p id="postCount"></p>
                                <p>published articles</p>
                            </div>
                        </div>
                        <div className="card" data-chart="category">
                            <div className="rounded-icon">
                                <FontAwesomeIcon icon={faListUl} />
                            </div>
                            <div>
                                <p id="categoryCount"></p>
                                <p>category created</p>
                            </div>
                        </div>
                        <div className="card" data-chart="user">
                            <div className="rounded-icon">
                                <FontAwesomeIcon icon={faUsers} />
                            </div>
                            <div>
                                <p id="usersCount"></p>
                                <p>registered users</p>
                            </div>
                        </div>
                        <div className="card" data-chart="comment">
                            <div className="rounded-icon">
                                <FontAwesomeIcon icon={faComment} />
                            </div>
                            <div>
                                <p id="commentCount"></p>
                                <p>comment posted</p>
                            </div>
                        </div>
                    </div>
                    {/* 
                    <Chart id="chartCont" className="card">
                        <p id="defaultMessage">Select a category to view its statistics.</p>
                    </Chart>*/}
                </div>
            </div>;
        } else {
            return <DataTable><div className="card hidden" id="table">
                <table id="tableAdmin" className="table" style={{ minWidth: 100 + '%' }}></table>
            </div></DataTable>;
        }

    }

    return (
        <>
            <div>
                <GeneratedContent />
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