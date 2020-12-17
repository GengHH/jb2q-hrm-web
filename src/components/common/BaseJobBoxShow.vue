<template>
  <div class="module-one clearfix">
    <img src="../../assets/images/logos.png" alt="未加载">
    <div class="module-right ">
      <p class="font-eighteen">{{ jobBoxInfoObj.jobName }}</p>
      <p class="span-infor">
        <span>{{ jobBoxInfoObj.districtName }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{ jobBoxInfoObj.timeInterval }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{ jobBoxInfoObj.educationName }}</span>
      </p>
      <p class="span-infor"> 
        <i class="font20">{{ jobBoxInfoObj.minSalary }}-{{ jobBoxInfoObj.maxSalary }}</i> {{ jobBoxInfoObj.paymentUnit }}
      </p>
    </div>
  </div>
  <!-- <div class="module-one clearfix">
    <img src="../../assets/images/logos.png" alt="">
    <div class="module-right ">
      <p class="font-eighteen">HTML5移动开发工程师</p>
      <p class="span-infor">
        <span>闵行区</span>
        <el-divider direction="vertical"></el-divider>
        <span>3-5年</span>
        <el-divider direction="vertical"></el-divider>
        <span>本科</span>
      </p>
      <p class="span-infor"> <i class="font20">10000-15000</i> 元/月</p>
    </div>
  </div> -->
</template> 

<script>
/**
 * 首页显示工作职位信息的组件
 */
export default {
  name:'BaseJobBoxShow',
  props:{
    jobBoxInfoObj: Object
  }
}
</script>

<style lang='scss' scoped>
.module-one {
  //margin-right: 23px;
  //margin-bottom: 23px;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  background: #fff;
  padding: 22px;
  img {
    display: block;
    float: left;
  }
  .module-right {
    float: left;
    margin-left: 40px;
    .font-eighteen {
      font-size: 18px;
      color: #000000;
    }
    .span-infor {
    font-size: 14px;
    color: rgba(0,0,0,0.7);
    margin-top: 15px;
    .font20 {
        font-size: 20px;
        color: #fc6f3d;
      }
    }
  }
}
// .clearfix {
//   zoom: 1;
// }
</style>