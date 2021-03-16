<!--
 * @Author: your name
 * @Date: 2021-03-09 14:18:24
 * @LastEditTime: 2021-03-10 13:51:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\getAJob.vue
-->
<template>
  <div id="indexBody">
    <ttable :columns="columns" :list="list">
      <!-- 内容部分-操作 -->
      <el-table-column slot="headerTime" label="时间" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)"
            >时间</el-button
          ><el-tag type="success">时间</el-tag>
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
  name: 'getAJob',
  components: { ttable },
  data() {
    return {
      currentPage: 1,
      columns: [
        { title: '序号', type: 'index' },
        { title: '起始年月', prop: 'aaa001' },
        { title: '终止年月', prop: 'aaa002' },
        { title: '见习基地名称', prop: 'aaa003' },
        { title: '见习岗位名称', prop: 'aaa004' }
      ],
      list: [
        {
          aaa001: '2019-05-01',
          aaa002: '2019-05-01',
          aaa003: '测试',
          aaa004: '测试'
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
