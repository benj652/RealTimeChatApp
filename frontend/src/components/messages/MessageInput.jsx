import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaFile } from "react-icons/fa";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  const [curFile, setCurFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleFileChange = async (e) => {
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
    await sendMessage(curFile);
    setCurFile(null);
  };
  return (
    <div className="px-4 my-3">
      <div className="w-full relative">
        <form onSubmit={curFile ? handleFileUpload : handleSubmit}>
          {curFile === null ? (
            <input
              type="text"
              className="border text-sm h-12 rounded-lg block w-[775px] p-2.5 bg-gray-700 border-gray-600 text-white"
              placeholder="send a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          ) : (
            <div className="flex flex-col-auto border text-sm rounded-lg  w-[775px] p-2.5 bg-gray-700 border-gray-600 text-white">
              <img src={preview} alt="" className="max-h-48 max-w-72" />
              <button
                className="btn btn-circle text-white bg-red-600 rounded-full"
                onClick={() => setCurFile(null)}
              >
                X
              </button>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-circle bg-sky-500 absolute inset-y-0 end-14 flex items-center h-2"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <BsSend className="text-white" />
            )}
          </button>
          <label className="btn btn-circle bg-sky-500 absolute inset-y-0 end-0 flex items-center h-2 cursor-pointer text-white">
            <span>
              <FaFile />
            </span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
