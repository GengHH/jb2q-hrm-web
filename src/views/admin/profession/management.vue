<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-03-23 16:36:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\management.vue
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <ttable :columns="columns" :list="list">
      <!-- 内容部分-操作 -->
      <el-table-column slot="aaa009" label="是否发布" align="center">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.aaa009 == '0' ? false : true"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column width="200" slot="aaa010" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="look(scope, 1)" plain>
            <i class="el-icon-search"></i> 查看</el-button
          >
          <el-button size="mini" type="primary" @click="look(scope, 1)" plain>
            <i class="el-icon-edit"></i> 编辑</el-button
          >
          <div style="margin-top:5px">
            <el-button size="mini" type="info" @click="look(scope, 1)" plain>
              <i class="el-icon-chat-line-square"></i> 反馈</el-button
            >
            <el-button size="mini" type="info" @click="look(scope, 1)" plain>
              <i class="el-icon-close"></i> 删除</el-button
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
      layout="prev, pager, next, jumper"
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
  name: 'management',
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
            label: '活动类型',
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
            label: '活动日期',
            rules: [],
            key: 'daterange'
          },
          {
            type: 'input',
            label: '活动名称',
            style: { width: '210px' },
            placeholder: '请输入活动名称',
            rules: [],
            key: 'xm'
          }
        ]
      },
      currentPage: 1,
      columns: [
        { title: '序号', type: 'index' },
        { title: '活动类型', prop: 'aaa001' },
        { title: '活动名称', prop: 'aaa002' },
        { title: '是否专家参与', prop: 'aaa003' },
        { title: '开始时间', prop: 'aaa004' },
        { title: '结束时间', prop: 'aaa005' },
        { title: '最大自主报名人数', prop: 'aaa006' },
        { title: '活动情况', prop: 'aaa007' },
        { title: '参与人数', prop: 'aaa008' },
        { title: '是否发布', slot: 'aaa009' },
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
    look() {}
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
