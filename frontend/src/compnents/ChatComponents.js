import axios from "axios"

export const Input = ({ socket, msg ,setMsg , msgData}) => {
    const handlekey = async(e) => {
        if(e.key === "Enter"){
            setMsg({...msg , message:e.target.value})
            const message = {
                chatID : msg.chatID,
                sender : msg.sender,
                msg : e.target.value,
            }
            e.target.value = ""
            socket.emit('send_message' , message)
            msgData.push({
                chatID:msg.chatID,
                sender:msg.sender,
                msg:msg.message,
            })
        }
    }
    return (
        <div className="rounded-br-xl">
            <input onKeyUp={handlekey} type="text" placeholder='Type something' className='p-2 border-b-2 border-slate-700 rounded-br-xl outline-none bg-slate-300 w-full' />
        </div>
    )
}

export const Navbar = ({msg , chatData}) => {
    return (
        <div className="bg-slate-700 rounded-tr-xl flex items-center h-20 px-4 text-white py-2 justify-between">
            {chatData.filter(value => value.chatID === msg.chatID).map((curElem , index)=>(
                <p key={index} className='font-semibold text-lg'>{curElem.name}</p> 
            ))}
            <div className="">
                <button className='bg-slate-500 px-4 py-1 hover:bg-slate-600'>more</button>
            </div>
        </div>
    )
}

export const ChatLayout = ({children ,socket , msg ,setMsg , chatData , msgData}) => {
    return (
        <div className="flex flex-col min-h-full justify-between border-r-2 rounded-r-xl border-slate-700">
            <div className=""><Navbar msg={msg} chatData={chatData}/></div>
            <div className="">{children}</div>
            <div className=""><Input socket={socket} msg={msg} setMsg={setMsg} msgData={msgData}/></div>
            

        </div>
    )
}