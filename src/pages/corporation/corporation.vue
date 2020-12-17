<template>
  <div id="indexApp">
    <!-- Header -->
    <HeaderIndex :nav-list="navList"></HeaderIndex>
    <transition name="fade">
      <router-view></router-view>
    </transition> 
  </div> 
</template>

<script>
/**
 * 公司管理系统入口界面
 */
import HeaderIndex from '@/components/index/HeaderIndex.vue';
import { testData } from '@pub/mockTestData';
export default {
  name: "app",
  components:{
    HeaderIndex,
  },
  data: () => {
    return {
      path: require("@/assets/logo.png"),
      list: testData.list,
      obj: {},
      jobActiveName :'jobRecommended',
      corpActiveName: 'corpRecommended',
      navList:[
        {id:'5',path:'/employmentTrainee',nvaText:'招聘会'},
        {id:'4',path:'/jobFair',nvaText:'应聘管理'},
        {id:'3',path:'/recruitment',nvaText:'简历搜索'},
        {id:'2',path:'/jobSearch',nvaText:'职位管理'},
        {id:'1',path:'/',nvaText:'单位信息维护'},
      ]
    }
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
    testRoute(){
      
    }
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

<style lang='scss' scoped>
#indexApp {
  //font-family: "Avenir", Helvetica, Arial, sans-serif;
  //-webkit-font-smoothing: antialiased;
  //-moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
