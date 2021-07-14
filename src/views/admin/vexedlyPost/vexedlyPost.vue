<!--
 * @Author: your name
 * @Date: 2021-04-01 15:33:13
 * @LastEditTime: 2021-07-14 13:36:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\pages\recruitmentDetail.vue
-->
<template>
  <div id="indexBody">
    <tform
      ref="form"
      :formConfig="formConfig"
      @onsubmit="advancedSearch"
    ></tform>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未标记急招职位" name="0">
        <ttable
          :options="{ height: '350px' }"
          :tableClass="'tableClass'"
          :columns="columns"
          :list="list0"
        >
          <el-table-column slot="salary" label="薪酬" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.salaryMin + '-' + scope.row.salaryMax }}月</div>
            </template>
          </el-table-column>
          <el-table-column slot="eduRequire" label="学历要求" align="center">
            <template slot-scope="scope">
              <template v-for="(v, k) in dicOptions.edu">
                <div :key="k" v-if="v.value == scope.row.eduRequire">
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
              <el-popconfirm
                title="确定标记为急招吗？"
                @confirm="positionAudit(scope)"
              >
                <el-button size="mini" type="primary" slot="reference" plain>
                  标记为急招</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange0"
          @current-change="handleChange0"
          :current-page.sync="params0.pageIndex"
          :page-size="params0.pageSize"
          layout="total, prev, pager, next"
          :total="params0.total"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="已标记急招职位" name="1">
        <ttable :options="{ height: '350px' }" :columns="columns" :list="list1">
          <el-table-column slot="salary" label="薪酬" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.salaryMin + '-' + scope.row.salaryMax }}月</div>
            </template>
          </el-table-column>
          <el-table-column slot="eduRequire" label="学历要求" align="center">
            <template slot-scope="scope">
              <template v-for="(v, k) in dicOptions.edu">
                <div :key="k" v-if="v.value == scope.row.eduRequire">
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
              <el-popconfirm
                title="确定标记为急招吗？"
                @confirm="resAudit(scope)"
              >
                <el-button slot="reference" size="mini" type="primary" plain>
                  <i class="el-icon-chat-dot-round"></i> 取消标记</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange1"
          @current-change="handleChange1"
          :current-page.sync="params1.pageIndex"
          :page-size="params1.pageSize"
          layout="total, prev, pager, next"
          :total="params1.total"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { saveUrg, deleteUrg, queryAll, queryUrg } from './api/index';
import { trim } from '@/utils/index';
import ttable from '../common/t_table';
import tform from '../common/t_form';
export default {
  name: 'vexedlyPost',
  props: ['visible', 'form'],
  components: { ttable, tform },
  data() {
    return {
      adminId: this.$store.state.admin.userInfo.logonUser.areaInfo.areaCode,
      resData: [],
      activeName: '0',
      params0: {
        pageIndex: 1,
        total: 0,
        pageSize: 10
      },
      params1: {
        pageIndex: 1,
        total: 0,
        pageSize: 10
      },

      dicOptions: {
        //学历
        edu: trim(this.$store.getters['dictionary/recruit_edu']),
        //工作年限
        year: trim(this.$store.getters['dictionary/recruit_work_year'])
      },
      columns: [
        { title: '序号', type: 'index' },
        { title: '职位名称', prop: 'positionName' },
        { title: '薪酬', prop: 'salary', slot: 'salary' },
        { title: '学历要求', prop: 'eduRequire', slot: 'eduRequire' },
        { title: '工作年限', prop: 'workYearNeed', slot: 'workYearNeed' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      list0: [],
      list1: [],
      dataList: {},
      dataList2: {},
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',

        formItemList: [
          {
            type: 'input',
            label: '职位名称',
            style: { width: '210px' },
            placeholder: '请输入账号名',
            rules: [],
            key: 'positionName'
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    advancedSearch() {
      if (this.activeName == '1') {
        this.queryResume(this.form);
      } else {
        this.queryPosition(this.form);
      }
    },
    positionAudit(e) {
      let data = {
        districtCode: this.adminId,
        positionIdList: [e.row.positionId]
      };
      saveUrg(
        data,
        res => {
          if (res.status == 200) {
            this.message('success', '操作成功');
            this.queryPosition(this.form);
          }

          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    resAudit(e) {
      let data = { positionIdList: [e.row.positionId] };
      deleteUrg(
        data,
        res => {
          if (res.status == 200) {
            this.message('success', '操作成功');
            this.queryResume(this.form);
          }

          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
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
      this.params0.pageIndex = e;
      this.queryPosition(this.dataList);
    },
    handleChange1(e) {
      console.log(e);
      this.params1.pageIndex = e;
      this.queryResume(this.dataList2);
    },
    queryPosition(e) {
      let pageParam = { ...this.params0 };
      let data = { ...e, pageParam, ...this.$refs.form.value };
      //分页
      data.pageParam.pageIndex = JSON.parse(
        JSON.stringify(this.params0.pageIndex - 1)
      );
      data.districtCode = this.adminId;
      this.dataList = data;
      queryAll(
        data,
        res => {
          if (res.status == 200) {
            this.message('success', '操作成功');
            let pageresult = res.result.pageresult;
            this.list0 = pageresult.data;
            this.params0.pageIndex = Number(pageresult.pageIndex) + 1;
            this.params0.total = pageresult.total;
            console.log(this.list0);
          }

          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    queryResume(e) {
      let pageParam = { ...this.params1 };
      let data = { ...e, pageParam, ...this.$refs.form.value };
      //分页
      data.pageParam.pageIndex = JSON.parse(
        JSON.stringify(this.params1.pageIndex - 1)
      );
      data.districtCode = this.adminId;
      this.dataList2 = data;
      queryUrg(
        data,
        res => {
          if (res.status == 200) {
            this.message('success', '操作成功');
            let pageresult = res.result.pageresult;
            this.list1 = pageresult.data;
            this.params1.pageIndex = Number(pageresult.pageIndex) + 1;
            this.params1.total = pageresult.total;
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  mounted() {
    // this.queryResume(this.form);
    // this.queryPosition(this.form);
  },
  created() {}
};
</script>
<style lang="scss" scoped></style>
