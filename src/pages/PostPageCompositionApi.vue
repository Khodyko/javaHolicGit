<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Search..."/>
    <div class="add__btns">
      <my-button
      >Create Post
      </my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form/>
    </my-dialog>
    <post-list
        :posts="sortedAndSearchedPost"
        v-if="!isPostLoading"
    />
    <div v-else>Loading data...</div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "@/components/ui/MyDialog";
import MySelect from "@/components/ui/MySelect";
import MyInput from "@/components/ui/MyInput";
import MyButton from "@/components/ui/MyButton";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchPosts";
import {usePosts} from "@/hooks/usePosts";

export default {
  name: "PostPageCompositionApi",
  components: {
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: "title", name: "By title"},
        {value: "body", name: "By body"}
      ]
    }
  },
  setup() {
    const {posts, totalPages, isPostLoading} = usePosts(10);
    const {sortedPosts, selectedSort} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchedPost} = useSortedAndSearchedPosts(sortedPosts)

    return {
      posts,
      totalPages,
      isPostLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPost
    }
  }
}
</script>

<style>


form {
  display: flex;
  flex-direction: column;
}

.add__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: teal;
}
</style>