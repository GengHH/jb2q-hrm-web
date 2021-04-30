<template>
  <!-- <router-view></router-view> -->
  <div id="indexBody">
    <el-row :gutter="20">
      <el-col :span="4" id="leftNav">
        <router-view name="corpNavMenu" />
      </el-col>
      <el-col :span="20">
        <!-- <transition name="fade"> -->
        <router-view name="default" />
        <!-- </transition> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { testData } from '@pub/mockTestData';
export default {
  name: 'corporationLayout',
  components: {
    // FooterIndex,
    // BaseSearch,
    // BaseCarousel,
    // BaseInfoGloriette,
  },
  data() {
    return {
      path: require('@/assets/logo.png'),
      list: testData.list,
      obj: {},
      colRowGutter: 40,
      jobActiveName: 'jobRecommended',
      corpActiveName: 'corpRecommended',
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
    jobHandleClick() {
      console.log(1);
    },
    corpHandleClick() {
      console.log(2);
    },
    showMore() {
      this.$message('this is more');
    }
  },
  created() {
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

<style lang="scss" scoped>
#indexBody {
  width: 90%;
  min-height: 100%;
  //max-height:1000px;
  margin: 0 auto;
  padding-top: 60px;
  //background-color: $g-gray1-color;
  .more-btn {
    margin: 20px auto;
    padding-left: 50px;
    padding-right: 50px;
    color: #fc6f3d;
    border: 1px solid #fc6f3d;
    display: block;
  }
  #leftNav {
    margin-top: 10px;
  }
}

.clearfix {
  zoom: 1;
}
// 职位信息列表类型
#jobInfoGloriette {
  ::v-deep .el-col {
    color: blue;
    //height: 100px;
  }
}
// 单位信息列表类型
#corpInfoGloriette {
  ::v-deep .el-col {
    color: red;
    //height: 100px;
  }
}
</style>
