import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiCall from "../../utils/apiRequest";

const addFollow = async(username)=>{
        
    const res = await apiCall.post(`/users/follow/${username}`);
    return res.data;
}

export const Follow=({username,isFollow})=>{

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn:addFollow,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['profile',username]})
        }
    })
          
    return(
        <div>
            <button onClick={()=>{mutation.mutate(username);}} disabled={mutation.isPending}>
                
                {isFollow?'unfollow':'follow'}</button>
        </div>
    )
}