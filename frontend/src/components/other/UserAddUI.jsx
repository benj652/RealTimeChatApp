import { useSocketContext } from "../../context/SocketContext";


const UserAddUI = ({curUser, lastIndex, setCurs, getCurs}) => {
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(curUser._id)
    const isCreater = curUser.fullName;
    const handleSelfDelete = () => {
        setCurs(getCurs.filter((c) => c._id !== curUser._id))
    }
    return (
    <>
    <div 
    className="flex gap-2 items-center hover:bg-sky-500 text-white rounded p-2 py-1 cursor-pointer ">
            <div className={`avatar ${isOnline? "online":""}`}>
                <div className='w-12 rounded-full'>
                    <img src={curUser?.profilePic} alt="user avatar" />
                </div>
            </div>
            <div className='flex flex-col flex-1'>
                <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-black'>{curUser.username || curUser.fullName}</p>

                    {!isCreater && <button className="btn btn-circle bg-red-500 text-white"
                    onClick={handleSelfDelete}> X </button>}
                </div>
            </div>
        </div>
        {!lastIndex && <div className='divider my-0 py-0 h-1'/>}
    </>
    )
    
}

export default UserAddUI
