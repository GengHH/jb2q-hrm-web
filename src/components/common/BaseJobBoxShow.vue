<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-02 15:48:52
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\components\common\BaseJobBoxShow.vue
-->
<template>
  <div class="module-one clearfix" @click="showPositionDetails">
    <el-row :gutter="20">
      <el-col :span="6">
        <!-- <img src="../../assets/images/logos.png" alt="未加载" /> -->
        <img
          v-if="jobBoxInfoObj.propagandaImage"
          :src="'data:image/jpg;base64,' + jobBoxInfoObj.propagandaImage"
          @error="defImg"
          alt="未加载"
        />
        <img v-else :src="defaultImg" alt="未加载" />
      </el-col>
      <el-col :span="18">
        <div class="module-right ">
          <p class="font-eighteen">{{ jobBoxInfoObj.positionName }}</p>
          <p class="corp-name gray-font">{{ jobBoxInfoObj.corpName }}</p>
          <p class="span-infor">
            <span>{{ jobBoxInfoObj.workAreaText }}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ jobBoxInfoObj.workYearNeedText }}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ jobBoxInfoObj.eduRequireText }}</span>
          </p>
          <p class="span-infor">
            <i class="font20"
              >{{ jobBoxInfoObj.salaryMin }}-{{ jobBoxInfoObj.salaryMax }}</i
            >
            <span class="gray-font">
              {{ jobBoxInfoObj.salaryPayTypeText }}
            </span>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
  <!-- <div class="module-one clearfix">
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
  </div> -->
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
  name: 'BaseJobBoxShow',
  props: {
    jobBoxInfoObj: Object
  },
  data() {
    return {
      defaultImg: require('@/assets/images/break-img.svg')
    };
  },
  methods: {
    /**
     * 定义加载不到图片时显示默认图片
     */
    defImg(event) {
      let img = event.target;
      img.src = this.defaultImg;
      img.onerror = null; //防止闪图
    },
    /**
     * 定义加载不到图片时显示默认图片
     */
    showPositionDetails() {
      if (!this.jobBoxInfoObj.positionId) {
        this.$alert('无法获取职位详细信息');
      } else {
        this.$router.push({
          path: '/jobDetails',
          query: {
            id: jobBoxInfoObj.positionId
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.module-one {
  //margin-right: 23px;
  //margin-bottom: 23px;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  background: #fff;
  padding: 22px;
  &:hover {
    border: 1px solid #fc6f3d;
  }
  img {
    display: block;
    float: left;
    width: 100%;
  }
  .module-right {
    float: left;
    // margin-left: 40px;
    .font-eighteen {
      font-size: 18px;
      color: #000000;
    }
    .corp-name {
      margin-top: 10px;
    }
    .span-infor {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.7);
      margin-top: 15px;
      .font20 {
        font-size: 20px;
        color: #fc6f3d;
      }
    }
  }
  .gray-font {
    color: #999;
  }
}
// .clearfix {
//   zoom: 1;
// }
</style>
