<template>
  <div id="indexApp">
    <!-- Header -->
    <HeaderIndex :nav-list="navList"></HeaderIndex>
    <div id="indexBody">
      <BaseSearch></BaseSearch>
      <!-- <router-view></router-view> -->
      <el-row id="carouselBox" :gutter="20">
        <el-col :sm="24" :md="18" :lg="16" :xl="16">
          <!-- 轮播图 -->
          <BaseCarousel></BaseCarousel>  
        </el-col>
        <el-col :sm="24" :md="6" :lg="8" :xl="8">
          <!-- 登录框 -->
          <div class="logo-module">
						<div class="module-logs or-font clearfix">
							<span class="or-br-color"><i class="icon iconfont">&#xe64c;</i></span>
							<span>个人登录</span>
						</div>
						<div class="module-logs co-font clearfix">
							<span class="co-br-color"><i class="icon iconfont">&#xe64d;</i></span>
							<span>单位登录</span>
						</div>
					</div>
        </el-col>
      </el-row>
      <!-- 职位展示位 -->
      <BaseInfoGloriette :info-list="navList" :col-num="4"></BaseInfoGloriette>
    </div>
    <!-- Footer -->
    <FooterIndex></FooterIndex>
  </div> 
</template>

<script>
import HeaderIndex from '@/components/index/HeaderIndex.vue';
import FooterIndex from '@/components/index/FooterIndex.vue';
import BaseSearch from '@/components/common/BaseSearch.vue';
import BaseCarousel from '@/components/common/BaseCarousel.vue';
import BaseInfoGloriette from '@/components/common/BaseInfoGloriette.vue';
import { testData } from '@pub/mockTestData';
export default {
  name: "app",
  components:{
    HeaderIndex,
    FooterIndex,
    BaseSearch,
    BaseCarousel,
    BaseInfoGloriette
  },
  data: () => {
    return {
      path: require("@/assets/logo.png"),
      list: testData.list,
      obj: {},
      navList:[
        {id:'6',path:'',nvaText:'活动列表'},
        {id:'5',path:'',nvaText:'活动列表'},
        {id:'4',path:'',nvaText:'活动列表'},
        {id:'3',path:'',nvaText:'活动列表'},
        {id:'2',path:'',nvaText:'活动管理'},
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
  text-align: center;
  color: #2c3e50;

  #indexBody{
    width:90%;
    min-height: 100%;
    max-height:1000px;
    margin:0 auto;
    //background-color: $g-gray1-color;

  }
}
.test {
  color: #000000;
}

.el-carousel{
  height: 300px;
  width: 100%;
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

#carouselBox{
  margin: 20px 0;
  .el-col{
    margin: 10px 0;
  }
}

.logo-module {
  width: 100%;
  height: 300px;
  background: #ff9954 linear-gradient(to right,#ff9954,#fc6f3d);
  border-radius: 3px;
  padding: 0 12px;
  display: inline-block;

  .module-logs {
    color: #fda749;
    background: #fff4ed;
    font-size: 24px;
    line-height: 120px;
    height:120px;
    border-radius: 3px;
    margin: 20px 0;

    & span:first-child {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      text-align: center;
      line-height: 56px;
      display: block;
      background: #fff;
      float: left;
      margin:10px 20px;
    }

  }
  .or-font {
    .or-br-color i {
      font-size: 60px;
      margin: 20px 0;
      display: block;
    }
  }
  .co-font {
    .co-br-color i {
      font-size: 60px;
      margin: 20px 0;
      display: block;      
    }
  }
}
.clearfix {
    zoom: 1;
}

#infoGlorietteBox {

  ::v-deep .el-col{
    color: red;
    height: 100px;
    
  }
}
</style>
