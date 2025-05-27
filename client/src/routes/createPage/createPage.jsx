import './createPage.css'
import useAuthStore from '../../utils/authStore';
import IK_Image from '../../components/image/image';
import { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Edit from '../../components/edit/edit';
import useEditStore from '../../utils/editStore';
import {useMutation, useQueryClient,useQuery} from '@tanstack/react-query';
import apiCall from '../../utils/apiRequest';
import { useRef } from 'react';
import BoardForm from './BoardForm'

const addPin=async(formData)=>{
      const res = await apiCall.post('/pins',formData,{
        headers:{
            "Content-Type":'multipart/form-data'
        }
      });

    //   console.log(res.data);
      return res.data;

}

const CreatePage=()=>{
    const {textOptions,canvasOptions,resetStore} = useEditStore();
    const {currentUser} = useAuthStore();
    const navigate = useNavigate();
    const [file,setFile] = useState(null);
    const [preview,setPreview] = useState({
        url:null,
        width:0,
        height:0
    })
    const [edit,setEdit] = useState(false);
    const formRef=useRef(null);

    useEffect(()=>{
        if(!currentUser){
             navigate('/auth')
        }
    },[navigate,currentUser])

    
    useEffect(()=>{
        if(file){
        const img = new Image();
        img.src=URL.createObjectURL(file);
        img.onload=()=>{
            setPreview({
                url:URL.createObjectURL(file),
                width:img.width,
                height:img.height
            })
        };
      }
    },[file])


    const handleClick=()=>{
        if(edit){
            setEdit(false);
        }
        else{
            const formData = new FormData(formRef.current);
            formData.append('file',file);
            formData.append('textOptions',JSON.stringify(textOptions));
            formData.append('canvasOptions',JSON.stringify(canvasOptions));
            formData.append("newBoard", newBoard);
            console.log('click');
            mutation.mutate(formData);
         }
    }

   const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn:addPin,
        onSuccess:(data)=>{
            resetStore();
            queryClient.invalidateQueries({queryKey:['pins']});
            navigate(`/pin/${data._id}`);
        }
    })
        
    const [newBoard, setNewBoard] = useState("");
    const [isNewBoardOpen, setIsNewBoardOpen] = useState(false);

    const { data, isPending, error } = useQuery({
        queryKey: ["formBoards"],
        queryFn: () => apiCall.get(`/boards`).then((res) => res.data),
      });

      const handleNewBoard = () => {
        setIsNewBoardOpen((prev) => !prev);
      };

    return(
        <div className="CreatePage">
              
              <div className="createTitle">
                   <span> {edit?'Design your Pin':'Create Pin'}</span>
                  <button onClick={handleClick}>{edit?'Done':'Publish'}</button>
              </div>

              {edit?(
                <Edit preview={preview}/>
              ):

             ( 
                <>
                <div className="createContainer">


                  {preview.url?(
                    <div className='preview'>
                        <img src={preview.url} alt='img'></img>
                        <div className='editIcon' onClick={()=>{
                            console.log('edit called')
                            setEdit(true)} }>
                            <IK_Image path={'/general/edit.svg'}/>
                        </div>
                    </div>
                  ):                    
                   ( 
                    <>
                    <label htmlFor='file' className="addImage">
                         <div className="uploadIcon">
                            <IK_Image path='/general/upload.svg'/>
                            <div>Choose a file  or drag and drop  it here</div>
                         </div>
                         <div className='uploadInfo'>
                           We recommend using high quality 
                          .jpg files less than 20 MB or .mp4 files less than 200 MB.
                         </div>
                         <input type='file' id='file' hidden onChange={(e)=>{setFile(e.target.files[0])} }/>
                    </label>
                    </>
                )  }
                     
                     <form className='createForm' ref={formRef}>

                        <label htmlFor='title' >Title</label>
                        <input id='title' name='title' type='text' placeholder='Add a title'></input>

                        <label htmlFor='description' >Description</label>
                        <textarea rows={4} id='description' name='description' type='text' 
                        placeholder='Add a detailed description'></textarea>


                        <label htmlFor='link' >link</label>
                        <input id='link' name='link' type='text' placeholder='Add a link'></input>

                        {(!isPending || !error) && (
                            <div className="createFormItem">
                                <label htmlFor="board">Board</label>
                                <select name="board" id="board">
                                <option value="">Choose a board</option>
                                {data?.map((board) => (
                                    <option value={board._id} key={board._id}>
                                    {board.title}
                                    </option>
                                ))}
                                </select>
                                <div className="newBoard">
                                {newBoard && (
                                    <div className="newBoardContainer">
                                    <div className="newBoardItem">{newBoard}</div>
                                    </div>
                                )}
                                <div className="createBoardButton" onClick={handleNewBoard}>
                                    Create new board
                                </div>
                                </div>
                            </div>
                            )}


                        <label htmlFor='tags' >Tagged topics (0)</label>
                        <input id='tags' name='tags' type='text' placeholder='Search for a tag'></input>
                        <small>Don't worry, people won't see your tags </small>  

                     </form>
                     {isNewBoardOpen && (
                    <BoardForm
                    setIsNewBoardOpen={setIsNewBoardOpen}
                    setNewBoard={setNewBoard}
                    />
                )}
              </div>
              </>
            )
        }

        </div>
    )
}

export default CreatePage;