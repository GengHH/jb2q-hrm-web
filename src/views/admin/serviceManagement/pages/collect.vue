<!--
 * @Author: your name
 * @Date: 2021-03-09 14:18:47
 * @LastEditTime: 2021-03-10 14:37:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\collect.vue
-->
<template>
  <div id="indexBody">
    <ttable :columns="columns" :list="list">
      <!-- 内容部分-操作 -->
      <el-table-column slot="aaa002" label="职位名称" align="center">
        <template slot-scope="scope">
          <el-tag type="warning">{{ scope.row.aaa002 }}</el-tag>
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
  name: 'collect',
  components: { ttable },
  data() {
    return {
      currentPage: 1,
      columns: [
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'aaa001' },
        { title: '职位名称', prop: 'aaa002', slot: 'aaa002' },
        { title: '薪酬', prop: 'aaa003' },
        { title: '学历要求', prop: 'aaa004' },
        { title: '工作年限', prop: 'aaa005' },
        { title: '工作性质', prop: 'aaa006' },
        { title: '招聘人数', prop: 'aaa007' },
        { title: '工作地点', prop: 'aaa008' },
        { title: '发布时间', prop: 'aaa009' },
        { title: '收藏时间', prop: 'aaa010' }
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
          aaa009: '测试',
          aaa010: '测试'
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
