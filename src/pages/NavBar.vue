<template>
<div class="navbar">
  <div>Vue3</div>
  <div class="navbar__btns">
    <my-button @click="$router.push('/posts')">Posts</my-button>
    <my-button @click="$router.push('/about')" style="margin-left: 15px">About site</my-button>
    <my-button @click="$router.push('/ggg')" style="margin-left: 15px">Store</my-button>
    <my-button @click="$router.push('/composition')" style="margin-left: 15px">composition</my-button>
  </div>
</div>
</template>

<script>
import MyButton from "@/components/ui/MyButton";
export default {
  name: "NavBar",
  components: {MyButton}
}
</script>

<style scoped>
.navbar{
  height: 90px;
  background-color: darkgray;
  box-shadow: 2px 2px 4px darkgray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns{
  margin-left: auto;
}
</style>