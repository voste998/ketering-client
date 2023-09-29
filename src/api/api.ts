import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { RoleType } from "../misc/role.type";
import ApiResponse from "../misc/api.response.class";

function api(path:string,method:"post"|"put"|"get"|"patch"|"delete",role:RoleType,body:any){
    const config:AxiosRequestConfig<string>={
        url:path,
        baseURL:"http://localhost:3000/",
        method:method,
        data:body?JSON.stringify(body):undefined,

        headers:{
            "Content-Type":"application/json",
            "Authorization":role?getToken(role):undefined
        }};

    return new Promise<ApiResponse>(async (resolve)=>{
        await axios(config).then((res)=>{
                if(res.status<200 || res.status >=300){
                    resolve({
                        status:"error",
                        data:res.data
                    });
                    return;
                }
                
                resolve({
                    status:"ok",
                    data:res.data
                })
            },
            async (err)=>{
               await configureResponse(err,resolve,config,role);
            });
    })
}

function getToken(role:RoleType){
    const token=localStorage.getItem("api_token_"+role)
    return "Barer "+token;
}
function getRefreshToken(role:RoleType){
    const token=localStorage.getItem("api_refresh_token_"+role)
    return token;
}
export function setToken(token:string,role:RoleType):void{
    localStorage.setItem("api_token_"+role,token);
}
export function setRefreshToken(token:string,role:RoleType){
    localStorage.setItem("api_refresh_token_"+role,token);
}
async function configureResponse(err:any,resolve:(value:ApiResponse|PromiseLike<ApiResponse>)=>void,
    config:AxiosRequestConfig<string>,role:RoleType){

        if(err.response?.status===401){
            await refreshAndRepeat(config,resolve,role);
            return ;
        }
        
        resolve(new ApiResponse("error",err));
}

async function refreshAndRepeat(config:AxiosRequestConfig<string>,
    resolve:(value:ApiResponse|PromiseLike<ApiResponse>)=>void,role:RoleType){

        const refreshConfig:AxiosRequestConfig<string>={
            url:"auth/"+role+"/refresh",
            baseURL:"http://localhost:3000/",
            method:"post",
            data:JSON.stringify({
                refreshToken:getRefreshToken(role)
            }),

            headers:{
                "Content-Type":"application/json",
            }
        };
        await axios(refreshConfig).then(async res=>{

            if(res.data.statusCode || !res.data.token){
                resolve({
                    status:"login",
                    data:undefined
                });
                return;
            }

            setToken(res.data.token,role);

            await axios({...config,headers:{
                    "Content-Type":"application/json",
                    "Authorization":getToken(role)
                }}).then(res=>{
                if(res.status<200 || res.status >=300){
                    resolve({
                        status:"error",
                        data:res.data
                    });
                    return;
                }
                resolve(new ApiResponse("ok",res.data))
            }).catch(err=>{
                resolve({
                    status:"error",
                    data:err
                })
            })
            
        },err=>{
            if(err.response?.status===401 || err.response?.status===400){
                resolve({
                    status:"login",
                    data:undefined
                });
                return;
            }
            resolve({
                status:"error",
                data:err
            });
        })

    
}


    
export default api;