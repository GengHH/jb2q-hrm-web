<template>
  <div id="indexApp">
    <!-- <img src="../../assets/logo.png" /> -->
    <!-- <img :src="path" /> -->
    <el-carousel class="el-carousel">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <router-view></router-view>
    <el-button @click.native="test()">默认按钮</el-button>
    <span class="test">gdfgdfg</span>
    <a href="#/test">test</a>
    <a href="/cell.html">cell 页面</a>
    <router-link to="/person.html">Go to Person</router-link>
    <div class="listTest">
      <ul>
        <li v-for="i in list" :key="i.id">
          {{ i.text }}
          <h4></h4>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { testData } from '@pub/mockTestData';
//import { axios } from '@/utils/httpService';
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
    test() {
      this.axios.get('http://api.wpbom.com/api/neran.php').then(res=>{
        this.$set(this.obj,'siet',res.data);
        console.log(this.$data);
      }).catch(err=>{
        throw new Error("调用API失败"+err);
      })
    },
  },
  created(){
    console.log("index begin creating");
    console.log(this);
    console.log(this.$data);
    this.$http.get('/admin/index').then(res =>{
      this.$set(this.obj,'siet',res.data)
    }).catch( err=>{
      console.log(err)
    });
  }
};
</script>

<style scoped>
img {
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

.el-carousel{
  height: 150px;
}

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
