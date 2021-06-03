<!--
 * @Author: your name
 * @Date: 2021-03-24 11:12:37
 * @LastEditTime: 2021-06-03 17:00:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\profession\module\userDetails.vue
-->
<template>
  <div id="indexBody">
    <el-dialog
      width="700px"
      title="人员详细"
      :visible="visible"
      append-to-body
      @close="onclose"
    >
      <div style="height:600px;overflow:auto">
        <ttable :columns="columns" :list="list">
          <el-table-column slot="isApply" label="是否到场" align="center">
            <template slot-scope="scope">
              <el-switch
                @change="ischange($event, scope)"
                v-model="scope.row.isApply"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
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
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { act_apply_query, act_apply_modify } from '../api/index';
import ttable from '../../common/t_table';
export default {
  name: 'userDetails',
  components: { ttable },
  props: ['visible', 'dataList'],
  data() {
    return {
      params: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      columns: [
        // { type: 'selection' },
        { title: '序号', type: 'index' },
        { title: '姓名', prop: 'xm' },
        { title: '证件号码', prop: 'zjhm' },
        { title: '是否到场', prop: 'isApply', slot: 'isApply' }
      ],
      list: [],
      queryData: {}
    };
  },
  computed: {},
  methods: {
    message(type, msg, fn) {
      this.$message({
        message: msg,
        type: type,
        duration: 1000,
        onClose: () => {
          if (fn) {
            fn();
          }
        }
      });
    },
    ischange(e, s) {
      let yesno = e ? '1' : '0';
      let data = {
        attendStatus: yesno,
        recordId: s.row.recordId
      };
      act_apply_modify(
        [data],
        res => {
          if (res.result.data.result) {
            this.$emit('isApply', e);
            this.message('success', '操作成功');
          } else {
            this.message('warning', res.result.data.msg);
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    handleChange(e) {
      console.log(e);
      this.params.pageIndex = e;
      this.queryList(this.queryData);
    },
    queryList(data) {
      act_apply_query(
        data,
        res => {
          if (res.status == 200) {
            let pageresult = res.result.data;
            pageresult.data = pageresult.data.map(e => {
              if (e.attendStatus == '1') {
                e.isApply = true;
              } else {
                e.isApply = false;
              }
              return e;
            });
            this.list = pageresult.data;
            this.params.pageIndex = Number(pageresult.pageIndex) + 1;
            this.params.total = pageresult.total;
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    onclose() {
      this.$emit('onclose');
    }
  },
  mounted() {
    let data = {
      actId: this.dataList.actId,
      pageIndex: JSON.parse(JSON.stringify(this.params.pageIndex)) - 1,
      pageSize: this.pageSize,
      applyType: this.dataList.userType
    };
    this.queryData = data;
    this.queryList(data);
    console.log(this.dataList);
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
