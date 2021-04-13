<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-04-13 14:55:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\recruitment.vue
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <ttable :columns="columns" :list="list">
      <el-table-column slot="time" label="代理招聘有效期" align="center">
        <template slot-scope="scope">
          <div>
            {{ scope.row.startEntrust + '-' + scope.row.endEntrust }}
          </div>
          <el-tag></el-tag>
        </template>
      </el-table-column>
      <el-table-column slot="frozen" label="单位状态" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.frozen == '1' ? '冻结' : '正常' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="280" slot="aaa010" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="look(scope, 1)" plain>
            <i class="el-icon-search"></i> 查看</el-button
          >
          <el-button size="mini" type="primary" @click="look(scope, 2)" plain>
            <i class="el-icon-search"></i> 修改</el-button
          >
          <el-button size="mini" type="primary" @click="look(scope, 3)" plain>
            <i class="el-icon-search"></i> 审核</el-button
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
    <messagedetails
      v-if="visible"
      :visible="visible"
      :form="form"
      @onclose="onclose"
    ></messagedetails>
  </div>
</template>

<script>
import tform from '../common/t_form';
import ttable from '../common/t_table';
import { trim } from '@/utils/index';
import {
  agency_query,
  agency_add,
  agency_edit,
  agency_cancel,
  agency_verify,
  agency_resume
} from './api/index';
import messagedetails from './pages/messageDetails';
export default {
  name: 'recruitment',
  components: { ttable, tform, messagedetails },
  data() {
    return {
      form: {},
      visible: false,
      params: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      dicOptions: {
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx'])
      },
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',

        formItemList: [
          {
            type: 'input',
            label: '单位名称',
            style: { width: '210px' },
            placeholder: '请输入单位名称',
            rules: [],
            key: 'corpName'
          },
          {
            type: 'daterange',
            label: '代理有效期',
            rules: [],
            key: 'time'
          }
        ]
      },
      currentPage: 1,
      columns: [
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'corpName' },
        { title: '单位状态', prop: 'frozen', slot: 'frozen' },
        { title: '代理招聘有效期', prop: 'time', slot: 'time' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [],
      dataList: []
    };
  },
  computed: {},
  methods: {
    handleChange(e) {
      console.log(e);
    },
    advancedSearch(e) {
      console.log(e);
      let data = { ...e };
      data.pageSize = this.pageSize;
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex)) - 1;
      if (data.time) {
        data.startEntrust = data.time[0];
        data.endEntrust = data.time[1];
      }
      this.dataList = data;
      agency_query(
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
    onclose(type) {
      if (type == '1') {
        this.advancedSearch(this.dataList);
      }
      this.visible = false;
    },
    look(scope) {
      this.form = { ...scope.row };
      this.visible = true;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
