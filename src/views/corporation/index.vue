<template>
    <!-- <router-view></router-view> -->
    <div id="indexBody">
      <el-row :gutter="20">
        <el-col :span="6">
          <router-view name="corpNavMenu" />
        </el-col>
        <el-col :span="18">
        <transition name="fade">
          <router-view name="default" />
        </transition> 
      </el-col>
    </el-row>
  </div> 
</template>

<script>
// import FooterIndex from '@/components/index/FooterIndex.vue';
// import BaseSearch from '@/components/common/BaseSearch.vue';
// import BaseCarousel from '@/components/common/BaseCarousel.vue';
// import BaseInfoGloriette from '@/components/common/BaseInfoGloriette.vue';
import { testData } from '@pub/mockTestData';
export default {
  name: "app",
  components:{
    // FooterIndex,
    // BaseSearch,
    // BaseCarousel,
    // BaseInfoGloriette,
  },
  data(){
    return {
      path: require("@/assets/logo.png"),
      list: testData.list,
      obj: {},
      colRowGutter: 40,
      jobActiveName :'jobRecommended',
      corpActiveName: 'corpRecommended',
      showList:[
        {id:'6',jobName:'HTML5移动开发工程师',districtName:'活动列表',timeInterval:'3-5年',educationName:'本科',minSalary:'10000',maxSalary:'15000',paymentUnit:'元/月'},
        {id:'5',jobName:'HTML5移动开发工程师',districtName:'活动列表',timeInterval:'3-5年',educationName:'本科',minSalary:'10000',maxSalary:'15000',paymentUnit:'元/月'},
        {id:'4',jobName:'HTML5移动开发工程师',districtName:'活动列表',timeInterval:'3-5年',educationName:'本科',minSalary:'10000',maxSalary:'15000',paymentUnit:'元/月'},
        {id:'3',jobName:'HTML5移动开发工程师',districtName:'活动列表',timeInterval:'3-5年',educationName:'本科',minSalary:'10000',maxSalary:'15000',paymentUnit:'元/月'},
        {id:'2',jobName:'HTML5移动开发工程师',districtName:'活动管理',timeInterval:'3-5年',educationName:'本科',minSalary:'10000',maxSalary:'15000',paymentUnit:'元/月'},
        {id:'1',jobName:'HTML5移动开发工程师',districtName:'活动管理',timeInterval:'3-5年',educationName:'本科',minSalary:'10000',maxSalary:'15000',paymentUnit:'元/月'},
      ]
    }
  },
  computed: {
    jobFaieList: function(){
      return this.showList ? this.showList.slice(0,3) : [];
    }
  },
  methods: {
    jobHandleClick(){
      console.log(1);
    },
    corpHandleClick(){
      console.log(2);
    },
    showMore(){
      this.$message("this is more");
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
#indexBody{
  width:90%;
  min-height: 100%;
  //max-height:1000px;
  margin:0 auto 150px;
  //background-color: $g-gray1-color;
  .more-btn{
    margin:20px auto;
    padding-left:50px;
    padding-right:50px;
    color:#fc6f3d;
    border:1px solid #fc6f3d;
    display:block;
  }
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
// 职位信息列表类型
#jobInfoGloriette {
  ::v-deep .el-col{
    color: blue;
    //height: 100px;
    
  }
}
// 单位信息列表类型
#corpInfoGloriette {
  ::v-deep .el-col{
    color: red;
    //height: 100px;
    
  }
}
</style>
