import GalleryItem from '../galleryItem/galleryItem';
import './gallery.css'
import { useInfiniteQuery} from '@tanstack/react-query';
import  apiCall from '../../utils/apiRequest';
import  InfinteScroll from "react-infinite-scroll-component";

const fetchPins=async({pageParam,search,userId,boardId})=>{
    
   try{
     const pins = await apiCall.get(`/pins?cursor=${pageParam}&search=${search || ""}&userId=${userId || ""}&boardId=${boardId || ""}`);

    // console.log('fetched pins',pins.data);

     return pins.data;
   }catch(err){
       console.log('fetching pins error',err);
        throw err;
   }
}

const Gallery=({search,userId,boardId})=>{

      
        const {data,hasNextPage,fetchNextPage,status}=useInfiniteQuery(
          {
            queryKey:['pins',search,userId,boardId],
            queryFn:({pageParam=0})=>(fetchPins({pageParam,search,userId,boardId})),
            initialPageParam:0,
            getNextPageParam:(lastPage,pages)=> lastPage.nextCursor,
          });

        if(status==='error') return "Something went Wrong!";
        if(status==='pending') return "Loading...";

        console.log(data);
       
        const allPins = data?.pages.flatMap(page=>page.pins) || [];
      
    return (
        <InfinteScroll 
          dataLength={allPins.length}
          next={fetchNextPage}
          loader={<div style={ {marginLeft:'50%'} }><h4>Loading more pins...</h4></div>}
          endMessage={<div style={ {marginLeft:'50%'} }><h4>All pins loaded!</h4></div>}
          hasMore={hasNextPage}  
        >
            <div className='gallery'>
                      {
                        allPins?.map((item)=>(
                            <GalleryItem item={item} key={item._id}/>
                        ))
                      }
            </div>
        </InfinteScroll>
    )
}

export default Gallery;