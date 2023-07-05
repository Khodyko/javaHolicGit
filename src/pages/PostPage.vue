<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Search..."/>
    <div class="add__btns">
      <my-button
          @click="showDialog"
      >Create Post
      </my-button>
      <my-select
          v-model="selectedSort"
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
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "@/components/ui/MyDialog";
import MyButton from "@/components/ui/MyButton";
import axios from "axios";
import MySelect from "@/components/ui/MySelect";
import MyInput from "@/components/ui/MyInput";

export default {
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
      posts: [],
      dialogVisible: false,
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
    }
  },
  methods: {
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
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
            {
              params: {
                _page: this.page,
                _limit: this.limit
              }
            });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data;

      } catch (e) {
        alert("Error")
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        // this.isPostLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
            {
              params: {
                _page: this.page,
                _limit: this.limit
              }
            });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert("Error")
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPost() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  // watch: {
  //   page() {
  //     this.fetchPosts();
  //   }
  // }
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