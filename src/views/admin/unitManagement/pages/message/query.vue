<!--
 * @Author: your name
 * @Date: 2021-04-12 16:38:40
 * @LastEditTime: 2021-04-12 18:57:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\pages\message\query.vue
-->
<template>
  <el-dialog
    title="查看简历"
    width="800px"
    :visible="visible"
    @close="onclose"
    append-to-body
  >
    <div style="height:500px;overflow: scroll;overflow-x: hidden;">
      <ttable :options="{ loading: loading }" :columns="columns" :list="list">
        <el-table-column
          fixed="right"
          slot="aaa010"
          label="操作"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="look(scope)" plain>
              查看</el-button
            >
          </template>
        </el-table-column>
      </ttable>
      <el-pagination
        @size-change="handleChange"
        @current-change="handleChange"
        :current-page.sync="params.pageIndex"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="params.total"
      >
      </el-pagination>
      <el-tabs v-show="show" v-model="activeName">
        <el-tab-pane label="简历信息" name="first">
          <resume :form="resume"></resume
        ></el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script>
import ttable from '../../../common/t_table';
import { unit_query_resume } from '../../api/index';
import resume from '../../../serviceManagement/pages/resume'; //简历信息
export default {
  name: 'query',
  props: ['visible', 'form'],
  components: {
    ttable,
    resume
  },
  data() {
    return {
      activeName: 'first',
      resume: {},
      show: false,
      params: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      loading: true,
      list: [],
      columns: [
        { title: '序号', type: 'index' },
        { title: '姓名', prop: 'xm' },
        { title: '证件号码', prop: 'zjhm' },
        { title: '操作', slot: 'aaa010' }
      ]
    };
  },
  computed: {},
  methods: {
    look(e) {
      this.resume = { ...e.row };
      this.show = true;
    },
    handleChange(e) {
      console.log(e);
    },
    onclose() {
      this.$emit('onclose');
    }
  },
  mounted() {
    console.log(this.form);
    let data = { ...this.form };
    console.log(data);
    data.pageSize = this.pageSize;
    data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex)) - 1;
    unit_query_resume(
      data,
      res => {
        if (res.status == 200) {
          let pageresult = res.result.pageresult;
          this.list = pageresult.data;
          this.params.pageIndex = Number(pageresult.pageIndex) + 1;
          this.params.total = pageresult.total;
          this.loading = false;
        }
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.title-style {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  line-height: 40px;
  border-bottom: 1px solid #e9eef3;
  text-align: left;
  padding: 0 30px;
  box-sizing: border-box;
  position: relative;
}
.title-style::before {
  content: '';
  width: 4px;
  height: 16px;
  position: absolute;
  left: 12px;
  top: 13px;
  background: $g-mian-color;
}
</style>
