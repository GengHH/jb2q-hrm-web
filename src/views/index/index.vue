<template>
  <div>
    <!-- <router-view></router-view> -->
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
            <div id="persLogin" class="module-logs or-font clearfix">
              <!-- <span class="or-br-color"
                ><i class="icon iconfont">&#xe64c;</i></span
              > -->
              <h2>个人登录</h2>
              <p>账号密码登录</p>
              <p>随申办APP扫码登录</p>
              <br />
              <br />
              <a href="#" @click="personSignIn" class="login-btn login-link-one"
                >去登录</a
              >
            </div>
            <div
              id="corpLogin"
              class="module-logs co-font clearfix"
              @click="corpSignIn"
            >
              <!-- <span class="co-br-color"
                ><i class="icon iconfont">&#xe64d;</i></span
              > -->
              <h2>单位登录</h2>
              <p>法人一证通登录</p>
              <p>随申办APP/微信/支付宝</p>
              <p>扫码登录</p>
              <br />
              <a href="#" @click="corpSignIn" class="login-btn  login-link-two"
                >去登录</a
              >
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 职位展示位 -->
      <el-tabs
        id="jobInfoGloriette"
        v-model="jobActiveName"
        @tab-click="jobHandleClick"
      >
        <el-tab-pane label="推荐职位" name="jobRecommended">
          <BaseInfoGloriette
            :info-list="showList"
            :col-num="3"
            :template-name="'job'"
          ></BaseInfoGloriette>
        </el-tab-pane>
        <el-tab-pane label="热招职位" name="jobHot">
          <BaseInfoGloriette
            :info-list="showList"
            :col-num="3"
            :template-name="'job'"
            ><div>test2</div></BaseInfoGloriette
          >
        </el-tab-pane>
        <el-tab-pane label="急招职位" name="jobUrgent">
          <BaseInfoGloriette
            :info-list="showList"
            :col-num="4"
            :template-name="'job'"
            ><div>test3</div></BaseInfoGloriette
          >
        </el-tab-pane>
      </el-tabs>
      <el-button id="jobListMore" class="more-btn" @click="showMore"
        >查看更多</el-button
      >

      <!-- 单位展示位 -->
      <el-tabs
        id="corpInfoGloriette"
        v-model="corpActiveName"
        @tab-click="corpHandleClick"
      >
        <el-tab-pane label="推荐企业" name="corpRecommended">
          <BaseInfoGloriette
            :info-list="showList"
            :col-num="4"
            :template-name="'corp'"
          ></BaseInfoGloriette>
        </el-tab-pane>
        <el-tab-pane label="人力资源机构" name="corpInstitution">
          <BaseInfoGloriette
            :info-list="showList"
            :col-num="4"
            :template-name="'corp'"
          ></BaseInfoGloriette>
        </el-tab-pane>
      </el-tabs>
      <el-button id="corpListMore" class="more-btn" @click="showMore"
        >查看更多</el-button
      >

      <!-- 首页-招聘会信息列表 -->
      <BaseInfoGloriette
        :info-list="jobFaieList"
        :col-num="3"
        :template-name="'jobFair'"
        :col-row-gutter="colRowGutter"
        >3</BaseInfoGloriette
      >
    </div>
    <!-- Footer -->
    <FooterIndex></FooterIndex>
  </div>
</template>

<script>
import FooterIndex from '@/components/index/FooterIndex.vue';
import BaseSearch from '@/components/common/BaseSearch.vue';
import BaseCarousel from '@/components/common/BaseCarousel.vue';
import BaseInfoGloriette from '@/components/common/BaseInfoGloriette.vue';
import { testData } from '@pub/mockTestData';
export default {
  name: 'indexApp',
  components: {
    FooterIndex,
    BaseSearch,
    BaseCarousel,
    BaseInfoGloriette
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
    personSignIn() {
      this.$store.commit('index/set_PRIORITY_LOGIN_TYPE', 'person');
      //this.$alert('个人登录暂时未开放');
      // this.axios
      //   .get('new-corp-api/loginController/ywtb-index')
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     throw new Error('调用API失败' + err);
      //   });
      window.location.href = '/ggzp-shrs/login.html';
    },
    corpSignIn() {
      this.$store.commit('index/set_PRIORITY_LOGIN_TYPE', 'corporation');
      window.location.href = '/ggzp-shrs/login.html';
      // window.location.href =
      //   'http://117.184.226.149/uc/login/login.jsp?type=2&redirect_uri=https://j2testzzjb.rsj.sh.cegn.cn/ggzp-zzjb-shrs/loginController/ywtb-index';
    },
    test() {
      this.axios
        .get('http://api.wpbom.com/api/neran.php')
        .then(res => {
          this.$set(this.obj, 'siet', res.data);
          console.log(this.$data);
        })
        .catch(err => {
          throw new Error('调用API失败' + err);
        });
    },
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
  margin: 0 auto 150px;
  padding-top: 90px;
  //background-color: $g-gray1-color;
  .more-btn {
    margin: 20px auto;
    padding-left: 50px;
    padding-right: 50px;
    color: #fc6f3d;
    border: 1px solid #fc6f3d;
    display: block;
  }
}

.logo-module {
  width: 100%;
  //height: 300px;
  //background: #ff9954 linear-gradient(to right, #ff9954, #fc6f3d);
  background: #fff;
  border-radius: 3px;
  padding: 0 12px;
  display: inline-block;

  #persLogin {
    background-image: url('../../assets/images/pers-login.png');
  }
  #corpLogin {
    background-image: url('../../assets/images/corp-login.png');
  }
  .login-btn {
    background-color: #fff;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 14px;
  }
  .login-link-one {
    color: #998cfd;
  }
  .login-link-two {
    color: #ff7862;
  }
  .module-logs {
    color: #fff;
    //background: #fff4ed;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 18px;
    //line-height: 120px;
    height: 170px;
    border-radius: 3px;
    margin: 20px 0;
    padding-left: 50px;
    padding-top: 10px;
    p {
      margin: 7px 0;
      font-size: 16px;
      line-height: 20px;
    }
    & span:first-child {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      text-align: center;
      line-height: 56px;
      display: block;
      background: #fff;
      float: left;
      margin: 10px 20px;
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
