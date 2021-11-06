import React,{useEffect,useState} from 'react'
import { useDebounce } from 'use-debounce';
import Links from './Links';
import { useResultContext } from '../context/ResultContext';

const Search = () => {

    const [text,setText]=useState();
    const {setSearchTerm}=useResultContext();
    const [debouncedValue]=useDebounce(text,300);
   

    useEffect(()=>{
        if(debouncedValue){
         setSearchTerm(debouncedValue)
        }

    },[debouncedValue]);

    return (
        <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
           <input 
            value={text}
            type="text"
            placeholder="Search Googl or type URL"
            onChange={(e)=>setText(e.target.value)}
            className="sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
           />
           {
               text && (
                   <button className="absolute top-1.5 right-4 text-2xl text-gray-500" onChange={()=>setText('')}>
                       x
                   </button>
               )
           }
            <Links/>
        </div>
    )
}

export default Search;
