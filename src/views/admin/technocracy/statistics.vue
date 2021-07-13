<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:46:47
 * @LastEditTime: 2021-07-13 15:06:05
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
              v-model="form.Month"
              type="monthrange"
              start-placeholder="开始年月"
              end-placeholder="结束月份"
              value-format="yyyyMM"
            ></el-date-picker>
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
        <el-col :span="12">
          <el-form-item label="区">
            <el-select
              :disabled="adminId == '00' ? false : true"
              v-model="form.districtCode"
              placeholder="请选择区"
            >
              <el-option
                v-for="(v, k) in setQx()"
                :key="k"
                :label="v.label"
                :value="v.value"
                >{{ v.label }}</el-option
              >
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
    <div>
      <ttable :columns="columns" :list="list">
        <el-table-column
          slot="districtCode"
          width="80"
          label="管理区"
          align="center"
        >
          <template slot-scope="scope">
            <div v-for="(v, k) in dicOptions.qx" :key="k">
              <el-tag v-if="v.value == scope.row.districtCode">
                {{ v.label }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
      </ttable>
      <div
        style="text-align:right;padding:5px 15px;border-bottom:1px solid #c0c4cc"
      >
        支付费用合计：
        <span style="color:#fc6f3d;padding:0 15px">{{ mouey }}</span>
      </div>
    </div>

    <!-- <el-pagination
      @size-change="handleChange"
      @current-change="handleChange"
      :current-page.sync="params.pageIndex"
      :page-size="params.pageSize"
      layout="total, prev, pager, next"
      :total="params.total"
    >
    </el-pagination>-->

    <div style="text-align:right;padding:5px 15px;">
      <el-button v-if="form.type == '2'" type="primary" @click="visible = true"
        >打印预览</el-button
      >
    </div>
    <el-dialog
      title="打印预览"
      width="1085px"
      :visible="visible"
      @close="visible = false"
    >
      <div ref="print">
        <h1 style="text-align:center;margin:25px 0">
          日常经费支付清单（{{ getMonth() }}）
        </h1>
        <table class="table">
          <thead>
            <tr>
              <th>序号</th>
              <th>管理区</th>
              <th>专家姓名</th>
              <th>身份证号</th>
              <th>开户银行</th>
              <th>银行账户</th>
              <th width="144px">服务时间</th>
              <th>服务次数</th>
              <th>支付费用</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <template v-for="(v, k) in dicOptions.qx">
                  <el-tag :key="k" v-if="v.value == item.districtCode">
                    {{ v.label }}
                  </el-tag>
                </template>
              </td>
              <td>{{ item.expertName }}</td>
              <td>{{ item.expertZjhm }}</td>
              <td>{{ item.bankName }}</td>
              <td>{{ item.bankaccount }}</td>
              <td width="150px">{{ item.actDate }}</td>
              <td>{{ item.serviceCount }}</td>
              <td>{{ item.payTotal }}</td>
            </tr>
          </tbody>
        </table>
        <div
          style="text-align:right;padding:5px 15px;border-bottom:1px solid #ebeef5"
        >
          支付费用合计：
          <span style="color:#fc6f3d;padding:0 15px">{{ mouey }}</span>
        </div>
        <div
          style="display: flex;width: 100%;text-align: center;padding:60px 15px 30px 15px;font-size: 16px;font-weight: bold;"
        >
          <div style="flex:1">
            __________区分管领导：
          </div>
          <div style="flex:1">部分负责人：</div>
          <div style="flex:1">经办人：</div>
        </div>
        <div
          style="padding: 30px 15px;font-size: 16px;font-weight: bold;text-align: right;"
        >
          <span
            >日期：
            <div style="display: inline-block;width:80px"></div>
            年
            <div style="display: inline-block;width:50px"></div>
            月
            <div style="display: inline-block;width:50px"></div>
            日</span
          >
        </div>
      </div>
      <div style="text-align:right;padding:5px 15px;">
        <el-button type="primary" @click="print()">打印</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ttable from '../common/t_table';
import { statistics_query, statistics_dtl } from './api/index';
import { trim } from '@/utils/index';
const columnsArr = [
  [
    { title: '序号', type: 'index' },
    { title: '日期', prop: 'payMonth' },
    { title: '支付费用', prop: 'payTotal', sortable: true }
  ],
  [
    { title: '序号', type: 'index', width: 50 },
    { title: '所属区', prop: 'districtCode', slot: 'districtCode' },
    { title: '专家姓名', prop: 'expertName' },
    { title: '身份证号', prop: 'expertZjhm' },
    { title: '开户银行', prop: 'bankName' },
    { title: '银行账号', prop: 'bankaccount' },
    { title: '服务时间', prop: 'actDate' },
    { title: '服务次数', prop: 'serviceCount', width: 50 },
    { title: '支付费用', prop: 'payTotal', sortable: true, width: 120 }
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
      visible: false,
      adminId: this.$store.state.admin.userInfo.logonUser.areaInfo.areaCode,
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
        startMonth: getYYYYMM(),
        districtCode: this.$store.state.admin.userInfo.logonUser.areaInfo
          .areaCode
      },
      list: [],
      columns: []
    };
  },
  computed: {},
  methods: {
    getMonth() {
      let data = { ...this.form };
      if (data.Month) {
        let start = data.Month[0];
        start = start.substring(0, 4) + '年' + start.substring(4, 6) + '月';
        let end = data.Month[1];
        end = end.substring(0, 4) + '年' + end.substring(4, 6) + '月';
        return start + '-' + end;
      }
      return 'XXXX年XX月-XXXX年XX月';
    },
    setQx() {
      let qx = [...trim(this.$store.getters['dictionary/ggjbxx_qx'])];
      qx.unshift({ label: '全部', value: '' });
      return qx;
    },
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
      if (data.Month) {
        data.startMonth = data.Month[0];
        data.endMonth = data.Month[1];
      }

      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex - 1));

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

        this.mouey = this.digitUppercase(val);
      }
    },
    digitUppercase(n) {
      var fraction = ['角', '分'];
      var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
      var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
      ];
      var head = n < 0 ? '欠' : '';
      n = Math.abs(n);
      var s = '';
      for (var i = 0; i < fraction.length; i++) {
        s += (
          digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
        ).replace(/零./, '');
      }
      s = s || '整';
      n = Math.floor(n);
      for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p;
          n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
      }
      return (
        head +
        s
          .replace(/(零.)*零元/, '元')
          .replace(/(零.)+/g, '零')
          .replace(/^整$/, '零元整')
      );
    }
  },
  mounted() {
    this.columns = columnsArr[0];
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.table {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  td {
    border: 1px solid #ebeef5;
    padding: 10px 0;
  }
  th {
    padding: 15px 0;
    border: 1px solid #ebeef5;
  }
}
</style>
