<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-07-14 17:25:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\recruitment.vue
-->
<template>
  <div id="indexBody">
    <tform
      ref="tform"
      :formConfig="formConfig"
      @onsubmit="advancedSearch"
    ></tform>
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
          <el-popover placement="bottom" width="400" trigger="click">
            <el-date-picker
              v-model="scope.row.time"
              type="date"
              placeholder="请输入代理招聘协议截止日期"
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
      <el-button type="primary" @click="addVisible = true">
        <i class="el-icon-folder-add"></i> 添加</el-button
      >
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
    <!-- 添加 -->
    <el-dialog
      title="添加代理招聘"
      width="850px"
      v-if="addVisible"
      :visible="addVisible"
      @close="addVisible = false"
    >
      <tform :formConfig="formConfig2" @onsubmit="addQuery"></tform>
      <ttable :columns="columns2" :list="list2">
        <el-table-column slot="frozen" label="单位状态" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.frozen == '1' ? '冻结' : '正常' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="280" slot="aaa010" label="操作" align="center">
          <template slot-scope="scope">
            <el-popover
              ref="move_add_pop"
              placement="bottom"
              width="400"
              trigger="click"
            >
              <el-date-picker
                v-model="scope.row.entrustValid"
                type="date"
                value-format="yyyyMMdd"
                placeholder="请输入代理有效期"
              >
              </el-date-picker>
              <el-button size="mini" type="danger" @click="submitAdd(scope)"
                >确定添加</el-button
              >
              <el-button size="mini" slot="reference" type="danger" plain
                >添加</el-button
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
      >
      </el-pagination>
    </el-dialog>
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
  agency_edit,
  unit_query
} from './api/index';
import recruitmentdetail from './pages/recruitment/recruitmentDetail';
export default {
  name: 'recruitment',
  components: { ttable, tform, recruitmentdetail },
  data() {
    return {
      adminId: this.$store.state.admin.userInfo.logonUser.areaInfo.areaCode,
      type: '',
      addVisible: false,
      disabled: false,
      form: {},
      visible: false,
      params: {
        pageIndex: 1,
        total: 0
      },
      params2: {
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
            style: { width: '320px' },
            rules: [],
            key: 'time'
          },
          {
            disabled: false,
            type: 'select',
            label: '所属区',
            rules: [],
            style: { width: '210px' },
            key: 'districtCode',
            options: trim(this.$store.getters['dictionary/ggjbxx_qx'])
          }
        ]
      },
      formConfig2: {
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
      currentPage: 1,
      columns: [
        { type: 'selection' },
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'corpName' },
        { title: '单位状态', prop: 'frozen', slot: 'frozen' },
        { title: '代理招聘协议截止日期', prop: 'entrustValid' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [],
      columns2: [
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'corpName' },
        { title: '单位状态', prop: 'frozen', slot: 'frozen' },
        { title: '操作', slot: 'aaa010' }
      ],
      list2: [],
      dataList: [],
      dataList2: [],
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
          document.body.click();
          if (res.result.data.result) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.advancedSearch(this.dataList);
              }
            });
          } else {
            this.$message({
              message: res.result.data.msg,
              type: 'warning',
              duration: 2000
            });
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    submitAdd(e) {
      let data = e.row;
      if (!data.entrustValid) {
        this.$message({
          message: '请填写有效时间',
          type: 'warning',
          duration: 1000
        });
        return;
      }

      agency_add(
        data,
        res => {
          document.body.click();
          if (res.result.data.result) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.addQuery(this.dataList2);
              }
            });
          } else {
            this.$message({
              message: res.result.data.msg,
              type: 'warning',
              duration: 2000
            });
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    addQuery(e) {
      let data = {
        entrustStatus: 0,
        pageSize: this.pageSize,
        pageIndex: JSON.parse(JSON.stringify(this.params2.pageIndex)) - 1,
        ...e
      };
      this.dataList2 = data;
      unit_query(
        data,
        res => {
          if (res.status == 200) {
            let pageresult = res.result.pageresult;
            this.list2 = pageresult.data;
            this.params2.pageIndex = Number(pageresult.pageIndex) + 1;
            this.params2.total = pageresult.total;
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000
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
        let data = [...this.selectData];
        data = data
          .map(e => {
            return e.cid;
          })
          .toString();
        agency_cancel(
          { cids: data },
          res => {
            if (res.status == 200) {
              this.advancedSearch(this.dataList);
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
      this.params.pageIndex = e;
      this.advancedSearch(this.dataList);
    },
    handleChange2(e) {
      this.params2.pageIndex = e;
      this.addQuery(this.dataList2);
    },
    advancedSearch(e) {
      console.log(e);
      let areaCode = this.$store.state.admin.userInfo.logonUser.areaInfo
        .areaCode;
      let data = { districtCode: areaCode, ...e };
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
  mounted() {
    this.$refs.tform.value = {
      districtCode: this.adminId
    };
  },
  created() {
    if (this.adminId == '00') {
      this.formConfig.formItemList[2].disabled = false;
    } else {
      this.formConfig.formItemList[2].disabled = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
