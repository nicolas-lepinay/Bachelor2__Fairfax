import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import DataTable from 'react-data-table-component'
/*import tinymce from 'tinymce/tinymce';
import $ from 'jquery';*/
import CountUp from 'react-countup';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';
import { faComment, faChartBar, faNewspaper, faUsers, faListUl, faTimes, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import adminContent from './adminContent.css';
import DisplayedText from './DisplayedText.jsx';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        height: '30%',

    },
};

const dataTableStyles = {
    table: {
        style: {
            minWidth: '100%',
        },
    },
}

Modal.setAppElement('#root');

const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;
const ASSETS = "http://localhost:3000/assets/categories";

function AdminContent(props) {

    const type = props.type;
    const [data, setData] = useState([{}]);
    const [datatwo, setDatatwo] = useState([{}]);
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')

    const [chartData, setChartData] = useState([{}]);
    const [chartType, setChartType] = useState("Posts");

    // Data for data-table
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

    // Data for chart
    useEffect(() => {
        const getChartData = async () => {
            try {
                const res = await axios.get(`/admin/${chartType}/date`);
                setChartData(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getChartData();
    }, [chartType]);

    function openModal(id) {

        setIsOpen(true);

        const getData = async () => {
            try {
                const res = await axios.get(`/posts/${id}`);
                setDatatwo(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
        console.log(datatwo);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    function update(id) {

        console.log(title + "   " + date);
        const posts = { title: title, createdAt: date };
        axios.put(`/posts/${id}`, posts)
            .then(response => this.setState({ updatedAt: response.data.updatedAt }))
            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });
    }


    function deleteRow(id) {
        console.log("Suppression de l'ID ", id);
    }

    function GeneratedContent(props) {
        if (type === "Charts") {

            return <div>
                <div id="cardsContainer">
                    <div id="topCont">
                        <div className="card" data-chart="posts" onClick={() => setChartType("Posts")}>
                            <div className="rounded-icon">
                                <FontAwesomeIcon icon={faNewspaper} />
                            </div>
                            <div>
                                <CountUp end={data[0].posts} duration={1.5} id="postCount" />
                                <p>Published articles</p>
                            </div>
                        </div>
                        <div className="card" data-chart="category" onClick={() => setChartType("Categories")}>
                            <div className="rounded-icon">
                                <FontAwesomeIcon icon={faListUl} />
                            </div>
                            <div>
                                <CountUp end={data[0].categories} duration={1.5} id="categoryCount" />
                                <p>Categories created</p>
                            </div>
                        </div>
                        <div className="card" data-chart="user" onClick={() => setChartType("Users")}>
                            <div className="rounded-icon">
                                <FontAwesomeIcon icon={faUsers} />
                            </div>
                            <div>
                                <CountUp end={data[0].users} duration={1.5} id="usersCount" />
                                <p>Registered users</p>
                            </div>
                        </div>
                        <div className="card" data-chart="comment" onClick={() => setChartType("Comments")}>
                            <div className="rounded-icon">
                                <FontAwesomeIcon icon={faComment} />
                            </div>
                            <div>
                                <CountUp end={data[0].comments} duration={1.5} id="commentCount" />
                                <p>Comments posted</p>
                            </div>
                        </div>
                    </div>
                    {
                        /*<Chart id="chartCont" className="card">
                            <p id="defaultMessage">Select a category to view its statistics.</p>
                    </Chart>*/}
                </div>
            </div>;
        } else {

            const columnsList = {
                "Posts": [
                    {
                        name: 'Title',
                        selector: row => row.title,
                        sortable: true,
                    },
                    {
                        name: 'Creation date',
                        selector: row => row.createdAt,
                        sortable: true,
                    },
                    {
                        name: 'Action',
                        cell: (row) => (
                            <>
                                {/* <p>test</p> */}
                                <div>

                                    <button onClick={() => openModal(row._id)} className="editButton">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </div>

                                <button className="deleteButton" onClick={() => deleteRow(row._id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                            </>
                        ),
                    }
                ],
                "Categories": [
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
                        sortable: true,
                    },
                    {
                        name: "Action",
                        cell: (row) => (
                            <>
                                <button className="deleteButton" onClick={() => deleteRow(row._id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                            </>
                        ),

                        ignoreRowClick: true,
                        allowOverflow: true,
                        button: true,
                    }
                ],
                "Users": [
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
                        sortable: true,
                    },
                    {
                        name: 'Role',
                        selector: row => row.role,
                        sortable: true,
                    },
                    {
                        name: 'Email',
                        selector: row => row.email,
                    },
                    {
                        name: 'Action',
                        cell: (row) => (
                            <>
                                <button className="deleteButton" onClick={() => deleteRow(row._id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                            </>
                        ),
                    }
                ],
                "Comments": [
                    {
                        name: 'Post',
                        selector: row => row.postId,
                        sortable: true,

                    },
                    {
                        name: 'User',
                        selector: row => row.userId,
                        sortable: true,
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
                                <button className="deleteButton" onClick={() => deleteRow(row._id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                            </>
                        ),

                        ignoreRowClick: true,
                        allowOverflow: true,
                        button: true,
                    }
                ]
            };
            console.log("ColumnsList : ", columnsList);

            return (
                <div id="tableContainer">
                    <DataTable columns={columnsList[type]} data={data} pagination customStyles={dataTableStyles} />
                </div>
            );
        }

    }

    return (
        <>
            <div  >
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}


                >
                    <button onClick={closeModal} className="close"><svg width="24" height="24" stroke-width="1.5" color='red' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    </button>
                    <label htmlFor="titel">Title</label>
                    <input type="text" onChange={event => setTitle(event.target.value)} placeholder={datatwo.title} />
                    <label htmlFor="titel">Creation date</label>
                    <input type="datetime-local" onChange={event => setDate(event.target.value)} placeholder={datatwo.createdAt} />
                    <button onClick={() => update(datatwo._id)}>update</button>
                </Modal>
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