import React,{useContext,useState,createContext} from 'react'



const ResultContext=createContext();
const baseUrl='https://google-search3.p.rapidapi.com/api/v1';
export const ResultContextProvider=({children})=>{

    const [results,setResults]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const [searchTerm,setSearchTerm]=useState([]);

    //videos, /search ,/images

    const getResults=async(type)=>{
        setIsLoading(true);

        const res=await fetch(`${baseUrl}${type}`,{
            method:"GET",
            headers:{
                'x-user-agent': 'desktop',
                'x-proxy-location': 'US',
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': '2d36f708d2msh52a447f5a9757fdp1a2597jsn4fd835c463cf'
                
            }
        });

        const data=await res.json();
        console.log(data);
         if(type.includes('/news')){
            setResults(data.entries);
         }else if(type.includes('/image')){
            setResults(data.image_results);
         }else{
           setResults(data.results);
           
         }

        setIsLoading(false);
    }

    return(
        <ResultContext.Provider value={{getResults,results,searchTerm,setSearchTerm,isLoading}}>
            {children}
        </ResultContext.Provider>
    )

}

export const useResultContext=()=>useContext(ResultContext);

