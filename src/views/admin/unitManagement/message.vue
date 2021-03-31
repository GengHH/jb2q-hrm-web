<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-03-23 15:09:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\management.vue
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <ttable :columns="columns" :list="list">
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
            label: '信用代码',
            style: { width: '210px' },
            placeholder: '请输入信用代码',
            rules: [],
            key: 'xm'
          },
          {
            type: 'input',
            label: '单位名称',
            style: { width: '210px' },
            placeholder: '请输入单位名称',
            rules: [],
            key: 'zjhm'
          },
          {
            type: 'select',
            label: '管理所属区',
            rules: [],
            key: 'livingArea',
            style: { width: '210px' },
            options: [
              {
                value: '1',
                label: '静安',
                disabled: false
              },
              {
                value: '0',
                label: '浦东',
                disabled: false
              }
            ]
          }
        ]
      },
      currentPage: 1,
      columns: [
        { title: '序号', type: 'index' },
        { title: '信用代码', prop: 'aaa001' },
        { title: '单位名称', prop: 'aaa002' },
        { title: '管理所属区', prop: 'aaa003' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [
        {
          aaa001: '测试',
          aaa002: '测试',
          aaa003: '1'
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
