<template>
  <div id="indexBody">
    <base-search @clickButton="queryJobs($event)"></base-search>
    <!-- S筛选部分 -->
    <div class="filter-content">
      <el-form ref="queryJobFrom" :model="queryParams">
        <el-row class="condition condition-one">
          <el-col :span="2">
            <div class="grid-content bg-purple">工作年限：</div>
          </el-col>
          <el-col :span="22">
            <el-radio-group v-model="queryParams.workYearNeed" size="medium">
              <el-radio-button label="">不限</el-radio-button>
              <el-radio-button label="1">1年以下</el-radio-button>
              <el-radio-button label="2">1~2年</el-radio-button>
              <el-radio-button label="3">3~5年</el-radio-button>
              <el-radio-button label="4">6~9年</el-radio-button>
              <el-radio-button label="5">10年及以上</el-radio-button>
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
                v-for="index in hyLists"
                :key="index.value"
                :label="index.value"
                >{{ index.label }}</el-checkbox-button
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
              <el-checkbox-button label="">不限</el-checkbox-button>
              <el-checkbox-button
                v-for="index in zyLists"
                :key="index.value"
                :label="index.value"
                >{{ index.label }}</el-checkbox-button
              >
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
              <el-radio-button label="01">全职</el-radio-button>
              <el-radio-button label="02">兼职</el-radio-button>
              <el-radio-button label="03">就业见习</el-radio-button>
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
                    v-model="queryParams.ageMin"
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
                    v-model="queryParams.ageMax"
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
                    v-model="queryParams.salaryMin"
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
                    v-model="queryParams.salaryMax"
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
          <el-col :span="2">
            <div class="place-holder">placeHolder</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple filter-select">
              <template>
                <el-checkbox v-model="queryParams.agencyRecruit"
                  >中介待招</el-checkbox
                >
                <el-checkbox v-model="queryParams.tranBaseSymbol"
                  >就业公共服务机构代理招聘</el-checkbox
                >
                <el-checkbox v-model="queryParams.special"
                  >招聘特定人群</el-checkbox
                >
                <el-select
                  v-model="queryParams.eduRequire"
                  clearable
                  placeholder="学历要求"
                  class="min-size-select"
                >
                  <el-option
                    v-for="item in xlOptions"
                    :key="item.value"
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
                    v-for="item in qxOptions"
                    :key="item.value"
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
                    v-for="item in bsOptions"
                    :key="item.value"
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
    <per-search-job
      v-if="queryResult.length"
      :jobData="queryResult"
      showPager
      @deliveryResume="deliveryResume(arguments)"
      @favorJob="favorJob(arguments)"
      @showJobDetials="showJobDetial($event)"
      @callPositionCorp="callPositionCorp(arguments)"
    ></per-search-job>
    <BaseLoadingSvg v-else></BaseLoadingSvg>
    <!-- 职位详细信息 弹窗部分 -->
    <el-dialog
      width="75%"
      :visible.sync="detailsDialog"
      :before-close="handleClose"
    >
      <job-details
        :positionData="onePosition"
        @perfectResume="perfectResume"
        @uploadResume="uploadResume"
      ></job-details>
    </el-dialog>
    <!-- 聊天框 弹窗部分 -->
    <el-dialog
      class="width75 dialog-content-full-screen"
      :visible.sync="wchatDialog"
      :before-close="handleClose"
    >
      <pl-wchat></pl-wchat>
    </el-dialog>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch.vue';
