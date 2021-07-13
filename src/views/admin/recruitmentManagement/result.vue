<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-07-13 15:53:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\result.vue
-->
<template>
  <div id="indexBody">
    <tform ref="tform" :formConfig="formConfig" @onsubmit="onsubmit"></tform>
    <ttable :columns="columns" :list="list">
      <el-table-column
        slot="forCollegeGraduates"
        label="是否面向高校毕业生"
        align="center"
      >
        <template slot-scope="scope">
          <div v-for="(v, k) in dicOptions.yesno" :key="k">
            <el-tag v-if="v.value == scope.row.forCollegeGraduates">{{
              v.label
            }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column slot="distictCode" label="管理区" align="center">
        <template slot-scope="scope">
          <div v-for="(v, k) in dicOptions.qx" :key="k">
            <el-tag v-if="v.value == scope.row.distictCode">{{
              v.label
            }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column width="280" slot="aaa009" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="look(scope, 1)" plain>
            <i class="el-icon-plus"></i> 添加</el-button
          >
          <el-button size="mini" type="info" @click="look(scope, 2)" plain>
            <i class="el-icon-search"></i> 查看</el-button
          >
          <el-button size="mini" type="primary" @click="look(scope, 3)" plain>
            <i class="el-icon-edit"></i> 修改</el-button
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
    <resultdetails
      v-if="visible"
      :visible="visible"
      :lookList="form"
      :disabled="disabled"
      :type="type"
      @onclose="onclose"
    ></resultdetails>
  </div>
</template>

<script>
import tform from '../common/t_form'; //高级查询
import { result_query, result_verification } from './api/index';
import { trim } from '@/utils/index';
import ttable from '../common/t_table';
import resultdetails from './pages/resultDetails';
export default {
  name: 'result',
  components: {
    tform,
    ttable,
    resultdetails
  },
  data() {
    return {
      adminId: this.$store.state.admin.userInfo.logonUser.areaInfo.areaCode,
      disabled: false,
      type: '0',
      form: {},
      visible: false,
      dicOptions: {
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx']),
        //是否
        yesno: trim(this.$store.getters['dictionary/yesno'])
      },
      params: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      list: [],
      columns: [
        { title: '序号', type: 'index' },

        { title: '招聘会名称', prop: 'meetName' },
        { title: '管理区', prop: 'distictCode', slot: 'distictCode' },
        {
          title: '是否面向高校毕业生',
          prop: 'forCollegeGraduates',
          slot: 'forCollegeGraduates'
        },
        { title: '招聘单位数', prop: 'corpCount' },
        { title: '招聘职位数', prop: 'positionCount' },
        { title: '招聘人数', prop: 'peopleCount' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',
        formItemList: [
          {
            type: 'input',
            label: '关键字',
            style: { width: '420px' },
            placeholder: '请输入关键字',
            rules: [],
            key: 'meetName'
          },
          {
            type: 'select',
            label: '所属区',
            style: { width: '210px' },
            rules: [],
            key: 'areaId',
            options: trim(this.$store.getters['dictionary/ggjbxx_qx'])
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    onclose(type) {
      if (type == '1') {
        this.onsubmit(this.dataList);
      }
      this.visible = false;
    },
    onsubmit(e) {
      console.log(e);
      let data = { ...e };
      data.pageSize = this.pageSize;
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex)) - 1;
      this.dataList = data;
      result_query(
        data,
        res => {
          if (res.status == 200) {
            let pageresult = res.result.pageresult;
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
    handleChange(e) {
      this.params.pageIndex = e;
      this.onsubmit(this.dataList);
    },
    look(scope, type) {
      this.form = { ...scope.row };
      this.type = type;
      //1 添加 2 查看 3 修改)
      if (type != '2') {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
      if (type == '1') {
        result_verification(
          this.form,
          res => {
            if (res.result.data.result) {
              this.visible = true;
            } else {
              this.$message({
                message: res.result.data.msg,
                type: 'warning',
                duration: 1500
              });
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
        return;
      }
      this.visible = true;
    }
  },
  mounted() {
    this.$refs.tform.value = {
      areaId: this.adminId
    };
  },
  created() {
    if (this.adminId == '00') {
      this.formConfig.formItemList[1].disabled = false;
    } else {
      this.formConfig.formItemList[1].disabled = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
