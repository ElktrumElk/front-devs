import { postsData } from "./mockData";


export function getPostsByID(id: number) {
    const postData = postsData.filter(post => post.id === id)
    return postData

}