<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-03-16 10:17:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\feedback.vue
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="onsubmit"></tform>
    <ttable :columns="columns" :list="list">
      <el-table-column slot="aaa010" label="发布状态" align="center">
        <template slot-scope="scope">
          <el-switch :value="scope.row.aaa010 == '1' ? true : false">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column width="300" slot="aaa009" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="look(scope, 1)" plain>
            <i class="el-icon-search"></i> 撤销</el-button
          >
          <el-button size="mini" type="primary" @click="look(scope, 1)" plain>
            <i class="el-icon-edit"></i> 审核</el-button
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
import tform from '../common/t_form'; //高级查询
import ttable from '../common/t_table';
export default {
  name: 'feedback',
  components: {
    tform,
    ttable
  },
  data() {
    return {
      currentPage: 1,
      list: [
        {
          aaa001: '测试',
          aaa002: '测试',
          aaa003: '测试',
          aaa004: '测试',
          aaa005: '测试',
          aaa006: '测试',
          aaa007: '1',
          aaa010: '1'
        }
      ],
      columns: [
        { title: '序号', type: 'index' },
        { title: '招聘会名称', prop: 'aaa001' },
        { title: '招聘会简介', prop: 'aaa002' },
        { title: '招聘会类型', prop: 'aaa003' },
        { title: '招聘会召开时间', prop: 'aaa004' },
        { title: '招聘会结束时间', prop: 'aaa005' },
        { title: '招聘会地点', prop: 'aaa006' },
        { title: '展位数量', prop: 'aaa007' },
        { title: '报名限制区域', prop: 'aaa008' },
        { title: '发布状态', prop: 'aaa010', slot: 'aaa010' },
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
            key: 'name'
          },
          {
            type: 'input',
            label: '单位名称',
            style: { width: '210px' },
            placeholder: '请输入单位名称',
            rules: [],
            key: 'name2'
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    onsubmit(e) {
      console.log(e);
    },
    handleChange(e) {
      console.log(e);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
