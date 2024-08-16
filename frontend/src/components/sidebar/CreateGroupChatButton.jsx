import { MdGroups2 } from "react-icons/md";
import { Link } from "react-router-dom";

const CreateGroupChatButton = () => {
    const loading = false;
    return (
    <div className="mt-auto~">
        {!loading?(
            <Link to='/creategc'>
                <MdGroups2 className='w-6 h-6 text-white cursor-pointer'/>
            </Link>
      ):(
        <span className='loading loading-spinner'></span>
      )}
    </div>
  )
}

export default CreateGroupChatButton
