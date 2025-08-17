import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import { api } from ".."
import type { IUser } from "../../types"

export const user = "user"

export const useUser = () => {
    const client = useQueryClient()

    const getUser = () => useQuery({
        queryKey: [user],
        queryFn: () => api.get("register").then(res => res.data),
        // gcTime: 1000 * 60 * 10, // cache saqlash vaqti
        // staleTime: 1000 * 60 // yangilash vaqti
    }) 

    const getUserById = (id:number) => useQuery({
        queryKey: [user],
        queryFn: () => api.get(`register/${id}`).then(res => res.data)
    }) 

    const createUser = useMutation({
        mutationFn: (data: IUser) => api.post("register", data),
        onSuccess: ()=>{
            client.invalidateQueries({queryKey: [user]})
        }
    })

    const deleteuser = useMutation({
        mutationFn: (id: number) => api.delete(`register/${id}`),
        onSuccess: ()=>{
            client.invalidateQueries({queryKey: [user]})
        }
    })

    const updateUser = useMutation({
        mutationFn: ({id, data}:{id:number | undefined, data:IUser})=> api.patch(`register/${id}`, data),
        onSuccess: () => {
            client.invalidateQueries({queryKey: [user]})
        }
    })

    return {getUser, getUserById, createUser, deleteuser, updateUser}
}