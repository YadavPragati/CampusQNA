import React, { useState } from 'react'
import './css/Post.css'
import { Avatar } from '@material-ui/core'
import { ArrowUpwardOutlined, MoreHorizOutlined } from '@material-ui/icons'
import ArrowDownwardOutlined from '@material-ui/icons/ArrowDownwardOutlined'
import RepeatOneOutlined from '@material-ui/icons/RepeatOneOutlined'
import ChatBubbleOutlined from '@material-ui/icons/ChatBubbleOutlined'
import ShareOutlined from '@material-ui/icons/ShareOutlined'
import Modal from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import CloseIcon from '@material-ui/icons/Close'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactTimeAgo from 'react-time-ago'
import axios from "axios"
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import ReactHtmlParser from "html-react-parser"
function LastSeen({ date }) {
  const timestamp = Date.parse(date);
  return (
    <div>
      <ReactTimeAgo date={timestamp} locale="en-US" timeStyle="round"/>
    </div>
  )
}

function Post({post}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const[answer, setAnswer] = useState("")
  const Close = (<CloseIcon />)

const user = useSelector(selectUser)

  const handleQuill = (value) => {
    setAnswer(value)
  }
  //console.log(answer)


  const handleSubmit = async() => {
    if(post?._id && answer !== "") {
      const config = {
        headers : {
          "Content-Type" : "application/json"
        }
      }
      const body = {
        answers : answer,
        questionId : post?._id,
        user : user
      }
      await axios.post("/api/answers", body, config)
      .then((res) => {
        console.log(res.data)
        alert("Answer Added Successfully")
        setIsModalOpen(false);
        window.location.href = "/"
      })
      .catch((e) => {
        console.log(e)
      });
    }
  }
  return (
    <div className='post'>
      <div className='post__info'>
        <Avatar src = {post?.user?.photo} />
        <h4>{post?.user?.userName}</h4>
        <small>
        <LastSeen date={post?.createdAt}/>
        </small>
      </div>
      <div className='post__body'>
        <div className='post__question'>
          <p>{post?.questionName}</p>
          <button onClick={() => {
             setIsModalOpen(true)
             console.log(post?._id)
            }}
            className='post__btnAnswer'>Answer</button>
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
            <div className='modal__question'>
              <h1>{post?.questionName}</h1>
              <p>asked by <span className='name'>{post?.user?.userName}</span> on <span className='name'>{new Date(post?.createdAt).toLocaleString()}</span></p>
            </div>
            <div className='modal__answer'>
              <ReactQuill value = {answer} onChange= {handleQuill} placeholder='Enter your answer' />

            </div>
            <div className='modal__button'>
              <button className='cancle' onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button  onClick={handleSubmit}    type='submit' className='add'>Add Answer</button>
            </div>
          </Modal>
        </div>
          {post.questionURL !== "" && <img src = {post.questionURL} alt = "URL"/>}
      </div>
      <div className='post__footer'>
        <div className='post__footerAction'>
          <ArrowUpwardOutlined />
          <ArrowDownwardOutlined />
        </div>
        <RepeatOneOutlined />
        <ChatBubbleOutlined />
        <div className='post__footerLeft'>
          <ShareOutlined />
          <MoreHorizOutlined />
        </div>
      </div>
      <p style={{
        color: "rgba(0,0,0,0.5)",
        fontSize: "12px",
        fontWeight: "bold",
        margin: "10px 0"
      }}>
        {post?.allAnswers.length} Answers(s)
      </p>




      <div style={{
        margin: "5px 0px 0px 0px",
        padding: "5px 0px 0px 20px",
        borderTop: "1px solid lightgray"
      }}
        className='post__answer'>        
       {post?.allAnswers?.map((_a) => {
    // Check if _a.answers is a valid string before using ReactHtmlParser
    const isValidHtmlString = typeof _a.answers === "string";

    return isValidHtmlString ? (
      <div
        key={_a._id} // Add a unique key to each mapped element
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "10px 5px",
          borderTop: "1px solid lightgray",
        }}
        className="post-answer-container"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#888",
          }}
          className="post-answered"
        >
          <Avatar src={_a?.user?.photo} />
          <div
            style={{
              margin: "0px 10px",
            }}
            className="post-info"
          >
            <p>{_a?.user?.userName}</p>
            <span>
              <LastSeen date={_a?.createdAt} />
            </span>
          </div>
        </div>
        <div className="post-answer">{ReactHtmlParser(_a.answers)}</div>
      </div>
    ) : null; // If _a.answers is not a valid string, skip rendering this entry
  })}
        </div>
      </div>
  );
}

export default Post
