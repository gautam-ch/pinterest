import Gallery from '../../components/gallery/gallery';
import './searchPage.css'
import {useSearchParams} from 'react-router';
const SearchPage=()=>{
     
    let [searchParams] = useSearchParams();
         
    const value=searchParams.get('search');
 
    return(
        <div className="SearchPage">
            <Gallery search={value}/>
        </div>
    )
}

export default SearchPage;