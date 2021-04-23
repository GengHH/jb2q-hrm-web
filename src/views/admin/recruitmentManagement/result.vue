<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-04-20 11:05:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\result.vue
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="onsubmit"></tform>
    <ttable :columns="columns" :list="list">
      <el-table-column slot="distictCode" label="管理区" align="center">
        <template slot-scope="scope">
          <div v-for="(v, k) in dicOptions.qx" :key="k">
            <el-tag v-if="v.value == scope.row.distictCode">{{
              v.label
            }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column width="200" slot="aaa009" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="look(scope, 1)" plain>
            <i class="el-icon-search"></i> 查看</el-button
          >
          <el-button size="mini" type="primary" @click="look(scope, 1)" plain>
            <i class="el-icon-edit"></i> 修改</el-button
          >
        </template>
      </el-table-column>
    </ttable>
    <el-pagination
      @size-change="handleChange"
      @current-change="handleChange"
      :current-page.sync="params.pageIndex"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="params.total"
    >
    </el-pagination>
    <div style="text-align:right">
      <el-button type="primary"> <i class="el-icon-plus"></i> 添加</el-button>
    </div>
  </div>
</template>

<script>
import tform from '../common/t_form'; //高级查询
import {
  result_query,
  result_verification,
  result_enrollment,
  result_feedback,
  result_wanted,
  result_update,
  result_add
} from './api/index';
import { trim } from '@/utils/index';
import ttable from '../common/t_table';
export default {
  name: 'result',
  components: {
    tform,
    ttable
  },
  data() {
    return {
      dicOptions: {
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx'])
      },
      params: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      list: [],
      columns: [
        { title: '序号', type: 'index' },
        { title: '管理区', prop: 'distictCode', slot: 'distictCode' },
        { title: '是否面向高校毕业生', prop: 'forCollegeGraduates' },
        { title: '招聘单位数', prop: 'corpCount' },
        { title: '招聘职位数', prop: 'positionCount' },
        { title: '招聘人数', prop: 'peopleCount' },
        { title: '投递简历人次数（线上）', prop: 'collegeDeliveryTon' },
        { title: '投递简历人数（线上）', prop: 'deliveryOnCount' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',
        formItemList: [
          {
            type: 'input',
            label: '关键字',
            style: { width: '420px' },
            placeholder: '请输入关键字',
            rules: [],
            key: 'meetName'
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    onsubmit(e) {
      console.log(e);
      let data = { ...e };
      data.pageSize = this.pageSize;
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex)) - 1;
      this.dataList = data;
      result_query(
        data,
        res => {
          if (res.status == 200) {
            let pageresult = res.result.pageresult;
            this.list = pageresult.data;
            this.params.pageIndex = Number(pageresult.pageIndex) + 1;
            this.params.total = pageresult.total;
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    handleChange(e) {
      console.log(e);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
