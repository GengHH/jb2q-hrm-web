<!--
 * @Author: GengHH
 * @Date: 2020-12-16 10:35:59
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-24 17:50:19
 * @Description: 单位模块的简历搜索
 * @FilePath: \jb2q-hrm-web\src\views\corporation\resumeSearch\index.vue
-->
<template>
  <div id="indexBody">
    <el-row>
      <el-col :span="16">
        <BaseSearch @clickButton="queryResumes($event)"></BaseSearch>
      </el-col>
      <el-col :span="4" class="search-tip">
        剩余的搜索次数<span class="orange font-20">52</span
        ><span class="orange">次</span>
      </el-col>
      <el-col :span="4" class="search-tip">
        剩余的简历查看份数<span class="orange font-20">126</span
        ><span class="orange">份</span>
      </el-col>
    </el-row>
    <!-- S demo2筛选部分 -->
    <div id="demo2">
      <div class="filter-content">
        <el-row class="condition condition-one">
          <el-col :span="2">
            <div class="grid-content bg-purple">职位：</div>
          </el-col>
          <el-col :span="20">
            <el-checkbox-group
              v-model="queryParams.industryList"
              size="medium"
              id="positionsRadios"
              class="radio-list-bar"
              @change="positionGroupChange"
            >
              <el-checkbox-button id="postionsAll" label=""
                >不限</el-checkbox-button
              >
              <el-popover
                v-for="(item, index) in zyLists"
                :key="item.value"
                placement="bottom"
                width="600"
                trigger="click"
                popper-class="position-popover"
              >
                <el-checkbox-button
                  v-for="idx in zyListsTwo[index]"
                  :key="idx.value"
                  :label="idx.value"
                  >{{ idx.label }}</el-checkbox-button
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
        <el-row class="condition condition-two">
          <el-col :span="2">
            <div class="grid-content bg-purple">行业：</div>
          </el-col>
          <el-col :span="20">
            <el-checkbox-group
              v-model="queryParams.industryList"
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
        <el-row class="condition condition-four">
          <el-col :span="2">
            <div class="grid-content bg-purple">薪酬：</div>
          </el-col>
          <el-col :span="22">
            <div class="grid-content bg-purple filter-select">
              <el-row>
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
                <el-col :span="15"></el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row class="condition condition-five">
          <el-col :span="2">
            <div class="grid-content bg-purple">其他选项：</div>
            <!-- <div class="place-holder">其他选项</div> -->
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple filter-select">
              <template>
                <el-select
                  v-model="queryParams.workArea"
                  clearable
                  placeholder="工作区域"
                >
                  <el-option
                    v-for="item in qxOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="queryParams.eduRequire"
                  clearable
                  placeholder="学历要求"
                >
                  <el-option
                    v-for="item in xlOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="queryParams.eduRequir"
                  clearable
                  placeholder="专业"
                >
                  <el-option
                    v-for="item in zyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="queryParams.languageType"
                  clearable
                  placeholder="外语语种"
                >
                  <el-option
                    v-for="item in wyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="queryParams.certName"
                  clearable
                  placeholder="技能证书"
                >
                  <el-option
                    v-for="item in zsOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple more-ico">
              <i class="el-icon-delete"></i>
              <span>清空筛选条件</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- E 筛选部分 -->
    <!-- 查询结果old -->
    <!-- <per-search-job
      v-if="queryResult.length"
      ref="searchResumeList"
      :jobData="queryResult"
      :total="queryResultTotal"
      showPager
      @deliveryResume="deliveryResume(arguments)"
      @favorJob="favorJob(arguments)"
      @showJobDetials="showJobDetial(arguments)"
      @callPositionCorp="callPositionCorp(arguments)"
    ></per-search-job>
    <BaseLoadingSvg v-else></BaseLoadingSvg> -->
    <!-- 职位详细信息 弹窗部分 -->
    <!-- <el-dialog
      width="75%"
      :visible.sync="detailsDialog"
      :before-close="handleClose"
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
    </el-dialog> -->
    <!-- old -->
    <!-- 查询结果new-->
    <CorpSearchResume
      v-if="queryResult.length"
      ref="searchResumeList"
      :jobData="queryResult"
      :total="queryResultTotal"
      showPager
      @deliveryResume="deliveryResume(arguments)"
      @favorResume="favorResume(arguments)"
      @showResumeDetials="showResumeDetials(arguments)"
      @callPositionCorp="callPositionCorp(arguments)"
    ></CorpSearchResume>
    <BaseLoadingSvg v-else></BaseLoadingSvg>
    <!-- 简历详细信息 弹窗部分 -->
    <el-dialog
      v-if="detailsDialog"
      width="75%"
      :visible.sync="detailsDialog"
      :before-close="handleClose"
    >
      <BaseResumeInfo :queryPid="queryPid"></BaseResumeInfo>
    </el-dialog>
    <!-- old -->
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch.vue';
// import PerSearchJob from '@/components/person/PerSearchJob.vue';
// import JobDetails from '@/views/person/jobSearch/jobDetails.vue';
import CorpSearchResume from '@/components/corporation/CorpSearchResume.vue';
import BaseResumeInfo from '@/components/common/BaseResumeInfo.vue';
import BaseLoadingSvg from '@/components/common/svg/BaseLoadingSvg.vue';
import { getDicText } from '@/utils';
import {
  queryJobs,
  doDeliveryResume
  // doFavorJobs,
  // doUnfavorJobs
} from '@/api/personApi';
import { queryResumeList } from '@/api/corporationApi';
export default {
  name: 'JobSearch',
  components: {
    BaseSearch,
    // PerSearchJob,
    // JobDetails,
    CorpSearchResume,
    BaseResumeInfo,
    BaseLoadingSvg
  },
  data() {
    return {
      detailsIndex: null,
      detailsDialog: false,
      wchatDialog: false,
      queryParams1: {
        // cid: this.$store.getters['corporation/cid'],
        // industry: [''],
        // positionTypeList: [''],
        // workNature: '',
        // //workYearNeed: '',
        // workArea: '',
        eduRequire: '',
        tranBaseSymbol: '0',
        // //special: '',
        agencyRecruit: '0',
        // salaryMin: '',
        // salaryMax: '',
        ageMin: '',
        ageMax: ''
        ////workHour: '',
        //content: '',
        ////corpName: '',
        // languageType: '',
        // certName: ''
      },
      queryParams: {
        cid: this.$store.getters['corporation/cid'],
        content: '',
        positionList: [''],
        industryList: [''],
        workNature: '',
        salaryMax: '',
        salaryMin: '',
        workArea: '',
        eduLevel: '',
        majorName: '',
        languageType: '',
        certName: '',

        ageMin: '',
        ageMax: ''
      },
      options: [],
      tableData: [],
      queryResult: [],
      queryResultTotal: 0,
      hyLists: this.$store.getters['dictionary/recruit_industry_type'],
      zyLists: this.$store.getters['dictionary/recruit_position_f_type'],
      qxOptions: this.$store.getters['dictionary/ggjbxx_qx'],
      // tpOptions: this.$store.getters['dictionary/recruit_special_people'],
      xlOptions: this.$store.getters['dictionary/recruit_edu'],
      //wtOptions: this.$store.getters['dictionary/yesno'],
      zyOptions: this.$store.getters['dictionary/recruit_position_f_type'],
      wyOptions: this.$store.getters['dictionary/recruit_language_type'],
      //bsOptions: this.$store.getters['dictionary/recruit_work_hour'],
      zsOptions: [],
      queryPid: '',
      resumeIdDetailsId: ''
    };
  },
  computed: {
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
    //   return this.positionDetailsId
    //     ? this.queryResult.find(function(i) {
    //         return i.positionId === that.positionDetailsId;
    //       })
    //     : {};
    // }
  },
  watch: {
    'queryParams.industryList': function(val, oldVal) {
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
    }
  },
  mounted() {
    this.queryResumes();
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
      //this.queryParams.tranBaseSymbol = '0';
      //this.queryParams.agencyRecruit = '0';
      this.queryParams.industryList = [''];
      // this.queryParams.industryList = [''];
      //this.queryParams.workNature = '';
      //this.queryParams.workYearNeed = '';
    },
    /**
     * 简历搜索
     */
    async queryResumes(val) {
      // if (!val) {
      //   this.$alert('请输入查询条件');
      //   return;
      // }
      let that = this;
      let params = this.$refs['queryJobFrom']?.model
        ? JSON.parse(JSON.stringify(this.$refs['queryJobFrom'].model))
        : this.queryParams;
      params.content = $.trim(val);
      that.queryParams.content = $.trim(val);
      params.pageParam = {
        total: 0,
        pageSize: that.$refs.searchResumeList?.pageSize || 10,
        pageIndex: that.$refs.searchResumeList?.currentPage - 1 || 0
      };
      try {
        params.cid = that.$store.getters['corporation/cid'];
        let result = await queryResumeList(params);
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
            // if (item.eduRequire) {
            //   item.eduRequireText = getDicText(
            //     that.$store.getters['dictionary/recruit_edu'],
            //     item.eduRequire
            //   );
            // }
            if (item.workNature) {
              item.workNatureText = getDicText(
                that.$store.getters['dictionary/recruit_work_nature'],
                item.workNature
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
    /**
     * 显示简历详情
     */
    showResumeDetials(arg) {
      let index = arg[0];
      let resumeId = (arg && arg[1]) || '';
      let queryPid = (arg && arg[2]) || '';
      this.detailsIndex = index;
      this.detailsDialog = true;
      this.resumeIdDetailsId = resumeId;
      //查询简历信息，并显示
      this.queryPid = queryPid;
      console.log(`queryPid:${queryPid}`);
    },
    /**
     * 投递简历 TODO (是不是换成邀请人员)
     */
    async deliveryResume(arg) {
      let index = arg[0];
      let positionId = (arg && arg[1]) || '';
      //投递简历
      let res = await doDeliveryResume({
        positionId: positionId,
        cid: this.$store.getters['corporation/cid']
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
    /**
     * 收藏简历 TODO
     */
    async favorResume(arg) {
      this.$alert('此功能暂未开放，请稍后');
      return;

      // let index = arg[0];
      // let positionId = (arg && arg[1]) || '';
      // let orginFavorType = arg[2];
      // if (!orginFavorType) {
      //   let res = await doFavorJobs('2', {
      //     id: positionId,
      //     cid: this.$store.getters['corporation/cid']
      //   });
      //   if (res.status === 200) {
      //     // 修改按钮状态
      //     this.queryResult[index].favor = true;
      //     this.$message({ type: 'success', message: '收藏职位成功' });
      //   } else {
      //     this.$message({ type: 'error', message: '收藏职位失败' });
      //   }
      // } else {
      //   //取消收藏职位
      //   let res = await doUnfavorJobs({
      //     id: positionId,
      //     cid: this.$store.getters['corporation/cid']
      //   });
      //   if (res.status === 200) {
      //     // 修改按钮状态
      //     this.queryResult[index].favor = false;
      //     this.$message({ type: 'success', message: '取消收藏职位成功' });
      //   } else {
      //     this.$message({ type: 'error', message: '取消收藏职位失败' });
      //   }
      // }
    },
    /**
     * 聊天 TODO
     */
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
        this.queryParams.industryList = [''];
      } else if (newVal && newVal.length > 1 && newVal.includes('')) {
        this.queryParams.industryList = newVal.filter(item => item !== '');
      }
    },
    positionGroupChange(val) {
      let newVal = val;
      if (newVal && newVal.length && newVal[newVal.length - 1] === '') {
        this.queryParams.industryList = [''];
      } else if (newVal && newVal.length && newVal.length > 10) {
        this.$alert('最多只可选择10种职位');
        newVal.pop();
        this.queryParams.industryList = newVal;
      } else if (newVal && newVal.length > 1 && newVal.includes('')) {
        this.queryParams.industryList = newVal.filter(item => item !== '');
      } else if (!newVal.length) {
        this.queryParams.industryList = [''];
      }
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
  .search-tip {
    line-height: 75px;
    text-align: center;
  }
  .orange {
    color: #fc6f3d;
  }
  .font-20 {
    color: #fc6f3d;
    font-size: 20px;
  }
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
