import './comment.css'
import Image from '../../components/image/image'
import apiCall from '../../utils/apiRequest';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {format} from 'timeago.js'
import { CommentForm } from './commentForm';


const deleteCmnt=async(id)=>{
        
              const res = await apiCall.post('/comments/delete',id);
              return res.data;      
}

const Comment=({postId})=>{
    const {data,error,isPending} = useQuery({
        queryKey:['comment',postId],
        queryFn:()=> apiCall.get(`/comments/post?postId=${postId}`).then((res)=>{ return res.data})
     })

     const queryClient = useQueryClient();
     
     const mutation = useMutation({
        mutationFn:deleteCmnt,
        onSuccess:()=>{
             queryClient.invalidateQueries({queryKey:['comment',postId]});
        }
        
     })



     if(isPending) return <div>Loading..</div>
     if(error) return <div>Something went Wrong!</div>

     const handleClick=async(id)=>{
              
      try{
               mutation.mutate({
                  cmntId:id
               })
                
      }
      catch(err){
        console.log('error during deleting comment',err);
      }
           
     }

     console.log('comment : ',data);
      
    return(
        <div className='comments'>

            <div className='commentList'>

                <span className='commentCount'>{data.length===0 ?'No ':data.length}  Comments</span>

                   {
                    data.map(cmnt=>(
                        <div className="comment" key={cmnt._id}>
                        <Image path={  cmnt.user.img || 'general/noAvatar.png'} />

                        <div className="commentContain">
                           <span className='username'>{cmnt.user.displayName}</span>
                           <p className='description'>
                                {cmnt.description}
                           </p>
                           <div className='time'>{format(cmnt.createdAt)} <div className='deleteIcon' onClick={()=>{handleClick(cmnt._id)}}>
                              <svg className='svgDelete' xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" 
                              xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" 
                              xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" 
                              xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 30 30" version="1.1" id="svg822" 
                              inkscape:version="0.92.4 (f8dce91, 2019-08-02)" sodipodi:docname="delete.svg" fill="#000000"><g id="SVGRepo_bgCarrier" 
                              strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                             <defs id="defs816"></defs> <sodipodi:namedview id="base" pagecolor="#ffffff" bordercolor="#666666" borderopacity="1.0" inkscape:pageopacity="0.0"
                             inkscape:pageshadow="2" inkscape:zoom="8.9166667" inkscape:cx="31.222387" inkscape:cy="7.1988484" inkscape:document-units="px" inkscape:current-layer="layer1"
                             showgrid="true" units="px" inkscape:window-width="1366" inkscape:window-height="713" inkscape:window-x="0" inkscape:window-y="0" inkscape:window-maximized="1" showguides="false" 
                             inkscape:snap-global="false"> <inkscape:grid type="xygrid" id="grid816"></inkscape:grid> </sodipodi:namedview> <metadata id="metadata819"> <rdf:rdf> <cc:work rdf:about=""> <dc:format>image/svg+xml</dc:format> 
                             <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type> <dc:title> </dc:title> </cc:work> 
                              </rdf:rdf> </metadata> <g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(0,-289.0625)"> 
                              <path style={{
                                opacity: 1,
                                fill: '#ff0000',
                                fillOpacity: 1,
                                stroke: 'none',
                                strokeWidth: 2,
                                strokeMiterlimit: 4,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }} d="M 12.027344 5 C 10.919344 5 10.244641 5.91352 10.027344 7 L 8.0566406 7 C 6.9486406 7 6.0566406 7.8920001 6.0566406 9 C 6.0566406 10.108 6.9486406 11 8.0566406 11 L 21.943359 11 C 23.051359 11 23.943359 10.108 23.943359 9 C 23.943359 7.8920001 23.051359 7 21.943359 7 L 20.027344 7 C 19.810047 5.91352 19.135344 5 18.027344 5 L 12.027344 5 z M 8 13 L 9.0429688 20.316406 L 9.9628906 24.916016 C 10.180187 26.002496 10.854891 26.916016 11.962891 26.916016 L 17.962891 26.916016 C 19.070891 26.916016 19.745594 26.002496 19.962891 24.916016 L 20.962891 19.916016 L 22 13 C 22 13 7.99376 13.0132 8 13 z " 
                              transform="translate(0,289.0625)" id="rect891"></path> </g> </g>
                              </svg>
                             </div>
                             </div  > 
                        </div>
                      </div>
                    ))
                  

                   }
                  
                  
            </div>
                   
                   <CommentForm postId={postId}/>
          
        </div>
    )
}

export default Comment;