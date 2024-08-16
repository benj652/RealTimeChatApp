import Conversations from "./Conversations"
import LogoutButton from "./LogoutButton"
import SearchInput from "./SearchInput"
import ProfileButton from "./ProfileButton"
import CreateGroupChatButton from "./CreateGroupChatButton"

const Sidebar = () => {
  return (
    <div className="boarder-r boarder-slate-500 p-4 flex flex-col ">
      <SearchInput/>
      <div className="divider px-3"></div>

    <Conversations/>
    <div className="flex flex-row relative space-x-2">
      <LogoutButton/>
      <ProfileButton/>
      <CreateGroupChatButton/>
    </div>
    
    </div>
  )
}

export default Sidebar
