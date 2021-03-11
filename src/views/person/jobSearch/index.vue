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
              <el-radio-button label="不限">不限</el-radio-button>
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
            <div class="grid-content bg-purple">职位：</div>
          </el-col>
          <el-col :span="20">
            <el-radio-group
              v-model="queryParams.positionName"
              size="medium"
              id="positionNameRadios"
              class="radio-list-bar"
            >
              <el-radio-button label="不限">不限</el-radio-button>
              <!-- <el-radio-button label="销售/客服/技术支持"
                >居民服务和其他服务业</el-radio-button
              >
              <el-radio-button label="会计/金融/银行/保险"
                >水利、环境和公共设施管理业</el-radio-button
              >
              <el-radio-button label="生产/营运/采购/物流">
                科学研究、技术服务和地质勘查业</el-radio-button
              >
              <el-radio-button label="生物/制药/医疗/护理"
                >租赁和商务服务业</el-radio-button
              >
              <el-radio-button label="广告/市场/媒体/艺术">不</el-radio-button>
              <el-radio-button label="建筑/房地产"
                >科学研究、技术服务和地质勘查业</el-radio-button
              > -->
              <el-radio-button
                v-for="index in zyLists"
                :key="index.value"
                :label="index.value"
                >{{ index.label }}</el-radio-button
              >
            </el-radio-group>
          </el-col>
          <el-col :span="2">
            <div
              class="grid-content bg-purple more-ico"
              @click="showMoreRadios($event, 'positionNameRadios')"
            >
              <span>更多</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </el-col>
        </el-row>
        <el-row class="condition condition-three">
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
          <!-- <el-col :span="2">
              <div class="grid-content bg-purple more-ico">
                <span>更多</span>
                <i class="el-icon-caret-bottom"></i>
              </div>
            </el-col> -->
        </el-row>
        <el-row class="condition condition-fore">
          <el-col :span="2">
            <div class="grid-content bg-purple">工作性质：</div>
          </el-col>
          <el-col :span="20">
            <el-radio-group v-model="queryParams.workNature" size="medium">
              <el-radio-button label="不限">不限</el-radio-button>
              <el-radio-button label="01">全职</el-radio-button>
              <el-radio-button label="02">兼职</el-radio-button>
              <el-radio-button label="03">就业见习</el-radio-button>
            </el-radio-group>
          </el-col>
          <!-- <el-col :span="2">
              <div class="grid-content bg-purple more-ico">
                <span>更多</span>
                <i class="el-icon-caret-bottom"></i>
              </div>
            </el-col> -->
        </el-row>
        <el-row class="condition condition-five">
          <el-col :span="2">
            <div class="place-holder">placeHolder</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple filter-select">
              <template>
                <!-- <el-radio v-model="queryParams.radio1" label="1"
                  >中介待招</el-radio
                >
                <el-radio v-model="queryParams.radio2" label="1"
                  >就业公共服务机构代理招聘</el-radio
                >
                <el-radio v-model="queryParams.radio3" label="1"
                  >招聘特定人群</el-radio
                > -->
                <el-checkbox v-model="queryParams.checked1"
                  >中介待招</el-checkbox
                >
                <el-checkbox v-model="queryParams.checked2"
                  >就业公共服务机构代理招聘</el-checkbox
                >
                <el-checkbox v-model="queryParams.checked3"
                  >招聘特定人群</el-checkbox
                >
                <el-select
                  v-model="queryParams.wt"
                  clearable
                  placeholder="委托待招单位"
                >
                  <el-option
                    v-for="item in wtOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="queryParams.nl"
                  clearable
                  placeholder="年龄"
                >
                  <el-option
                    v-for="item in nlOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
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
                    v-for="item in queryParams.xl"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="queryParams.xl"
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
                  v-model="queryParams.zy"
                  clearable
                  placeholder="工作班时"
                >
                  <el-option
                    v-for="item in zyOptions"
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
              class="grid-content bg-purple more-ico"
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
      :jobData="queryResult"
      @showJobDetials="showJobDetial($event)"
    ></per-search-job>
    <!-- 职位详细信息 弹窗部分 -->
    <el-dialog width="75%" :visible.sync="dialog" :before-close="handleClose">
      <job-details :positionData="onePosition"></job-details>
    </el-dialog>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch.vue';
