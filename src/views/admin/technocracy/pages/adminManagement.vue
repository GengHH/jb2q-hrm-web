<!--
 * @Author: your name
 * @Date: 2021-03-16 10:58:38
 * @LastEditTime: 2021-06-28 18:17:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\pages\adminManagement.vue
-->
<template>
  <div id="indexBody">
    <div class="queryList">
      <tform :formConfig="formConfig" @onsubmit="onsubmit"></tform>
      <el-button-group>
        <el-button
          @click="
            auditStutas = '1';
            isAudit = true;
            trigger();
          "
          size="mini"
          :type="auditStutas == '1' ? 'primary' : ''"
          >待审核</el-button
        >
        <el-button
          @click="
            auditStutas = '2';
            isAudit = false;
            trigger();
          "
          size="mini"
          :type="auditStutas == '2' ? 'primary' : ''"
          >通过</el-button
        >
        <el-button
          @click="
            auditStutas = '3';
            isAudit = false;
            trigger();
          "
          size="mini"
          :type="auditStutas == '3' ? 'primary' : ''"
          >不通过</el-button
        >
      </el-button-group>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-if="userType"
        style="margin-top:130px"
        label="入团"
        name="0"
      >
        <ttable :tableClass="'tableClass'" :columns="columns0" :list="list0">
          <el-table-column slot="statusId" label="专家状态" align="center">
            <template slot-scope="scope">
              <div v-for="(v, k) in dicOptions.status" :key="k">
                <el-tag type="warning" v-if="v.value == scope.row.statusId">{{
                  v.label
                }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column slot="verifyStatus" label="复核状态" align="center">
            <template slot-scope="scope">
              <el-tag type="warning">{{ scope.row.verifyStatus }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            v-if="isAudit"
            slot="aaa009"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="look(scope, 0)"
                plain
                >审核</el-button
              >
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange"
          @current-change="handleChange"
          :current-page.sync="params0.pageIndex"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="params0.total"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane
        v-if="userType"
        style="margin-top:130px"
        label="续聘"
        name="1"
      >
        <ttable
          :columns="columns1"
          :list="list1"
          @handleSelectionChange="e => (selectData = e)"
        >
          <el-table-column slot="aaa007" label="复核状态" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.aaa007 == '1'" type="success"
                >通过</el-tag
              >
              <el-tag v-else type="warning">未通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            v-if="isAudit"
            slot="aaa009"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="look(scope, 1)"
                plain
                >审核</el-button
              >
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange"
          @current-change="handleChange"
          :current-page.sync="params1.pageIndex"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="params1.total"
        ></el-pagination>
        <div style="text-align:right">
          <el-popover placement="bottom" width="332" trigger="click">
            <div>
              <span>审核状态</span>
              <el-select
                size="mini"
                v-model="renewObj.verifyResult"
                placeholder="审核状态"
              >
                <el-option label="通过" value="1"></el-option>
                <el-option label="不通过" value="0"></el-option>
              </el-select>
            </div>
            <div style="margin:5px 0">
              <el-input
                style="width:304px"
                size="mini"
                type="textarea"
                :rows="2"
                placeholder="请输入续聘理由"
                v-model="renewObj.verifyMemo"
              >
              </el-input>
            </div>
            <div style="margin:5px 0">
              <el-date-picker
                size="mini"
                style="width:150px"
                @change="newTime"
                v-model="renewObj.startDate"
                type="date"
                placeholder="开始日期"
                value-format="yyyyMMdd"
              >
              </el-date-picker>
              <el-date-picker
                style="width:150px"
                size="mini"
                disabled
                v-model="renewObj.endDate"
                type="date"
                placeholder="结束日期"
                value-format="yyyyMMdd"
              >
              </el-date-picker>
            </div>
            <el-button size="mini" type="danger" @click="renew()"
              >确定续聘</el-button
            >
            <el-button size="small" slot="reference" type="primary"
              >续聘</el-button
            >
          </el-popover>
        </div>
      </el-tab-pane>
      <el-tab-pane
        v-if="userType"
        style="margin-top:130px"
        label="退团"
        name="2"
      >
        <ttable :columns="columns2" :list="list2">
          <el-table-column
            v-if="isAudit"
            slot="aaa009"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="look(scope, 2)"
                plain
                >审核</el-button
              >
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange"
          @current-change="handleChange"
          :current-page.sync="params2.pageIndex"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="params2.total"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane
        v-if="!userType"
        style="margin-top:130px"
        label="转移"
        name="3"
      >
        <ttable :columns="columns3" :list="list3">
          <el-table-column slot="targetDistrict" label="转入区" align="center">
            <template slot-scope="scope">
              <div v-for="(v, k) in dicOptions.qx" :key="k">
                <el-tag v-if="v.value == scope.row.targetDistrict">{{
                  v.label
                }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column slot="applyDistrict" label="转出区" align="center">
            <template slot-scope="scope">
              <div v-for="(v, k) in dicOptions.qx" :key="k">
                <el-tag v-if="v.value == scope.row.applyDistrict">{{
                  v.label
                }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="isAudit"
            slot="aaa009"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="look(scope, 3)"
                plain
                >审核</el-button
              >
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange"
          @current-change="handleChange"
          :current-page.sync="params3.pageIndex"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="params3.total"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
    <auditdialog
      v-if="visible"
      :visible="visible"
      :auditConfig="auditConfig"
      @onclose="onclose"
    ></auditdialog>
  </div>
</template>

<script>
import tform from '../../common/t_form'; //高级查询
import ttable from '../../common/t_table';
import auditdialog from './auditDialog';
import { trim } from '@/utils/index';
import {
  joinTeam_query,
  continue_query,
  quit_query,
  move_query,
  continue_verifyMore
} from '../api/index';
export default {
  name: 'adminManagement',
  components: {
    tform,
    ttable,
    auditdialog
  },
  data() {
    return {
      renewObj: {
        verifyResult: '1',
        startDate: '',
        endDate: '',
        verifyMemo: ''
      },
      selectData: [],
      adminId: this.$store.state.admin.userInfo.logonUser.areaInfo.areaCode,
      isAudit: true,
      userType: false,
      queryData: {},
      visible: false,
      auditStutas: '1',
      activeName: '3',
      params0: {
        pageIndex: 1,
        total: 0
      },
      params1: {
        pageIndex: 1,
        total: 0
      },
      params2: {
        pageIndex: 1,
        total: 0
      },
      params3: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      list0: [],
      list1: [],
      list2: [],
      list3: [],
      dicOptions: {
        yesno: trim(this.$store.getters['dictionary/yesno']),

        //专家状态
        status: trim(this.$store.getters['dictionary/recruit_expert_status']),
        //qx
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx']),
        //专家当前状态
        statusthisStatus: trim(
          this.$store.getters['dictionary/recruit_expert_curr_status']
        )
      },

      columns0: [
        { title: '序号', type: 'index' },
        { title: '姓名', prop: 'xm' },
        { title: '管理所属区', prop: 'districtCode' },
        { title: '复核状态', prop: 'currStatus', slot: 'verifyStatus' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      columns1: [
        { type: 'selection' },
        { title: '专家编号', prop: 'expertId' },
        { title: '姓名', prop: 'xm' },
        { title: '续聘申请人', prop: 'applyName' },
        { title: '续聘申请时间', prop: 'applyTime' },
        { title: '复核状态', prop: 'currStatus', slot: 'verifyStatus' },
        { title: '新聘期开始时间', prop: 'startDate' },
        { title: '新聘期结束时间', prop: 'endDate' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      columns2: [
        { title: '序号', type: 'index' },
        { title: '专家编号', prop: 'expertId' },
        { title: '姓名', prop: 'xm' },
        { title: '退出理由', prop: 'quitReason' },
        { title: '退团申请人', prop: 'applyName' },
        { title: '退团申请时间', prop: 'quitTime' },
        { title: '复核状态', prop: 'verifyStatus', slot: 'verifyStatus' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      columns3: [
        { title: '序号', type: 'index' },
        { title: '专家编号', prop: 'expertId' },
        { title: '姓名', prop: 'xm' },
        { title: '转移理由', prop: 'applyReason' },
        { title: '转入区', prop: 'targetDistrict', slot: 'targetDistrict' },
        { title: '转出区', prop: 'applyDistrict', slot: 'applyDistrict' },
        { title: '转出申请人', prop: 'aaa005' },
        { title: '申请时间', prop: 'applyTime' },
        { title: '确认状态', prop: 'verifystatus', slot: 'verifystatus' },
        { title: '转移时间', prop: 'moveDate' },
        { title: '确认时间', prop: 'aaa010' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      auditConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '120px',
        isBtn: true,
        style: {
          width: '100%',
          margin: '0 auto'
        }
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
            key: 'xm'
          },

          {
            type: 'input',
            label: '证件号码',
            placeholder: '请输入证件号码',
            style: { width: '210px' },
            rules: [],
            key: 'zjhm'
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    newTime(e) {
      let y = e.substring(0, 4);
      let m = e.substring(4, 6);
      let s = e.substring(6, 8);

      //默认加2年减1天
      let d = new Date(Number(y) + 2 + '-' + m + '-' + s);
      d = d.setDate(d.getDate() - 1);
      d = new Date(d);

      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      month = month > 9 ? month : '0' + month;
      let day = d.getDate();
      day = day > 9 ? day : '0' + day;
      let time = year + '' + month + '' + day;
      this.renewObj.endDate = time;
    },
    renew() {
      if (this.renewObj.verifyResult == '0') {
        if (!this.renewObj.quitReason) {
          this.$message({
            message: '请选择续聘理由',
            type: 'warning'
          });
          return;
        }
      } else {
        if (!this.renewObj.startDate) {
          this.$message({
            message: '请选择开始时间',
            type: 'warning'
          });
          return;
        }
      }

      if (this.selectData.length) {
        let data = this.selectData.map(e => {
          let d = {
            expertId: e.expertId,
            renewId: e.renewId,
            ...this.renewObj
          };
          return d;
        });
        continue_verifyMore(
          data,
          res => {
            document.body.click();
            let datas = res.result.data;
            let err = '';
            for (let i = 0; i < datas.length; i++) {
              if (!datas[i].result) {
                err +=
                  // '姓名：' +
                  // datas[i].xm +
                  // '，编号：' +
                  // datas[i].expertId +
                  '。原因：' + datas[i].msg;
              }
            }
            if (err) {
              this.$message({
                message: err,
                type: 'warning'
              });
            } else {
              this.$message({
                message: '操作成功',
                type: 'success',
                onClose: () => {
                  this.renewObj = {
                    verifyResult: '1',
                    startDate: '',
                    endDate: '',
                    verifyMemo: ''
                  };
                  this.onsubmit(this.queryData);
                }
              });
            }

            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      } else {
        this.$message({
          message: '请选择至少一条数据',
          type: 'warning'
        });
      }
    },
    trigger() {
      let data = { ...this.queryData };
      data.type = this.auditStutas;
      this.onsubmit(data);
    },
    setDicOptions(val, str) {
      if (val) {
        let data = this.dicOptions[str];
        for (let i = 0; i < data.length; i++) {
          if (val == data[i].value) {
            return data[i].label;
          }
        }
        return '';
      }
      return '';
    },
    formatTime(time) {
      if (time) {
        if (time.length > 8) {
          let t = time.split(' ')[0];
          let tt = t.replace(/-/g, '');
          return tt;
        } else {
          return time;
        }
      } else {
        return '';
      }
    },
    onclose() {
      this.visible = false;
      this.onsubmit(this.queryData);
    },
    checkValue(val) {
      let arr = this.dicOptions.qx;
      let str = '';
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].value.trim() == val) {
          str = arr[i].label;
          break;
        }
      }
      return str;
    },
    handleChange(e) {
      this['params' + this.activeName].pageIndex = e;
      this.onsubmit(this.queryData);
    },
    setQueryData(res, index) {
      this['params' + index].pageIndex = Number(res.pageIndex) + 1;
      this['params' + index].total = res.total;
      this['list' + index] = res.data;
    },
    onsubmit(e) {
      let index = this.activeName;
      let data = { ...e };
      data.pageSize = this.pageSize;
      data.pageIndex =
        JSON.parse(JSON.stringify(this['params' + index].pageIndex)) - 1;
      data.type = this.auditStutas;
      // data.districtCode = this.adminId;
      this.queryData = data;
      if (index == '0') {
        joinTeam_query(
          data,
          res => {
            if (res.status == 200) {
              res.result.pageresult.data.map(e => {
                return (e.districtCode = this.checkValue(e.districtCode));
              });
              this.setQueryData(res.result.pageresult, index);
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      } else if (index == '1') {
        continue_query(
          data,
          res => {
            if (res.status == 200) {
              res.result.pageresult.data.map(e => {
                return (e.districtCode = this.checkValue(e.districtCode));
              });
              this.setQueryData(res.result.pageresult, index);
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      } else if (index == '2') {
        quit_query(
          data,
          res => {
            if (res.status == 200) {
              res.result.pageresult.data.map(e => {
                return (e.districtCode = this.checkValue(e.districtCode));
              });
              this.setQueryData(res.result.pageresult, index);
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      } else {
        move_query(
          data,
          res => {
            if (res.status == 200) {
              res.result.pageresult.data.map(e => {
                return (e.districtCode = this.checkValue(e.districtCode));
              });
              this.setQueryData(res.result.pageresult, index);
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    handleClick(tab, event) {
      this.activeName = tab.name;
    },
    look(e, type) {
      this.visible = true;
      let a = e.row;
      let b = this['columns' + type];
      let c = this.getConfigData(a, b);
      let formItemList = [];
      for (let i = 0; i < c.length; i++) {
        if (c[i].title == '转入区') {
          c[i].value = this.setDicOptions(c[i].value, 'qx');
        } else if (c[i].title == '复核状态') {
          c[i].value = this.setDicOptions(c[i].value, 'statusthisStatus');
        } else if (c[i].title == '专家状态') {
          c[i].value = this.setDicOptions(c[i].value, 'status');
        }
        formItemList.push({
          type: 'input',
          label: c[i].title,
          placeholder: c[i].value,
          style: { width: '250px' },
          disabled: true,
          key: c[i].key
        });
      }
      console.log(formItemList);

      this.auditConfig.formItemList = formItemList;
      this.auditConfig.type = type;
      this.auditConfig.row = a;
      this.auditConfig.queryData = this.queryData;
    },
    getConfigData(a, b) {
      let c = [];

      for (let i = 0; i < b.length; i++) {
        for (let index in a) {
          if (index == b[i].prop) {
            c.push({
              title: b[i].title,
              value: a[index],
              key: index
            });
          }
        }
      }
      return c;
    },
    triggerUser(bool) {
      if (bool) {
        this.userType = true;
        this.activeName = '0';
      } else {
        this.userType = false;
        this.activeName = '3';
      }
    }
  },
  mounted() {
    if (this.adminId == '00') {
      this.triggerUser(true);
    } else {
      this.triggerUser(false);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
#indexBody {
  position: relative;
  background: #ffffff;
  .queryList {
    position: absolute;
    z-index: 99;
    top: 50px;
    width: 100%;
  }
}
</style>
