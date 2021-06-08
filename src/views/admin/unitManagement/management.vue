<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-06-03 18:23:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\management.vue
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <ttable :columns="columns" :list="list">
      <!-- 内容部分-操作 -->

      <el-table-column slot="corpLabel" label="单位标签" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.humanResourceReg == '1'" type="success"
            >人力资源机构</el-tag
          >
          <el-tag v-if="scope.row.tranBaseSymbol == '1'" type="success"
            >就业见习基地</el-tag
          >
          <el-tag v-if="scope.row.keypointCorp == '1'" type="success"
            >重点企业</el-tag
          >
          <el-tag v-if="scope.row.specialCorp == '1'" type="success"
            >特定企业</el-tag
          >
          <el-tag v-if="scope.row.entrustStatus == '1'" type="success"
            >代理招聘</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column slot="frozen" label="单位状态" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.frozen == '1' ? '冻结' : '正常' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="270" slot="aaa010" label="操作" align="center">
        <template slot-scope="scope">
          <el-popover
            ref="move_add_pop"
            placement="bottom"
            width="400"
            trigger="click"
          >
            <el-select v-model="scope.row.fro" style="width:150px">
              <el-option label="冻结" value="1"></el-option>
              <el-option label="正常" value="0"></el-option>
            </el-select>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入理由"
              v-model="scope.row.fReason"
            >
            </el-input>
            <el-button size="mini" type="danger" @click="isFreeze(scope)"
              >确定冻结/解冻</el-button
            >
            <el-button size="mini" slot="reference" type="primary" plain>
              <i class="el-icon-lock"></i> 冻结/解冻</el-button
            >
          </el-popover>

          <el-button size="mini" type="primary" @click="look(scope, 1)" plain>
            <i class="el-icon-search"></i> 查看</el-button
          >
          <el-button size="mini" type="primary" @click="look(scope, 2)" plain>
            <i class="el-icon-edit"></i> 修改</el-button
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
    <managementdetail
      v-if="visible"
      :visible="visible"
      :form="form"
      :disabled="disabled"
      @onclose="onclose"
    ></managementdetail>
  </div>
</template>

<script>
import tform from '../common/t_form';
import ttable from '../common/t_table';
import { trim } from '@/utils/index';
import { management_query, management_frozen } from './api/index';
import managementdetail from './pages/managementDetail';
export default {
  name: 'management',
  components: { ttable, tform, managementdetail },
  data() {
    return {
      visible: false,
      form: {},
      disabled: false,
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
            type: 'select',
            label: '单位状态',
            rules: [],
            key: 'frozen',
            style: { width: '210px' },
            options: [
              {
                value: '1',
                label: '冻结'
              },
              {
                value: '0',
                label: '正常'
              }
            ]
          }
        ]
      },
      params: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      columns: [
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'corpName' },
        { title: '单位状态', prop: 'frozen', slot: 'frozen' },
        { title: '冻结/解冻原因', prop: 'frozenReason' },
        { title: '单位标签', slot: 'corpLabel' },
        // { title: '企业LOGO', prop: 'aaa005' },
        // { title: '公司简介短视频', prop: 'aaa006' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: []
    };
  },
  computed: {},
  methods: {
    onclose(type) {
      if (type == '1') {
        this.advancedSearch(this.dataList);
      }
      this.visible = false;
    },
    handleChange(e) {
      console.log(e);
      this.params.pageIndex = e;
      this.advancedSearch(this.dataList);
    },
    advancedSearch(e) {
      let data = { ...e };
      data.pageSize = this.pageSize;
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex)) - 1;
      this.dataList = data;
      management_query(
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
    isYes(obj, arr) {
      for (let j = 0; j < arr.length; j++) {
        for (let i in obj) {
          if (i == arr[j]) {
            obj[i] = obj[i] == '1' ? true : false;
          }
        }
      }
      return obj;
    },
    //冻结
    isFreeze(e) {
      console.log(e);
      //冻结1 解冻0 备注冻结时必填
      let data = { ...e.row };
      data.frozen = data.fro;
      data.frozenReason = data.fReason;
      if (data.frozen == '1') {
        if (!data.frozenReason) {
          this.$message({
            message: '请填写原因',
            type: 'warning',
            duration: 1000
          });
          return;
        }
      }
      management_frozen(
        data,
        res => {
          document.body.click();
          if (res.result.data.result) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              close: () => {
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
    look(e, type) {
      let data = { ...e.row };
      //格式化多选数据
      this.form = this.isYes(data, [
        'tranBaseSymbol',
        'humanResourceReg',
        'keypointCorp',
        'specialCorp',
        'entrustStatus',
        'resumeSearch',
        'resumeFavor',
        'resumeDownload',
        'indexRec'
      ]);
      this.form.frozenTime = this.formatTime(this.form.frozenTime);
      //1查看  2修改
      if (type == '1') {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      this.visible = true;
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
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
