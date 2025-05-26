import './edit.css';
import { Layers } from './layers';
import { Options } from './options';
import { Workspace } from './workspace';

const Edit =({preview})=>{
     return (
        <div className='edit'>
            <Layers preview={preview}></Layers>
            <Workspace preview={preview}></Workspace>
            <Options preview={preview}></Options>
        </div>
     ) 
}

export default Edit;