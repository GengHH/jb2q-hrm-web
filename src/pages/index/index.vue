<template>
  <div id="indexApp">
    <!-- <img src="../../assets/logo.png" /> -->
    <img :src="path" />
    <router-view></router-view>
    <el-button @click.native="test()"> 默认按钮</el-button>
    <span class="test">gdfgdfg </span>
    <a href="#/test">test</a>
    <a href="/cell.html">cell 页面</a>
    <router-link to="/person.html">Go to Person</router-link>
    <div class="listTest">
      <ul>
        <li v-for="i in list" :key="i.id">{{ i.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { testData } from '@pub/mockTestData';
import axios from 'axios';
export default {
  name: "app",
  data: () => {
    return {
      path: require("@/assets/logo.png"),
      list: testData.list,
      obj: {}
    };
  },
  methods: {
    test: () => {
      //console.log(this.$route);
      alert(123);
    },
  },
  created(){
    console.log("index begin creating");
    console.log(this);
    console.log(this.$data);
    axios.post('/admin/index').then(res =>{
      this.$set(this.list,'siet',res.data)
      console.log(this);
      // console.log(this.$data);
    }).catch(err=>
      {console.log(err)
    });
  }
};
</script>

<style scoped>
img{
  display: inline-block;
}
#indexApp {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.test {
  color: #000000;
}
</style>
