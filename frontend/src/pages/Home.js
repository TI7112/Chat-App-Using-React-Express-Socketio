import React, { useEffect, useState } from 'react'
import Chat from '../compnents/Chat'
import Sidebar from '../compnents/Sidebar'
import { rawchatData, rawmsgData } from '../data/data'
import socketIO from 'socket.io-client'
import axios from 'axios'
// import {user} from './Login'

const ENDPOINT = "http://localhost:5000"

const checkLoginUser = async () =>{
    const LogedinUser = await axios.post('http://localhost')
}

const Home = () => {

    const [msgData, setMsgData] = useState(rawmsgData)
    const [chatData, setChatData] = useState(rawchatData)

    const socket = socketIO(ENDPOINT, { transports: ['websocket'] });

    useEffect(() => {
        socket.on('connection', () => { alert('connected') })

        socket.emit('joined', { user: "Ayush" })




    }, [socket])

    const [msg, setMsg] = useState({
        sender: "ayushjha7112@gmail.com",
        reciever: chatData[0].email,
        chatID: chatData[0].chatID,
        message: chatData[0].last_msg
    })

    // useEffect(() => {

    //     const Data = axios.get(`http://localhost:5000/chats/${msg.chatId}`)
    //     setMsgData(Data)

    // }, [msg.reciever])
    
    console.log(chatData)

    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex w-full px-60">
                    <div className="w-1/3"><Sidebar socket={socket} msg={msg} setMsg={setMsg} chatData={chatData} /></div>
                    <div className="w-2/3 "><Chat socket={socket} msg={msg} setMsg={setMsg} msgData={msgData} chatData={chatData} /></div>
                </div>
            </div>
        </>
    )
}

export default Home