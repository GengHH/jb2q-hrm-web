<!--
 * @Author: your name
 * @Date: 2021-03-05 09:55:06
 * @LastEditTime: 2021-04-25 14:38:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <ttable :columns="columns" :list="list">
      <!-- 内容部分-操作 -->
      <el-table-column slot="statusId" label="是否有效" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.statusId == '1'" type="success">有效</el-tag>
          <el-tag v-else type="danger">无效</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="280" slot="aaa010" label="操作" align="center">
        <template slot-scope="scope" v-if="scope.row.statusId == '1'">
          <el-button size="mini" type="primary" @click="look(1, scope)" plain>
            <i class="el-icon-edit"></i> 编辑</el-button
          >
          <el-button size="mini" type="success" @click="addRight(scope)" plain>
            增加权限</el-button
          >
          <el-popconfirm title="确定删除吗？" @confirm="userRemove(scope)">
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              @click="look(scope, 1)"
              plain
            >
              <i class="el-icon-close"></i> 删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </ttable>
    <el-pagination
      @size-change="handleChange"
      @current-change="handleChange"
      :current-page.sync="params.pageIndex"
      :page-size="params.pageSize"
      layout="prev, pager, next, jumper"
      :total="params.total"
    >
    </el-pagination>
    <div style="text-align:right">
      <!-- <el-button size="small" type="danger">
        <i class="el-icon-delete"></i> 删除</el-button
      > -->
      <el-button size="small" type="primary" @click="look(0)">
        <i class="el-icon-plus"></i> 新增</el-button
      >
    </div>

    <adddetails
      v-if="visible"
      :visible="visible"
      :type="type"
      :dataList="dataListObj"
      @onclose="onclose"
    ></adddetails>
    <addright
      v-if="visibleRight"
      :visible="visibleRight"
      @onclose="oncloseRight"
      :dataList="dataRight"
    >
    </addright>
  </div>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../common/t_form';
import ttable from '../common/t_table';
import adddetails from './module/addDetails';
import addright from './module/addRight';
import {
  user_query,
  user_querySysm,
  user_edit,
  user_del,
  user_add
} from './api/index';

export default {
  name: 'index',
  components: { ttable, tform, adddetails, addright },
  data() {
    return {
      dataRight: {},
      dataListObj: {},
      visible: false,
      visibleRight: false,
      type: '',
      dicOptions: {
        //角色类型
        role: trim(this.$store.getters['dictionary/recruit_user_role'])
      },
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',

        formItemList: [
          {
            type: 'input',
            label: '账号名',
            style: { width: '210px' },
            placeholder: '请输入账号名',
            rules: [],
            key: 'userName'
          },
          {
            type: 'input',
            label: '姓名',
            style: { width: '210px' },
            placeholder: '请输入姓名',
            rules: [],
            key: 'name'
          }
        ]
      },
      params: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      columns: [
        // { type: 'selection' },
        { title: '序号', type: 'index' },
        { title: '账号', prop: 'userName' },
        { title: '姓名', prop: 'name' },
        { title: '是否有效', prop: 'statusId', slot: 'statusId' },
        { title: '部门名称', prop: 'deptName' },
        { title: '职位', prop: 'positionName' },
        { title: '联系电话', prop: 'contactNumber' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [],
      dataList: []
    };
  },
  computed: {},
  methods: {
    addRight(e) {
      this.dataRight = { ...e.row };
      this.visibleRight = true;
    },
    userRemove(e) {
      let data = { ...e.row };
      user_del(
        data,
        res => {
          if (res.result.data.result) {
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
    handleChange(e) {
      console.log(e);
    },
    message(type, msg) {
      this.$message({
        message: msg,
        type: type,
        duration: 1000,
        onClose: () => {}
      });
    },
    advancedSearch(e) {
      let data = { ...this.params, ...e };
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex - 1));
      data.pageSize = this.pageSize;
      this.dataList = data;
      user_query(
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
    },
    onclose(type) {
      if (type == '1') {
        this.advancedSearch(this.dataList);
      }
      this.visible = false;
    },
    oncloseRight(type) {
      if (type == '1') {
        this.advancedSearch(this.dataList);
      }
      this.visibleRight = false;
    },
    look(type, scope) {
      //1编辑  0新增
      if (type) {
        this.dataListObj = { ...scope.row };
      }
      this.type = type;
      this.visible = true;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
