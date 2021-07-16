<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-07-15 19:57:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\feedback.vue
-->
<template>
  <div id="indexBody">
    <tform ref="tform" :formConfig="formConfig" @onsubmit="onsubmit"></tform>
    <ttable :columns="columns" :list="list">
      <el-table-column slot="meetType" label="招聘会类型" align="center">
        <template slot-scope="scope">
          <div v-for="(v, k) in dicOptions.type" :key="k">
            <el-tag v-if="v.value == scope.row.meetType">{{ v.label }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column slot="applyResult" label="反馈状态" align="center">
        <template slot-scope="scope">
          <el-tag
            type="success"
            v-if="scope.row.applyResult == '0' || scope.row.applyResult == '1'"
          >
            已反馈</el-tag
          >
          <el-tag v-else> 未反馈</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="180" slot="aaa009" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="look(scope, 1)" plain>
            <i class="el-icon-search"></i>查看</el-button
          >
          <el-button size="mini" type="primary" @click="look(scope, 2)" plain>
            <i class="el-icon-edit"></i>反馈</el-button
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
    <feedbackdetails
      v-if="visible"
      :visible="visible"
      :lookList="lookList"
      :disabled="disabled"
      @onclose="onclose"
    ></feedbackdetails>
  </div>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../common/t_form'; //高级查询
import ttable from '../common/t_table';
import { feedback_query } from './api/index';
import feedbackdetails from './pages/feedbackDetails';
export default {
  name: 'feedback',
  components: {
    tform,
    ttable,
    feedbackdetails
  },
  data() {
    return {
      adminId: this.$store.state.admin.userInfo.logonUser.areaInfo.areaCode,
      type: '',
      visible: false,
      dicOptions: {
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx']),
        type: trim(this.$store.getters['dictionary/recruit_meet_type'])
      },
      params: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      list: [],
      dataList: [],
      columns: [
        { title: '序号', type: 'index' },
        { title: '招聘会名称', prop: 'meetName' },
        { title: '企业名称', prop: 'corpName' },
        { title: '反馈状态', prop: 'applyResult', slot: 'applyResult' },
        { title: '招聘会类型', prop: 'meetType', slot: 'meetType' },
        { title: '参会联系人', prop: 'applyContactName' },
        { title: '参会联系手机', prop: 'applyContactPhone' },
        { title: '备注', prop: 'memo' },
        { title: '报名时间', prop: 'applyTime' },
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
            label: '招聘会名称',
            style: { width: '210px' },
            placeholder: '请输入招聘会名称',
            rules: [],
            key: 'meetName'
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
            label: '所属区',
            style: { width: '210px' },
            rules: [],
            key: 'areaId',
            options: trim(this.$store.getters['dictionary/ggjbxx_qx'])
          },
          {
            type: 'radio',
            label: '是否反馈',
            key: 'applyResult',
            options: [
              {
                value: '0',
                label: '未反馈'
              },
              {
                value: '1',
                label: '已反馈'
              },
              {
                value: '2',
                label: '全部'
              }
            ]
          }
        ]
      },
      lookList: {}
    };
  },
  computed: {},
  methods: {
    onclose(type) {
      if (type == '1') {
        this.onsubmit(this.dataList);
      }
      this.visible = false;
    },
    look(e, type) {
      //1查看  2反馈
      this.disabled = type == '1' ? true : false;
      this.lookList = { ...e.row };
      this.lookList.applyTime = this.lookList.applyTime
        ? this.lookList.applyTime.split(' ')[0]
        : '';
      this.visible = true;
    },
    onsubmit(e) {
      console.log(e);
      let data = { ...e };
      data.pageSize = this.pageSize;
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex)) - 1;
      this.dataList = data;
      feedback_query(
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
      this.params.pageIndex = e;
      this.onsubmit(this.dataList);
    }
  },
  mounted() {
    this.$refs.tform.value = {
      areaId: this.adminId,
      applyResult: '0'
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
