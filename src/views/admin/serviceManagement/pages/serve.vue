<!--
 * @Author: your name
 * @Date: 2021-03-09 14:18:54
 * @LastEditTime: 2021-07-16 17:29:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\serve.vue
-->
<template>
  <div id="indexBody">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="职业指导" name="1">
        <div>
          <span>指导类型</span>
          <el-select
            size="mini"
            @change="selectClick"
            style="width:150px"
            v-model="guideType"
            placeholder="请选择"
          >
            <el-option label="政策咨询" value="01"> </el-option>
            <el-option label="专门指导" value="02"> </el-option>
          </el-select>
        </div>
        <ttable :options="{ height: '560px' }" :columns="columns" :list="list">
          <el-table-column slot="guideType" label="指导类型" align="center">
            <template slot-scope="scope">
              <template v-for="(v, k) in dicOptions.type">
                <div :key="k" v-if="v.value == scope.row.guideType">
                  {{ v.label }}
                </div>
              </template>
            </template>
          </el-table-column>
          <el-table-column slot="implementAct" label="实施举措" align="center">
            <template slot-scope="scope">
              <template v-for="(v, k) in dicOptions.act_type">
                <div :key="k" v-if="v.value == scope.row.implementAct">
                  {{ v.label }}
                </div>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            slot="consultComplete"
            label="是否已完成咨询指导"
            align="center"
          >
            <template slot-scope="scope">
              <template v-for="(v, k) in dicOptions.yesno">
                <el-tag :key="k" v-if="v.value == scope.row.consultComplete">
                  {{ v.label }}
                </el-tag>
              </template>
            </template>
          </el-table-column>
          <el-table-column slot="employ" label="是否就业" align="center">
            <template slot-scope="scope">
              <template v-for="(v, k) in dicOptions.yesno">
                <el-tag :key="k" v-if="v.value == scope.row.employ">
                  {{ v.label }}
                </el-tag>
              </template>
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange"
          @current-change="handleChange"
          :page-size="pageParam.pageSize"
          layout="total, prev, pager, next"
          :total="pageParam.total"
        >
        </el-pagination>
        <el-row>
          <el-col :span="24" style="text-align:right">
            <el-button @click="gotoRuter" type="primary">
              <i class="el-icon-plus"></i>
              增加职业指导预约
            </el-button>
            <el-button @click="gotoRuter" type="success">
              <i class="el-icon-plus"></i>
              增加职业指导记录
            </el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="职位推荐" name="2">
        <ttable
          :options="{ height: '560px' }"
          :columns="columns2"
          :list="list2"
        >
          <el-table-column
            slot="feedbackStatus"
            label="反馈状态"
            align="center"
          >
            <template slot-scope="scope">
              <template v-for="(v, k) in dicOptions.status">
                <el-tag :key="k" v-if="v.value == scope.row.feedbackStatus">
                  {{ v.label }}
                </el-tag>
              </template>
            </template>
          </el-table-column>
          <el-table-column slot="hire" label="通知录用时间" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.feedbackStatus == '04'">
                {{ scope.row.feedbackTime }}
              </template>
            </template>
          </el-table-column>
          <el-table-column slot="hireNo" label="通知不录用时间" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.feedbackStatus == '05'">
                {{ scope.row.feedbackTime }}
              </template>
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange2"
          @current-change="handleChange2"
          :page-size="pageParam2.pageSize"
          layout="total, prev, pager, next"
          :total="pageParam2.total"
        >
        </el-pagination>
        <el-row>
          <el-col :span="24" style="text-align:right">
            <el-button type="primary" @click="gotoRuter">
              <i class="el-icon-plus"></i>
              职位推荐
            </el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="职业培训" name="3">
        <ttable
          :options="{ height: '560px' }"
          :columns="columns3"
          :list="list3"
        ></ttable>
        <el-pagination
          @size-change="handleChange3"
          @current-change="handleChange3"
          :page-size="pageParam3.pageSize"
          layout="total, prev, pager, next"
          :total="pageParam3.total"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ttable from '../../common/t_table';
