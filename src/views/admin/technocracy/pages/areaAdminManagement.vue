<!--
 * @Author: your name
 * @Date: 2021-03-16 14:06:57
 * @LastEditTime: 2021-03-30 20:15:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\pages\areaAdminManagement.vue
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="onsubmit"></tform>
    <ttable
      :columns="columns"
      :list="list"
      :options="tableoptions"
      @handleSelectionChange="e => (selectData = e)"
    >
      <el-table-column width="260" slot="aaa006" label="聘期" align="center">
        <template slot-scope="scope">
          {{ scope.row.startDate ? scope.row.startDate.split(' ')[0] : '' }} -
          {{ scope.row.startDate ? scope.row.startDate.split(' ')[0] : '' }}
        </template>
      </el-table-column>
      <el-table-column
        width="360"
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
          <el-popover placement="bottom" width="400" trigger="click">
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
            ref="move_add_pop"
            placement="bottom"
            width="400"
            trigger="click"
          >
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
      layout="prev, pager, next, jumper"
      :total="params.total"
    >
    </el-pagination>
    <div style="text-align:right">
      <el-button type="primary" @click="renew"
        ><i class="el-icon-folder-add"></i>续聘</el-button
      >
      <el-button
        type="primary"
        @click="
          visible = true;
          form = { ...initform };
        "
        ><i class="el-icon-folder-add"></i>入团申请</el-button
      >
      <el-button
        type="danger"
        @click="advancedQuery = !advancedQuery"
        :icon="!advancedQuery ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
        >审核</el-button
      >
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
      :disabled="disabled"
      @onclose="
        visible = false;
        disabled = false;
      "
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
      tableoptions: {
        height: '400px'
      },
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
        { title: '专家编号', prop: 'registerId' },
        { title: '姓名', prop: 'xm' },
        { title: '学历', prop: 'eduId' },
        { title: '联系电话', prop: 'contactNumber' },
        { title: '专家状态', prop: 'statusId' },
        { title: '聘期', prop: 'aaa006', slot: 'aaa006' },
        { title: '复核状态', prop: 'verifyResult' },
        { title: '管理区', prop: 'districtCode' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009', width: 400 }
      ],
      dicOptions: {
        //专家当前状态
        status: trim(
          this.$store.getters['dictionary/recruit_expert_curr_status']
        )
      },
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
            type: 'input',
            label: '姓名',
            style: { width: '210px' },
            placeholder: '请输入姓名',
            rules: [],
            key: 'name'
          },

          {
            type: 'input',
            label: '证件号码',
            placeholder: '请输入证件号码',
            style: { width: '210px' },
            rules: [],
            key: 'input'
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
        bankId: ''
      }
    };
  },
  computed: {},
  methods: {
    quit_add(scope) {
      quit_add(
        scope.row,
        res => {
          document.body.click();
          if (res.result.data.result) {
            this.message('success', '操作成功');
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
            this.message('success', '操作成功');
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
              console.log(res);
            }
            console.log(res);
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
    message(type, msg) {
      this.$message({
        message: msg,
        type: type,
        duration: 1000,
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
      if (type == '0') {
        this.disabled = true;
      }
      this.visible = true;
    },
    handleChange(e) {
      console.log(e);
    }
  },
  created() {
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
