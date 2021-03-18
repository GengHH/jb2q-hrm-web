<!--
 * @Author: GengHH
 * @Date: 2020-12-16 10:35:59
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-18 11:18:06
 * @Description: 单位模块的简历搜索
 * @FilePath: \jb2q-hrm-web\src\views\corporation\resumeSearch\index.vue
-->
<template>
  <div id="indexBody">
    <el-row>
      <el-col :span="16">
        <BaseSearch @clickButton="queryJobs($event)"></BaseSearch>
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
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">意向职位：</div>
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
            <div class="grid-content bg-purple">意向行业：</div>
          </el-col>
          <el-col :span="20">
            <!-- <el-form-item label="" required> -->
            <el-radio-group v-model="workIndustry" size="medium">
              <el-radio-button label="不限">不限</el-radio-button>
              <el-radio-button label="销售/客服/技术支持"
                >销售/客服/技术支持</el-radio-button
              >
              <el-radio-button label="会计/金融/银行/保险"
                >会计/金融/银行/保险</el-radio-button
              >
              <el-radio-button label="生产/营运/采购/物流"
                >生产/营运/采购/物流</el-radio-button
              >
              <el-radio-button label="生物/制药/医疗/护理"
                >生物/制药/医疗/护理</el-radio-button
              >
              <el-radio-button label="广告/市场/媒体/艺术"
                >广告/市场/媒体/艺术</el-radio-button
              >
              <el-radio-button label="建筑/房地产">建筑/房地产</el-radio-button>
            </el-radio-group>
            <!-- </el-form-item> -->
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
            <div class="grid-content bg-purple">工作性质：</div>
          </el-col>
          <el-col :span="22">
            <!-- <div class="grid-content bg-purple-light">
              <div class="radio-span">
                <span class="active-span">不限</span>
                <span>国有</span>
                <span>私营</span>
                <span>民营</span>
                <span>股份制</span>
              </div>
            </div> -->

            <el-radio-group v-model="workNature" size="medium">
              <el-radio-button label="不限">不限</el-radio-button>
              <el-radio-button label="销售/客服/技术支持">国有</el-radio-button>
              <el-radio-button label="会计/金融/银行/保险"
                >私营</el-radio-button
              >
              <el-radio-button label="生产/营运/采购/物流"
                >民营</el-radio-button
              >
              <el-radio-button label="生物/制药/医疗/护理"
                >股份制</el-radio-button
              >
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">其他选项:</div>
            <!-- <div class="place-holder">其他选项</div> -->
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple filter-select">
              <template>
                <el-select
                  v-model="salaryScope"
                  clearable
                  placeholder="意向薪酬"
                >
                  <el-option
                    v-for="item in xcOptions"
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
                    v-for="item in xlOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select v-model="recruitNum" clearable placeholder="学历">
                  <el-option
                    v-for="item in xlOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select v-model="zy" clearable placeholder="专业">
                  <el-option
                    v-for="item in zyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select v-model="yz" clearable placeholder="外语语种">
                  <el-option
                    v-for="item in zyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select v-model="zs" clearable placeholder="技能证书">
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
            <div class="grid-content bg-purple more-ico">
              <i class="el-icon-delete"></i>
              <span>清空筛选条件</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- E demo2筛选部分 -->
    <!-- 查询结果 -->
    <base-info-notification-card></base-info-notification-card>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch.vue';
import BaseInfoNotificationCard from '@/components/common/BaseInfoNotificationCard.vue';
import { queryJobs } from '@/api/personApi';
export default {
  name: 'JobSearch',
  components: {
    BaseSearch,
    BaseInfoNotificationCard
  },
  data() {
    return {
      positionId: '4',
      positionName: '不限',
      salaryScope: '',
      workArea: '',
      workIndustry: '不限',
      workNature: '不限',
      eduRequire: '',
      recruitNum: '',
      corpName: '上海新移力自动化科技有限公司',
      cid: '201002025628331',
      workYearNeed: '05',
      releaseTime: '2021-12-10 10:44:36',
      tranBaseSymbol: '0',
      agencyRecruit: '0',
      entrustCorpName: '',
      favor: '0',
      releaseUserId: '0000941012',
      type: '1',
      salaryUp: '',
      salaryDown: '',
      zy: '',
      zs: '',
      yz: '',
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
      ]
    };
  },
  methods: {
    async queryJobs(val) {
      // content
      this.$alert(val);
      try {
        // TODO 查询job列表
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
