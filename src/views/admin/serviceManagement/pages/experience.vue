<!--
 * @Author: your name
 * @Date: 2021-03-09 14:15:11
 * @LastEditTime: 2021-04-07 13:38:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\experience.vue
-->
<template>
  <div id="indexBody">
    <ttable :columns="columns" :list="list"> </ttable>
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
  name: 'experience',
  components: { ttable },
  props: ['list'],
  data() {
    return {
      currentPage: 1,
      columns: [
        { title: '序号', type: 'index' },
        { title: '起始日期', prop: 'gzksrq', slot: 'gzksrq' },
        { title: '终止日期', prop: 'gzjsrq', slot: 'gzjsrq' },
        { title: '就业类型', prop: 'jylx' },
        { title: '用工形式', prop: 'ygxs' },
        { title: '工作单位名称', prop: 'dwmc' },
        { title: '单位性质', prop: 'corpNature' },
        { title: '职业工种', prop: 'zygz' },
        { title: '劳务派遣', prop: 'lwpq' },
        { title: '派遣去向', prop: 'pqqx' },
        { title: '派遣期限', prop: 'pqqx' },
        { title: '备注', prop: 'bz' }
      ]
    };
  },
  computed: {},
  methods: {
    formatTime(val) {
      if (val.length >= 8) {
        return (
          val.substring(0, 4) +
          '年' +
          val.substring(4, 6) +
          '月' +
          val.substring(6, 8) +
          '日'
        );
      } else {
        return val;
      }
    },
    handleChange(e) {
      console.log;
    }
  },
  created() {}
};
</script>
