<template>
  <div v-if="posts.length>0">
    <h3>Users List</h3>
    <transition-group name="post-list">
      <post-item
          v-for="post in posts"
          :post="post"
          :key="post.id"
          @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2  v-else-if="posts.length<1" style="color: green">
    Список пуст
  </h2>
</template>

<script>
import postItem from "@/components/PostItem";
export default
{
  components: {postItem},
  props: {
    posts :{
      type:Array,
      required: true
    }
  }
}
</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active, .post-list-leave-active {
  transition: all 400ms;
}
.post-list-enter, .post-list-leave-to /* .post-list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}

.post-list-move {
  transition: transform 700ms;
}
</style>