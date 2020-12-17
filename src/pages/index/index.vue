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
        {id:'7',path:'/about',nvaText:'关于我们'},
        {id:'6',path:'/activity',nvaText:'特色活动'},
        {id:'5',path:'/employmentTrainee',nvaText:'就业见习'},
        {id:'4',path:'/jobFair',nvaText:'招聘会'},
        {id:'3',path:'/recruitment',nvaText:'我要招聘'},
        {id:'2',path:'/jobSearch',nvaText:'我要求职'},
        {id:'1',path:'/',nvaText:'首页'},
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
    jobHandleClick(){
      
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
