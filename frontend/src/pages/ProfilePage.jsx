import { useState } from 'react';
import { FaCheck, FaHome } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import useGetUser from '../hooks/useGetUser';
import useUpdatePic from '../hooks/useUpdatePic';

const ProfilePage = () => {
  const { id } = useParams();
  const { loading, user } = useGetUser(id);
  const { authUser } = useAuthContext();
  const isMe = id === authUser._id;
  const [curFile, setCurFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { updating, updatePic } = useUpdatePic();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setCurFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!curFile) return;
    await updatePic(curFile);
    setCurFile(null);
    setPreview(null);
    // navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center sm:h-[450px] md:h-[550px] md:w-[950px] rounded-3xl overflow-hidden bg-gray-300 bg-clip-padding border-gray-500 border-8 shadow-2xl">
        {loading || user?.profilePic === undefined || updating ? (
          <div className="flex flex-col items-center space-y-4 my-4">
            <div className="skeleton h-10 w-64"></div>
            <div className="skeleton w-64 h-64 rounded-full"></div>
            <div className="skeleton h-10 w-64"></div>
            <div className="skeleton h-10 w-64"></div>
            <Link to="/" className="btn btn-circle bg-sky-500 text-white">
              <FaHome className="text-white" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4 my-4">
            <p className="font-bold text-black text-3xl bg-gray-300 p-2 border-gray-500 border-4 shadow-2xl rounded-full">
              {user?.username}
            </p>
            {isMe ? (
              <form>
                <label>
                  <img
                    src={preview || user?.profilePic}
                    className="w-64 h-64 rounded-full border-black border-4 shadow-2xl bg-white cursor-pointer"
                    alt="Profile"
                  />
                  <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
                {preview && (
                  <div className="flex justify-center space-x-4">
                    <button
                      className="btn btn-circle bg-sky-500 text-white"
                      onClick={handleFileUpload}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="btn btn-circle text-white bg-red-600 rounded-full"
                      onClick={() => {
                        setCurFile(null);
                        setPreview(null);
                      }}
                    >
                      X
                    </button>
                  </div>
                )}
              </form>
            ) : (
              <img
                src={user?.profilePic}
                className="w-64 h-64 rounded-full border-black border-4 shadow-2xl bg-white"
                alt="Profile"
              />
            )}
            {!preview && (
              <>
                <p className="font-bold text-black">{user?.fullname}</p>
                <p className="font-bold text-black">
                  Joined: {new Date(user?.createdAt).toLocaleDateString()}
                </p>
                <Link to="/" className="btn btn-circle bg-sky-500 text-white">
                  <FaHome className="text-white" />
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
