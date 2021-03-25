<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-03-23 15:31:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\management.vue
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <ttable :columns="columns" :list="list">
      <!-- 内容部分-操作 -->
      <el-table-column slot="aaa002" label="单位状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.aaa002 == '1'" type="success">正常</el-tag>
          <el-tag v-else-if="scope.row.aaa002 == '2'">冻结</el-tag>
          <el-tag v-else type="warning">解冻</el-tag>
        </template>
      </el-table-column>
      <el-table-column slot="aaa004" label="单位标签" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.aaa002 == '1'" type="success"
            >就业见习</el-tag
          >
          <el-tag v-else-if="scope.row.aaa002 == '2'">代理</el-tag>
          <el-tag v-else type="warning">代理招聘</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="180" slot="aaa010" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="look(scope, 1)" plain>
            <i class="el-icon-search"></i> 查看</el-button
          >
          <el-button size="mini" type="primary" @click="look(scope, 1)" plain>
            <i class="el-icon-edit"></i> 修改</el-button
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
            type: 'input',
            label: '单位名称',
            style: { width: '210px' },
            placeholder: '请输入账号名',
            rules: [],
            key: 'xm'
          },
          {
            type: 'select',
            label: '单位状态',
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
        { title: '单位状态', slot: 'aaa002' },
        { title: '冻结/解冻原因', prop: 'aaa003' },
        { title: '单位标签', slot: 'aaa004' },
        { title: '企业LOGO', prop: 'aaa005' },
        { title: '公司简介短视频', prop: 'aaa006' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [
        {
          aaa001: '测试',
          aaa002: '1',
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
