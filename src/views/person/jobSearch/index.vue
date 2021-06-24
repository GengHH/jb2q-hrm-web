<template>
  <div id="indexBody">
    <base-search
      placeholder="请输入相关职位名称"
      @clickButton="queryJobs($event)"
    ></base-search>
    <!-- S筛选部分 -->
    <div class="filter-content">
      <el-form ref="queryJobForm" :model="queryParams">
        <el-row class="condition condition-one">
          <el-col :span="2">
            <div class="grid-content bg-purple">工作年限：</div>
          </el-col>
          <el-col :span="22">
            <el-radio-group v-model="queryParams.workYearNeed" size="medium">
              <el-radio-button label="">不限</el-radio-button>

              <el-radio-button
                v-for="(item, index) in gznxLists"
                :key="index"
                :label="item.value"
                >{{ item.label }}</el-radio-button
              >
              <!-- <el-radio-button label="01">1年以下</el-radio-button>
              <el-radio-button label="02">1~2年</el-radio-button>
              <el-radio-button label="03">3~5年</el-radio-button>
              <el-radio-button label="04">6~9年</el-radio-button>
              <el-radio-button label="05">10年及以上</el-radio-button> -->
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row class="condition condition-two">
          <el-col :span="2">
            <div class="grid-content bg-purple">行业：</div>
          </el-col>
          <el-col :span="20">
            <el-checkbox-group
              v-model="queryParams.industry"
              size="medium"
              id="industryRadios"
              class="radio-list-bar"
              @change="industryGroupChange"
            >
              <el-checkbox-button label="">不限</el-checkbox-button>
              <el-checkbox-button
                v-for="(item, index) in hyLists"
                :key="index"
                :label="item.value"
                >{{ item.label }}</el-checkbox-button
              >
            </el-checkbox-group>
          </el-col>
          <el-col :span="2">
            <div
              class="grid-content bg-purple more-ico"
              @click="showMoreRadios($event, 'industryRadios')"
            >
              <span>更多</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </el-col>
        </el-row>
        <el-row class="condition condition-three">
          <el-col :span="2">
            <div class="grid-content bg-purple">职位：</div>
          </el-col>
          <el-col :span="20">
            <el-checkbox-group
              v-model="queryParams.positionTypeList"
              size="medium"
              id="positionsRadios"
              class="radio-list-bar"
              @change="positionGroupChange"
            >
              <el-checkbox-button id="postionsAll" label=""
                >不限</el-checkbox-button
              >
              <!-- <el-checkbox-button
                v-for="index in zyLists"
                :key="index.value"
                :label="index.value"
                >{{ index.label }}</el-checkbox-button
              > -->
              <el-popover
                v-for="(item, index) in zyLists"
                :key="index"
                placement="bottom"
                width="600"
                trigger="click"
                popper-class="position-popover"
              >
                <el-checkbox-button
                  v-for="(item, idx) in zyListsTwo[index]"
                  :key="idx"
                  :label="item.value"
                  >{{ item.label }}</el-checkbox-button
                >
                <el-button
                  class="show-popover-button"
                  :btnIndex="index"
                  slot="reference"
                  >{{ item.label }}</el-button
                >
              </el-popover>
            </el-checkbox-group>
          </el-col>
          <el-col :span="2">
            <div
              class="grid-content bg-purple more-ico"
              @click="showMoreRadios($event, 'positionsRadios')"
            >
              <span>更多</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </el-col>
        </el-row>
        <!-- <el-row class="condition condition-three">
          <el-col :span="2">
            <div class="grid-content bg-purple">薪酬：</div>
          </el-col>
          <el-col :span="20">
            <el-radio-group v-model="queryParams.salaryScope" size="medium">
              <el-radio-button label="不限">不限</el-radio-button>
              <el-radio-button label="1">3500以下</el-radio-button>
              <el-radio-button label="2">3500-8000</el-radio-button>
              <el-radio-button label="3">8000-15000</el-radio-button>
              <el-radio-button label="4">15000-30000</el-radio-button>
              <el-radio-button label="5">30000以上</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row> -->
        <el-row class="condition condition-four">
          <el-col :span="2">
            <div class="grid-content bg-purple">工作性质：</div>
          </el-col>
          <el-col :span="20">
            <el-radio-group v-model="queryParams.workNature" size="medium">
              <el-radio-button label="">不限</el-radio-button>
              <el-radio-button
                v-for="(item, index) in gzxzLists"
                :key="index"
                :label="item.value"
                >{{ item.label }}</el-radio-button
              >
              <!-- <el-radio-button label="01">全职</el-radio-button>
              <el-radio-button label="02">兼职</el-radio-button>
              <el-radio-button label="03">就业见习</el-radio-button> -->
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row class="condition condition-five">
          <el-col :span="2">
            <div class="grid-content bg-purple">年龄：</div>
          </el-col>
          <el-col :span="22">
            <div class="grid-content bg-purple filter-select">
              <el-row>
                <el-col :span="4">
                  <el-input
                    id="minAge"
                    placeholder="请输入年龄下限"
                    prefix-icon="el-icon-user"
                    v-model.number="queryParams.ageMin"
                    @change="minAgeChange"
                    clearable
                  >
                  </el-input>
                </el-col>
                <el-col :span="1" class="horizontalLine">-</el-col>
                <el-col :span="4">
                  <el-input
                    id="maxAge"
                    placeholder="请输入年龄上限"
                    prefix-icon="el-icon-user"
                    v-model.number="queryParams.ageMax"
                    @change="maxAgeChange"
                    clearable
                  >
                  </el-input>
                </el-col>
                <el-col :span="4"></el-col>
                <el-col :span="2" class="text-right">薪酬：</el-col>
                <el-col :span="4">
                  <el-input
                    id="minSalary"
                    placeholder="请输入薪酬下限"
                    prefix-icon="el-icon-money"
                    v-model.number="queryParams.salaryMin"
                    @change="minSalaryChange"
                    clearable
                  >
                  </el-input>
                </el-col>
                <el-col :span="1" class="horizontalLine">-</el-col>
                <el-col :span="4">
                  <el-input
                    id="maxSalary"
                    placeholder="请输入薪酬上限"
                    prefix-icon="el-icon-money"
                    v-model.number="queryParams.salaryMax"
                    @change="maxSalaryChange"
                    clearable
                  >
                  </el-input>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row class="condition condition-six">
          <!-- <el-col :span="2">
            <div class="place-holder">placeHolder</div>
          </el-col> -->
          <el-col :span="21" style="padding-left:40px;">
            <div class="grid-content bg-purple filter-select">
              <template>
                <el-checkbox
                  false-label="0"
                  true-label="1"
                  v-model="queryParams.agencyRecruit"
                  >中介代招</el-checkbox
                >
                <el-checkbox
                  false-label="0"
                  true-label="1"
                  v-model="queryParams.tranBaseSymbol"
                  >就业公共服务机构代理招聘</el-checkbox
                >
                <!-- <el-checkbox
                  false-label="0"
                  true-label="1"
                  v-model="queryParams.special"
                  >招聘特定人群</el-checkbox
                > -->
                <el-select
                  v-model="queryParams.special"
                  clearable
                  placeholder="招聘特定人群"
                  class="min-size-select"
                >
                  <el-option
                    v-for="(item, index) in tpOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>

                <el-select
                  v-model="queryParams.eduRequire"
                  clearable
                  placeholder="学历要求"
                  class="min-size-select"
                >
                  <el-option
                    v-for="(item, index) in xlOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="queryParams.workArea"
                  clearable
                  placeholder="工作区域"
                  class="min-size-select"
                >
                  <el-option
                    v-for="(item, index) in qxOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="queryParams.workHour"
                  clearable
                  placeholder="工作班时"
                  class="min-size-select"
                >
                  <el-option
                    v-for="(item, index) in bsOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </div>
          </el-col>
          <el-col :span="3">
            <div
              class="grid-content bg-purple more-ico clear-ico"
              @click="clearQueryParams"
            >
              <i class="el-icon-delete"></i>
              <span>清空筛选条件</span>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- E 筛选部分 -->
    <!-- 查询结果 -->
    <el-tabs id="jobInfoGloriette" v-model="activeName">
      <el-tab-pane :label="defaultJobsCount" name="default">
        <per-search-job
          v-if="queryDefaultResult.length"
          ref="searchDefaultJobList"
          :jobData="queryDefaultResult"
          :total="queryDefaultResultTotal"
          showPager
          callBackFuncName="queryDefaultJobs"
          @deliveryResume="deliveryResume(arguments)"
          @favorJob="favorJob(arguments)"
          @showJobDetials="showJobDetial(arguments)"
          @callPositionCorp="callPositionCorp(arguments)"
        ></per-search-job>
        <div v-else style="text-align:center;margin-top:100px;color:#999;">
          暂时没有推荐职位信息
        </div>
        <!-- <BaseLoadingSvg ></BaseLoadingSvg> -->
      </el-tab-pane>
      <el-tab-pane label="自行检索" name="search">
        <per-search-job
          v-if="queryResult.length"
          ref="searchJobList"
          :jobData="queryResult"
          :total="queryResultTotal"
          showPager
          @deliveryResume="deliveryResume(arguments)"
          @favorJob="favorJob(arguments)"
          @showJobDetials="showJobDetial(arguments)"
          @callPositionCorp="callPositionCorp(arguments)"
        ></per-search-job>
        <BaseLoadingSvg v-else></BaseLoadingSvg>
      </el-tab-pane>
    </el-tabs>
    <!-- 职位详细信息 弹窗部分 -->
    <el-dialog
      width="75%"
      v-if="detailsDialog"
      :visible.sync="detailsDialog"
      :before-close="detailsHandleClose"
    >
      <job-details
        :positionData="onePosition"
        :index="detailsIndex"
        @perfectResume="perfectResume"
        @uploadResume="uploadResume"
        @deliveryResume="deliveryResume(arguments)"
        @favorJob="favorJob(arguments)"
        @callPositionCorp="callPositionCorp(arguments)"
      ></job-details>
    </el-dialog>
    <!-- 聊天框 弹窗部分 -->
    <el-dialog
      v-if="wchatDialog"
      class="width75 dialog-content-full-screen"
      :visible.sync="wchatDialog"
      :before-close="wchatHandleClose"
    >
      <pl-wchat :targetObjId="targetObjId" :sysmData="sysmData"></pl-wchat>
    </el-dialog>
  </div>
