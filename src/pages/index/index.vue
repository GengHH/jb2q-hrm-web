<template>
  <div id="indexApp">
    <HeaderIndex></HeaderIndex>
    <!-- <img src="../../assets/logo.png" /> -->
    <!-- <img :src="path" /> -->
    <el-carousel>
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <router-view></router-view>
    <!-- <el-button @click.native="test()">默认按钮</el-button>
    <span class="test">gdfgdfg</span>
    <a href="#/test">test</a>
    <a href="/cell.html">cell 页面</a>
    <router-link to="/person.html">Go to Person</router-link> -->
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
import HeaderIndex from '@/components/index/HeaderIndex.vue';
import { testData } from '@pub/mockTestData';
export default {
  name: "app",
  components:{
    HeaderIndex
  },
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
    // console.log("index begin creating");
    // console.log(this);
    // console.log(this.$data);
    // this.axios.get('/admin/index').then(res =>{
    //   this.$set(this.obj,'siet',res.data)
    // }).catch( err=>{
    //   console.log(err)
    // });
  }
};
</script>

<style lang='scss'>
body {
 color: $g-body-back-color;
}

#indexApp {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.test {
  color: #000000;
}

.el-carousel{
  height: 300px;
  width: 70%;
  div {
    height: 300px;
    width: 100%;
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
    background-color: #1b579c;
  }
}
</style>
