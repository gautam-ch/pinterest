import Image from '../../components/image/image'
import useEditStore from '../../utils/editStore'
export const Layers=({preview})=>{

    const {selectedLayer,setSelectedLayer,addText,canvasOptions} = useEditStore();

    const handleClick =(layer)=>{
            setSelectedLayer(layer);
            if(layer==='text'){
                 addText();
            }
    }

    return  (
        <div className="layers">
             <div className="layerTitle">
                <h3>Layers</h3>
                <p>Select a layer to edit</p>
             </div>

             <div onClick={()=>{handleClick('text')} } className={`layer ${selectedLayer==='text'?'selected':''}`}>
                <div className="layerImg">
                    <Image path='/general/text.png' alt='' w={48} h={48}></Image>
                </div>
                <span>Add Text</span>
             </div>

             <div onClick={()=>{handleClick('canvas')} } className={`layer ${selectedLayer==='canvas'?'selected':''}`}>
                <div className="layerImg" style={{backgroundColor:canvasOptions.backgroundColor}}>
                    
                </div>
                <span>Canvas</span>
             </div>
        </div>
    )
}