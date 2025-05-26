import {create} from 'zustand';


const  useEditStore = create((set)=>(
    {
    selectedLayer:'canvas',
    textOptions:{
        text:"",
        fontSize:48,
        color:'#000000',
        top:48,
        left:0
    },
    canvasOptions:{
        height:0,
        orientation:"",
        backgroundColor:'#008080',
        size:"original",
    },
    setSelectedLayer:(newLayer)=>(set({selectedLayer:newLayer})),
    setTextOptions:(option)=>(set({textOptions:option})),
    addText:()=>(set({
        textOptions:{
            text:'Add text',
            fontSize:48,
            color:'#000000',
            top:48,
            left:0
        }
    })),
    setCanvasOptions:(newOption)=>set({canvasOptions:newOption}),
    
    resetStore: () =>
        set({
          selectedLayer: "canvas",
          textOptions: {
            text: "",
            fontSize: 48,
            color: "#000000",
            top: 48,
            left: 0,
          },
          canvasOptions: {
            height: 0,
            orientation: "",
            size: "original",
            backgroundColor: "#008080",
          },
        }),
}))

export default useEditStore;