<template>
  <div id="user">
    <h2>Data after submitting form</h2>
    <div v-bind:key="key in Object.keys(user)">
      <span v-if="user[key]">{{ key }} : {{ user[key] }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'User', 
  props: {
    user: {
      type: Object,
    }
  }
}
</script>