import {
  job_trainee,
  job_queryRecommendList,
  job_queryTrainList
} from '../api/index';
import { trim } from '@/utils/index';
let columns = [
  [
    { title: '序号', type: 'index' },
    { title: '指导类型', prop: 'guideType', slot: 'guideType' },
    { title: '咨询时间', prop: 'consultTime' },
    { title: '咨询地点', prop: 'consultAddress' },
    { title: '咨询内容', prop: 'consultPolicy' },
    { title: '备注', prop: 'consultMemo' },
    {
      title: '是否已完成咨询指导',
      prop: 'consultComplete',
      slot: 'consultComplete'
    }
  ],
  [
    { title: '序号', type: 'index' },
    { title: '指导类型', prop: 'guideType', slot: 'guideType' },
    { title: '专家名称', prop: 'expertName' },
    { title: '指导时间', prop: 'guideTime' },
    { title: '指导地点', prop: 'guideAddress' },
    { title: '指导过程', prop: 'guideProcess' },
    { title: '发现的问题和建议', prop: 'problem' },
    { title: '实施举措', prop: 'implementAct', slot: 'implementAct' },
    { title: '是否就业', prop: 'employ', slot: 'employ' }
  ]
];
export default {
  name: 'serve',
  components: { ttable },
  props: ['userPid'],
  data() {
    return {
      guideType: '01',
      dicOptions: {
        type: trim(this.$store.getters['dictionary/recruit_guide_type']),
        yesno: trim(this.$store.getters['dictionary/yesno']),
        act_type: trim(
          this.$store.getters['dictionary/recruit_imple_act_type']
        ),
        status: trim(this.$store.getters['dictionary/recruit_feedback_status'])
      },
      pageParam: {
        pageIndex: 1,
        total: 0,
        pageSize: 10
      },
      pageParam2: {
        pageIndex: 1,
        total: 0,
        pageSize: 10
      },
      pageParam3: {
        pageIndex: 1,
        total: 0,
        pageSize: 10
      },
      activeName: '1',
      columns: [],
      columns2: [
        { title: '序号', type: 'index' },
        { title: '推荐类型', prop: 'recType' },
        { title: '职位推荐时间', prop: 'recTime' },
        { title: '推荐的工作人员', prop: 'userId' },
        { title: '单位名称', prop: 'corpName' },
        { title: '职位名称', prop: 'positionName' },
        { title: '是否查看推荐的职位', prop: 'viewPosition' },
        { title: '是否投递简历', prop: 'deliveryResume' },
        { title: '反馈状态', prop: 'feedbackStatus', slot: 'feedbackStatus' },
        { title: '通知面试时间', prop: 'noticeInterview' },
        { title: '通知录用时间', prop: 'hire', slot: 'hire' },
        { title: '通知不录用时间', prop: 'hireNo', slot: 'hireNo' }
      ],
      columns3: [
        { title: '序号', type: 'index' },
        { title: '补贴类型', prop: 'btlx' },
        { title: '项目名称', prop: 'xmmc' },
        { title: '职业等级', prop: 'zydj' },
        { title: '培训单位名称', prop: 'dwmc' },
        { title: '录入日期', prop: 'lrrq' },
        { title: '注册日期', prop: 'zcrq' },
        { title: '考核结果', prop: 'khjg' },
        { title: '考核成绩日期', prop: 'cjlrrq' },
        { title: '补贴比例', prop: 'btbl' },
        { title: '补贴金额', prop: 'btje' }
      ],
      list: [],
      list2: [],
      list3: []
    };
  },
  computed: {},
  methods: {
    gotoRuter() {
      this.$emit('gotoRuter', '/profession/feedback');
    },
    selectClick(e) {
      this.pageParam.pageIndex = 1;
      if (e == '01') {
        this.columns = [...columns[0]];
      } else if (e == '02') {
        this.columns = [...columns[1]];
      }
      this.query();
    },
    handleChange(e) {
      this.pageParam.pageIndex = e;
      this.query();
    },
    handleChange2(e) {
      this.pageParam2.pageIndex = e;
      this.queryRecommend();
    },
    handleChange3(e) {
      this.pageParam3.pageIndex = e;
      this.queryTrain();
    },
    handleClick(e) {
      //1职业指导 2职位推荐 3职业培训
      if (e.name == '1') {
        this.query();
      } else if (e.name == '2') {
        this.queryRecommend();
      } else if (e.name == '3') {
        this.queryTrain();
      }
    },
    query() {
      let data = {
        pid: this.userPid,
        pageParam: this.pageParam,
        guideType: this.guideType
      };
      data.pageParam.pageIndex =
        JSON.parse(JSON.stringify(this.pageParam.pageIndex)) - 1;
      job_trainee(
        data,
        res => {
          this.loading = false;
          if (res.status == 200) {
            let pageresult = res.result.pageresult;
            this.list = pageresult.data;
            this.pageParam.pageIndex = Number(pageresult.pageIndex) + 1;
            this.pageParam.total = pageresult.total;
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    queryRecommend() {
      let data = {
        pid: this.userPid,
        pageParam: this.pageParam2
      };
      data.pageParam.pageIndex =
        JSON.parse(JSON.stringify(this.pageParam2.pageIndex)) - 1;
      job_queryRecommendList(
        data,
        res => {
          this.loading = false;
          if (res.status == 200) {
            let pageresult = res.result.pageresult;
            this.list2 = pageresult.data;
            this.pageParam2.pageIndex = Number(pageresult.pageIndex) + 1;
            this.pageParam2.total = pageresult.total;
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    queryTrain() {
      let data = {
        pid: this.userPid,
        pageParam: this.pageParam3
      };
      data.pageParam.pageIndex =
        JSON.parse(JSON.stringify(this.pageParam3.pageIndex)) - 1;
      job_queryTrainList(
        data,
        res => {
          this.loading = false;
          if (res.status == 200) {
            let pageresult = res.result.pageresult;
            this.list3 = pageresult.data;
            this.pageParam3.pageIndex = Number(pageresult.pageIndex) + 1;
            this.pageParam3.total = pageresult.total;
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  mounted() {
    this.columns = [...columns[0]];
  },
  created() {
    this.query();
  }
};
</script>
