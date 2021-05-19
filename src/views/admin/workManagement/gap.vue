<!--
 * @Author: your name
 * @Date: 2021-03-05 09:55:06
 * @LastEditTime: 2021-05-18 19:38:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="0">
        <ttable
          :options="{ height: '350px' }"
          :tableClass="'tableClass'"
          :columns="columns0"
          :list="list0"
        >
          <el-table-column slot="salary" label="薪酬" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.salaryMin + '-' + scope.row.salaryMax }}月</div>
            </template>
          </el-table-column>
          <el-table-column slot="eduRequir" label="学历要求" align="center">
            <template slot-scope="scope">
              <template v-for="(v, k) in dicOptions.edu">
                <div :key="k" v-if="v.value == scope.row.eduRequir">
                  {{ v.label }}
                </div>
              </template>
            </template>
          </el-table-column>
          <el-table-column slot="workYearNeed" label="工作年限" align="center">
            <template slot-scope="scope">
              <template v-for="(v, k) in dicOptions.year">
                <div :key="k" v-if="v.value == scope.row.workYearNeed">
                  {{ v.label }}
                </div>
              </template>
            </template>
          </el-table-column>

          <el-table-column slot="aaa009" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                plain
                @click="positionAudit('1', scope)"
              >
                <i class="el-icon-chat-dot-round"></i> 审核</el-button
              >
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-search"
                @click="positionAudit('0', scope)"
                plain
                >查看</el-button
              >
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-search"
                @click="positionAudit('0', scope)"
                plain
                >反馈</el-button
              >
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange0"
          @current-change="handleChange0"
          :current-page.sync="params0.pageIndex"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="params0.total"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="已审核" name="1">
        <ttable
          :options="{ height: '350px' }"
          :columns="columns1"
          :list="list1"
        >
          <el-table-column slot="workYearNeed" label="工作年限" align="center">
            <template slot-scope="scope">
              <template v-for="(v, k) in dicOptions.year">
                <div :key="k" v-if="v.value == scope.row.workYearNeed">
                  {{ v.label }}
                </div>
              </template>
            </template>
          </el-table-column>
          <el-table-column slot="aaa009" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                plain
                @click="resAudit('1', scope)"
              >
                <i class="el-icon-chat-dot-round"></i> 审核</el-button
              >
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-search"
                @click="resAudit('0', scope)"
                plain
                >查看</el-button
              >
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-search"
                @click="positionAudit('0', scope)"
                plain
                >反馈</el-button
              >
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange1"
          @current-change="handleChange1"
          :current-page.sync="params1.pageIndex"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="params1.total"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
    <auditdetails
      v-if="resVisible"
      :resVisible="resVisible"
      :data="resData"
      :type="type"
      @onclose="resClose"
    ></auditdetails>
    <unauditdetails
      v-if="positionVisible"
      :data="positionData"
      :resVisible="positionVisible"
      :type="type"
      @onclose="positionClose"
    ></unauditdetails>
  </div>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../common/t_form';
import ttable from '../common/t_table';
import auditdetails from './module/gap/audit';
import unauditdetails from './module/gap/unAudit';
import {
  user_query,
  user_querySysm,
  user_edit,
  user_del,
  user_add
} from './api/index';

