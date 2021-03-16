<!--
 * @Author: your name
 * @Date: 2021-03-16 14:06:57
 * @LastEditTime: 2021-03-16 14:10:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\pages\areaAdminManagement.vue
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="onsubmit"></tform>
    <ttable :columns="columns" :list="list">
      <el-table-column slot="aaa007" label="复核状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.aaa007 == '1'" type="success">通过</el-tag>
          <el-tag v-else type="warning">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="360" slot="aaa009" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="look(scope, 1)" plain
            >修改</el-button
          >
          <el-button size="mini" type="info" plain>查看</el-button>
          <el-button size="mini" type="primary" plain>续聘</el-button>
          <el-button size="mini" type="warning" plain>退团</el-button>
          <el-button size="mini" type="danger" plain>转移</el-button>
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
      <el-button type="primary" @click="visible = true"
        ><i class="el-icon-folder-add"></i>入团申请</el-button
      >
    </div>
    <managementadd
      :visible="visible"
      @onclose="visible = false"
    ></managementadd>
    <continueadd
      :visible="continueVisible"
      @onclose="continueVisible = false"
    ></continueadd>
  </div>
</template>

<script>
import tform from '../../common/t_form'; //高级查询
import ttable from '../../common/t_table';
import managementadd from './managementAdd';
import continueadd from './continueAdd';
export default {
  name: 'areaAdminManagement',
  components: {
    tform,
    ttable,
    managementadd,
    continueadd
  },
  data() {
    return {
      visible: false,
      continueVisible: false,
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
          aaa008: '测试'
        }
      ],
      columns: [
        { type: 'selection' },
        { title: '序号', type: 'index' },
        { title: '专家编号', prop: 'aaa001' },
        { title: '姓名', prop: 'aaa002' },
        { title: '学历', prop: 'aaa003' },
        { title: '联系电话', prop: 'aaa004' },
        { title: '专家状态', prop: 'aaa005' },
        { title: '聘期', prop: 'aaa006' },
        { title: '复核状态', prop: 'aaa007', slot: 'aaa007' },
        { title: '管理区', prop: 'aaa008' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009', width: 400 }
      ],
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',
        style: {
          width: '100%',
          margin: '0 auto'
        },
        formItemList: [
          {
            type: 'input',
            label: '专家编号',
            style: { width: '210px' },
            placeholder: '请输入专家编号',
            rules: [],
            key: 'name2'
          },
          {
            type: 'input',
            label: '姓名',
            style: { width: '210px' },
            placeholder: '请输入姓名',
            rules: [],
            key: 'name'
          },

          {
            type: 'input',
            label: '证件号码',
            placeholder: '请输入证件号码',
            style: { width: '210px' },
            rules: [],
            key: 'input'
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
    look(e, type) {
      console.log(e, type);
    },
    handleChange(e) {
      console.log(e);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
