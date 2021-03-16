<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:46:47
 * @LastEditTime: 2021-03-16 09:34:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <div style="text-align:right">
      <el-input style="width:50%" placeholder="请输入内容" v-model="input3">
        <el-button
          style="background:#ff9350;color:#ffffff"
          type="primary"
          slot="append"
          icon="el-icon-search"
          >搜索</el-button
        >
      </el-input>
    </div>
    <ttable :columns="columns" :list="list">
      <el-table-column width="200" slot="aaa009" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="look(scope, 1)" plain>
            <i class="el-icon-edit"></i> 修改</el-button
          >
          <el-button size="mini" type="danger" plain
            ><i class="el-icon-close"></i>删除</el-button
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
      <el-button type="primary"> <i class="el-icon-plus"></i> 添加</el-button>
    </div>
  </div>
</template>

<script>
import ttable from '../common/t_table';
export default {
  name: 'summarys',
  components: {
    ttable
  },
  data() {
    return {
      input3: '',
      currentPage: 1,
      list: [
        {
          aaa001: '测试',
          aaa002: '测试',
          aaa003: '测试',
          aaa004: '测试',
          aaa005: '测试',
          aaa006: '测试',
          aaa007: '1'
        }
      ],
      columns: [
        { type: 'selection' },
        { title: '会议议题', prop: 'aaa001' },
        { title: '会议日期', prop: 'aaa002' },
        { title: '会议地点', prop: 'aaa003' },
        { title: '会议召集人', prop: 'aaa004' },
        { title: '会与专家', prop: 'aaa005' },
        { title: '会与其他人员', prop: 'aaa006' },
        { title: '会议纪要签字记录', prop: 'aaa007' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009', width: 200 }
      ]
    };
  },
  computed: {},
  methods: {
    handleChange(e) {
      console.log(e);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
