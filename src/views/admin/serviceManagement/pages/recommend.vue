<!--
 * @Author: your name
 * @Date: 2021-03-09 17:47:29
 * @LastEditTime: 2021-03-10 09:14:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\recommend.vue
-->
<template>
  <el-dialog title="推荐职位" :visible="visible" @close="onclose">
    <pl-table
      ref="serveTable"
      :data="tableData"
      :columns="columns"
      show-pager
      v-if="modeValue"
    >
    </pl-table>
    <el-row>
      <el-col style="text-align:center;margin-top:15px">
        <el-button type="primary">推荐简历</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'recommend',
  props: ['visible'],
  components: {},
  data() {
    return {
      modeValue: true,
      tableData: [
        {
          aaa001: '2019-05-01',
          aaa002: '2019-05-01',
          aaa003: '测试',
          aaa004: '测试'
        }
      ]
    };
  },
  computed: {
    columns() {
      return [
        { attrs: { type: 'selection' } },
        {
          label: '序号',
          attrs: { type: 'index', width: 50 }
        },
        { label: '起始年月', prop: 'aaa001', formatter: 'date' },
        { label: '终止年月', prop: 'aaa002', formatter: 'date' },
        { label: '见习基地名称', prop: 'aaa003' },
        { label: '见习岗位名称', prop: 'aaa004' }
      ];
    }
  },
  methods: {
    onclose() {
      this.$emit('onclose');
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped></style>
