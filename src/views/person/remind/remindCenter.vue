<!--
 * @Author: your name
 * @Date: 2021-03-17 10:08:03
 * @LastEditTime: 2021-03-17 13:27:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\person\remind\remindCenter.vue
-->
<template>
  <div id="htmlBody">
    <div id="baseInfo" class="title-style font-or font-bold">
      基本信息
    </div>
    <div style="text-align:right">
      <el-input
        style="width:500px"
        placeholder="请输入内容"
        v-model="input"
        class="input-with-select"
      >
        <el-button
          style="background:#fc6f3d;color:#ffffff"
          slot="append"
          icon="el-icon-search"
          >搜索</el-button
        >
      </el-input>
    </div>
    <ttable :columns="columns" :list="list">
      <el-table-column slot="aaa009" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="look(scope, 1)" plain>
            <i class="el-icon-close"></i> 删除</el-button
          >
          <el-button size="mini" type="info" @click="look(scope, 1)" plain>
            <i class="el-icon-chat-line-round"></i> 回复</el-button
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
    <div style="text-align:right;margin-top:10px">
      <el-button type="danger" icon="el-icon-delete">删除</el-button>
      <el-button type="warning" icon="el-icon-check">标记已读</el-button>
    </div>
  </div>
</template>

<script>
import ttable from '@/views/admin/common/t_table';
export default {
  name: 'personLayout',
  components: { ttable },
  data() {
    return {
      input: '',
      currentPage: 1,
      list: [
        {
          aaa001: '测试',
          aaa002: '测试',
          aaa003: '测试'
        }
      ],
      columns: [
        { type: 'selection' },
        { title: '序号', type: 'index' },
        { title: '发送人', prop: 'aaa001' },
        { title: '标题内容', prop: 'aaa002' },
        { title: '时间', prop: 'aaa003' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ]
    };
  },
  computed: {},
  methods: {
    look() {},
    handleChange(e) {
      console.log(e);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
#htmlBody {
  .title-style {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
    line-height: 40px;
    border-bottom: 1px solid #e9eef3;
    text-align: left;
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: 10px;
    position: relative;
  }
  .title-style::before {
    content: '';
    width: 4px;
    height: 16px;
    background: #fc7a43;
    position: absolute;
    left: 12px;
    top: 13px;
  }
}
</style>
