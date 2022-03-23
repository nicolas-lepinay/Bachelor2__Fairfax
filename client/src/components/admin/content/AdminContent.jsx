import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import DataTable from 'react-data-table-component'
/*import tinymce from 'tinymce/tinymce';
import $ from 'jquery';*/
import CountUp from 'react-countup';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faChartBar, faNewspaper, faUsers, faListUl, faTimes, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import adminContent from './adminContent.css';
import DisplayedText from './DisplayedText.jsx';


const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;
const ASSETS = "http://localhost:3000/assets/categories";

function AdminContent(props) {

    const type = props.type;
    const [data, setData] = useState([{}]);


    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`/admin/${type}`);
                setData(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [type]);
    console.log(type);

    function deleteRow(id) {
        console.log("Suppression de l'ID ", id);
    }

    function GeneratedContent(props) {
        if (type === "chart") {

            return <div>
                <div id="cardsContainer">
                    <div id="topCont">
                        <div className="card" data-chart="posts">
                            <div className="rounded-icon">
                                <FontAwesomeIcon icon={faNewspaper} />
                            </div>
                            <div>
                                <CountUp end={data[0].posts} duration={1.5} id="postCount" />
                                <p>published articles</p>
                            </div>
                        </div>
                        <div className="card" data-chart="category">
                            <div className="rounded-icon">
                                <FontAwesomeIcon icon={faListUl} />
                            </div>
                            <div>
                                <CountUp end={data[0].categories} duration={1.5} id="categoryCount" />
                                <p>category created</p>
                            </div>
                        </div>
                        <div className="card" data-chart="user">
                            <div className="rounded-icon">
                                <FontAwesomeIcon icon={faUsers} />
                            </div>
                            <div>
                                <CountUp end={data[0].users} duration={1.5} id="usersCount" />
                                <p>registered users</p>
                            </div>
                        </div>
                        <div className="card" data-chart="comment">
                            <div className="rounded-icon">
                                <FontAwesomeIcon icon={faComment} />
                            </div>
                            <div>
                                <CountUp end={data[0].comments} duration={1.5} id="commentCount" />
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

            const columnsList = {
                "posts": [
                    {
                        name: 'Title',
                        selector: row => row.title,
                    },
                    {
                        name: 'Creation date',
                        selector: row => row.createdAt,
                    },
                    {
                        name: 'Action',
                        cell: (row) => (
                            <>
                                <button className="deleteButton"><FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteRow(row._id)} /></button>
                            </>
                        ),
                    }
                ],
                "category": [
                    {
                        name: 'Image',
                        selector: row => row.icons,
                        cell: (row) => (
                            <>
                                <div style={{ backgroundImage: `URL(${ASSETS}/${row.icons})` }} className="tableCategory"></div>
                            </>
                        ),
                    },
                    {
                        name: 'Name',
                        selector: row => row.name,
                    },
                    {
                        name: "Action",
                        cell: (row) => (
                            <>
                                <button className="deleteButton"><FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteRow(row._id)} /></button>
                            </>
                        ),

                        ignoreRowClick: true,
                        allowOverflow: true,
                        button: true,
                    }
                ],
                "user": [
                    {
                        name: 'Avatar',
                        selector: row => row.avatar,
                        cell: (row) => (
                            <>
                                <div style={{ backgroundImage: `URL(${MEDIA}/profile/${row.avatar ? row.avatar : 'defaultAvatar.jpg'})` }} className="tableAvatar"></div>
                            </>
                        ),
                    },
                    {
                        name: 'Username',
                        selector: row => row.username,
                    },
                    {
                        name: 'Role',
                        selector: row => row.role,
                    },
                    {
                        name: 'Email',
                        selector: row => row.email,
                    },
                    {
                        name: 'Action',
                        cell: (row) => (
                            <>
                                <button className="deleteButton"><FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteRow(row._id)} /></button>
                            </>
                        ),
                    }
                ],
                "comment": [
                    {
                        name: 'Post',
                        selector: row => row.postId,

                    },
                    {
                        name: 'User',
                        selector: row => row.userId,
                    },
                    {
                        name: 'Comment',
                        selector: row => row.content,
                        cell: (row) => (
                            <DisplayedText content={row.content}></DisplayedText>
                        ),
                    },
                    {
                        name: "Action",
                        cell: (row) => (
                            <>
                                <button className="deleteButton"><FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteRow(row._id)} /></button>
                            </>
                        ),

                        ignoreRowClick: true,
                        allowOverflow: true,
                        button: true,
                    }
                ]
            };
            console.log("ColumnsList : ", columnsList);
            const columnsToExclude = ['comments', 'likes', 'views']
            /*
                        Object.entries(data[0]).forEach(([key, value]) => {
                            var column = {};
                            if (!columnsToExclude.includes(key)) {
                                column.name = key;
                                column.selector = (row, value) => row.value;//row.value;//key;//row => row.key;
                                column.sortable = true;
                                columnsList.push(column);
                            }
                        })
                        console.log(columnsList);
                        console.log(data);*/
            return <><DataTable columns={columnsList[type]} data={data} /></> /* <div className="card" id="table">
               
                <table id="tableAdmin" className="table" style={{ minWidth: 100 + '%' }}></table>
            </div></DataTable>*/;
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