<!--
 * @Author: your name
 * @Date: 2021-04-28 14:27:10
 * @LastEditTime: 2021-04-28 14:46:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\recruitmentManagement\pages\managementDetails.vue
-->
<template>
  <el-dialog
    title="招聘会反馈结果"
    width="850px"
    :visible="visible"
    @close="onclose"
  >
    <div
      style="height:500px;overflow: scroll;overflow-x: hidden;padding: 0 10px 0 0;"
    >
      <div class="title-style">详细信息</div>
      <tform ref="form" :formConfig="formConfig"> </tform>
      <div v-if="type == '2'">
        <div class="title-style">招聘会信息</div>
        <ttable :columns="columns" :list="list"
          ><el-table-column slot="meetName" label="招聘会名称" align="center">
            <template slot-scope="scope">
              <span
                @click="queryApply(scope)"
                style="color:blue;cursor: pointer;"
              >
                {{ scope.row.meetName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column slot="meetType" label="招聘会类型" align="center">
            <template slot-scope="scope">
              <div v-for="(v, k) in dicOptions.type" :key="k">
                <el-tag v-if="v.value == scope.row.meetType">{{
                  v.label
                }}</el-tag>
              </div>
            </template>
          </el-table-column></ttable
        >
        <el-pagination
          @size-change="handleChange"
          @current-change="handleChange"
          :current-page.sync="params.pageIndex"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="params.total"
        >
        </el-pagination>
      </div>
      <div v-if="type != '2'" style="text-align:center">
        <el-button size="mini" type="primary" @click="advancedSearch()">
          提交</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../../common/t_form';
import ttable from '../../common/t_table';
import {
  result_enrollment,
  result_feedback,
  result_wanted,
  result_update,
  result_add
} from '../api/index';
export default {
  name: 'managementDetails',
  props: ['visible', 'lookList', 'disabled', 'type'],
  components: { tform, ttable },
  data() {
    return {
      params: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      list: [],

      dicOptions: {
        type: trim(this.$store.getters['dictionary/recruit_meet_type']),
        //学历
        edu: trim(this.$store.getters['dictionary/recruit_edu']),
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx']),
        //是否
        yesno: trim(this.$store.getters['dictionary/yesno']),
        //性别
        sex: trim(this.$store.getters['dictionary/ggjbxx_sex'])
      },
      columns: [
        { title: '序号', type: 'index' },
        { title: '招聘会名称', prop: 'meetName', slot: 'meetName' },
        { title: '招聘会类型', prop: 'meetType', slot: 'meetType' },
        { title: '参会联系人', prop: 'applyContactName' },
        { title: '参会联系手机', prop: 'applyContactPhone' },
        { title: '备注', prop: 'memo' }
      ],

      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        disabled: this.disabled,
        labelWidth: '320px',
        style: {
          width: '650px',
          margin: '0 auto'
        },
        isBtn: true,
        formItemList: [
          {
            type: 'input',
            label: '招聘会名称',
            style: { width: '260px' },
            placeholder: '请输入招聘单位数',
            rules: [],
            disabled: true,
            key: 'corpCount'
          },
          {
            type: 'textarea',
            label: '招聘会简介',
            style: { width: '260px' },
            placeholder: '请输入招聘会简介',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'textarea'
          },
          {
            type: 'select',
            label: '招聘会类型',
            rules: [],
            disabled: true,
            key: 'distictCode',
            style: { width: '260px' },
            options: trim(this.$store.getters['dictionary/ggjbxx_qx'])
          },
          {
            type: 'date',
            label: '招聘会召开时间',
            placeholder: '请输入召开时间',
            rules: [],
            style: { width: '260px' },
            key: 'date'
          },
          {
            type: 'date',
            label: '招聘会结束时间',
            placeholder: '请输入结束时间',
            rules: [],
            style: { width: '260px' },
            key: 'date'
          },
          {
            type: 'input',
            label: '主办单位',
            style: { width: '260px' },
            placeholder: '请输入主办单位',
            rules: [],
            disabled: true,
            key: 'corpCount'
          },
          {
            type: 'input',
            label: '招聘会地点',
            style: { width: '260px' },
            placeholder: '请输入招聘会地点',
            rules: [],
            disabled: true,
            key: 'corpCount'
          },
          {
            type: 'input',
            label: '招聘会展位数量',
            style: { width: '260px' },
            placeholder: '请输入招聘单位数',
            rules: [],
            disabled: true,
            key: 'corpCount'
          },
          {
            type: 'input',
            label: '附近交通',
            style: { width: '260px' },
            placeholder: '请输入招聘单位数',
            rules: [],
            disabled: true,
            key: 'corpCount'
          },
          {
            type: 'input',
            label: '联系人',
            style: { width: '260px' },
            placeholder: '请输入招聘单位数',
            rules: [],
            disabled: true,
            key: 'corpCount'
          },
          {
            type: 'input',
            label: '联系电话',
            style: { width: '260px' },
            placeholder: '请输入招聘单位数',
            rules: [],
            disabled: true,
            key: 'corpCount'
          },
          {
            type: 'radio',
            label: '联系电话',
            style: { width: '260px' },
            placeholder: '请输入招聘单位数',
            rules: [],
            disabled: true,
            key: 'corpCount'
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    queryPosition(e) {
      let data = { ...e.row };
      data.pageSize = this.pageSize;
      data.pageIndex = JSON.parse(JSON.stringify(this.params3.pageIndex)) - 1;
      result_wanted(
        data,
        res => {
          if (res.status == 200) {
            let pageresult = res.result.pageresult;
            this.list3 = pageresult.data;
            this.params3.pageIndex = Number(pageresult.pageIndex) + 1;
            this.params3.total = pageresult.total;
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    queryApply(e) {
      let data = { ...e.row };
      data.pageSize = this.pageSize;
      data.pageIndex = JSON.parse(JSON.stringify(this.params2.pageIndex)) - 1;
      result_feedback(
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
    },
    handleChange(e) {
      console.log(e);
    },
    advancedSearch() {
      console.log(this.type);
      let data = { ...this.$refs.form.value };
      //1 添加 2 查看 3 修改
      if (this.type == '1') {
        result_add(
          data,
          res => {
            if (res.status == 200) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.onclose(1);
                }
              });
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      } else if (this.type == '3') {
        result_update(
          data,
          res => {
            if (res.status == 200) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.onclose(1);
                }
              });
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    onclose(type) {
      this.$emit('onclose', type || 0);
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.form.value = { ...this.lookList };
    }, 0);
    let data = { ...this.lookList };
    if (this.type == '2') {
      data.pageSize = this.pageSize;
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex)) - 1;
      result_enrollment(
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
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.title-style {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  line-height: 40px;
  border-bottom: 1px solid #e9eef3;
  text-align: left;
  padding: 0 30px;
  box-sizing: border-box;
  position: relative;
}
.title-style::before {
  content: '';
  width: 4px;
  height: 16px;
  position: absolute;
  left: 12px;
  top: 13px;
  background: $g-mian-color;
}
</style>
