<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-07-13 15:59:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\message.vue
-->
<template>
  <div id="indexBody">
    <tform
      ref="form"
      :formConfig="formConfig"
      @onsubmit="advancedSearch"
    ></tform>
    <ttable :columns="columns" :list="list">
      <el-table-column slot="districtCode" label="管理区" align="center">
        <template slot-scope="scope">
          <div v-for="(v, k) in dicOptions.qx" :key="k">
            <el-tag v-if="v.value == scope.row.districtCode">{{
              v.label
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column slot="aaa010" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="look(scope, 1)" plain>
            <i class="el-icon-search"></i> 查看</el-button
          >
        </template>
      </el-table-column>
    </ttable>
    <el-pagination
      @size-change="handleChange"
      @current-change="handleChange"
      :current-page.sync="params.pageIndex"
      :page-size="pageSize"
      layout="total, prev, pager, next"
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
import { unit_query } from './api/index';
import messagedetails from './pages/messageDetails';
export default {
  name: 'message',
  components: { ttable, tform, messagedetails },
  data() {
    return {
      adminId: this.$store.state.admin.userInfo.logonUser.areaInfo.areaCode,
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
            label: '信用代码',
            style: { width: '210px' },
            placeholder: '请输入信用代码',
            rules: [],
            key: 'tyshxym'
          },
          {
            type: 'input',
            label: '单位名称',
            style: { width: '210px' },
            placeholder: '请输入单位名称',
            rules: [],
            key: 'corpName'
          },
          {
            type: 'select',
            label: '管理所属区',
            rules: [],
            disabled: true,
            key: 'districtCode',
            style: { width: '210px' },
            options: trim(this.$store.getters['dictionary/ggjbxx_qx'])
          }
        ]
      },
      currentPage: 1,
      columns: [
        { title: '序号', type: 'index' },
        { title: '信用代码', prop: 'tyshxym' },
        { title: '单位名称', prop: 'corpName' },
        { title: '管理所属区', prop: 'districtCode', slot: 'districtCode' },
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
      this.params.pageIndex = e;
      this.advancedSearch(this.dataList);
    },
    advancedSearch(e) {
      console.log(e);
      let data = { ...e };
      data.pageSize = this.pageSize;
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex)) - 1;
      //默认选择当前所在区
      //data.districtCode = this.$store.state.admin.userInfo.logonUser.areaInfo.areaCode;

      this.dataList = data;
      unit_query(
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
  mounted() {
    this.$refs.form.value = {
      districtCode: this.adminId
    };
  },
  created() {
    if (this.adminId == '00') {
      this.formConfig.formItemList[2].disabled = false;
    } else {
      this.formConfig.formItemList[2].disabled = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
