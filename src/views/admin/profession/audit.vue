<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:46:47
 * @LastEditTime: 2021-03-23 16:20:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <ttable :columns="columns" :list="list">
      <!-- 内容部分-操作 -->
      <el-table-column slot="aaa008" label="指导状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.aaa008 == '1'" type="success">已预约</el-tag>
          <el-tag v-else-if="scope.row.aaa008 == '2'">已取消</el-tag>
          <el-tag v-else type="warning">解冻</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="280" slot="aaa010" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="look(scope, 1)" plain>
            <i class="el-icon-printer"></i> 打印</el-button
          >
          <el-button size="mini" type="primary" @click="look(scope, 1)" plain>
            <i class="el-icon-edit"></i> 审核</el-button
          >

          <el-button size="mini" type="info" @click="look(scope, 1)" plain>
            实施指导</el-button
          >
          <div style="margin-top:5px">
            <el-button size="mini" type="info" @click="look(scope, 1)" plain>
              求职档案</el-button
            >
            <el-button size="mini" type="info" @click="look(scope, 1)" plain>
              发送指导协议</el-button
            >
          </div>
        </template>
      </el-table-column>
    </ttable>
    <el-pagination
      @size-change="handleChange"
      @current-change="handleChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    >
    </el-pagination>
    <div style="text-align:right">
      <el-button size="mini" type="primary" @click="look(scope, 1)">
        <i class="el-icon-plus"></i> 添加</el-button
      >
    </div>
  </div>
</template>

<script>
import tform from '../common/t_form';
import ttable from '../common/t_table';
export default {
  name: 'audit',
  components: { ttable, tform },
  data() {
    return {
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',

        formItemList: [
          {
            type: 'select',
            label: '指导状态',
            rules: [],
            key: 'livingArea',
            style: { width: '210px' },
            options: [
              {
                value: '1',
                label: '1星',
                disabled: false
              },
              {
                value: '0',
                label: '5星',
                disabled: false
              }
            ]
          },
          {
            type: 'daterange',
            label: '预约日期',
            rules: [],
            key: 'daterange'
          },
          {
            type: 'input',
            label: '身份证号',
            style: { width: '210px' },
            placeholder: '请输入账号名',
            rules: [],
            key: 'xm'
          }
        ]
      },
      currentPage: 1,
      columns: [
        { title: '序号', type: 'index' },
        { title: '指导区', prop: 'aaa001' },
        { title: '预约日期', prop: 'aaa002' },
        { title: '预约时段', prop: 'aaa003' },
        { title: '预约地址', prop: 'aaa004' },
        { title: '预约人', prop: 'aaa005' },
        { title: '主要困惑', prop: 'aaa006' },
        { title: '困惑描述', prop: 'aaa007' },
        { title: '指导状态', slot: 'aaa008' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [
        {
          aaa001: '测试',
          aaa002: '测试',
          aaa003: '测试',
          aaa004: '测试',
          aaa005: '测试',
          aaa006: '测试',
          aaa007: '测试',
          aaa008: '1'
        }
      ]
    };
  },
  computed: {},
  methods: {
    handleChange(e) {
      console.log(e);
    },
    advancedSearch(e) {
      console.log(e);
    },
    look() {}
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
