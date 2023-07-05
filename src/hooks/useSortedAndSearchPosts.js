import {computed, ref} from "vue";

export default function useSortedAndSearchedPost(sortedPosts) {
    const searchQuery = ref('')
    // const selectedSort= ref('')
    const sortedAndSearchedPost= computed(()=>{
        return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })
    return {
        searchQuery, sortedAndSearchedPost
    }
}