<!--
 * @Author: your name
 * @Date: 2021-03-24 11:12:37
 * @LastEditTime: 2021-06-23 11:05:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\profession\module\makeDate.vue
-->
<template>
  <div id="indexBody">
    <el-dialog width="65%" title="历史标签" :visible="visible" @close="onclose">
      <div>
        <ttable :columns="columns" :list="list">
          <el-table-column slot="districtCode" label="区" align="center">
            <template slot-scope="scope">
              <div v-for="(v, k) in dicOptions.qx" :key="k">
                <el-tag v-if="v.value == scope.row.districtCode">{{
                  v.label
                }}</el-tag>
              </div>
            </template>
          </el-table-column>
        </ttable>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ttable from '../../common/t_table';
import { trim } from '@/utils/index';
export default {
  name: 'lookLabel',
  components: { ttable },
  props: ['visible', 'dataList'],
  data() {
    return {
      dicOptions: {
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx'])
      },
      columns: [
        { title: '序号', type: 'index' },
        { title: '标签名称', prop: 'pointTypeName' },
        { title: '开始时间', prop: 'startTime' },
        { title: '结束时间', prop: 'endTime' },
        { title: '更新时间', prop: 'updateTime' },
        { title: '区', slot: 'districtCode' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: []
    };
  },
  computed: {},
  methods: {
    onclose() {
      this.$emit('onclose');
    }
  },
  mounted() {
    this.list = this.dataList;
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.fontColor {
  color: #787878;
  font-weight: bold;
}
</style>
