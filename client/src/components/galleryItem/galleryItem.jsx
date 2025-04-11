
import './galleryItem.css'
import  {Link} from 'react-router'
import  Image  from '../../components/image/image';
 const GalleryItem=({item})=>{
     const optimizedheight=372*item.height/item.width;
    return(
        <div className="galleryItem" style={{gridRowEnd:`span ${Math.ceil(item.height/100)}`} }>
            
            
              <Image path={item.media} alt="test" w={372} h={optimizedheight}/>
                <Link to={`/pin/${item.id}`} className='overlay'/>

                <button className='saveButton'>Save</button>
                <div className='overlayIcons'>
                    <button>
                        <Image alt="" path='/general/share.svg'/>
                    </button>
                    <button>
                        <Image path='/general/more.svg' alt=''/>
                    </button>

                </div>

            </div>
            

    )
}
export default GalleryItem;