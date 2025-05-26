import { useState } from "react";
import useEditStore from "../../utils/editStore"
import {HexColorPicker} from 'react-colorful';

const portraitSizes = [
    {
      name: "1:2",
      width: 1,
      height: 2,
    },
    {
      name: "9:16",
      width: 9,
      height: 16,
    },
    {
      name: "2:3",
      width: 2,
      height: 3,
    },
    {
      name: "3:4",
      width: 3,
      height: 4,
    },
    {
      name: "4:5",
      width: 4,
      height: 5,
    },
    {
      name: "1:1",
      width: 1,
      height: 1,
    },
  ];
  
  const landscapeSizes = [
    {
      name: "2:1",
      width: 2,
      height: 1,
    },
    {
      name: "16:9",
      width: 16,
      height: 9,
    },
    {
      name: "3:2",
      width: 3,
      height: 2,
    },
    {
      name: "4:3",
      width: 4,
      height: 3,
    },
    {
      name: "5:4",
      width: 5,
      height: 4,
    },
    {
      name: "1:1",
      width: 1,
      height: 1,
    },
  ];

export const Options=({preview})=>{
    const {selectedLayer,setTextOptions,textOptions,canvasOptions,setCanvasOptions} = useEditStore();
    const [isOpen,setIsOpen] = useState(false);

    const originalOrient=preview.width<preview.height?'portrait':'landscape';

    const handleSize=(size)=>{
      
        let newHeight;   
      if(size==='original'){
          
        if(originalOrient===canvasOptions.orientation){
            newHeight=(375*preview.height)/preview.width;
        }
        else{
          newHeight=(375*preview.width)/preview.height;
        }
          
      }
      else{
        newHeight = (375 * size.height)/size.width
      }
          
        setCanvasOptions({...canvasOptions,height:newHeight,size:size==='original'?'original':size.name});
    }

    const handleOrient=(orient)=>{
      let newHeight;

      if ( orient === originalOrient ) {
        newHeight = (375 * preview.height) / preview.width;
      } else {
        newHeight = (375 * preview.width) / preview.height;
      }
        
      setCanvasOptions({...canvasOptions,orientation:orient,size:'original',height:newHeight})     
    }
    return  (
        <div className="options">
             {
                selectedLayer==='text'?(
                    <div className="">
                        <div className="editingOptions">
                            <span>Font Size</span>
                            <input type="number" value={textOptions.fontSize} 
                            onChange={(e)=>{setTextOptions({...textOptions,fontSize:e.target.value})} }></input>
                        </div>
                        <div className="editingOptions">
                            <span>Color</span>
                            <div className="textColor">
                               <div  className="colorPreview"
                                 style={{backgroundColor:textOptions.color}}
                                 onClick={()=>setIsOpen((prev)=> !prev )}>
                                 
                               </div>
                               {isOpen && (
                                <div className="colorPicker" >
                                    <HexColorPicker color={textOptions.color} 
                                  onChange={(color)=>{setTextOptions({...textOptions,color})} }/>
                                </div>
                               )}
                            </div>
                        </div>
                    </div>

                ):(
                    <div className="">
                          <div className="editingOptions">
                            <span>Orientation</span>
                            <div className="orientations">
                                <div className={`orientation ${canvasOptions.orientation==='portrait'?'selected':""}`} onClick={()=>{handleOrient('portrait')}}>P</div>
                                <div className={`orientation ${canvasOptions.orientation==='landscape'?'selected':""}`}onClick={()=>{handleOrient('landscape')}}>L</div>
                            </div>
                          </div>
                          <div className="editingOptions">
                            <span>Size</span>
                            <div className="sizes">
                                <div className={`size ${canvasOptions.size==='original'?'selected':""}`} onClick={()=>handleSize('original')}>
                                  Original
                                </div>
                                    {
                                        canvasOptions.orientation==='portrait'?(
                                            <>
                                              {
                                                portraitSizes.map((size)=>(
                                                    <div className={`size ${canvasOptions.size===size.name?'selected':""}`} key={size.name} onClick={()=>handleSize(size)}>
                                                        {size.name}
                                                    </div>
                                                ))
                                              }
                                            </>
                                        ):(
                                            <>

                                              {
                                                landscapeSizes.map((size)=>(
                                                    <div className={`size ${canvasOptions.size===size.name?'selected':""}`} key={size.name} onClick={()=>handleSize(size)}>
                                                        {size.name}
                                                    </div>
                                                ))
                                              }

                                            </>
                                        )
                                    }
                            </div>
                          </div>
                          <div className="editingOptions">
                                   <span>Background Color</span>
                                <div className="bgColor">
                                   <div className="textColor">
                                        <div  className="colorPreview"
                                            style={{backgroundColor:canvasOptions.backgroundColor}}
                                            onClick={()=>setIsOpen((prev)=> !prev )}>
                                            
                                        </div>
                                        {isOpen && (
                                            <div className="colorPicker" >
                                                <HexColorPicker color={canvasOptions.backgroundColor } 
                                            onChange={(color)=>{setCanvasOptions({...canvasOptions,backgroundColor:color})} }/>
                                            </div>
                                        )}
                                   </div>
                                      
                                </div>    
                          </div>
                    </div>
                )
             }
        </div>
    )
}