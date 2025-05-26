import { useEffect, useRef } from 'react';
import Image from '../../components/image/image'
import useEditStore from "../../utils/editStore"



export const Workspace=({preview})=>{
    const {textOptions,setTextOptions,canvasOptions,setCanvasOptions,setSelectedLayer} = useEditStore();

    const itemRef=useRef(null);
    const containerRef=useRef(null);
    const dragging=useRef(false);

    const offset=useRef({x:0,y:0});

    
    const handleMouseDown=(e)=>{
         
        setSelectedLayer('text');
        dragging.current=true;
        
        offset.current={
            x:e.clientX-textOptions.left,
            y:e.clientY-textOptions.top
        }
        console.log('mouse down');
    }

    const handleMouseLeave=()=>{
        dragging.current=false;
        console.log('mouse leave');
    }

    const handleMouseUp=()=>{
        dragging.current=false;
        console.log('mouse up');
    }

    const handleMouseMove=(e)=>{
        if(!(dragging.current)){ return;}
        setTextOptions({...textOptions,
            left:e.clientX-offset.current.x,
            top:e.clientY-offset.current.y
        })
        console.log('mouse move');
    }



    useEffect(()=>{
        if(canvasOptions.height==0){
             const canvasHeight=(375 * preview.height)/preview.width;

             setCanvasOptions({...canvasOptions,height:canvasHeight,
                orientation:canvasHeight>375?'portrait':'landscape'})

        }
    },[preview])

    return  (
        <div className="workspace">
            <div className="canvas" style={ {height:canvasOptions.height,backgroundColor:canvasOptions.backgroundColor} } 
                     onMouseMove={handleMouseMove}
                     onMouseLeave={handleMouseLeave}
                     onMouseUp={handleMouseUp}
                     ref={containerRef}  
                       >
                <img src={preview.url}></img>
                {
                    textOptions.text && (
                        <div className='text'
                          style={{
                             top:textOptions.top,
                             left:textOptions.left,
                             fontSize:`${textOptions.fontSize}px`
                          }}
                         onMouseDown={handleMouseDown}
                         ref={itemRef}
                        >
                            <input type="text" value={textOptions.text} style={{color:textOptions.color}}
                              onChange={(e)=>{setTextOptions({...textOptions,text:e.target.value})} }>
                            </input>
                            <div className="deleteText"
                              onClick={()=>{setTextOptions({...textOptions,text:""})} }>
                                <Image path={'/general/delete.svg'} alt=""/>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}