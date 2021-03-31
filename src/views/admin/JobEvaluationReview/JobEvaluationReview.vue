<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:46:47
 * @LastEditTime: 2021-03-23 14:54:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <ttable :columns="columns" :list="list">
      <!-- 内容部分-操作 -->
      <el-table-column
        width="140"
        slot="aaa003"
        label="评价星级"
        align="center"
      >
        <template slot-scope="scope">
          <el-rate :value="scope.row.aaa003 - 0"></el-rate>
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
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000"
    >
    </el-pagination>
  </div>
</template>

<script>
import tform from '../common/t_form';
import ttable from '../common/t_table';
export default {
  name: 'index',
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
            type: 'input',
            label: '单位名称',
            style: { width: '210px' },
            placeholder: '请输入账号名',
            rules: [],
            key: 'xm'
          },
          {
            type: 'input',
            label: '职位名称',
            style: { width: '210px' },
            placeholder: '请输入姓名',
            rules: [],
            key: 'zjhm'
          },
          {
            type: 'select',
            label: '评级星级',
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
          }
        ]
      },
      currentPage: 1,
      columns: [
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'aaa001' },
        { title: '职位名称', prop: 'aaa002' },
        { title: '评价星级', slot: 'aaa003' },
        { title: '评价内容', prop: 'aaa004' },
        { title: '评价时间', prop: 'aaa005' },
        { title: '评价人', prop: 'aaa006' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [
        {
          aaa001: '测试',
          aaa002: '测试',
          aaa003: '1',
          aaa004: '测试',
          aaa005: '测试',
          aaa006: '测试'
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
