import { useState,useEffect } from "react";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";
import { dummyData } from "../data/dummyData";


export interface AdminNetworkType{
    id:number;
    username:string;
    level:number;
    datejoined:string;
    sponser:string;
    profile:string;
    status:string;
}
export const useAdminNetwork = () => {
    const [data,setData] = useState<AdminNetworkType[]>([]);
    const [isLoading,setIsLoading] = useState<boolean>(true);
    const [error,setError] = useState<string|null>(null);
    const fetchData = async()=>{
        try{
            setIsLoading(true);
            await new Promise((res)=>setTimeout(res,2000));
            setData(dummyData);
        }
        catch(err){
            setError(extractErrorMessages(err)||"could not get data");
        }
        finally{
            setIsLoading(false);
        }   
    };
    useEffect(()=>{
        fetchData();
    },[]);
    return {data,isLoading,error,refetch:fetchData};
}