export default {
  name: 'gap',
  components: { ttable, tform, auditdetails, unauditdetails },
  data() {
    return {
      type: '',
      resData: [],
      positionData: [],
      resVisible: true,
      positionVisible: false,
      auditStutas: '1',
      activeName: '0',
      params0: {
        pageIndex: 1,
        total: 0
      },
      params1: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',

        formItemList: [
          {
            type: 'input',
            label: '账号名',
            style: { width: '210px' },
            placeholder: '请输入账号名',
            rules: [],
            key: 'userName'
          },
          {
            type: 'input',
            label: '姓名',
            style: { width: '210px' },
            placeholder: '请输入姓名',
            rules: [],
            key: 'name'
          }
        ]
      },
      dicOptions: {
        //学历
        edu: trim(this.$store.getters['dictionary/recruit_edu']),
        //工作年限
        year: trim(this.$store.getters['dictionary/recruit_work_year'])
      },
      columns0: [
        { title: '序号', type: 'index' },
        { title: '职位名称', prop: 'positionName' },
        { title: '薪酬', prop: 'salary', slot: 'salary' },
        { title: '学历要求', prop: 'eduRequir', slot: 'eduRequir' },
        { title: '工作年限', prop: 'workYearNeed', slot: 'workYearNeed' },
        { title: '工作地点', prop: 'workAddress' },
        { title: '发布时间', prop: 'releaseTime' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      columns1: [
        { title: '序号', type: 'index' },
        { title: '姓名', prop: 'xm' },
        { title: '应聘职位', prop: 'positionName' },
        { title: '工作年限', prop: 'workYearNeed', slot: 'workYearNeed' },
        { title: '毕业院校', prop: 'collegesName' },
        { title: '投递时间', prop: 'createTime' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      list0: [{}],
      list1: [{}]
    };
  },
  computed: {},
  methods: {
    advancedSearch(e) {
      let data = { ...this.params, ...e };
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex - 1));
      data.pageSize = this.pageSize;
      this.dataList = data;
      user_query(
        data,
        res => {
          if (res.status == 200) {
            this.message('success', '操作成功');
            let pageresult = res.result.pageresult;
            this.list = pageresult.data;
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
    positionAudit(type, e) {
      this.type = type;
      this.positionData = { ...e.row };
      this.positionVisible = true;
    },
    resAudit(type, e) {
      this.type = type;
      this.resData = { ...e.row };
      this.resVisible = true;
    },
    message(type, msg) {
      this.$message({
        message: msg,
        type: type,
        duration: 1000,
        onClose: () => {}
      });
    },
    auditType(type) {
      this.auditStutas = type;
      if (this.activeName == '1') {
        this.queryResume(this.form);
      } else {
        this.queryPosition(this.form);
      }
    },
    handleClick(e) {
      console.log(e.name);
      if (e.name == '1') {
        this.queryResume(this.form);
      } else {
        this.queryPosition(this.form);
      }
    },
    handleChange0(e) {
      console.log(e);
    },
    handleChange1(e) {
      console.log(e);
    },
    positionClose(type) {
      if (type == '1') {
        this.queryResume(this.form);
        this.queryPosition(this.form);
      }
      this.positionVisible = false;
    },
    resClose(type) {
      if (type == '1') {
        this.queryResume(this.form);
        this.queryPosition(this.form);
      }
      this.resVisible = false;
    },
    onclose() {
      this.$emit('onclose');
    },
    queryPosition(e) {
      let data = { ...e, ...this.params0 };
      data.type = this.auditStutas;
      //招聘类型 1自主 2代理
      data.recruitType = '2';
      //分页
      data.pageIndex = JSON.parse(JSON.stringify(this.params0.pageIndex - 1));
      data.pageSize = this.pageSize;
      // unit_query_agency(
      //   data,
      //   res => {
      //     if (res.status == 200) {
      //       this.message('success', '操作成功');
      //       let pageresult = res.result.pageresult;
      //       this.list0 = pageresult.data;
      //       this.params0.pageIndex = Number(pageresult.pageIndex) + 1;
      //       this.params0.total = pageresult.total;
      //       console.log(this.list0);
      //     }

      //     console.log(res);
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
    },
    queryResume(e) {
      let data = { ...e, ...this.params1 };
      data.type = this.auditStutas;
      //分页
      data.pageIndex = JSON.parse(JSON.stringify(this.params1.pageIndex - 1));
      data.pageSize = this.pageSize;
      // agency_resume(
      //   data,
      //   res => {
      //     if (res.status == 200) {
      //       this.message('success', '操作成功');
      //       let pageresult = res.result.pageresult;
      //       this.list1 = pageresult.data;
      //       this.params1.pageIndex = Number(pageresult.pageIndex) + 1;
      //       this.params1.total = pageresult.total;
      //     }
      //     console.log(res);
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
    }
  },
  mounted() {},
  created() {}
};
</script>

<style lang="scss" scoped></style>
