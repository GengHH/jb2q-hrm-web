<!--
 * @Author: your name
 * @Date: 2021-03-05 09:55:06
 * @LastEditTime: 2021-03-23 14:16:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <ttable :columns="columns" :list="list">
      <!-- 内容部分-操作 -->
      <el-table-column slot="aaa009" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.aaa009 == '1'" type="success">已查看</el-tag>
          <el-tag v-else-if="scope.row.aaa009 == '2'">录用通知</el-tag>
          <el-tag v-else type="warning">面试通知</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="180" slot="aaa010" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="look(scope, 1)" plain>
            <i class="el-icon-edit"></i> 编辑</el-button
          >
          <el-button size="mini" type="danger" @click="look(scope, 1)" plain>
            <i class="el-icon-close"></i> 删除</el-button
          >
        </template>
      </el-table-column>
    </ttable>
    <el-pagination
      @size-change="handleChange"
      @current-change="handleChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000"
    >
    </el-pagination>
    <div style="text-align:right">
      <el-button size="small" type="danger">
        <i class="el-icon-delete"></i> 删除</el-button
      >
      <el-button size="small" type="primary" @click="visible = true">
        <i class="el-icon-plus"></i> 新增</el-button
      >
    </div>
    <adddetails :visible="visible" @onclose="onclose"></adddetails>
  </div>
</template>

<script>
import tform from '../common/t_form';
import ttable from '../common/t_table';
import adddetails from './module/addDetails';
export default {
  name: 'index',
  components: { ttable, tform, adddetails },
  data() {
    return {
      visible: false,
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',

        formItemList: [
          {
            type: 'input',
            label: '账号名',
            style: { width: '210px' },
            placeholder: '请输入账号名',
            rules: [],
            key: 'xm'
          },
          {
            type: 'input',
            label: '姓名',
            style: { width: '210px' },
            placeholder: '请输入姓名',
            rules: [],
            key: 'zjhm'
          }
        ]
      },
      currentPage: 1,
      columns: [
        { type: 'selection' },
        { title: '序号', type: 'index' },
        { title: '账号', prop: 'aaa001' },
        { title: '单位名称', prop: 'aaa002' },
        { title: '姓名', prop: 'aaa003' },
        { title: '性别', prop: 'aaa004' },
        { title: '部门名称', prop: 'aaa005' },
        { title: '职位', prop: 'aaa006' },
        { title: '身份', prop: 'aaa007' },
        { title: '联系电话', prop: 'aaa008' },
        { title: '状态', slot: 'aaa009' },
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
          aaa008: '测试',
          aaa009: '1'
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
    onclose() {
      this.visible = false;
    },
    look() {}
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
