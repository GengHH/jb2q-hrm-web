<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-05-17 14:39:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\audit.vue
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="转入" name="entrance">
        <ttable :columns="columns" :list="list">
          <el-table-column
            width="280"
            slot="aaa010"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="audit(scope)">
                <i class="el-icon-chat-dot-round"></i> 审核</el-button
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
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="转出" name="exit">
        <ttable :columns="columns2" :list="list2">
          <el-table-column
            width="280"
            slot="aaa010"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="audit(scope)">
                <i class="el-icon-chat-dot-round"></i> 审核</el-button
              >
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange"
          @current-change="handleChange"
          :current-page.sync="params2.pageIndex"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="params2.total"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tform from '../common/t_form';
import ttable from '../common/t_table';
import { trim } from '@/utils/index';
export default {
  name: 'audit',
  components: { ttable, tform },
  data() {
    return {
      activeName: 'entrance',
      pageSize: 10,
      params: {
        pageIndex: 1,
        total: 0
      },

      params2: {
        pageIndex: 1,
        total: 0
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
      columns: [
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'corpName' },
        { title: '单位状态', prop: 'frozen', slot: 'frozen' },
        { title: '代理招聘有效期', prop: 'entrustValid' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [],
      columns2: [
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'corpName' },
        { title: '单位状态', prop: 'frozen', slot: 'frozen' },
        { title: '代理招聘有效期', prop: 'entrustValid' },
        { title: '操作', slot: 'aaa010' }
      ],
      list2: []
    };
  },
  computed: {},
  methods: {
    handleChange(e) {
      console.log(e);
    },
    handleClick(e) {
      console.log(e);
    },
    advancedSearch(e) {
      console.log(e);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
