<template>
  <div>
    <!-- <router-view></router-view> -->
    <div id="indexBody">
      <BaseSearch
        ref="searchBox"
        showSelect
        :selectData="selectData"
        @clickButton="queryFromIndex(arguments)"
      ></BaseSearch>
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
              <a
                id="perosnLoginBtn"
                href="#"
                @click="personSignIn"
                class="login-btn login-link-one"
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
              <a
                id="corpLoginBtn"
                href="#"
                @click="corpSignIn"
                class="login-btn  login-link-two"
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
        <!-- <el-tab-pane label="推荐职位" name="jobRecommended">
          <BaseInfoGloriette
            :info-list="showList"
            :col-num="3"
            :template-name="'job'"
          ></BaseInfoGloriette>
          <el-button
            id="jobListMore1"
            class="more-btn"
            @click="showMorePosition('rec')"
            >查看更多</el-button
          >
        </el-tab-pane> -->
        <el-tab-pane label="热招职位" name="jobHot">
          <BaseInfoGloriette
            :info-list="hotPositionList"
            :col-num="3"
            :template-name="'job'"
            ><div>test2</div></BaseInfoGloriette
          >
          <el-button
            id="jobListMore2"
            class="more-btn"
            v-if="hotPositionList && hotPositionList.length >= 9"
            @click="showMorePosition('hot')"
            >查看更多</el-button
          >
        </el-tab-pane>
        <el-tab-pane label="急招职位" name="jobUrgent">
          <BaseInfoGloriette
            :info-list="urgPositionList"
            :col-num="3"
            :template-name="'job'"
            ><div>test3</div></BaseInfoGloriette
          >
          <el-button
            id="jobListMore3"
            class="more-btn"
            v-if="urgPositionList && urgPositionList.length >= 9"
            @click="showMorePosition('urg')"
            >查看更多</el-button
          >
        </el-tab-pane>
      </el-tabs>

      <!-- 单位展示位 -->
      <el-tabs
        id="corpInfoGloriette"
        v-model="corpActiveName"
        @tab-click="corpHandleClick"
      >
        <el-tab-pane
          label="人力资源旗舰店"
          name="corpFlagship"
          v-loading="corpFlagshipLoading"
          element-loading-text="加载中"
        >
          <BaseInfoGloriette
            :info-list="showQjdList"
            :col-num="4"
            :template-name="'corp'"
          ></BaseInfoGloriette>
          <el-button
            id="corpListMore1"
            class="more-btn"
            v-if="showQjdList && showQjdList.length >= 9"
            @click="showMoreCorp('flagship')"
            >查看更多</el-button
          >
        </el-tab-pane>
        <el-tab-pane
          label="推荐企业"
          name="corpRecommended"
          v-loading="corpRecommendedLoading"
          element-loading-text="加载中"
        >
          <BaseInfoGloriette
            :info-list="showCorpList"
            :col-num="4"
            :template-name="'corp'"
          ></BaseInfoGloriette>
          <el-button
            id="corpListMore2"
            class="more-btn"
            v-if="showCorpList && showCorpList.length >= 9"
            @click="showMoreCorp('rec')"
            >查看更多</el-button
          >
        </el-tab-pane>
      </el-tabs>

      <!-- 首页-三大模块信息列表 -->
      <!-- <div style="width:100%;height:60px;"></div> -->
      <BaseInfoGloriette
        :info-list="jobFaieList"
        :col-num="3"
        :template-name="'jobFair'"
        :col-row-gutter="colRowGutter"
      ></BaseInfoGloriette>
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
import { isPerson, isCorporation, getDicText, niceScrollUpdate } from '@/utils';
import {
  queryHotPositionInfo,
  // queryHotPositionInfoAll,
  querySortUrgRecPositionList,
  // queryAllUrgRecPositionList,
  queryHRFlagshipStoreInfo,
  // queryHRFlagshipStoreInfoAll,
  getIndexRecCorp
  // getIndexRecCorpList
} from '@/api/indexApi';
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
      corpFlagshipLoading: false,
      corpRecommendedLoading: false,
      obj: {},
      colRowGutter: 40,
      jobActiveName: 'jobHot',
      corpActiveName: 'corpFlagship',
      showQjdList: [],
      showCorpList: [],
      showList: [
        {
          'positionId|+1': '@string("number", 3)',
          positionCode: '20210400000032',
          positionName: '初级审计师4405',
          recruitType: '1',
          tranBaseSymbol: '0',
          agencyRecruit: '0',
          entrustTyshxym: '',
          entrustCorpName: '',
          corpId: '200008010000011',
          positionType: '10  ',
          workNature: '01',
          ageMax: '40',
          ageMin: '18',
          workArea: '04',
          workAddress: '工作详细地址',
          workHour: '05',
          workYearNeed: '04',
          eduRequire: '07',
          salaryMax: '99999',
          salaryMin: '50000',
          salaryPayType: '04',
          recruitNum: '3',
          special: '',
          describe: '初级审计师描述',
          onTop: '0',
          releaseStatusId: '2',
          releaseUserId: '0001564639',
          releaseTime: '2021-06-03 13:32:04',
          corpName: '中化资产管理（上海）有限公司',
          corpNature: '15',
          industryType: '09'
        },
        {
          'positionId|+1': '@string("number", 3)',
          positionCode: '20210400000032',
          positionName: '初级审计师4405',
          recruitType: '1',
          tranBaseSymbol: '0',
          agencyRecruit: '0',
          entrustTyshxym: '',
          entrustCorpName: '',
          corpId: '200008010000011',
          positionType: '10  ',
          workNature: '01',
          ageMax: '40',
          ageMin: '18',
          workArea: '04',
          workAddress: '工作详细地址',
          workHour: '05',
          workYearNeed: '04',
          eduRequire: '07',
          salaryMax: '99999',
          salaryMin: '50000',
          salaryPayType: '04',
          recruitNum: '3',
          special: '',
          describe: '初级审计师描述',
          onTop: '0',
          releaseStatusId: '2',
          releaseUserId: '0001564639',
          releaseTime: '2021-06-03 13:32:04',
          corpName: '中化资产管理（上海）有限公司',
          corpNature: '15',
          industryType: '09'
        },
        {
          'positionId|+1': '@string("number", 3)',
          positionCode: '20210400000032',
          positionName: '初级审计师4405',
          recruitType: '1',
          tranBaseSymbol: '0',
          agencyRecruit: '0',
          entrustTyshxym: '',
          entrustCorpName: '',
          corpId: '200008010000011',
          positionType: '10  ',
          workNature: '01',
          ageMax: '40',
          ageMin: '18',
          workArea: '04',
          workAddress: '工作详细地址',
          workHour: '05',
          workYearNeed: '04',
          eduRequire: '07',
          salaryMax: '99999',
          salaryMin: '50000',
          salaryPayType: '04',
          recruitNum: '3',
          special: '',
          describe: '初级审计师描述',
          onTop: '0',
          releaseStatusId: '2',
          releaseUserId: '0001564639',
          releaseTime: '2021-06-03 13:32:04',
          corpName: '中化资产管理（上海）有限公司',
          corpNature: '15',
          industryType: '09'
        }
      ],
      hotPositionList: [],
      urgPositionList: [],
      selectValue: 'position',
      selectData: [
        {
          label: '单位名称',
          value: 'corporation'
        },
        { label: '职位名称', value: 'position' }
      ]
    };
  },
  computed: {
    jobFaieList: function() {
      return this.showList ? this.showList.slice(0, 3) : [];
    }
  },
  methods: {
    /**
     * 跳转个人登录界面或者个人界面
     */
    personSignIn() {
      this.$store.commit('index/set_PRIORITY_LOGIN_TYPE', 'person');
      //this.$alert('个人登录暂时未开放');
      // this.axios
      //   .get('dev-corp-api/loginController/ywtb-index')
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     throw new Error('调用API失败' + err);
      //   });
      if (isPerson(this)) {
        window.location.href = '/ggzp-shrs/person.html';
      } else {
        window.location.href = '/ggzp-shrs/login.html';
      }
    },
    /**
     * 跳转单位登录界面或者单位界面
     */
    corpSignIn() {
      this.$store.commit('index/set_PRIORITY_LOGIN_TYPE', 'corporation');
      if (isCorporation(this)) {
        window.location.href = '/ggzp-shrs/corporation.html';
      } else {
        window.location.href = '/ggzp-shrs/login.html';
      }
      // window.location.href =
      //   'http://117.184.226.149/uc/login/login.jsp?type=2&redirect_uri=https://j2testzzjb.rsj.sh.cegn.cn/ggzp-zzjb-shrs/loginController/ywtb-index';
    },
    /**
     * 首页查询
     */
    queryFromIndex() {
      let target = this.$refs.searchBox;
      if (target && !target.selectValue) {
        this.$alert('请选择查询类型');
        return;
      }
      if (target && target.selectValue === 'corporation') {
        this.$router.push({
          path: 'corpSearch',
          query: {
            text: $.trim(target.input || '')
          }
        });
      } else {
        this.$router.push({
          path: 'jobSearch',
          query: {
            text: $.trim(target.input || '')
          }
        });
      }
    },
    jobHandleClick() {
      // console.log(1);
    },
    corpHandleClick() {
      // console.log(2);
    },
    showMore() {
      this.$message('this is more');
    },
    /**
     *显示更多职位
     */
    showMorePosition(type) {
      this.$router.push({
        path: '/jobSearch',
        query: {
          type: type
        }
      });
    },
    /**
     *显示更多单位or旗舰店
     */
    showMoreCorp(type) {
      this.$router.push({
        path: '/corpSearch',
        query: {
          type: type
        }
      });
    },
    /**
     *初始化首页相关信息查询
     */
    async initPage() {
      //热招
      this.queryHotPositionInfo();
      this.querySortUrgRecPositionList();
      this.queryHRFlagshipStoreInfo();
      this.getIndexRecCorp();
    },
    //热招
    async queryHotPositionInfo() {
      let hotRes = await queryHotPositionInfo();
      if (hotRes && hotRes.status === 200) {
        hotRes.result.data.forEach(item => {
          if (item.workArea) {
            item.workAreaText = getDicText(
              this.$store.getters['dictionary/ggjbxx_qx'],
              item.workArea
            );
          }
          if (item.eduRequire) {
            item.eduRequireText = getDicText(
              this.$store.getters['dictionary/recruit_edu'],
              item.eduRequire
            );
          }
          if (item.workYearNeed) {
            item.workYearNeedText = getDicText(
              this.$store.getters['dictionary/recruit_work_year'],
              item.workYearNeed
            );
          }
          if (item.salaryPayType) {
            item.salaryPayTypeText =
              '元/' +
              getDicText(
                this.$store.getters['dictionary/recruit_salary_pay_type'],
                item.salaryPayType
              );
          }
        });

        this.hotPositionList = hotRes.result.data;
      } else if (hotRes) {
        this.$message.error('获取热招职位信息失败');
      }
    },
    //急招
    async querySortUrgRecPositionList() {
      let urgRes = await querySortUrgRecPositionList();
      if (urgRes && urgRes.status === 200) {
        urgRes.result.data.forEach(item => {
          if (item.workArea) {
            item.workAreaText = getDicText(
              this.$store.getters['dictionary/ggjbxx_qx'],
              item.workArea
            );
          }
          if (item.eduRequire) {
            item.eduRequireText = getDicText(
              this.$store.getters['dictionary/recruit_edu'],
              item.eduRequire
            );
          }
          if (item.workYearNeed) {
            item.workYearNeedText = getDicText(
              this.$store.getters['dictionary/recruit_work_year'],
              item.workYearNeed
            );
          }
          if (item.salaryPayType) {
            item.salaryPayTypeText =
              '元/' +
              getDicText(
                this.$store.getters['dictionary/recruit_salary_pay_type'],
                item.salaryPayType
              );
          }
        });
        this.urgPositionList = urgRes.result.data;
      } else if (urgRes) {
        this.$message.error('获取紧急招职位信息失败');
      }
    },
    //旗舰店
    async queryHRFlagshipStoreInfo() {
      this.corpFlagshipLoading = true;
      let shipRes = await queryHRFlagshipStoreInfo();
      if (shipRes && shipRes.status === 200) {
        shipRes.result.data.forEach(item => {
          if (item.corpNature) {
            item.corpNatureText = getDicText(
              this.$store.getters['dictionary/recruit_corp_nature'],
              item.corpNature
            );
          }
          if (item.industryType) {
            item.industryTypeText = getDicText(
              this.$store.getters['dictionary/recruit_industry_type'],
              item.industryType
            );
          }
        });

        this.showQjdList = shipRes.result.data;
      } else if (shipRes) {
        this.$message.error('获取人力资源旗舰店信息失败');
      }
      this.corpFlagshipLoading = false;
    },
    //推荐单位
    async getIndexRecCorp() {
      // this.corpRecommendedLoading = true;
      let corpRes = await getIndexRecCorp();
      if (corpRes && corpRes.status === 200) {
        corpRes.result.data.forEach(item => {
          if (item.corpNature) {
            item.corpNatureText = getDicText(
              this.$store.getters['dictionary/recruit_corp_nature'],
              item.corpNature
            );
          }
          if (item.industryType) {
            item.industryTypeText = getDicText(
              this.$store.getters['dictionary/recruit_industry_type'],
              item.industryType
            );
          }
        });
        this.showCorpList = corpRes.result.data;
      } else if (corpRes) {
        this.$message.error('获取人力资源旗舰店信息失败');
      }
      // this.corpRecommendedLoading = false;
    }
  },
  created() {
    this.initPage();
  },
  mounted() {
    if (isPerson(this)) {
      $('#perosnLoginBtn').html('已登录');
    } else {
      $('#perosnLoginBtn').html('去登录');
    }
    if (isCorporation(this)) {
      $('#corpLoginBtn').html('已登录');
    } else {
      $('#corpLoginBtn').html('去登录');
    }
  },
  updated() {
    // 更新滚动条
    this._.throttle(niceScrollUpdate, 500)();
  }
};
</script>

<style lang="scss" scoped>
#indexBody {
  width: 90%;
  min-height: 100%;
  //max-height:1000px;
  margin: 0 auto 40px;
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
  ::v-deep .el-tabs__header {
    margin: 20px 0 0;
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
    position: relative;
    background-image: url('../../assets/images/pers-login.png');
  }
  #corpLogin {
    position: relative;
    background-image: url('../../assets/images/corp-login.png');
  }
  .login-btn {
    background-color: #fff;
    padding: 8px 20px;
    border-radius: 20px;
    font-size: 14px;
    position: absolute;
    bottom: 10px;
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
  #pane-corpFlagship {
    min-height: 435px;
  }
}
</style>