import PerSearchJob from '@/components/person/PerSearchJob.vue';
import JobDetails from '@/views/person/jobSearch/jobDetails.vue';
import BaseLoadingSvg from '@/components/common/svg/BaseLoadingSvg.vue';
import { getDicText } from '@/utils';
import {
  queryJobs,
  doDeliveryResume,
  doFavorJobs,
  doUnfavorJobs
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
      detailsDialog: false,
      wchatDialog: false,
      positionDetailsId: '',
      queryParams: {
        pid: this.$store.getters['person/pid'],
        age: '',
        industry: [''],
        positionTypeList: [''],
        workNature: '',
        workYearNeed: '',
        workArea: '',
        eduRequire: '',
        recruitNum: '3',
        tranBaseSymbol: '0',
        special: '',
        agencyRecruit: '0',
        salaryMin: '',
        salaryMax: '',
        ageMin: '',
        ageMax: '',
        workHour: '',
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

        // positionName: '链家',
        // salaryPayType: '04',
        // recruitType: '1',
      },
      options: [],
      tableData: [],
      queryResult: [],
      hyLists: this.$store.getters['dictionary/recruit_industry_type'],
      zyLists: this.$store.getters['dictionary/recruit_position_s_type'],
      qxOptions: this.$store.getters['dictionary/ggjbxx_qx'],
      xlOptions: this.$store.getters['dictionary/recruit_edu'],
      wtOptions: this.$store.getters['dictionary/yesno'],
      zyOptions: this.$store.getters['dictionary/recruit_position_f_type'],
      bsOptions: this.$store.getters['dictionary/recruit_work_hour'],
      jobList: []
    };
  },
  computed: {
    onePosition() {
      let that = this;
      return this.positionDetailsId
        ? this.queryResult.find(function(i) {
            return i.positionId === that.positionDetailsId;
          })
        : {};
    }
  },
  methods: {
    minSalaryChange() {
      if (!this.queryParams.salaryMin) {
        return;
      }
      if (isNaN(Number(this.queryParams.salaryMin))) {
        this.$alert('请输入数值');
        this.queryParams.salaryMin = '';
      } else if (this.queryParams.salaryMin > this.queryParams.salaryMax) {
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
        this.$alert('请输入数值');
        this.queryParams.salaryMax = '';
      } else if (this.queryParams.salaryMin > this.queryParams.salaryMax) {
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
        this.$alert('请输入数值');
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
        this.$alert('请输入数值');
        this.queryParams.ageMax = '';
      } else if (this.queryParams.ageMax < 16) {
        this.$alert('年龄上线不得低于16周岁');
        this.queryParams.ageMax = '';
      } else if (this.queryParams.ageMax > 60) {
        this.$alert('年龄下线不得超过60周岁');
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
      this.queryParams.industry = [''];
      this.queryParams.positionTypeList = [''];
      this.queryParams.workNature = '';
      this.queryParams.workYearNeed = '';
    },
    async queryJobs(val) {
      console.log(this.$refs['queryJobFrom'].model);
      let that = this;
      let params = JSON.parse(JSON.stringify(this.$refs['queryJobFrom'].model));
      params.corpName = $.trim(val);
      try {
        let result = await queryJobs(params);
        console.log('result', result);
        if (result.status === 200) {
          result.result.data.forEach(item => {
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
          });
          this.$set(this, 'queryResult', result.result.data);
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
    },
    showJobDetial(positionId) {
      //显示岗位详细信息
      console.log(positionId);
      this.detailsDialog = true;
      this.positionDetailsId = positionId;
    },
    async deliveryResume(arg) {
      let index = arg[0];
      let positionId = (arg && arg[1]) || '';
      //投递简历
      let res = await doDeliveryResume({
        positionId: positionId,
        pid: this.$store.getters['person/pid']
      });
      if (res.status === 200) {
        // TODO 不显示本条数据
        this.queryResult.splice(index, 1);
        this.$message({ type: 'success', message: '简历投递成功' });
      } else {
        this.$message({
          type: 'error',
          message: '简历投递失败'
        });
      }
    },
    async favorJob(arg) {
      let index = arg[0];
      let positionId = (arg && arg[1]) || '';
      let orginType = arg[2];
      if (orginType === '0') {
        let res = await doFavorJobs('2', {
          id: positionId,
          pid: this.$store.getters['person/pid']
        });
        if (res.status === 200) {
          // 修改按钮状态
          this.queryResult[index].favor = true;
          this.$message({ type: 'success', message: '收藏职位成功' });
        } else {
          this.$message({ type: 'error', message: '收藏职位失败' });
        }
      } else {
        //取消收藏职位
        let res = await doUnfavorJobs({
          id: positionId,
          pid: this.$store.getters['person/pid']
        });
        if (res.status === 200) {
          // 修改按钮状态
          this.queryResult[index].favor = false;
          this.$message({ type: 'success', message: '取消收藏职位成功' });
        } else {
          this.$message({ type: 'error', message: '取消收藏职位失败' });
        }
      }
    },
    callPositionCorp(arg) {
      console.log(arg);
      //! TODO显示聊天框
      this.wchatDialog = true;
    },
    handleClose() {
      this.detailsDialog = false;
      this.wchatDialog = false;
    },
    industryGroupChange(newVal) {
      if (newVal && newVal.length && newVal[newVal.length - 1] === '') {
        this.queryParams.industry = [''];
      } else if (newVal && newVal.length > 1 && newVal.includes('')) {
        this.queryParams.industry = newVal.filter(item => item !== '');
      }
    },
    positionGroupChange(newVal) {
      if (newVal && newVal.length && newVal[newVal.length - 1] === '') {
        this.queryParams.positionTypeList = [''];
      } else if (newVal && newVal.length && newVal.length > 10) {
        this.$alert('最多只可选择10种职位');
        newVal.pop();
        this.queryParams.positionTypeList = newVal;
      } else if (newVal && newVal.length > 1 && newVal.includes('')) {
        this.queryParams.positionTypeList = newVal.filter(item => item !== '');
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
    ::v-deep #maxAge {
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
}
</style>
