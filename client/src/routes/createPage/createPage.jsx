import './CreatePage.css'
import Image from '../../components/image/image';

const CreatePage=()=>{
    return(
        <div className="CreatePage">
              
              <div className="createTitle">
                   <span>Create Pin</span>
                  <button>Publish</button>
              </div>

              <div className="createContainer">
                    
                    <div className="addImage">
                         <div className="uploadIcon">
                            <Image path='/general/upload.svg'/>
                            <div>Choose a file  or drag and drop  it here</div>
                         </div>
                         <div className='uploadInfo'>
                           We recommend using high quality 
                          .jpg files less than 20 MB or .mp4 files less than 200 MB.
                         </div>
                    </div>
                     
                     <form className='createForm'>

                        <label htmlFor='title' >Title</label>
                        <input id='title' name='title' type='text' placeholder='Add a title'></input>

                        <label htmlFor='description' >Description</label>
                        <textarea rows={4} id='description' name='description' type='text' 
                        placeholder='Add a detailed description'></textarea>


                        <label htmlFor='link' >link</label>
                        <input id='link' name='link' type='text' placeholder='Add a link'></input>

                        <label htmlFor='board' >board</label>
                        <select id='board' name='board'>
                            <option>Choose a Board</option>
                            <option value={1}>board 1</option>
                            <option value={2}>board 2</option>
                            <option value={3}>board 3</option>
                        </select>

                        <label htmlFor='tags' >Tagged topics (0)</label>
                        <input id='tags' name='tags' type='text' placeholder='Search for a tag'></input>
                        <small>Don't worry, people won't see your tags </small>  

                     </form>
              </div>

        </div>
    )
}

export default CreatePage;