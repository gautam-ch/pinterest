import Gallery from '../../components/gallery/gallery';
import './searchPage.css'
import {useSearchParams} from 'react-router';
const SearchPage=()=>{
     
    let [searchParams] = useSearchParams();
         
    const value=searchParams.get('search');
    const boardId=searchParams.get('boardId');
 
    return(
        <div className="SearchPage">
            <Gallery search={value} boardId={boardId} />
        </div>
    )
}

export default SearchPage;