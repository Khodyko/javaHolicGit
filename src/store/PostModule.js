import axios from "axios";

export const PostModule ={
    state: () => ({
        posts: [],
        modificatorValue: "",
        isPostLoading: false,
        selectedSort: "",
        searchQuery: "",
        page: 1,
        limit: 10,
        totalPages: 0,
        sortOptions: [
            {value: "title", name: "By title"},
            {value: "body", name: "By body"}
        ]
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            })
        },
        sortedAndSearchedPost(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setIsPostLoading(state, isPostLoading) {
            state.isPostLoading = isPostLoading;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setIsPostLoading', true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
                    {
                        params: {
                            _page: state.page,
                            _limit: state.limit
                        }
                    });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', response.data)
            } catch (e) {
               console.log(e);
            } finally {
                commit('setIsPostLoading', false);
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page+1)
                // this.isPostLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
                    {
                        params: {
                            _page: state.page,
                            _limit: state.limit
                        }
                    });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', [...state.posts, ...response.data])
            } catch (e) {
               console.log(e);
            }
        },
    },
    namespaced:true

}