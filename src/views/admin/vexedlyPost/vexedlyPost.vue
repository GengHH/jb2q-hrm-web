<!--
 * @Author: your name
 * @Date: 2021-03-05 09:55:06
 * @LastEditTime: 2021-06-08 15:05:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
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
    <ttable :columns="columns" :list="list">
      <!-- 内容部分-操作 -->

      <el-table-column width="200" slot="aaa010" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="auditStutas == '1'"
            icon="el-icon-folder-checked"
            size="mini"
            type="success"
            @click="look(scope)"
            plain
          >
            审核</el-button
          >
          <el-popover placement="bottom" width="400" trigger="click">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入删除理由"
              v-model="scope.row.deleteMemo"
            >
            </el-input>
            <el-button size="mini" type="danger" @click="userRemove(scope)"
              >确定删除</el-button
            >
            <el-button size="mini" slot="reference" type="danger" plain
              >删除</el-button
            >
          </el-popover>
        </template>
      </el-table-column>
    </ttable>
    <el-pagination
      @size-change="handleChange"
      @current-change="handleChange"
      :current-page.sync="params.pageIndex"
      :page-size="params.pageSize"
      layout="total, prev, pager, next"
      :total="params.total"
    >
    </el-pagination>
    <hrdetails
      v-if="visible"
      :visible="visible"
      :dataList="dataList"
      @onclose="onclose"
    ></hrdetails>
  </div>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../common/t_form';
import ttable from '../common/t_table';
import hrdetails from './module/hrdetails';
import { hr_query, hr_delete } from './api/index';

export default {
  name: 'vexedlyPost',
  components: { ttable, tform, hrdetails },
  data() {
    return {
      auditStutas: 1,
      visible: false,
      dataList: [],
      params: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      columns: [
        // { type: 'selection' },
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'corpName' },
        { title: '社会信用代码', prop: 'tyshxydm' },
        { title: '联系人', prop: 'contactName' },
        { title: '联系电话', prop: 'contactPhone' },
        { title: '其他说明', prop: 'applyMemo' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [],
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
            placeholder: '请输入账号名',
            rules: [],
            key: 'corpName'
          }
        ]
      },
      dicOptions: {
        //角色类型
        role: trim(this.$store.getters['dictionary/recruit_user_role'])
      }
    };
  },
  computed: {},
  methods: {
    userRemove(e) {
      let data = e.row;
      if (!data.deleteMemo) {
        this.message('warning', '请填写删除理由');
        return;
      }
      hr_delete(
        data,
        res => {
          if (res.status == 200) {
            document.body.click();
            this.message('success', '操作成功');
            this.advancedSearch(this.dataList);
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
    auditType(type) {
      this.auditStutas = type;
      this.advancedSearch(this.dataList);
    },
    message(type, msg) {
      this.$message({
        message: msg,
        type: type,
        duration: 1000,
        onClose: () => {}
      });
    },
    look(e) {
      this.dataList = { ...e.row };
      this.visible = true;

      //1查看 2审核
    },
    handleChange(e) {
      this.params.pageIndex = e;
      this.advancedSearch(this.dataList);
    },
    onclose(type) {
      if (type == '1') {
        this.advancedSearch(this.dataList);
      }
      this.visible = false;
    },
    advancedSearch(e) {
      let data = { ...this.params, ...e };
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex - 1));
      data.pageSize = this.pageSize;
      //1待审核 2审核通过 3审核不通过
      data.verifyStatus = this.auditStutas;
      this.dataList = data;
      hr_query(
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
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
