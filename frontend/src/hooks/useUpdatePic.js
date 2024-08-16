import { useState } from "react"
import httpClient from "../utils/httpClient";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useUpdatePic = () => {
    const { id } = useParams();
    const [updating, setUpdating] = useState(false);
    const {setAuthUser} = useAuthContext()
    const updatePic = async (newPic) =>{
        setUpdating(true);
        try{
            const formdata = new FormData();
            formdata.append('image',newPic);
            const res = await httpClient.post(`/api/users/updatepic/${id}`, 
                formdata,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            const data = await res.data;
            if(data.error) throw new Error(data.error);
            setAuthUser(data);
        }catch(e){
            toast.error(e.messages)
        }finally{
            setUpdating(false)
        }
    }
    return {updating, updatePic}
}

export default useUpdatePic
