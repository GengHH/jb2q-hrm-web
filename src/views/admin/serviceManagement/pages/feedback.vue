<!--
 * @Author: your name
 * @Date: 2021-03-09 14:18:33
 * @LastEditTime: 2021-03-10 14:33:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\feedback.vue
-->
<template>
  <div id="indexBody">
    <ttable :columns="columns" :list="list">
      <!-- 内容部分-操作 -->
      <el-table-column slot="aaa005" label="反馈状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.aaa005 == '1'" type="success">已查看</el-tag>
          <el-tag v-else-if="scope.row.aaa005 == '2'">录用通知</el-tag>
          <el-tag else type="warning">面试通知</el-tag>
        </template>
      </el-table-column>
    </ttable>
    <el-pagination
      @size-change="handleChange"
      @current-change="handleChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    >
    </el-pagination>
  </div>
</template>

<script>
import ttable from '../../common/t_table';
export default {
  name: 'feedback',
  components: { ttable },
  data() {
    return {
      currentPage: 1,
      columns: [
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'aaa001' },
        { title: '职位名称', prop: 'aaa002' },
        { title: '职位薪酬', prop: 'aaa003' },
        { title: '投递时间', prop: 'aaa004' },
        { title: '反馈状态', prop: 'aaa005', slot: 'aaa005' },
        { title: '反馈时间', prop: 'aaa006' },
        { title: '面试信息', prop: 'aaa007' },
        { title: '是否参见面试', prop: 'aaa008' },
        { title: '不参加原因', prop: 'aaa009' }
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
          aaa003: '测试',
          aaa004: '2019-05-01',
          aaa005: '1',
          aaa006: '2019-05-01',
          aaa007: '测试',
          aaa008: '测试',
          aaa009: '测试'
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
