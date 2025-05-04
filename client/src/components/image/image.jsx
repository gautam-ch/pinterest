import { IKImage } from "imagekitio-react"

const Image=({path,alt,className,w,h,src})=>{
    return(
        <IKImage 
        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
         path={path}
         src={src}
         alt={alt}
         className={className}
         transformation={[{
            width:w,
            height:h
         }]}
         loading='lazy'
         lqip={{active:true,quality:30}}
        />
    )
}
export default Image;