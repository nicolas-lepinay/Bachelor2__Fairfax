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
/*import { Content } from '../../post/SingleComment.styled.jsx';*/


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

    function GeneratedContent(props) {
        if (type === "chart") {
            /*
                        function countElements(response) {
            
                            data.forEach((element) =>
                                new CountUp(element[0], 0, element[1], 0, 2.5).start()
                            );
                        }*/
            return <div>
                <div id="cardsContainer">
                    <div id="topCont">
                        <div className="card" data-chart="posts">
                            <div className="rounded-icon">
                                <FontAwesomeIcon icon={faNewspaper} />
                            </div>
                            <div>
                                <p id="postCount">{data[0].posts}</p>
                                <p>published articles</p>
                            </div>
                        </div>
                        <div className="card" data-chart="category">
                            <div className="rounded-icon">
                                <FontAwesomeIcon icon={faListUl} />
                            </div>
                            <div>
                                <p id="categoryCount">{data[0].categories}</p>
                                <p>category created</p>
                            </div>
                        </div>
                        <div className="card" data-chart="user">
                            <div className="rounded-icon">
                                <FontAwesomeIcon icon={faUsers} />
                            </div>
                            <div>
                                <p id="usersCount">{data[0].users}</p>
                                <p>registered users</p>
                            </div>
                        </div>
                        <div className="card" data-chart="comment">
                            <div className="rounded-icon">
                                <FontAwesomeIcon icon={faComment} />
                            </div>
                            <div>
                                <p id="commentCount">{data[0].comments}</p>
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
                    }
                ],
                "category": [
                    {
                        name: 'Image',
                        selector: row => row.images,

                    },
                    {
                        name: 'Name',
                        selector: row => row.name,
                    },
                    {
                        name: "Action",
                        cell: (row) => (
                            <>
                                <span /*onClick={() => handleButtonClick(row._id)}*/ className='btn btn-primary'></span>
                                <span /*onClick={() => handleButtonClick(row._id)}*/ className='btn btn-danger'></span>
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
                        selector: row => row.title,
                    },
                    {
                        name: 'Username',
                        selector: row => row.createdAt,
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
                    }
                ],
                "comment": [
                    {

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