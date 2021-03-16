<!--
 * @Author: your name
 * @Date: 2021-03-09 14:15:11
 * @LastEditTime: 2021-03-10 15:04:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\experience.vue
-->
<template>
  <div id="indexBody">
    <ttable :columns="columns" :list="list"> </ttable>
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
  name: 'experience',
  components: { ttable },
  data() {
    return {
      currentPage: 1,
      columns: [
        { title: '序号', type: 'index' },
        { title: '起始日期', prop: 'aaa001' },
        { title: '终止日期', prop: 'aaa002' },
        { title: '就业类型', prop: 'aaa003' },
        { title: '用工形式', prop: 'aaa004' },
        { title: '工作单位名称', prop: 'aaa005' },
        { title: '单位性质', prop: 'aaa006' },
        { title: '职业工种', prop: 'aaa007' },
        { title: '劳务派遣', prop: 'aaa008' },
        { title: '派遣去向', prop: 'aaa009' },
        { title: '派遣期限', prop: 'aaa010' },
        { title: '备注', prop: 'aaa011' }
      ],
      list: [
        {
          aaa001: '2019-05-01',
          aaa002: '2019-05-01',
          aaa003: '测试',
          aaa004: '测试',
          aaa005: '测试',
          aaa006: '测试',
          aaa007: '测试',
          aaa008: '测试',
          aaa009: '测试',
          aaa010: '测试',
          aaa011: '测试'
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
