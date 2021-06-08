<!--
 * @Author: your name
 * @Date: 2021-03-09 14:18:54
 * @LastEditTime: 2021-06-03 16:53:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\serve.vue
-->
<template>
  <div id="indexBody">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="职业指导" name="first">
        <div>
          <span>指导类型</span>
          <el-select
            @change="selectClick"
            size="mini"
            v-model="value"
            placeholder="请选择"
          >
            <el-option label="政策咨询" value="0"></el-option>
            <el-option label="专门指导" value="1"></el-option>
          </el-select>
        </div>
        <ttable :columns="columns" :list="list"></ttable>
        <el-pagination
          @size-change="handleChange"
          @current-change="handleChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000"
        >
        </el-pagination>
        <el-row>
          <el-col :span="24" style="text-align:right">
            <el-button type="primary">
              <i class="el-icon-plus"></i>
              增加职业指导预约
            </el-button>
            <el-button v-if="value != 1" type="success">
              <i class="el-icon-plus"></i>
              增加职业指导记录
            </el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="职位推荐" name="second">
        <ttable :columns="columns2" :list="list2"></ttable>
        <el-pagination
          @size-change="handleChange"
          @current-change="handleChange"
          :current-page.sync="currentPage2"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000"
        >
        </el-pagination>
        <el-row>
          <el-col :span="24" style="text-align:right">
            <el-button type="primary">
              <i class="el-icon-plus"></i>
              职位推荐
            </el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="职业培训" name="third">
        <ttable :columns="columns3" :list="list3"></ttable>
        <el-pagination
          @size-change="handleChange"
          @current-change="handleChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ttable from '../../common/t_table';
let columns = [
  [
    { title: '序号', type: 'index' },
    { title: '指导类型', prop: 'aaa001' },
    { title: '咨询时间', prop: 'aaa002' },
    { title: '咨询地点', prop: 'aaa003' },
    { title: '咨询内容', prop: 'aaa004' },
    { title: '服务的工作人员', prop: 'aaa005' },
    { title: '备注', prop: 'aaa006' },
    { title: '是否已完成咨询指导', prop: 'aaa007' }
  ],
  [
    { title: '序号', type: 'index' },
    { title: '指导类型', prop: 'aaa001' },
    { title: '咨询时间', prop: 'aaa002' },
    { title: '咨询地点', prop: 'aaa003' },
    { title: '服务的工作人员', prop: 'aaa004' },
    { title: '指导过程', prop: 'aaa005' },
    { title: '发现的问题和建议', prop: 'aaa006' },
    { title: '实施举措', prop: 'aaa007' },
    { title: '是否就业', prop: 'aaa008' },
    { title: '详情', prop: 'aaa009' }
  ]
];
export default {
  name: 'serve',
  components: { ttable },
  data() {
    return {
      value: '政策咨询',
      activeName: 'first',
      currentPage: 1,
      currentPage2: 1,
      currentPage3: 1,
      columns: [],
      columns2: [
        { title: '序号', type: 'index' },
        { title: '职位推荐时间', prop: 'aaa001' },
        { title: '推荐的工作人员', prop: 'aaa002' },
        { title: '单位名称', prop: 'aaa003' },
        { title: '职位名称', prop: 'aaa004' },
        { title: '是否查看推荐的职位', prop: 'aaa005' },
        { title: '是否投递简历', prop: 'aaa006' }
      ],
      columns3: [
        { title: '序号', type: 'index' },
        { title: '补贴类型', prop: 'aaa001' },
        { title: '项目名称', prop: 'aaa002' },
        { title: '项目等级', prop: 'aaa003' },
        { title: '培训单位名称', prop: 'aaa004' },
        { title: '录入日期', prop: 'aaa005' },
        { title: '注册日期', prop: 'aaa006' },
        { title: '考核结果', prop: 'aaa007' },
        { title: '考核成绩日期', prop: 'aaa008' },
        { title: '补贴比例', prop: 'aaa009' },
        { title: '补贴金额', prop: 'aaa010' }
      ],
      list: [],
      list2: [],
      list3: []
    };
  },
  computed: {},
  methods: {
    selectClick(e) {
      this.columns = [...columns[e]];
    },
    handleChange(e) {
      console.log;
    },
    handleClick() {}
  },
  mounted() {
    this.columns = [...columns[0]];
  },
  created() {}
};
</script>
