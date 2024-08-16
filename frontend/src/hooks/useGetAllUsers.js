import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import httpClient from "../utils/httpClient";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () =>{
        setLoading(true);
        try{
            const res = await httpClient.get("/api/users/all");
            const data = await res.data;
            if(data.error){
                throw new Error(data.error);
            }
            setAllUsers(data);
        }catch(e){
            toast.error(e.message);
        }finally{
            setLoading(false);
        }
        }  
        getAllUsers();
    }, []);
    return {loading, allUsers}
}

export default useGetAllUsers
