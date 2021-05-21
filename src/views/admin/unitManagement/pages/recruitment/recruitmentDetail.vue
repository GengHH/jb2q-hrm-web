<!--
 * @Author: your name
 * @Date: 2021-04-01 15:33:13
 * @LastEditTime: 2021-05-20 17:11:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\pages\recruitmentDetail.vue
-->
<template>
  <el-dialog title="代理招聘" width="850px" :visible="visible" @close="onclose">
    <div id="indexBody">
      <div class="queryList">
        <el-button-group>
          <el-button
            @click="auditType('1')"
            size="mini"
            :type="auditStutas == '1' ? 'primary' : ''"
            >待审核</el-button
          >
          <el-button
            @click="auditType('2')"
            size="mini"
            :type="auditStutas == '2' ? 'primary' : ''"
            >通过</el-button
          >
          <el-button
            @click="auditType('3')"
            size="mini"
            :type="auditStutas == '3' ? 'primary' : ''"
            >不通过</el-button
          >
        </el-button-group>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane style="margin-top:30px" label="职位" name="0">
          <ttable
            :options="{ height: '350px' }"
            :tableClass="'tableClass'"
            :columns="columns0"
            :list="list0"
          >
            <el-table-column slot="salary" label="薪酬" align="center">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.salaryMin + '-' + scope.row.salaryMax }}月
                </div>
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
            <el-table-column
              slot="workYearNeed"
              label="工作年限"
              align="center"
            >
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
                  v-if="auditStutas == '1'"
                  size="mini"
                  type="primary"
                  plain
                  @click="positionAudit('1', scope)"
                >
                  <i class="el-icon-chat-dot-round"></i> 审核</el-button
                >
                <el-button
                  v-if="auditStutas != '1'"
                  size="mini"
                  type="primary"
                  icon="el-icon-search"
                  @click="positionAudit('0', scope)"
                  plain
                  >查看</el-button
                >
                <el-button
                  style="margin-top:5px"
                  v-if="auditStutas != '1'"
                  size="mini"
                  type="primary"
                  icon="el-icon-user-solid"
                  @click="positionAudit('0', scope)"
                  plain
                  >精准推荐</el-button
                >
                <el-button
                  style="margin-top:5px"
                  v-if="auditStutas != '1'"
                  size="mini"
                  type="primary"
                  icon="el-icon-user"
                  @click="autonomously('0', scope)"
                  plain
                  >自主推荐</el-button
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
        <el-tab-pane style="margin-top:30px" label="简历" name="1">
          <ttable
            :options="{ height: '350px' }"
            :columns="columns1"
            :list="list1"
          >
            <el-table-column
              slot="workYearNeed"
              label="工作年限"
              align="center"
            >
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
                  v-if="auditStutas == '1'"
                  size="mini"
                  type="primary"
                  plain
                  @click="resAudit('1', scope)"
                >
                  <i class="el-icon-chat-dot-round"></i> 审核</el-button
                >
                <el-button
                  v-if="auditStutas != '1'"
                  size="mini"
                  type="primary"
                  icon="el-icon-search"
                  @click="resAudit('0', scope)"
                  plain
                  >查看</el-button
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
    </div>
    <resume
      v-if="resVisible"
      :resVisible="resVisible"
      :data="resData"
      :type="type"
      @onclose="resClose"
    ></resume>
    <position
      v-if="positionVisible"
      :data="positionData"
      :resVisible="positionVisible"
      :type="type"
      @onclose="positionClose"
    ></position>
    <autonomously
      v-if="autoVisible"
      :data="autoData"
      :resVisible="autoVisible"
      :type="type"
      @onclose="autoClose"
    ></autonomously>
  </el-dialog>
</template>

<script>
import { agency_resume, unit_query_agency } from '../../api/index';
import { trim } from '@/utils/index';
import ttable from '../../../common/t_table';
import position from './position';
import autonomously from './autonomously';
import resume from './resume';
export default {
  name: 'recruitmentDetail',
  props: ['visible', 'form'],
  components: { ttable, resume, position, autonomously },
  data() {
    return {
      type: '',
      resData: [],
      positionData: [],
      resVisible: false,
      positionVisible: false,
      autoVisible: false,
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
        { title: '学历要求', prop: 'eduRequire', slot: 'eduRequire' },
        { title: '工作年限', prop: 'workYearNeed', slot: 'workYearNeed' },
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
      list0: [],
      list1: []
    };
  },
  computed: {},
  methods: {
    autonomously(type, e) {
      this.type = type;
      this.autoData = { ...e.row };
      this.autoVisible = true;
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
    autoClose(type) {
      this.autoVisible = false;
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
      unit_query_agency(
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
      let data = { ...e, ...this.params1 };
      data.type = this.auditStutas;
      //分页
      data.pageIndex = JSON.parse(JSON.stringify(this.params1.pageIndex - 1));
      data.pageSize = this.pageSize;
      agency_resume(
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
    this.queryResume(this.form);
    this.queryPosition(this.form);
  },
  created() {}
};
</script>
<style lang="scss" scoped>
#indexBody {
  position: relative;
  background: #ffffff;
  height: 500px;
  overflow: scroll;
  overflow-x: hidden;
  .queryList {
    position: absolute;
    z-index: 99;
    top: 50px;
    width: 100%;
  }
}
</style>
