<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-05-12 19:40:33
 * @LastEditors: GengHH
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\recruitment.vue
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <ttable
      :columns="columns"
      :list="list"
      @handleSelectionChange="e => (selectData = e)"
    >
      <el-table-column slot="frozen" label="单位状态" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.frozen == '1' ? '冻结' : '正常' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="280" slot="aaa010" label="操作" align="center">
        <template slot-scope="scope">
          <el-popconfirm title="确定添加吗？" @confirm="add(scope)">
            <el-button slot="reference" size="mini" type="primary" plain>
              <i class="el-icon-folder-add"></i> 添加</el-button
            >
          </el-popconfirm>
          <el-popover placement="bottom" width="400" trigger="click">
            <el-date-picker
              v-model="scope.row.time"
              type="date"
              placeholder="请输入代理有效期"
              style="width:100%"
              value-format="yyyyMMdd"
            >
            </el-date-picker>

            <el-button size="mini" type="danger" @click="edit(scope)"
              >确定修改</el-button
            >
            <el-button size="mini" slot="reference" type="primary" plain>
              <i class="el-icon-edit"></i> 修改</el-button
            >
          </el-popover>

          <el-button size="mini" type="primary" plain @click="audit(scope)">
            <i class="el-icon-chat-dot-round"></i> 审核</el-button
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
    <div style="text-align:right">
      <el-button type="danger" icon="el-icon-delete" @click="remove"
        >删除</el-button
      >
    </div>
    <recruitmentdetail
      v-if="visible"
      :visible="visible"
      :form="form"
      @onclose="onclose"
    ></recruitmentdetail>
  </div>
</template>

<script>
import tform from '../common/t_form';
import ttable from '../common/t_table';
import { trim } from '@/utils/index';
import {
  agency_query,
  agency_cancel,
  agency_add,
  agency_edit
} from './api/index';
import recruitmentdetail from './pages/recruitment/recruitmentDetail';
export default {
  name: 'recruitment',
  components: { ttable, tform, recruitmentdetail },
  data() {
    return {
      type: '',
      disabled: false,
      form: {},
      visible: false,
      params: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      dicOptions: {
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx'])
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
            type: 'daterange',
            label: '代理有效期',
            rules: [],
            key: 'time'
          }
        ]
      },
      currentPage: 1,
      columns: [
        { type: 'selection' },
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'corpName' },
        { title: '单位状态', prop: 'frozen', slot: 'frozen' },
        { title: '代理招聘有效期', prop: 'entrustValid' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [],
      dataList: [],
      selectData: []
    };
  },
  computed: {},
  methods: {
    audit(e) {
      this.form = e.row;
      this.form.cid = e.row.cid || '';
      this.visible = true;
    },
    edit(e) {
      let data = { ...e.row };
      data.entrustValid = data.time;
      agency_edit(
        data,
        res => {
          if (res.status == 200) {
            document.body.click();
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.advancedSearch(this.dataList);
              }
            });
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    add(e) {
      let data = { ...e.row };
      agency_add(
        data,
        res => {
          if (res.status == 200) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.advancedSearch(this.dataList);
              }
            });
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    remove() {
      if (this.selectData.length) {
        agency_cancel(
          this.selectData,
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
        this.$message({
          message: '请选取要删除的列表！',
          type: 'warning'
        });
      }
    },
    handleChange(e) {
      console.log(e);
    },
    advancedSearch(e) {
      console.log(e);
      let data = { ...e };
      data.pageSize = this.pageSize;
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex)) - 1;
      if (data.time) {
        data.startEntrust = data.time[0];
        data.endEntrust = data.time[1];
      }
      this.dataList = data;
      agency_query(
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
    onclose(type) {
      if (type == '1') {
        this.advancedSearch(this.dataList);
      }
      this.visible = false;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