</template>
<script>
import BaseSearch from '@/components/common/BaseSearch.vue';
import PerSearchJob from '@/components/person/PerSearchJob.vue';
import JobDetails from '@/views/person/jobDetails.vue';
import BaseLoadingSvg from '@/components/common/svg/BaseLoadingSvg.vue';
import { getDicText, niceScrollUpdate } from '@/utils';
import {
  queryJobs,
  queryRecommendJobs,
  doDeliveryResume,
  doDeliveryResumeRecommend,
  attentionOrFavor
} from '@/api/personApi';
export default {
  name: 'JobSearch',
  components: {
    BaseSearch,
    PerSearchJob,
    JobDetails,
    BaseLoadingSvg
  },
  data() {
    return {
      activeName: 'default',
      detailsIndex: null,
      detailsDialog: false,
      wchatDialog: false,
      positionDetailsId: '',
      positionDetailsRecId: '',
      queryParams: {
        pid: this.$store.getters['person/pid'],
        age: '',
        industry: [''],
        positionTypeList: [''],
        workNature: '',
        workYearNeed: '',
        workArea: '',
        eduRequire: '',
        //recruitNum: '3',
        tranBaseSymbol: '0',
        special: '',
        agencyRecruit: '0',
        salaryMin: '',
        salaryMax: '',
        ageMin: '',
        ageMax: '',
        workHour: '',
        positionName: '',
        corpName: ''

        // pid: '1',
        // tranBaseSymbol: '0',
        // agencyRecruit: '0',
        // workNature: '1 ',
        // ageMax: '35',
        // ageMin: '18',
        // workArea: '06',
        // workYearNeed: '05',
        // eduRequire: '08',
        // salaryMax: '20000',
        // salaryMin: '6000',
        // special: '0',
        //corpName: '上海新移力自动化科技有限公司'
        //workHour: '01',
        //positionTypeList: '0201',

        // salaryPayType: '04',
        // recruitType: '1',
      },
      options: [],
      tableData: [],
      queryResult: [],
      queryResultTotal: 0,
      queryDefaultResult: [],
      queryDefaultResultTotal: 0,
      hyLists: this.$store.getters['dictionary/recruit_industry_type'],
      zyLists: this.$store.getters['dictionary/recruit_position_f_type'],
      qxOptions: this.$store.getters['dictionary/ggjbxx_qx'],
      tpOptions: this.$store.getters['dictionary/recruit_special_people'],
      xlOptions: this.$store.getters['dictionary/recruit_edu'],
      wtOptions: this.$store.getters['dictionary/yesno'],
      zyOptions: this.$store.getters['dictionary/recruit_position_f_type'],
      bsOptions: this.$store.getters['dictionary/recruit_work_hour'],
      gznxLists: this.$store.getters['dictionary/recruit_work_year'],
      gzxzLists: this.$store.getters['dictionary/recruit_work_nature'],
      jobList: [],
      targetObjId: '',
      onePosition: {},
      sysmData: {}
    };
  },
  computed: {
    defaultJobsCount() {
      return this.queryDefaultResultTotal
        ? '管理员推荐（' + this.queryDefaultResultTotal + '）'
        : '管理员推荐';
    },
    zyListsTwo() {
      let _data = this.$store.getters['dictionary/recruit_position_s_type'];
      if (_data && _data.length) {
        return Object.values(
          _data.reduce((res, item) => {
            let _code = '' + Number(item.value.substring(0, 2));
            res[_code] ? res[_code].push(item) : (res[_code] = [item]);
            return res;
          }, {})
        );
      }
      return [];
    }
    // onePosition() {
    //   let that = this;
    //   if (this.activeName === 'search') {
    //     //系统搜索职位
    //     return this.positionDetailsId
    //       ? this.queryResult.find(function(i) {
    //           return i.positionId === that.positionDetailsId;
    //         })
    //       : {};
    //   } else {
    //     //推荐职位
    //     return this.positionDetailsRecId
    //       ? this.queryDefaultResult.find(function(i) {
    //           return i.recId === that.positionDetailsRecId;
    //         })
    //       : {};
    //   }
    // }
  },
  watch: {
    'queryParams.positionTypeList': function(val, oldVal) {
      //节流，防止数据短时间多次变动照成样式渲染过多而浪费性能
      this._.throttle(() => {
        //监听选中的选项-修改样式
        if (val && val.length) {
          $('.show-popover-button').css({
            backgroundColor: '#fff',
            color: '#606266'
          });
          val.forEach(item => {
            let styleIndex = Number(item.substring(0, 2)) - 1 + '';
            $('.show-popover-button[btnIndex="' + styleIndex + '"]').css({
              backgroundColor: '#fff1ec',
              color: '#fc6f3d'
            });
          });
        }
      }, 500)();
    },
    positionDetailsId: function(val, oldVal) {
      let that = this;
      if (this.activeName === 'search') {
        //自行搜索职位
        this.onePosition = that.positionDetailsId
          ? this.queryResult.find(function(i) {
              return i.positionId === that.positionDetailsId;
            })
          : {};
      } else {
        this.onePosition = that.positionDetailsRecId
          ? this.queryDefaultResult.find(function(i) {
              return i.recId === that.positionDetailsRecId;
            })
          : {};
      }
    }
  },
  created() {
    this.queryJobs();
    this.queryDefaultJobs();
  },
  updated() {
    console.log(1234);
    // 更新滚动条
    this._.throttle(niceScrollUpdate, 500)();
  },
  methods: {
    minSalaryChange() {
      if (!this.queryParams.salaryMin) {
        return;
      }
      if (isNaN(Number(this.queryParams.salaryMin))) {
        this.$alert('请输入数字');
        this.queryParams.salaryMin = '';
      } else if (
        this.queryParams.salaryMax &&
        this.queryParams.salaryMin > this.queryParams.salaryMax
      ) {
        this.$alert('薪酬下限不得低于薪酬上限');
        this.queryParams.salaryMin = '';
      } else if (
        this.queryParams.salaryMax &&
        this.queryParams.salaryMin * 3 < this.queryParams.salaryMax
      ) {
        this.$alert('薪酬上限不得超过薪酬下限的三倍');
        this.queryParams.salaryMax = '';
      }
    },
    maxSalaryChange() {
      if (!this.queryParams.salaryMax) {
        return;
      }
      if (isNaN(Number(this.queryParams.salaryMax))) {
        this.$alert('请输入数字');
        this.queryParams.salaryMax = '';
      } else if (
        this.queryParams.salaryMin &&
        this.queryParams.salaryMin > this.queryParams.salaryMax
      ) {
        this.$alert('薪酬上限不得高于薪酬下限');
        this.queryParams.salaryMin = '';
      } else if (
        this.queryParams.salaryMin &&
        this.queryParams.salaryMin * 3 < this.queryParams.salaryMax
      ) {
        this.$alert('薪酬上限不得超过薪酬下限的三倍');
        this.queryParams.salaryMax = '';
      }
    },
    minAgeChange() {
      if (!this.queryParams.ageMin) {
        return;
      }
      if (this.queryParams.ageMin && isNaN(Number(this.queryParams.ageMin))) {
        this.$alert('请输入数字');
        this.queryParams.ageMin = '';
      } else if (this.queryParams.ageMin < 16) {
        this.$alert('年龄下限不得低于16周岁');
        this.queryParams.ageMin = '';
      } else if (this.queryParams.ageMin > 60) {
        this.$alert('年龄下限不得超过60周岁');
        this.queryParams.ageMin = '';
      }
    },
    maxAgeChange() {
      if (!this.queryParams.ageMax) {
        return;
      }
      if (this.queryParams.ageMax && isNaN(Number(this.queryParams.ageMax))) {
        this.$alert('请输入数字');
        this.queryParams.ageMax = '';
      } else if (this.queryParams.ageMax < 16) {
        this.$alert('年龄上限不得低于16周岁');
        this.queryParams.ageMax = '';
      } else if (this.queryParams.ageMax > 60) {
        this.$alert('年龄下限不得超过60周岁');
        this.queryParams.ageMax = '';
      } else if (
        this.queryParams.ageMin &&
        this.queryParams.ageMin * 3 < this.queryParams.ageMax
      ) {
        this.$alert('年龄上限不得超过年龄下限的三倍');
        this.queryParams.ageMax = '';
      }
    },
    clearQueryParams: function() {
      Object.keys(this.queryParams).forEach(
        key => (this.queryParams[key] = '')
      );
      this.queryParams.tranBaseSymbol = '0';
      this.queryParams.agencyRecruit = '0';
      this.queryParams.industry = [''];
      this.queryParams.positionTypeList = [''];
      //this.queryParams.workNature = '';
      //this.queryParams.workYearNeed = '';
    },
    /**
     * 根据条件查询职位
     */
    async queryJobs(val) {
      let that = this;
      let params = this.$refs['queryJobForm']?.model
        ? JSON.parse(JSON.stringify(this.$refs['queryJobForm'].model))
        : this.queryParams;
      params.positionName = $.trim(val);
      that.queryParams.positionName = $.trim(val);
      params.pageParam = {
        total: 0,
        pageSize: that.$refs.searchJobList?.pageSize || 10,
        pageIndex: that.$refs.searchJobList?.currentPage - 1 || 0
      };
      try {
        this.activeName = 'search';
        params.pid = that.$store.getters['person/pid'];
        let result = await queryJobs(params);
        console.log('result', result);
        if (
          result.status === 200 &&
          result.result.pageresult &&
          result.result.pageresult.total
        ) {
          result.result.pageresult.data.forEach(item => {
            // 转换字典
            if (item.workArea) {
              item.workAreaText = getDicText(
                that.$store.getters['dictionary/ggjbxx_qx'],
                item.workArea
              );
            }
            if (item.eduRequire) {
              item.eduRequireText = getDicText(
                that.$store.getters['dictionary/recruit_edu'],
                item.eduRequire
              );
            }
            if (item.workNature) {
              item.workNatureText = getDicText(
                that.$store.getters['dictionary/recruit_work_nature'],
                item.workNature
              );
            }
            if (item.corpNature) {
              item.corpNatureText = getDicText(
                that.$store.getters['dictionary/recruit_corp_nature'],
                item.corpNature
              );
            }
            if (item.industryType) {
              item.industryTypeText = getDicText(
                that.$store.getters['dictionary/recruit_industry_type'],
                item.industryType
              );
            }
            if (item.workYearNeed) {
              item.workYearNeedText = getDicText(
                that.$store.getters['dictionary/recruit_work_year'],
                item.workYearNeed
              );
            }
            if (item.salaryPayType) {
              item.salaryPayTypeText =
                '元/' +
                getDicText(
                  that.$store.getters['dictionary/recruit_salary_pay_type'],
                  item.salaryPayType
                );
            }
          });
          this.$set(this, 'queryResult', result.result.pageresult.data);
          this.$set(
            this,
            'queryResultTotal',
            Number(result.result.pageresult.total) || 0
          );
        } else {
          this.$set(this, 'queryResult', []);
          this.$set(this, 'queryResultTotal', 0);
          this.$message({
            type: 'success',
            message: '未查询到信息'
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * 查询系统默认推荐的职位
     */
    async queryDefaultJobs(val) {
      let that = this;
      try {
        this.activeName = 'default';
        let result = await queryRecommendJobs({
          pid: that.$store.getters['person/pid'],
          pageParam: {
            pageSize: that.$refs.searchDefaultJobList?.pageSize || 10,
            pageIndex: that.$refs.searchDefaultJobList?.currentPage - 1 || 0
          }
        });
        console.log('defaultResult', result);
        if (
          result.status === 200 &&
          result.result.pageresult &&
          result.result.pageresult.total
        ) {
          result.result.pageresult.data.forEach(item => {
            // 转换字典
            if (item.workArea) {
              item.workAreaText = getDicText(
                that.$store.getters['dictionary/ggjbxx_qx'],
                item.workArea
              );
            }
            if (item.eduRequire) {
              item.eduRequireText = getDicText(
                that.$store.getters['dictionary/recruit_edu'],
                item.eduRequire
              );
            }
            if (item.workNature) {
              item.workNatureText = getDicText(
                that.$store.getters['dictionary/recruit_work_nature'],
                item.workNature
              );
            }
            if (item.corpNature) {
              item.corpNatureText = getDicText(
                that.$store.getters['dictionary/recruit_corp_nature'],
                item.corpNature
              );
            }
            if (item.industryType) {
              item.industryTypeText = getDicText(
                that.$store.getters['dictionary/recruit_industry_type'],
                item.industryType
              );
            }
            if (item.workYearNeed) {
              item.workYearNeedText = getDicText(
                that.$store.getters['dictionary/recruit_work_year'],
                item.workYearNeed
              );
            }
            if (item.salaryPayType) {
              item.salaryPayTypeText =
                '元/' +
                getDicText(
                  that.$store.getters['dictionary/recruit_salary_pay_type'],
                  item.salaryPayType
                );
            }
          });
          this.$set(this, 'queryDefaultResult', result.result.pageresult.data);
          this.$set(
            this,
            'queryDefaultResultTotal',
            Number(result.result.pageresult.total) || 0
          );
        } else {
          this.activeName = 'search';
          this.$set(this, 'queryDefaultResult', []);
          this.$set(this, 'queryDefaultResultTotal', 0);
          // this.$message({
          //   type: 'success',
          //   message: '未查询到信息'
          // });
        }
      } catch (error) {
        console.log(error);
      }
    },
    showMoreRadios(event, radiosIndex) {
      let dom = $('#' + radiosIndex);
      let $this = $(event.target);
      if (dom && dom.hasClass('radio-list-bar-more')) {
        dom.removeClass('radio-list-bar-more');
        $this
          .siblings('.el-icon-caret-bottom')
          .css('transform', 'rotate(0deg)');
      } else {
        dom.addClass('radio-list-bar-more');
        $this
          .siblings('.el-icon-caret-bottom')
          .css('transform', 'rotate(180deg)');
      }
      // 更新滚动条
      this._.throttle(niceScrollUpdate, 500)();
    },
    showJobDetial(arg) {
      console.log(arg);
      //显示岗位详细信息
      let index = arg[0];
      let positionId = (arg && arg[1]) || '';
      let recId = (arg && arg[2]) || '';
      this.detailsIndex = index;
      this.detailsDialog = true;
      this.positionDetailsId = positionId;
      this.positionDetailsRecId = recId;
    },
    async deliveryResume(arg) {
      let index = arg[0];
      let positionId = (arg && arg[1]) || '';
      let recId = (arg && arg[2]) || '';
      if (!recId) {
        //向自己搜索的职位投递简历
        let res = await doDeliveryResume({
          positionId: positionId,
          pid: this.$store.getters['person/pid']
        });
        if (res.status === 200) {
          // 更换按钮
          // this.queryResult.splice(index, 1);
          this.queryResult[index].applyFor = true;
          this.$message({ type: 'success', message: '简历投递成功' });
        } else {
          this.$message({
            type: 'error',
            message: '简历投递失败'
          });
        }
      } else {
        //向推荐职位投递简历
        let res = await doDeliveryResumeRecommend({
          recId: recId,
          positionId: positionId,
          pid: this.$store.getters['person/pid']
        });
        if (res.status === 200) {
          // 更换按钮
          // this.queryResult.splice(index, 1);
          this.queryDefaultResult[index].applyFor = true;
          this.$message({ type: 'success', message: '简历投递成功' });
        } else {
          this.$message({
            type: 'error',
            message: '简历投递失败'
          });
        }
      }
    },
    async favorJob(arg) {
      let index = arg[0];
      let positionId = (arg && arg[1]) || '';
      let orginFavorType = arg[2];
      let recId = arg[3] || '';
      if (!orginFavorType) {
        let res = await attentionOrFavor('2', {
          id: [positionId],
          pid: this.$store.getters['person/pid'],
          status: true
        });
        if (res.status === 200) {
          // 修改按钮状态
          if (!recId) {
            this.queryResult[index].favor = true;
          } else {
            this.queryDefaultResult[index].favor = true;
          }
          this.$message({ type: 'success', message: '收藏职位成功' });
        } else {
          this.$message({ type: 'error', message: '收藏职位失败' });
        }
      } else {
        //取消收藏职位
        let res = await attentionOrFavor('2', {
          id: [positionId],
          pid: this.$store.getters['person/pid'],
          status: false
        });
        if (res.status === 200) {
          // 修改按钮状态
          if (!recId) {
            this.queryResult[index].favor = false;
          } else {
            this.queryDefaultResult[index].favor = false;
          }
          this.$message({ type: 'success', message: '取消收藏职位成功' });
        } else {
          this.$message({ type: 'error', message: '取消收藏职位失败' });
        }
      }
    },
    /**
     * 和职位所属单位进行聊天
     */
    callPositionCorp(arg) {
      let index = arg[0];
      let corpId = (arg && arg[1]) || '';
      let positionId = (arg && arg[2]) || '';
      let positionName = (arg && arg[3]) || '';
      this.targetObjId = corpId;
      (this.sysmData = {
        type: 'position',
        positionId: positionId,
        positionName: positionName
      }),
        (this.wchatDialog = true);
    },
    detailsHandleClose() {
      this.detailsDialog = false;
    },
    wchatHandleClose() {
      this.wchatDialog = false;
    },
    industryGroupChange(newVal) {
      if (newVal && newVal.length && newVal[newVal.length - 1] === '') {
        this.queryParams.industry = [''];
      } else if (newVal && newVal.length > 1 && newVal.includes('')) {
        this.queryParams.industry = newVal.filter(item => item !== '');
      }
    },
    positionGroupChange(val) {
      let newVal = val;
      if (newVal && newVal.length && newVal[newVal.length - 1] === '') {
        this.queryParams.positionTypeList = [''];
      } else if (newVal && newVal.length && newVal.length > 10) {
        this.$alert('最多只可选择10种职位');
        newVal.pop();
        this.queryParams.positionTypeList = newVal;
      } else if (newVal && newVal.length > 1 && newVal.includes('')) {
        this.queryParams.positionTypeList = newVal.filter(item => item !== '');
      } else if (!newVal.length) {
        this.queryParams.positionTypeList = [''];
      }
    },
    perfectResume() {
      //完善简历
      this.$router.push('/personInfo');
    },
    uploadResume() {
      //上传简历
      this.$alert('此功能暂时未开放，请稍候！');
    }
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
  background-color: $g-white-color;
  .more-btn {
    margin: 20px auto;
    padding-left: 50px;
    padding-right: 50px;
    color: #fc6f3d;
    border: 1px solid #fc6f3d;
    display: block;
  }

  .radio-list-bar {
    overflow: hidden;
    max-height: 52px;
    transition: height 0.5s;
    -webkit-transition: max-height 0.5s;
    ::v-deep .el-checkbox-button__inner {
      border: 0 !important;
      padding: 10px 20px !important;
      border-radius: 0 !important;
    }
  }
  .radio-list-bar-more {
    max-height: 416px !important;
  }
  .el-checkbox-button {
    margin: 10px 0;
  }
}

.filter-content {
  margin-bottom: 20px;
  ::v-deep .el-radio-button__inner {
    border: 0;
  }
  ::v-deep .el-input__inner {
    border: 0;
    //width: 100px !important;
    color: rgba(0, 0, 0, 0.8);
    text-align: center;
  }
  .condition {
    background-color: #fff;
  }
  .condition-one {
    z-index: 10;
  }
  .condition-two {
    z-index: 20;
  }
  .condition-three {
    z-index: 30;
  }
  .condition-four {
    z-index: 40;
  }
  .condition-five {
    z-index: 50;
    .horizontalLine {
      text-align: center;
    }
    ::v-deep #minAge,
    ::v-deep #maxAge,
    ::v-deep #minSalary,
    ::v-deep #maxSalary {
      border: 1px solid #eeeeee;
      width: 100% !important;
    }
  }
  .condition-six {
    z-index: 60;
  }
  .place-holder {
    visibility: hidden;
  }
  .el-row {
    border-bottom: 1px solid #eeeeee;
  }
  .el-radio-group {
    line-height: 52px;
    //text-align: center;
    ::v-deep .el-radio-button__inner {
      border-radius: 0;
    }
  }
  .bg-purple {
    line-height: 52px;
    text-align: center;
  }
  .filter-select {
    text-align: left;
    .min-size-select {
      width: 150px !important;
    }
  }
  .more-ico:hover {
    span,
    i {
      color: #fc6f3d;
      cursor: pointer;
    }
  }
  .more-ico {
    color: #999;
  }
  .clear-ico {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  #postionsAll {
    top: -5px;
  }
  .show-popover-button {
    border: 0;
    border-radius: 0;
    padding: 10px 20px;
    margin: 10px 0;
  }
}
</style>

<style lang="scss">
.position-popover {
  background-color: #fafafa;
  border: 1px solid #fc6f3d;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.32), 0 0 6px rgba(0, 0, 0, 0.04);
  .el-checkbox-button__inner {
    border: 0;
    background-color: #fafafa;
  }
  .popper__arrow::after {
    border-bottom-color: #fc6f3d !important;
  }
  .el-checkbox-button:first-child .el-checkbox-button__inner {
    border-left: 0;
  }
}
</style>
