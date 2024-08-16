import { CgProfile } from "react-icons/cg";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const ProfileButton = () => {
    const {authUser} = useAuthContext();
  return (
    <Link to = {`/profile/${authUser._id}`}>
      <CgProfile className='w-6 h-6 text-white cursor-pointer'/>
    </Link>
  )
}

export default ProfileButton
