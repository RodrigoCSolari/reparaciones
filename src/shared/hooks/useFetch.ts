import { useEffect, useState } from "react"

export interface UsdPrice {
    "usd": number
}

export interface CoinsByCoinGecko {
    "bitcoin":UsdPrice,
    "solana":UsdPrice,
    "tether":UsdPrice,
    "ethereum":UsdPrice
}

export type Response<T> = T;

export type data<T> = {
    loading:boolean;
    error:Error | null;
    data:Response<T> | null;
}

export const useFetch = <T>(url:string):data<T> => {
    
    const [state, setState] = useState({ data:null,loading:true,error:null })

    useEffect(() => {
        
        fetch(url)
            .then(resp => resp.json())
            .then(data =>{
                setState({
                    loading:false,
                    error:null,
                    data:data
                })
            })
            .catch(error=>{
                console.log(error);
                setState({
                    loading:false,
                    error:error,
                    data:null
                })
            });
    }, [url])

    return state;

}