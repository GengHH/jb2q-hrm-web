<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-07-02 15:08:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\audit.vue
-->
<template>
  <div id="indexBody">
    <tform
      ref="tform"
      :formConfig="formConfig"
      @onsubmit="advancedSearch"
    ></tform>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="转出" name="1">
        <ttable :columns="columns" :list="list">
          <el-table-column slot="fromDistrict" label="转出区" align="center">
            <template slot-scope="scope">
              <div v-for="(v, k) in dicOptions.qx" :key="k">
                <el-tag v-if="v.value == scope.row.inDistrict">{{
                  v.label
                }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column slot="inDistrict" label="转入区" align="center">
            <template slot-scope="scope">
              <div v-for="(v, k) in dicOptions.qx" :key="k">
                <el-tag v-if="v.value == scope.row.fromDistrict">{{
                  v.label
                }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column slot="verifyType" label="审核类型" align="center">
            <template slot-scope="scope">
              <div v-for="(v, k) in dicOptions.verify" :key="k">
                <el-tag v-if="v.value == scope.row.verifyType">{{
                  v.label
                }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="280"
            slot="aaa010"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover placement="bottom" width="400" trigger="click">
                <el-select
                  v-model="scope.row.verifyResult"
                  placeholder="请输入审核意见"
                >
                  <el-option label="通过" value="1"></el-option>
                  <el-option label="不通过" value="2"></el-option>
                </el-select>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入审核理由"
                  v-model="scope.row.verifyMemo"
                >
                </el-input>
                <el-button size="mini" type="danger" @click="audit(scope)"
                  >确定审核</el-button
                >
                <el-button size="mini" slot="reference" type="danger" plain
                  >审核</el-button
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
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="转入" name="2">
        <ttable :columns="columns2" :list="list2">
          <el-table-column slot="fromDistrict" label="转出区" align="center">
            <template slot-scope="scope">
              <div v-for="(v, k) in dicOptions.qx" :key="k">
                <el-tag v-if="v.value == scope.row.fromDistrict">{{
                  v.label
                }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column slot="inDistrict" label="转入区" align="center">
            <template slot-scope="scope">
              <div v-for="(v, k) in dicOptions.qx" :key="k">
                <el-tag v-if="v.value == scope.row.inDistrict">{{
                  v.label
                }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column slot="verifyType" label="审核类型" align="center">
            <template slot-scope="scope">
              <div v-for="(v, k) in dicOptions.verify" :key="k">
                <el-tag v-if="v.value == scope.row.verifyType">{{
                  v.label
                }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="280"
            slot="aaa010"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover placement="bottom" width="400" trigger="click">
                <el-select
                  v-model="scope.row.verifyResult"
                  placeholder="请输入审核意见"
                >
                  <el-option label="通过" value="1"></el-option>
                  <el-option label="不通过" value="2"></el-option>
                </el-select>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入审核理由"
                  v-model="scope.row.verifyMemo"
                >
                </el-input>
                <el-button size="mini" type="danger" @click="audit(scope)"
                  >确定审核</el-button
                >
                <el-button size="mini" slot="reference" type="danger" plain
                  >审核</el-button
                >
              </el-popover>
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange2"
          @current-change="handleChange2"
          :current-page.sync="params2.pageIndex"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="params2.total"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tform from '../common/t_form';
import ttable from '../common/t_table';
import { trim } from '@/utils/index';
import { move_query, move_audit } from './api/index';
export default {
  name: 'audit',
  components: { ttable, tform },
  data() {
    return {
      //1 转出 2转入
      activeName: '1',
      pageSize: 10,
      params: {
        pageIndex: 1,
        total: 0
      },

      params2: {
        pageIndex: 1,
        total: 0
      },
      dicOptions: {
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx']),
        yesno: trim(this.$store.getters['dictionary/yesno']),
        verify: [
          { value: 1, label: '待审核' },
          { value: 2, label: '审核通过' },
          { value: 3, label: '审核不通过' }
        ]
      },
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
          },
          {
            disabled: false,
            type: 'select',
            label: '审核类型',
            rules: [],
            style: { width: '210px' },
            key: 'verifyType',
            options: [
              { value: 1, label: '待审核' },
              { value: 2, label: '审核通过' },
              { value: 3, label: '审核不通过' }
            ]
          }
        ]
      },
      columns: [
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'corpName' },
        { title: '转出区', prop: 'fromDistrict', slot: 'fromDistrict' },
        { title: '转入区', prop: 'inDistrict', slot: 'inDistrict' },
        { title: '审核类型', prop: 'verifyType', slot: 'verifyType' },
        { title: '原因', prop: 'transferReason' },

        { title: '操作', slot: 'aaa010' }
      ],
      list: [],
      columns2: [
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'corpName' },
        { title: '转出区', prop: 'fromDistrict', slot: 'fromDistrict' },
        { title: '转入区', prop: 'inDistrict', slot: 'inDistrict' },
        { title: '审核类型', prop: 'verifyType', slot: 'verifyType' },
        { title: '原因', prop: 'transferReason' },
        { title: '操作', slot: 'aaa010' }
      ],
      list2: []
    };
  },
  computed: {},
  methods: {
    audit(e) {
      let data = { ...e.row };
      //1 转出 2转入
      data.type = this.activeName;
      console.log(data);
      if (!data.verifyResult) {
        this.message('warning', '请选择审核意见');
        return;
      }
      if (data.verifyResult == '2') {
        if (!data.verifyMemo) {
          this.message('warning', '请填写不通过理由');
          return;
        }
      }
      move_audit(
        data,
        res => {
          document.body.click();
          if (res.result.data.result) {
            this.message('success', '操作成功');
            this.query(this.activeName, this.dataList);
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
    message(type, msg, time) {
      this.$message({
        message: msg,
        type: type,
        duration: time || 1500
      });
    },
    handleChange(e) {
      this.params.pageIndex = e;
      this.query(this.activeName, this.dataList);
    },
    handleChange2(e) {
      this.params2.pageIndex = e;
      this.query(this.activeName, this.dataList);
    },
    handleClick(e) {
      this.query(this.activeName, this.dataList);
    },
    query(type, e) {
      if (type == 1) {
        let data = { ...e };
        data.pageSize = this.pageSize;
        data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex)) - 1;
        data.type = type;
        this.dataList = data;
        move_query(
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
      } else {
        let data = { ...e };
        data.pageSize = this.pageSize;
        data.pageIndex = JSON.parse(JSON.stringify(this.params2.pageIndex)) - 1;
        data.type = type;
        this.dataList = data;
        move_query(
          data,
          res => {
            if (res.status == 200) {
              let pageresult = res.result.pageresult;
              this.list2 = pageresult.data;
              this.params2.pageIndex = Number(pageresult.pageIndex) + 1;
              this.params2.total = pageresult.total;
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    advancedSearch(e) {
      this.query(this.activeName, e);
    }
  },
  mounted() {
    this.$refs.tform.value = {
      verifyType: 1
    };
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
