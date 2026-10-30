import axios from "axios";

const api=axios.create({baseURL:"http://localhost:3000/api"})

function handleResponse(response){
    return response;
}

function handleError(error){
    return Promise.reject(error)
    
}

api.interceptors.response.use(handleResponse,handleError)


api.interceptors.request.use((config)=>{
    const token= localStorage.getItem("token")
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }

    return config;

})

export function register(data){
    return api.post("/auth/register", data)
}


export  function login(data) {
  return  api.post("/auth/login", data);
}


export function getfiles(){
    return api.get("/file")
}


export function createFile(data){
    return api.post("/file", data);
}


export function getbyId(id){
    return api.get(`/file/${id}`)
}

export function deletebyId(id){
    return api.delete(`/file/${id}`)
}

export function addeditor(id, data) {
    return api.post(`/file/${id}/editors`, data);
}

export function addviewer(id,data){
    return api.post(`/file/${id}/viewers`,data)
}

export function removeeditor(id, data) {
    return api.delete(`/file/${id}/editors`, { data });
}

export function removeviewer(id, data) {
    return api.delete(`/file/${id}/viewers`, { data });
}



export function updateFile(id, data) {
    return api.patch(`/file/${id}`, data);
}