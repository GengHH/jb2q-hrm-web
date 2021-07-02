<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-02 16:00:57
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\components\common\BaseJobFairBoxShow.vue
-->
<template>
  <!-- <div class="module-one clearfix">
    <img src="../../assets/images/logos.png" alt="未加载">
    <div class="module-right ">
      <p class="font-eighteen">{{ jobFairBoxInfoObj.jobName }}</p>
      <p class="span-infor">
        <span>{{ jobFairBoxInfoObj.districtName }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{ jobFairBoxInfoObj.timeInterval }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{ jobFairBoxInfoObj.educationName }}</span>
      </p>
      <p class="span-infor"> 
        <i class="font20">{{ jobFairBoxInfoObj.minSalary }}-{{ jobFairBoxInfoObj.maxSalary }}</i> {{ jobFairBoxInfoObj.paymentUnit }}
      </p>
    </div>
  </div> -->
  <div class="module-three" @click="goPath(index)">
    <img :src="imgs[index]" alt="未加载" />
    <!-- <p class="zl-font mat-30">招聘会专栏</p>
    <p class="zl-font2 mat-15">各种线上限下大型招聘会，期待你加入</p> -->
  </div>
</template>

<script>
/**
 * 首页显示招聘会信息的组件
 */
export default {
  name: 'BaseJobFairBoxShow',
  props: {
    index: Number,
    jobFairBoxInfoObj: Object
  },
  data() {
    return {
      imgs: [
        require('@/assets/img/zl_img.png'),
        require('@/assets/img/jx_img.png'),
        require('@/assets/img/hd_img.png')
      ],
      path: ['/jobFair', '/employmentTrainee', '/activity']
    };
  },
  methods: {
    goPath(index) {
      this.$router.push(this.path[index]);
    }
  }
};
</script>

<style lang="scss" scoped>
.module-three {
  background: #fff;
  border-radius: 10px;
  display: inline-block;
  //float: left;
  //margin-right: 23px;
  img {
    width: 100%;
  }
  p {
    text-align: left;
    padding-left: 20px;
  }
  .zl-font {
    font-size: 20px;
    color: #333333;
    box-sizing: border-box;
  }
  .mat-30 {
    margin-top: 30px;
  }
  .zl-font2 {
    font-size: 15px;
    color: #535353;
    box-sizing: border-box;
    margin-bottom: 30px;
  }
  .mat-15 {
    margin-top: 15px;
  }
}
</style>
