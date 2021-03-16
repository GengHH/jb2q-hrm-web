<!--
 * @Author: your name
 * @Date: 2021-03-09 14:18:40
 * @LastEditTime: 2021-03-10 14:34:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\comment.vue
-->
<template>
  <div id="indexBody">
    <ttable :columns="columns" :list="list">
      <!-- 内容部分-操作 -->
      <el-table-column slot="aaa003" label="反馈状态" align="center">
        <template slot-scope="scope">
          <el-rate :value="scope.row.aaa003 - 0"></el-rate>
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
import ttable from '../../common/t_table';
export default {
  name: 'comment',
  components: { ttable },
  data() {
    return {
      currentPage: 1,
      columns: [
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'aaa001' },
        { title: '职位名称', prop: 'aaa002' },
        { title: '评价星级', prop: 'aaa003', slot: 'aaa003' },
        { title: '评价内容', prop: 'aaa004' },
        { title: '评价人', prop: 'aaa005' },
        { title: '评价时间', prop: 'aaa006' }
        // {
        //   title: '性别',
        //   prop: 'sex',
        //   align: 'center',
        //   render: (h, params) => {
        //     let sex = params.row.sex; //params.row.type==获取到的值
        //     let nowText = '';
        //     if (sex == '1') {
        //       nowText = '男';
        //     } else {
        //       nowText = '女';
        //     }
        //     return h('div', {}, nowText);
        //   }
        // }
      ],
      list: [
        {
          aaa001: '测试',
          aaa002: '测试',
          aaa003: '3',
          aaa004: '2019-05-01',
          aaa005: '测试',
          aaa006: '2019-05-01'
        }
      ]
    };
  },
  computed: {},
  methods: {
    handleChange(e) {
      console.log;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
