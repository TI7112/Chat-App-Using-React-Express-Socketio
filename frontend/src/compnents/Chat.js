import React  from 'react'
import { ChatLayout } from './ChatComponents'

const Chat = ({socket , msg ,setMsg , msgData , chatData}) => {
    const IncomingMsg = ({ user }) => {
        return (
            <div className="px-4">
                <p className='text-sm p-1 font-semibold'>{user.name}</p>
                <p className='bg-white px-2 py-1 w-fit'>{user.msg}</p>
            </div>
        )
    }
    const OutgoingMsg = ({ user }) => {
        return (
            <div className="px-4 flex flex-col items-end">
                <p className='text-sm p-1 font-semibold'>{user.name}</p>
                <p className='bg-sky-500 text-white px-2 py-1 w-fit'>{user.msg}</p>
            </div>
        )
    }

    socket.on('get_user_chat' , (chats)=>{
        msgData = chats
    })

    return (
        <>
            <ChatLayout socket={socket} msg={msg} setMsg={setMsg} chatData={chatData} msgData={msgData}> 
                <div className="bg-slate-200 min-h-[65vh] overflow-y-scroll">
                   
                   {msgData.filter(value => value.chatId === msg.chatID).map((curElem , index)=>(
                        (curElem.sender === msg.sender) ? <OutgoingMsg key={index} user={curElem} /> : <IncomingMsg key={index} user={curElem} />
                    ))}

                </div>
            </ChatLayout>

        </>
    )
}

export default Chat