<!--
 * @Author: your name
 * @Date: 2020-12-19 22:32:25
 * @LastEditTime: 2021-02-22 16:33:20
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\pages\Example.vue
-->
<template>
  <div class="app-example">
    <h1>{{ msg || '' }}</h1>
    <p>
      You clicked <span id="example-count">{{ count || 0 }}</span> times
    </p>
    <button id="example-button" @click="handleCount">Click me</button>
  </div>
</template>

<style>
.app-example {
  margin: 0 0;
  padding: 10px 10px;
}
</style>

<script>
export default {
  data() {
    return {
      
      count: 0
    };
  },
  props: ['msg'],
  methods: {
    handleCount() {
      this.count += 1;
    }
  }
};
</script>
