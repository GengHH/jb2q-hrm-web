<template>
  <div id="indexBody">
    <BaseSearch @clickButton="queryJobs($event)"></BaseSearch>
    <!-- S demo2筛选部分 -->
    <div id="demo2">
      <div class="filter-content" :ref="queryJobFrom">
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">工作年限：</div>
          </el-col>
          <el-col :span="22">
            <el-radio-group v-model="workYearNeed" size="medium">
              <el-radio-button label="不限">不限</el-radio-button>
              <el-radio-button label="1">1年以下</el-radio-button>
              <el-radio-button label="2">1~2年</el-radio-button>
              <el-radio-button label="3">3~5年</el-radio-button>
              <el-radio-button label="4">6~9年</el-radio-button>
              <el-radio-button label="5">10年及以上</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">职位：</div>
          </el-col>
          <el-col :span="20">
            <el-radio-group v-model="positionName" size="medium">
              <el-radio-button label="不限">不限</el-radio-button>
              <el-radio-button label="销售/客服/技术支持"
                >居民服务和其他服务业</el-radio-button
              >
              <el-radio-button label="会计/金融/银行/保险"
                >水利、环境和公共设施管理业</el-radio-button
              >
              <el-radio-button label="生产/营运/采购/物流"
                >科学研究、技术服务和地质勘查业</el-radio-button
              >
              <el-radio-button label="生物/制药/医疗/护理"
                >租赁和商务服务业</el-radio-button
              >
              <el-radio-button label="广告/市场/媒体/艺术">不</el-radio-button>
              <el-radio-button label="建筑/房地产"
                >科学研究、技术服务和地质勘查业</el-radio-button
              >
            </el-radio-group>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple more-ico">
              <span>更多</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">薪酬:</div>
          </el-col>
          <el-col :span="20">
            <el-radio-group v-model="salaryScope" size="medium">
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
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">工作性质:</div>
          </el-col>
          <el-col :span="20">
            <el-radio-group v-model="workNature" size="medium">
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
        <el-row>
          <el-col :span="2">
            <div class="place-holder">placeHolder</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple filter-select">
              <template>
                <el-radio v-model="radio1" label="1">中介待招</el-radio>
                <el-radio v-model="radio2" label="1"
                  >就业公共服务机构代理招聘</el-radio
                >
                <el-radio v-model="radio3" label="1">招聘特定人群</el-radio>
                <el-select v-model="wt" clearable placeholder="委托待招单位">
                  <el-option
                    v-for="item in wtOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select v-model="nl" clearable placeholder="年龄">
                  <el-option
                    v-for="item in nlOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select v-model="workArea" clearable placeholder="工作区域">
                  <el-option
                    v-for="item in qxOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="eduRequire"
                  clearable
                  placeholder="学历要求"
                >
                  <el-option
                    v-for="item in xl"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select v-model="xl" clearable placeholder="学历要求">
                  <el-option
                    v-for="item in xlOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select v-model="zy" clearable placeholder="工作班时">
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
      </div>
    </div>
    <!-- E demo2筛选部分 -->
    <!-- 查询结果 -->
    <per-search-job></per-search-job>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch.vue';
import PerSearchJob from '@/components/person/PerSearchJob.vue';
import { queryJobs } from '@/api/personApi';
export default {
  name: 'JobSearch',
  components: {
    BaseSearch,
    PerSearchJob
  },
  data() {
    return {
      radio1: '',
      radio2: '',
      radio3: '',
      zy: '',
      nl: '',
      wt: '',
      xl: '',
      positionId: '4',
      positionName: '销售/客服/技术支持',
      salaryScope: '不限',
      workArea: '',
      workNature: '',
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
      salaryDown: '',
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
      result: [],
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
  methods: {
    clearQueryParams: function() {},
    async queryJobs(val) {
      // content
      this.$alert(val);
      try {
        let result = await queryJobs({ pid: '201906186258910' });
        console.log('result', result);
        if (result.status === 200)
          this.$set(this, 'result', result.result.data);
      } catch (error) {
        console.log(error);
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
  .more-btn {
    margin: 20px auto;
    padding-left: 50px;
    padding-right: 50px;
    color: #fc6f3d;
    border: 1px solid #fc6f3d;
    display: block;
  }

  #demo2 {
    ::v-deep .el-radio-button__inner {
      border: 0;
    }
    ::v-deep .el-input__inner {
      border: 0;
      width: 100px !important;
      color: rgba(0, 0, 0, 0.8);
      text-align: center;
    }

    .filter-content {
      .place-holder {
        visibility: hidden;
      }
      .el-row {
        border-bottom: 1px solid #eeeeee;
      }
      .el-radio-group {
        line-height: 52px;
        text-align: center;
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
    }
  }
}
</style>
