<template>
  <div>
    <h1>Страница с постами</h1>
        <my-input
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Search..."
            v-focus
        />
    <div class="add__btns">
      <my-button
          @click="showDialog"
      >Create Post
      </my-button>
            <my-select
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
           :options="sortOptions"
            />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"/>
    </my-dialog>
    <post-list
        :posts="sortedAndSearchedPost"
        @remove="removePost"
        v-if="!isPostLoading"
    />
    <div v-else>Loading data...</div>
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--          class="page"-->
    <!--           v-for="pageNumber in totalPages"-->
    <!--           :key="pageNumber"-->
    <!--      :class="{-->
    <!--'current-page': page===pageNumber-->
    <!--          }"-->
    <!--          @click="changePage(pageNumber)"-->
    <!--      >{{pageNumber}}-->

    <!--      </div>-->
    <!--    </div>-->
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MySelect from "@/components/ui/MySelect";

export default {
  components:{
    PostForm,
    PostList,
    MySelect
  },
  name: "GggGg",
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort"
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      modificatorValue: state => state.post.modificatorValue,
      isPostLoading: state => state.post.isPostLoading,
      selectedSort:state => state.post.selectedSort,
      searchQuery:state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions:state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPost: "post/sortedAndSearchedPost"
    })
  }
}

</script>

<style>

</style>