import PerSearchJob from '@/components/person/PerSearchJob.vue';
import JobDetails from '@/views/person/jobSearch/jobDetails.vue';
import { queryJobs, doDeliveryResume } from '@/api/personApi';
export default {
  name: 'JobSearch',
  components: {
    BaseSearch,
    PerSearchJob,
    JobDetails
  },
  data() {
    return {
      dialog: false,
      positionDetailsId: '',
      queryParams: {
        checked1: '',
        checked2: '',
        checked3: '',
        zy: '',
        nl: '',
        wt: '',
        xl: '',
        positionId: '4',
        positionName: '不限',
        salaryScope: '不限',
        workArea: '',
        workNature: '不限',
        eduRequire: '',
        recruitNum: '3',
        corpName: '上海新移力自动化科技有限公司',
        cid: '201002025628331',
        workYearNeed: '不限',
        releaseTime: '2021-12-10 10:44:36',
        tranBaseSymbol: '0',
        agencyRecruit: '0',
        entrustCorpName: '',
        favor: '0',
        releaseUserId: '0000941012',
        type: '1',
        salaryUp: '',
        salaryDown: ''
      },
      options: [
        {
          label: '123',
          value: 'haha'
        }
      ],
      tableData: [
        {
          id: '1',
          name: '123'
        }
      ],
      queryResult: [],
      zyLists: this.$store.getters['dictionary/recruit_position_f_type'],
      nlOptions: [
        { value: '01', label: '20' },
        { value: '04', label: '21' },
        { value: '05', label: '22' },
        { value: '06', label: '23' },
        { value: '07', label: '24' },
        { value: '09', label: '25' },
        { value: '10', label: '26' },
        { value: '12', label: '27' },
        { value: '13', label: '28' }
      ],
      qxOptions: [
        { value: '01', label: '黄浦' },
        { value: '04', label: '徐汇' },
        { value: '05', label: '长宁' },
        { value: '06', label: '静安' },
        { value: '07', label: '普陀' },
        { value: '09', label: '虹口' },
        { value: '10', label: '杨浦' },
        { value: '12', label: '闵行' },
        { value: '13', label: '宝山' },
        { value: '14', label: '嘉定' },
        { value: '15', label: '浦东' },
        { value: '16', label: '金山' },
        { value: '17', label: '松江' },
        { value: '18', label: '青浦' },
        { value: '26', label: '奉贤' },
        { value: '30', label: '崇明' }
      ],
      xlOptions: [
        { value: '01', label: '初中及以下' },
        { value: '02', label: '高中' },
        { value: '03', label: '职高' },
        { value: '04', label: '技校' },
        { value: '05', label: '中专' },
        { value: '06', label: '大专' },
        { value: '07', label: '本科' },
        { value: '08', label: '硕士' },
        { value: '09', label: '博士及以上' }
      ],
      wtOptions: [
        { value: '0', label: '否' },
        { value: '1', label: '是' }
      ],
      xcOptions: [
        { value: '5000', label: '5000' },
        { value: '6000', label: '6000' },
        { value: '7000', label: '7000' },
        { value: '8000', label: '8000' },
        { value: '9000', label: '9000' },
        { value: '10000', label: '10000' },
        { value: '11000', label: '11000' },
        { value: '12000', label: '12000' },
        { value: '12000+', label: '12000以上' }
      ],
      zyOptions: [
        { value: '01', label: '计算机' },
        { value: '02', label: '土木工程' },
        { value: '03', label: '能源与动力' },
        { value: '04', label: '机械工程' },
        { value: '05', label: '生物医疗' },
        { value: '06', label: '材料科学' }
      ],
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
    clearQueryParams: function() {
      Object.keys(this.queryParams).forEach(
        key => (this.queryParams[key] = '')
      );
      this.queryParams.positionName = '不限';
      this.queryParams.salaryScope = '不限';
      this.queryParams.workNature = '不限';
      this.queryParams.workYearNeed = '不限';
    },
    async queryJobs(val) {
      console.log(this.$refs['queryJobFrom'].model);
      let params = JSON.parse(JSON.stringify(this.$refs['queryJobFrom'].model));
      params.content = $.trim(val);
      try {
        let result = await queryJobs(params);
        console.log('result', result);
        if (result.status === 200)
          this.$set(this, 'queryResult', result.result.data);
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
      this.dialog = true;
      this.positionDetailsId = positionId;
    },
    selectJob: function(positionId) {
      //投递简历
      let that = this;
      console.log(positionId + '功能暂未开放');
      doDeliveryResume({
        positionId: positionId,
        pid: this.$store.getters['person/pid']
      })
        .then(res => {
          if (res.status === 200) {
            // TODO 删除界面上的该职位
            that.$alert('简历投递成功');
          } else {
            that.$message({
              type: 'error',
              message: '简历投递失败'
            });
          }
        })
        .catch(err =>
          that.$$message({
            type: 'error',
            message: '系统异常，简历投递成功'
          })
        );
    },
    handleClose() {
      this.dialog = false;
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
    max-height: 52px;
    transition: height 0.5s;
    -webkit-transition: max-height 0.5s;
  }
  .radio-list-bar-more {
    max-height: 416px !important;
  }
}

.filter-content {
  ::v-deep .el-radio-button__inner {
    border: 0;
  }
  ::v-deep .el-input__inner {
    border: 0;
    width: 100px !important;
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
  .condition-fore {
    z-index: 40;
  }
  .condition-five {
    z-index: 50;
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
}
</style>
