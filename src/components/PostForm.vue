<template>

  <form @submit.prevent>
    <h4>Создание поста</h4>
    <my-input
        v-focus
        v-model="post.title"
        type="text"
        placeholder="Название"/>
    <my-input
        v-model="post.body"
        type="text"
        placeholder="Название"/>
    <my-button
        @click="createPost"
        style="align-self: flex-end;"
    >Create</my-button>
  </form>


</template>

<script>

export default {
  data() {
    return {
      post: {
        title: "",
        body: ""
      }
    }
  },
  methods:{
    createPost(){
      this.post.id= Date.now();
      this.$emit("create", this.post)
      this.title = "";
      this.body = "";
      this.post={
        body: "",
        title: ""
      }
    }
  }
}
</script>

<style scoped>

</style>