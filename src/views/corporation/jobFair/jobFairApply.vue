<template>
  <!-- <router-view></router-view> -->
  <div id="jobFairApply">
    <div class="title-style">单位招聘会报名</div>
    <el-row id="selectBar" :gutter="20">
      <el-col :span="6">
        <pl-input label="时间" v-model="date"></pl-input>
      </el-col>
      <el-col :span="6">
        <pl-input label="地点" v-model="address"></pl-input>
      </el-col>
      <el-col :span="6">
        <pl-input label="招聘类型" v-model="type"></pl-input>
      </el-col>
      <el-col :span="6" class="text-right">
        <pl-button
          @click="query($event)"
          class="orange-btn"
          icon="el-icon-search"
          >搜索</pl-button
        >
      </el-col>
    </el-row>
    <!-- 职位展示位 -->

    <FairBoxShow v-for="index in showList" :key="index.id"></FairBoxShow>
  </div>
</template>

<script>
/**
 * 单位招聘会报名界面
 */
import FairBoxShow from '@/components/corporation/FairBoxShow';

export default {
  name: 'jobFairApply',
  components: {
    FairBoxShow
  },
  data() {
    return {
      date: '',
      address: '',
      type: '',
      showList: [
        {
          id: '6',
          jobName: 'HTML5移动开发工程师',
          districtName: '活动列表',
          timeInterval: '3-5年',
          educationName: '本科',
          minSalary: '10000',
          maxSalary: '15000',
          paymentUnit: '元/月'
        },
        {
          id: '5',
          jobName: 'HTML5移动开发工程师',
          districtName: '活动列表',
          timeInterval: '3-5年',
          educationName: '本科',
          minSalary: '10000',
          maxSalary: '15000',
          paymentUnit: '元/月'
        },
        {
          id: '4',
          jobName: 'HTML5移动开发工程师',
          districtName: '活动列表',
          timeInterval: '3-5年',
          educationName: '本科',
          minSalary: '10000',
          maxSalary: '15000',
          paymentUnit: '元/月'
        },
        {
          id: '3',
          jobName: 'HTML5移动开发工程师',
          districtName: '活动列表',
          timeInterval: '3-5年',
          educationName: '本科',
          minSalary: '10000',
          maxSalary: '15000',
          paymentUnit: '元/月'
        },
        {
          id: '2',
          jobName: 'HTML5移动开发工程师',
          districtName: '活动管理',
          timeInterval: '3-5年',
          educationName: '本科',
          minSalary: '10000',
          maxSalary: '15000',
          paymentUnit: '元/月'
        },
        {
          id: '1',
          jobName: 'HTML5移动开发工程师',
          districtName: '活动管理',
          timeInterval: '3-5年',
          educationName: '本科',
          minSalary: '10000',
          maxSalary: '15000',
          paymentUnit: '元/月'
        }
      ]
    };
  },
  computed: {
    jobFaieList: function() {
      return this.showList ? this.showList.slice(0, 3) : [];
    }
  },
  methods: {
    query(done) {
      this.$alert('暂时没有此Api接口，请稍后');
      done();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
#jobFairApply {
  // width: 90%;
  min-height: 100%;
  //max-height:1000px;
  margin: 0 auto;
  #selectBar {
    width: 100%;
    margin-top: 20px;
  }
  .more-btn {
    margin: 20px auto 0;
    display: block;
  }
  .title-style {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
    line-height: 40px;
    border-bottom: 1px solid #e9eef3;
    text-align: left;
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: 10px;
    position: relative;
  }
  .title-style::before {
    content: '';
    width: 4px;
    height: 16px;
    background: #fc7a43;
    position: absolute;
    left: 12px;
    top: 13px;
  }
}

.clearfix {
  zoom: 1;
}
</style>
