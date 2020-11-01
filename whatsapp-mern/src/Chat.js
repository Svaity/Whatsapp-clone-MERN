import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import './Chat.css'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios'

function Chat({ messages }) {

    const [input, setInput] = useState("")

    const sendMessage = async (e) =>{
        e.preventDefault();

        await axios.post("/message/new",{
            message: input,
            name: "shrey",
            timestamp: "Just now",
            received: false,
        })

        setInput('');
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>
                
                <div className="chat__headerInfo">
                    <h3>
                        Room Name
                    </h3>
                    <p>Last seen at ...</p>
                </div>
                
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            
            
            <div className="chat__body">
                {messages.map((message)=>(
                    <p className= {`chat__message ${message.received && "chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                    
                    {message.message}
    <span className="chat__timestamp">{message.timestamp}</span>    
                
                </p>
                ))}
                



                <p className="chat__message chat__receiver">
                    <span className="chat__name">Johnathan</span>
                    
                    this is a message
    <span className="chat__timestamp">{new Date().toUTCString()}</span>    
                
                </p>

                <p className="chat__message">
                    <span className="chat__name">Shrey</span>
                    
                    this is a message
    <span className="chat__timestamp">{new Date().toUTCString()}</span>    
                
                </p>

            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">
                        Send a Message
                </button>
                    
                </form>
                <MicIcon/>
            </div>


        </div>
    )
}

export default Chat
