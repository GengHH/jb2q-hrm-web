<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:46:47
 * @LastEditTime: 2021-03-15 18:39:00
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
              v-model="form.name"
              type="daterange"
              range-separator=""
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报表类型">
            <el-select
              v-model="form.region"
              placeholder="请选择报表类型"
              @change="formselect"
            >
              <el-option label="区域一" value="0"></el-option>
              <el-option label="区域二" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <div style="text-align:center">
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button>取消</el-button>
        </div>
      </el-form-item>
    </el-form>
    <ttable :columns="columns" :list="list"></ttable>
    <div
      style="text-align:right;padding:5px 15px;border-bottom:1px solid #c0c4cc"
    >
      支付费用合计：
      <span style="color:#fc6f3d;padding:0 15px">{{ mouey }}元</span>
    </div>
    <div style="text-align:right;padding:5px 15px;">
      <el-button type="primary">打印</el-button>
    </div>
  </div>
</template>

<script>
import ttable from '../common/t_table';
const columnsArr = [
  [
    { title: '序号', type: 'index' },
    { title: '日期', prop: 'aaa001' },
    { title: '支付费用', prop: 'aaa002' }
  ],
  [
    { title: '序号', type: 'index' },
    { title: '所属区', prop: 'aaa001' },
    { title: '专家姓名', prop: 'aaa002' },
    { title: '身份证号', prop: 'aaa003' },
    { title: '银行账号', prop: 'aaa004' },
    { title: '开户银行', prop: 'aaa005' },
    { title: '服务时间', prop: 'aaa006' },
    { title: '支付费用', prop: 'aaa007' }
  ]
];
export default {
  name: 'personLayout',
  components: {
    ttable
  },
  data() {
    return {
      mouey: 0,
      form: {
        name: '',
        region: '0'
      },
      list: [],
      columns: [],
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',
        style: {
          width: '100%',
          margin: '0 auto'
        },
        formItemList: [
          {
            type: 'daterange',
            label: '开始年月',
            style: { width: '100%' },
            placeholder: '请输入专家编号',
            rules: [],
            key: 'name2'
          },
          {
            type: 'select',
            style: { width: '100%' },
            label: '报表类型',
            rules: [],
            key: 'aaa',
            options: [
              {
                value: '1',
                label: '男',
                disabled: false
              },
              {
                value: '0',
                label: '女',
                disabled: false
              }
            ]
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    formselect(e) {
      this.columns = columnsArr[e - 0];
      console.log(e);
    },
    onSubmit() {}
  },
  mounted() {
    this.columns = columnsArr[0];
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
