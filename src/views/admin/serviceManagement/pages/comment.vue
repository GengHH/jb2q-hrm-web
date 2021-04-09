<!--
 * @Author: your name
 * @Date: 2021-03-09 14:18:40
 * @LastEditTime: 2021-04-08 09:29:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\comment.vue
-->
<template>
  <div id="indexBody">
    <ttable :columns="columns" :list="list">
      <!-- 内容部分-操作 -->
      <el-table-column slot="evaluationLevel" label="反馈状态" align="center">
        <template slot-scope="scope">
          <el-rate :value="scope.row.evaluationLevel - 0"></el-rate>
        </template>
      </el-table-column>
    </ttable>
    <!-- <el-pagination
      @size-change="handleChange"
      @current-change="handleChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000"
    >
    </el-pagination> -->
  </div>
</template>

<script>
import ttable from '../../common/t_table';
export default {
  name: 'comment',
  components: { ttable },
  props: ['list'],
  data() {
    return {
      currentPage: 1,
      columns: [
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'corpName' },
        { title: '职位名称', prop: 'positionName' },
        { title: '评价星级', prop: 'evaluationLevel', slot: 'evaluationLevel' },
        { title: '评价内容', prop: 'evaluationContent' },
        { title: '评价时间', prop: 'evaluationTime' }
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
