<!--
 * @Author: your name
 * @Date: 2021-03-16 14:06:57
 * @LastEditTime: 2021-06-29 16:07:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\pages\areaAdminManagement.vue
-->
<template>
  <div id="indexBody">
    <tform ref="form" :formConfig="formConfig" @onsubmit="onsubmit"></tform>
    <ttable
      :columns="columns"
      :list="list"
      @handleSelectionChange="e => (selectData = e)"
    >
      <el-table-column
        width="110"
        slot="currStatus"
        label="复核状态"
        align="center"
      >
        <template slot-scope="scope">
          <div v-for="(v, k) in dicOptions.statusthisStatus" :key="k">
            <el-tag v-if="v.value == scope.row.currStatus">{{
              v.label
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150" slot="eduId" label="学历" align="center">
        <template slot-scope="scope">
          <div v-for="(v, k) in dicOptions.edu" :key="k">
            <span v-if="v.value == scope.row.eduId">{{ v.label }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column slot="districtCode" label="管理区" align="center">
        <template slot-scope="scope">
          <div v-for="(v, k) in dicOptions.qx" :key="k">
            <el-tag v-if="v.value == scope.row.districtCode">{{
              v.label
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column slot="statusId" label="专家状态" align="center">
        <template slot-scope="scope">
          <div v-for="(v, k) in dicOptions.status" :key="k">
            <el-tag v-if="v.value == scope.row.statusId" type="warning">{{
              v.label
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        slot="approvalEntry"
        label="专家准入条件"
        align="center"
      >
        <template slot-scope="scope">
          <div
            v-for="(value, key) in setLabel(scope.row.approvalEntry)"
            :key="key"
          >
            <div v-for="(v, k) in dicOptions.entry" :key="k">
              <el-tag :title="v.label" v-if="v.value == value" type="warning">{{
                v.label
              }}</el-tag>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        slot="serviceContent"
        label="专家服务内容"
        align="center"
      >
        <template slot-scope="scope">
          <div
            v-for="(value, key) in setLabel(scope.row.serviceContent)"
            :key="key"
          >
            <div v-for="(v, k) in dicOptions.content" :key="k">
              <el-tag :title="v.label" v-if="v.value == value" type="warning">{{
                v.label
              }}</el-tag>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        slot="industryType"
        label="专家行业类型"
        align="center"
      >
        <template slot-scope="scope">
          <div v-for="(v, k) in dicOptions.industry" :key="k">
            <el-tag v-if="v.value == scope.row.industryType" type="warning">{{
              v.label
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="220"
        slot="aaa009"
        fixed="right"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="look(scope, 1)" plain
            >修改</el-button
          >
          <el-button size="mini" type="info" @click="look(scope, 0)" plain
            >查看</el-button
          >
          <el-popover
            v-if="scope.row.statusId != '3' && scope.row.statusId != ''"
            placement="bottom"
            width="400"
            trigger="click"
          >
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入退团理由"
              v-model="scope.row.quitReason"
            >
            </el-input>
            <el-button size="mini" type="danger" @click="quit_add(scope)"
              >确定退团</el-button
            >
            <el-button size="mini" slot="reference" type="warning" plain
              >退团</el-button
            >
          </el-popover>
          <el-popover
            v-if="scope.row.statusId != '3' && scope.row.statusId != ''"
            ref="move_add_pop"
            placement="bottom"
            width="400"
            trigger="click"
          >
            <el-select
              v-model="scope.row.targetDistrict"
              placeholder="请输入转移所属区"
            >
              <el-option
                v-for="(v, k) in dicOptions.qx"
                :key="k"
                :label="v.label"
                :value="v.value"
              ></el-option>
            </el-select>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入转移理由"
              v-model="scope.row.applyReason"
            >
            </el-input>
            <el-button size="mini" type="danger" @click="move_add(scope)"
              >确定转移</el-button
            >
            <el-button size="mini" slot="reference" type="danger" plain
              >转移</el-button
            >
          </el-popover>
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
    <div style="text-align:right">
      <el-button type="primary" @click="renew"
        ><i class="el-icon-folder-add"></i>续聘</el-button
      >
      <el-button type="primary" @click="add(2)"
        ><i class="el-icon-folder-add"></i>入团申请</el-button
      >
      <!-- <el-button
        type="danger"
        @click="advancedQuery = !advancedQuery"
        :icon="!advancedQuery ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
        >审核</el-button
      > -->
    </div>
    <transition name="bounce">
      <div v-show="advancedQuery">
        <adminmanagement> </adminmanagement>
      </div>
    </transition>

    <managementadd
      v-if="visible"
      :visible="visible"
      :form="form"
      :type="addtype"
      :disabled="disabled"
      @onclose="onclose"
    ></managementadd>
    <continueadd
      :visible="continueVisible"
      @onclose="continueVisible = false"
    ></continueadd>
  </div>
</template>

<script>
import tform from '../../common/t_form'; //高级查询
import ttable from '../../common/t_table';
import managementadd from './managementAdd';
import continueadd from './continueAdd';
import adminmanagement from './adminManagement';
import { trim } from '@/utils/index';
import {
  synthesize_query,
  quit_add,
  move_add,
  continue_more
} from '../api/index';

export default {
  name: 'areaAdminManagement',
  components: {
    tform,
    ttable,
    managementadd,
    continueadd,
    adminmanagement
  },
  data() {
    return {
      addtype: '',
      adminId: this.$store.state.admin.userInfo.logonUser.areaInfo.areaCode,
      selectData: [],
      advancedQuery: false,
      visible: false,
      continueVisible: false,
      currentPage: 1,
      params: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      list: [],
      columns: [
        { type: 'selection' },
        { title: '序号', type: 'index' },
        { title: '姓名', prop: 'xm' },
        { title: '证件号码', prop: 'zjhm', width: '180' },
        { title: '管理区', prop: 'districtCode', slot: 'districtCode' },
        { title: '学历', prop: 'eduId', slot: 'eduId' },
        { title: '专家状态', prop: 'statusId', slot: 'statusId' },
        { title: '入团时间', prop: 'joinDate', width: '150' },
        { title: '复核状态', prop: 'currStatus', slot: 'currStatus' },
        { title: '专家准入条件', prop: 'approvalEntry', slot: 'approvalEntry' },
        {
          title: '专家服务内容',
          prop: 'serviceContent',
          slot: 'serviceContent'
        },
        { title: '专家行业类型', prop: 'industryType', slot: 'industryType' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009', width: 400 }
      ],
      dicOptions: {
        //专家准入条件
        entry: trim(
          this.$store.getters['dictionary/recruit_expert_approval_entry_type']
        ),
        //专家服务内容
        content: trim(
          this.$store.getters['dictionary/recruit_expert_service_content_type']
        ),
        //专家行业类型
        industry: trim(
          this.$store.getters['dictionary/recruit_expert_industry_type']
        ),
        //专家专业领域类型
        professional: trim(
          this.$store.getters['dictionary/recruit_expert_professional_type']
        ),
        //专家当前状态
        statusthisStatus: trim(
          this.$store.getters['dictionary/recruit_expert_curr_status']
        ),
        //专家状态
        status: trim(this.$store.getters['dictionary/recruit_expert_status']),
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx']),
        //学历
        edu: trim(this.$store.getters['dictionary/recruit_edu'])
      },
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '130px',
        style: {
          width: '100%',
          margin: '0 auto'
        },
        formItemList: [
          {
            type: 'input',
            label: '姓名',
            style: { width: '180px' },
            placeholder: '请输入姓名',
            key: 'xm'
          },

          {
            type: 'input',
            label: '证件号码',
            placeholder: '请输入证件号码',
            style: { width: '180px' },
            rules: [],
            key: 'zjhm'
          },
          {
            type: 'select',
            label: '管理区',
            style: { width: '180px' },
            key: 'districtCode',
            options: trim(this.$store.getters['dictionary/ggjbxx_qx'])
          },
          {
            type: 'select',
            label: '学历',
            style: { width: '180px' },
            key: 'eduId',
            options: trim(this.$store.getters['dictionary/recruit_edu'])
          },
          {
            type: 'select',
            label: '专家准入条件',
            style: { width: '180px' },
            key: 'approvalEntry',
            options: trim(
              this.$store.getters[
                'dictionary/recruit_expert_approval_entry_type'
              ]
            )
          },
          {
            type: 'select',
            label: '专家服务内容',
            key: 'serviceContent',
            style: { width: '180px' },
            options: trim(
              this.$store.getters[
                'dictionary/recruit_expert_service_content_type'
              ]
            )
          },
          {
            type: 'select',
            label: '专家行业类型',
            style: { width: '180px' },
            key: 'industryType',
            options: trim(
              this.$store.getters['dictionary/recruit_expert_industry_type']
            )
          },
          {
            type: 'daterange',
            label: '入团时间',
            style: { width: '300px' },
            format: 'yyyyMMdd',
            rules: [],
            key: 'time'
          }
        ]
      },
      disabled: false,
      form: {},
      initform: {
        zjlxId: '',
        zjhm: '',
        xm: '',
        sexId: '',
        birthDate: '',
        eduId: '',
        nationId: '',
        mail: '',
        contactNumber: '',
        contactAddress: '',
        contactDistrict: '',
        postcode: '',
        laborInfo: '',
        majorResult: '',
        bankName: '',
        bankaccount: '',
        psnlPhotoBase64: '',
        formImageBase64: '',
        collegesName: '',
        majorName: '',
        corpName: '',
        positionName: '',
        positionTitle: '',
        timeday: '',
        districtCode: '',
        workday: '',
        weekend: '',
        otherTime: '',
        bankId: '',
        approvalEntry: [],
        serviceContent: [],
        industryType: [],
        industryTypeOther: '',
        professionalField: [],
        professionalFieldOther: '',
        otherMemo: ''
      },
      dataList: {}
    };
  },
  computed: {},
  methods: {
    setLabel(str) {
      if (str) {
        return str.split(',');
      } else {
        return [];
      }
    },
    add() {
      this.form = { ...this.initform };
      this.visible = true;
    },
    onclose() {
      this.visible = false;
      this.disabled = false;
      this.onsubmit(this.queryData);
    },
    quit_add(scope) {
      let data = { ...scope.row };
      if (!data.quitReason) {
        this.$message({
          message: '请填写退团理由',
          type: 'warning'
        });
        return;
      }
      quit_add(
        data,
        res => {
          document.body.click();
          if (res.result.data.result) {
            this.$message({
              message: '操作成功',
              type: 'success',
              close: () => {
                this.onsubmit(this.queryData);
              }
            });
          } else {
            console.log(res.result.data.msg);
            this.message('warning', res.result.data.msg);
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    move_add(scope) {
      move_add(
        scope.row,
        res => {
          document.body.click();
          if (res.result.data.result) {
            this.$message({
              message: '操作成功',
              type: 'success',
              close: () => {
                this.onsubmit(this.queryData);
              }
            });
          } else {
            console.log(res.result.data.msg);
            this.message('warning', res.result.data.msg);
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    renew() {
      let data = this.selectData;
      if (data.length) {
        continue_more(
          data,
          res => {
            if (res.status == 200) {
              let datas = res.result.datas;
              let err = '';
              for (let i = 0; i < datas.length; i++) {
                if (!datas[i].result) {
                  err +=
                    '姓名：' +
                    datas[i].xm +
                    '，编号：' +
                    datas[i].expertId +
                    '。原因：' +
                    datas[i].msg;
                }
              }
              if (err) {
                this.message('warning', err, 3000);
              } else {
                this.message('success', '操作成功');
              }

              console.log(res);
            }
          },
          err => {
            console.log(err);
          }
        );
      } else {
        this.message('warning', '请先选择列表数据再续聘');
        return;
      }
    },
    message(type, msg, time) {
      this.$message({
        message: msg,
        type: type,
        duration: time || 1500,
        onClose: () => {
          if (type == 'success') {
            this.onclose();
          }
        }
      });
    },
    onsubmit(e) {
      console.log(e);
      let data = { ...e };
      data.pageSize = this.pageSize;
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex)) - 1;
      if (data.time) {
        data.joinDateStart = data.time[0];
        data.joinDateEnd = data.time[1];
      }
      //获取当前用户所在区
      data.districtCode = data.districtCode || this.adminId;
      this.queryData = data;
      this.dataList = data;
      synthesize_query(
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
    look(e, type) {
      this.form = { ...this.initform, ...e.row };
      if (this.form.workday) {
        this.form.timeday = 'workday';
      } else if (e.weekend) {
        this.form.timeday = 'weekend';
      } else {
        this.form.timeday = this.form.otherTime;
      }
      if (type == '0') {
        this.disabled = true;
      }
      if (this.form.psnlPhotoBase64) {
        this.form.psnlPhotoBase64 =
          'data:image/png;base64,' + this.form.psnlPhotoBase64;
      }
      this.addtype = type;
      this.form.approvalEntry = this.form.approvalEntry
        ? this.form.approvalEntry.split(',')
        : [];
      this.form.serviceContent = this.form.serviceContent
        ? this.form.serviceContent.split(',')
        : [];
      this.form.industryType = this.form.industryType
        ? this.form.industryType.split(',')
        : [];
      this.form.professionalField = this.form.professionalField
        ? this.form.professionalField.split(',')
        : [];
      this.visible = true;
    },
    handleChange(e) {
      this.params.pageIndex = e;
      this.onsubmit(this.dataList);
    }
  },
  mounted() {
    console.log(this.$refs);
  },
  created() {
    console.log(this.$store);
    console.log(this.dicOptions.status);
  }
};
</script>

<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translate(0, -50px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
