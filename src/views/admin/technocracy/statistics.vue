<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:46:47
 * @LastEditTime: 2021-05-24 16:19:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="开始年月">
            <el-date-picker
              v-model="form.startMonth"
              type="month"
              start-placeholder="请选择开始年月"
              value-format="yyyyMM"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报表类型">
            <el-select
              v-model="form.type"
              placeholder="请选择报表类型"
              @change="formselect"
            >
              <el-option label="日常经费汇总" value="1"></el-option>
              <el-option label="日常经费清单" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div style="text-align:center">
        <el-button type="primary" icon="el-icon-search" @click="onSubmit"
          >搜索</el-button
        >
      </div>
    </el-form>
    <div ref="print">
      <ttable :columns="columns" :list="list">
        <el-table-column slot="districtCode" label="管理区" align="center">
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
    <!-- <el-pagination
      @size-change="handleChange"
      @current-change="handleChange"
      :current-page.sync="params.pageIndex"
      :page-size="params.pageSize"
      layout="total, prev, pager, next"
      :total="params.total"
    >
    </el-pagination> -->
    <div
      style="text-align:right;padding:5px 15px;border-bottom:1px solid #c0c4cc"
    >
      支付费用合计：
      <span style="color:#fc6f3d;padding:0 15px">{{ mouey }}元</span>
    </div>
    <div style="text-align:right;padding:5px 15px;">
      <el-button type="primary" @click="print()">打印</el-button>
    </div>
  </div>
</template>

<script>
import ttable from '../common/t_table';
import { statistics_query } from './api/index';
import { trim } from '@/utils/index';
const columnsArr = [
  [
    { title: '序号', type: 'index' },
    { title: '日期', prop: 'payMonth' },
    { title: '支付费用', prop: 'payTotal' }
  ],
  [
    { title: '序号', type: 'index' },
    { title: '所属区', prop: 'districtCode', slot: 'districtCode' },
    { title: '专家姓名', prop: 'expertName' },
    { title: '身份证号', prop: 'expertZjhm' },
    { title: '银行账号', prop: 'bankaccount' },
    { title: '开户银行', prop: 'bankName' },
    { title: '服务时间', prop: 'actDate' },
    { title: '支付费用', prop: 'payTotal' }
  ]
];
export default {
  name: 'personLayout',
  components: {
    ttable
  },
  data() {
    let getYYYYMM = () => {
      let d = new Date();
      let y = d.getFullYear();
      let m = d.getMonth() + 1;
      return y + '' + (m > 9 ? m : '0' + m);
    };
    return {
      dicOptions: {
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx'])
      },
      params: {
        pageIndex: 1,
        total: 0,
        pageSize: 100
      },
      mouey: 0,
      form: {
        type: '1',
        startMonth: getYYYYMM()
      },
      list: [],
      columns: []
    };
  },
  computed: {},
  methods: {
    print() {
      // 打印
      this.$print(this.$refs.print);
    },
    handleChange(e) {
      console.log(e);
    },
    message(type, msg) {
      this.$message({
        message: msg,
        type: type,
        duration: 1000,
        onClose: () => {}
      });
    },
    formselect(e) {
      this.columns = columnsArr[e - 1];
      this.list = [];
      this.mouey = 0;
      console.log(e);
    },
    onSubmit() {
      let data = { ...this.params, ...this.form };
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex - 1));
      if (data.startMonth) {
        data.endMonth = data.startMonth;
      }
      statistics_query(
        data,
        res => {
          if (res.status == 200) {
            this.message('success', '操作成功');
            let pageresult = res.result.pageresult;
            this.list = pageresult.data;
            this.setMouey(pageresult.data);
            this.params.pageIndex = Number(pageresult.pageIndex) + 1;
            this.params.total = pageresult.total;
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
    setMouey(list) {
      if (list) {
        let val = 0;
        let type = 'payTotal';
        for (let i = 0; i < list.length; i++) {
          val = val + (list[i][type] - 0);
        }
        this.mouey = val;
      }
    }
  },
  mounted() {
    this.columns = columnsArr[0];
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
