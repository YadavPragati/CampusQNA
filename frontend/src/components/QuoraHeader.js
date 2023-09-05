import React, { useState } from 'react'
import HomeIcon from '@material-ui/icons/Home'
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined'
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined'
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined'
import SearchIcon from '@material-ui/icons/Search'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import './css/QuoraHeader.css'
import Modal from 'react-responsive-modal'
import CloseIcon from '@material-ui/icons/Close'
import 'react-responsive-modal/styles.css'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Input from '@material-ui/core/Input'
import axios  from 'axios'
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { logout, selectUser } from "../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";


function QuoraHeader() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [inputUrl, setInputUrl] = useState("")
    const [question, setQuestion] = useState("")
    const Close = (<CloseIcon />)
    const dispatch = useDispatch();
    const user = useSelector(selectUser)

    const handleSubmit = async () => {
        if (question !== "") {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const body = {
            questionName: question,
            questionURL: inputUrl,
            user: user,
          };
          await axios
            .post("/api/questions", body, config)
            .then((res) => {
              console.log(res.data);
              window.location.href = "/";
            })
            .catch((e) => {
              console.log(e);
              alert("Error in adding question");
            });
        }
      };


    const handleLogout = () => {
        if(window.confirm("Are you sure to Log Out?")) {
            signOut(auth)
            .then(() => {
                dispatch(logout());
                console.log("Logged out");
            }).catch((err) => {
                console.log("error in Logout");
            });
        }
    };

    return (
        <div className='qHeader'>
            <div className='qHeader-content'>
                <div className='qHeader-logo'>
                    <img src='https://moein.video/wp-content/uploads/2021/12/QA-GIF-Quastion-and-Answer-Royalty-Free-Animated-Icon-350px-after-effects-project.gif' alt='logo' />
                </div>
                <div className='qHeader-icons'>
                    <div className='qHeader-icon'><HomeIcon /></div>
                    <div className='qHeader-icon'><FeaturedPlayListOutlinedIcon /></div>
                    <div className='qHeader-icon'><AssignmentTurnedInOutlinedIcon /></div>
                    <div className='qHeader-icon'><NotificationsOutlinedIcon /></div>
                    <div className='qHeader-icon'><PeopleAltOutlinedIcon /></div>
                </div>
                <div className='qHeader-input'>
                    <SearchIcon />
                    <input type='text' placeholder='Search Questions' />
                </div>
                <div className='qHeader-Rem'>
                    <span onClick={handleLogout}><Avatar src = {user?.photo} />
                    </span>
                    
                    <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
                    <Modal
                        open={isModalOpen}
                        closeIcon={Close}
                        onClose={() => setIsModalOpen(false)}
                        closeOnEsc
                        center
                        closeOnOverlayClick={false}
                        styles={{
                            overlay: {
                                height: "auto",
                            },
                        }}
                    >
                        <div className='modal__title'>
                            <h5>Add Question</h5>
                            <h5>Share Link</h5>
                        </div>
                        <div className='modal__info'>
                            <Avatar src = {user?.photo} className='avatar' />
                            <div className='modal__scope'>
                                <PeopleAltOutlinedIcon />
                                <p>Public</p>
                                <ExpandMore />
                            </div>
                        </div>
                        <div className='modal__Field'>
                            <Input 
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            type="text" placeholder='Start your question with What, How, Why, etc. ' />
                            <div style={{
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <input 
                                    type='text'
                                    value={inputUrl}
                                    onChange={(e) => setInputUrl(e.target.value)}
                                    style={{
                                        margin: "5px 0px",
                                        border: "1px solid lightgray",
                                        padding: "10px",
                                        outline: "2px solid #000",
                                    }}
                                    placeholder='Optional: include a link that gives context' 
                                />
                                {inputUrl !== "" && (
                                    <img style={{
                                        height: "40vh",
                                        objectFit: "contain",
                                    }}
                                        src={inputUrl} alt='display element' 

                                        />)}
                            </div>
                        </div>
                        <div className='modal__buttons'>
                            <button className='cancle' onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button  onClick={handleSubmit}  type='submit' className='add'>Add Question</button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default QuoraHeader
