<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-04-29 17:02:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\management.vue
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="onsubmit"></tform>
    <ttable
      :columns="columns"
      :list="list"
      @selectAll="selectClick"
      @select="selectClick"
    >
      <el-table-column
        slot="districtCodeList"
        label="报名限制区域"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            type="success"
            v-for="(v, k) in scope.row.districtCodeList"
            :key="k"
            >{{ getqx(v) }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column slot="meetType" label="招聘会类型" align="center">
        <template slot-scope="scope">
          <div v-for="(v, k) in dicOptions.type" :key="k">
            <el-tag v-if="v.value == scope.row.meetType">{{ v.label }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column width="300" slot="aaa009" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="look(2, scope)" plain>
            <i class="el-icon-edit"></i> 修改</el-button
          >
          <el-button size="mini" type="danger" plain>
            <i class="el-icon-refresh-right"></i> 撤销</el-button
          >
          <el-button size="mini" type="info" plain>
            <i class="el-icon-edit"></i> 终止报名</el-button
          >
        </template>
      </el-table-column>
    </ttable>
    <el-pagination
      @size-change="handleChange"
      @current-change="handleChange"
      :current-page.sync="pageListData.pageIndex"
      :page-size="pageListData.pageSize"
      layout="total, prev, pager, next"
      :total="pageListData.total"
    >
    </el-pagination>
    <div style="text-align:right">
      <el-button type="danger" @click="remove">
        <i class="el-icon-delete"></i> 删除</el-button
      >
      <el-button type="primary" @click="look(1)">
        <i class="el-icon-plus"></i> 添加</el-button
      >
    </div>
    <managementdetails
      v-if="visible"
      :visible="visible"
      :lookList="form"
      :type="type"
      @onclose="onclose"
    ></managementdetails>
  </div>
</template>

<script>
import tform from '../common/t_form'; //高级查询
import ttable from '../common/t_table';
import managementdetails from './pages/managementDetails';
import { trim } from '@/utils/index';
import { schedule_delete, schedule_query, schedule_update } from './api/index';
export default {
  name: 'management',
  components: {
    tform,
    ttable,
    managementdetails
  },
  data() {
    return {
      form: {},
      visible: false,
      pageListData: {
        total: 0,
        pageSize: 10,
        pageIndex: 0
      },
      selectList: [],
      dataList: {},
      list: [],
      columns: [
        { type: 'selection' },
        { title: '序号', type: 'index' },
        { title: '招聘会名称', prop: 'meetName' },
        { title: '招聘会简介', prop: 'meetIntroduce' },
        { title: '招聘会类型', prop: 'meetType', slot: 'meetType' },
        { title: '招聘会召开时间', prop: 'startTime' },
        { title: '招聘会结束时间', prop: 'endTime' },
        { title: '招聘会地点', prop: 'address' },
        { title: '展位数量', prop: 'boothCount' },
        {
          title: '报名限制区域',
          prop: 'districtCodeList',
          slot: 'districtCodeList'
        },
        { title: '发布状态', prop: 'aaa010', slot: 'releaseStatus' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      dicOptions: {
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx']),
        //招聘会类型
        type: trim(this.$store.getters['dictionary/recruit_meet_type'])
      },
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
            type: 'select',
            label: '招聘会类型',
            style: { width: '210px' },
            rules: [],
            key: 'meetType',
            options: trim(this.$store.getters['dictionary/recruit_meet_type'])
          },
          {
            type: 'daterange',
            label: '召开时间',
            style: { width: '210px' },
            rules: [],
            key: 'time'
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    selectClick(e) {
      this.selectList = e.sel;
    },
    remove() {
      let data = [...this.selectList];
      data = data.map(e => {
        return e.meetId;
      });
      schedule_delete(
        { meetIdList: data },
        res => {
          if (res.status == 200) {
            this.onsubmit(this.dataList);
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    look(type, scope) {
      if (type == '2') {
        this.form = { ...scope.row };
      }

      this.type = type;
      //1 添加 2 修改)
      this.visible = true;
    },
    onclose(type) {
      if (type == '1') {
        this.onsubmit(this.dataList);
      }
      this.visible = false;
    },
    getqx(code) {
      let qx = trim(this.$store.getters['dictionary/ggjbxx_qx']);
      for (let i = 0; i < qx.length; i++) {
        if (code == qx[i].value) {
          return qx[i].label;
        }
      }
      return '';
    },
    onsubmit(e) {
      console.log('------------------');
      let params = { ...this.form };
      params.pageParam = {
        pageSize: this.pageListData.pageSize,
        pageIndex: JSON.parse(JSON.stringify(this.pageListData.pageIndex)) - 1
      };
      this.dataList = params;
      schedule_query(
        params,
        res => {
          console.log(res);
          let record = res.result.pageresult;
          this.list = record.data;
          this.pageListData = {
            total: record.total,
            pageIndex: Number(record.pageIndex) + 1
          };
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
