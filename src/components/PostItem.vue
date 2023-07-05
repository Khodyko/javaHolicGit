<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Name:</strong> {{ post.title }}</div>
      <div><strong>Description:</strong> {{ post.body }}</div>
    </div>
    <div>
      <div class="post__btns">
      <my-button
      @click="$emit('remove', post)"
      >delete</my-button>
        <my-button
      @click="$router.push(`posts/${post.id}`)"
      >Open</my-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  width: 100%;
  padding: 15px;
  border: 3px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__btns{
  display: flex;
}
</style>