<!--
 * @Author: your name
 * @Date: 2021-03-05 09:55:06
 * @LastEditTime: 2021-07-16 15:04:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <el-button-group>
      <el-button
        v-for="(v, k) in dicOptions.status"
        :key="k"
        size="mini"
        @click="queryState(v.value)"
        :type="statusUser == v.value ? 'primary' : ''"
        >{{ v.label }}</el-button
      >
    </el-button-group>
    <ttable :tableClass="'tableClass'" :columns="columns" :list="list0">
      <el-table-column slot="dockResult" label="对接结果" align="center">
        <template slot-scope="scope">
          <template v-for="(v, k) in dicOptions.yesno">
            <el-tag :key="k" v-if="v.value == scope.row.dockResult">
              {{ v.label }}
            </el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column slot="positionType" label="职位分类" align="center">
        <template slot-scope="scope">
          <template v-for="(v, k) in dicOptions.type">
            <el-tag :key="k" v-if="v.value == scope.row.positionType">
              {{ v.label }}
            </el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column slot="verifyStatus" label="审核状态" align="center">
        <template slot-scope="scope">
          <template v-for="(v, k) in dicOptions.status">
            <el-tag :key="k" v-if="v.value == scope.row.verifyStatus">
              {{ v.label }}
            </el-tag>
          </template>
        </template>
      </el-table-column>

      <el-table-column width="150" slot="aaa009" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="state == '1' || state == '2'"
            size="mini"
            type="primary"
            plain
            @click="look('0', scope)"
          >
            查看</el-button
          >
          <el-button
            v-if="state == '0'"
            size="mini"
            type="primary"
            plain
            @click="look('1', scope)"
          >
            审核</el-button
          >

          <el-popover
            v-if="state == '1'"
            ref="move_add_pop"
            placement="bottom"
            width="400"
            trigger="click"
          >
            <el-select
              v-model="scope.row.dockResults"
              placeholder="是否对接成功"
            >
              <el-option
                v-for="(v, k) in dicOptions.yesno"
                :key="k"
                :label="v.label"
                :value="v.value"
              ></el-option>
            </el-select>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="备注"
              v-model="scope.row.memos"
            >
            </el-input>
            <el-button size="mini" type="success" @click="beedback(scope)"
              >确定反馈</el-button
            >
            <el-button size="mini" slot="reference" type="success" plain
              >反馈</el-button
            >
          </el-popover>
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
    <surplusdetails
      v-if="visible"
      :visible="visible"
      :type="type"
      :dataList="dataListObj"
      @onclose="onclose"
    ></surplusdetails>
  </div>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../common/t_form';
import ttable from '../common/t_table';
import surplusdetails from './module/surplusDetails';

import { surplus_query, surplus_result } from './api/index';

export default {
  name: 'surplus',
  components: { ttable, tform, surplusdetails },
  data() {
    return {
      statusUser: '0',
      type: '0',
      dataListObj: {},
      visible: false,
      state: '0',
      adminId: this.$store.state.admin.userInfo.logonUser.areaInfo.areaCode,
      params0: {
        pageIndex: 1,
        total: 0,
        pageSize: 10
      },
      columns: [
        { title: '序号', type: 'index', width: 50 },
        { title: '单位名称', prop: 'corpName' },
        { title: '社会信用代码', prop: 'tyshxym' },
        { title: '职位分类', prop: 'positionType', slot: 'positionType' },
        { title: '用工剩余人数', prop: 'surplusNum' },
        { title: '可借用期限', prop: 'lendPeriod' },
        { title: '联系人', prop: 'contactName' },
        { title: '联系人电话', prop: 'contactPhone' },
        {
          title: '审核状态',
          prop: 'verifyStatus ',
          slot: 'verifyStatus'
        },
        { title: '对接结果', prop: 'dockResult', slot: 'dockResult' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      list0: [],
      dataList: [],
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',
        formItemList: [
          {
            type: 'input',
            label: '单位名称',
            style: { width: '210px' },
            placeholder: '请输入单位名称',
            rules: [],
            key: 'corpName'
          }
        ]
      },
      dicOptions: {
        //状态
        status: trim(
          this.$store.getters['dictionary/recruit_surplus_verify_status']
        ),
        nature: trim(this.$store.getters['dictionary/recruit_work_nature']),
        yesno: trim(this.$store.getters['dictionary/yesno']),
        type: trim(this.$store.getters['dictionary/recruit_position_s_type'])
      }
    };
  },
  computed: {},
  methods: {
    beedback(e) {
      let data = {
        dockResult: e.row.dockResults,
        memo: e.row.memos,
        surplusId: e.row.surplusId
      };

      if (data.dockResult == '0') {
        if (!data.memo) {
          this.message('warning', '请填写备注');
          return;
        }
      }
      surplus_result(
        data,
        res => {
          document.body.click();
          if (res.status == 200) {
            this.message('success', '操作成功');
            this.advancedSearch(this.dataList);
          }
        },
        err => {
          console.log(err);
        }
      );
      console.log(e);
    },
    onclose(type) {
      this.visible = false;
      if (type == '1') {
        this.advancedSearch(this.dataList);
      }
    },
    look(type, e) {
      //0查看 1处理
      this.type = type;
      this.dataListObj = { ...e.row };
      this.visible = true;
    },
    message(type, msg) {
      this.$message({
        message: msg,
        type: type,
        duration: 1000,
        onClose: () => {}
      });
    },
    queryState(type) {
      this.statusUser = type;
      this.state = type;
      this.advancedSearch(this.dataList);
    },
    handleChange0(e) {
      console.log(e);
      this.params0.pageIndex = e;
      this.advancedSearch(this.dataList);
    },
    advancedSearch(e) {
      let pageParam = { ...this.params0 };
      let data = { ...e, pageParam, verifyStatus: this.state };
      //分页
      data.pageParam.pageIndex = JSON.parse(
        JSON.stringify(this.params0.pageIndex - 1)
      );
      data.districtCode = this.adminId;
      this.dataList = data;
      surplus_query(
        data,
        res => {
          if (res.status == 200) {
            this.message('success', '操作成功');
            let pageresult = res.result.pageresult;
            this.list0 = pageresult.data;
            this.params0.pageIndex = Number(pageresult.pageIndex) + 1;
            this.params0.total = pageresult.total;
          }

          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
