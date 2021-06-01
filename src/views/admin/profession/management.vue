<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-06-01 19:00:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\management.vue
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <ttable :columns="columns" :list="list">
      <!-- 内容部分-操作 -->
      <el-table-column slot="actType" label="活动类型" align="center">
        <template slot-scope="scope">
          <template v-for="(v, k) in dicOptions.type">
            <span :key="k" v-if="scope.row.actType == v.value">{{
              v.label
            }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column slot="expertJoin" label="是否专家参与" align="center">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.expertJoin == '1'"
            type="success"
            effect="dark"
          >
            是
          </el-tag>
          <el-tag
            v-if="scope.row.expertJoin == '0'"
            type="danger"
            effect="dark"
          >
            否
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column slot="release" label="是否发布" align="center">
        <template slot-scope="scope">
          <el-popconfirm
            v-if="scope.row.release == '0'"
            title="确定发布?"
            @confirm="confirm(scope)"
          >
            <el-switch slot="reference" :value="false"></el-switch>
          </el-popconfirm>
          <el-switch v-if="scope.row.release == '1'" :value="true"></el-switch>
        </template>
      </el-table-column>
      <el-table-column width="200" slot="aaa010" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="look(2, scope)" plain>
            <i class="el-icon-search"></i> 查看</el-button
          >
          <el-button
            v-if="scope.row.userId == userId"
            size="mini"
            type="primary"
            @click="look(1, scope)"
            plain
          >
            <i class="el-icon-edit"></i> 编辑
          </el-button>
          <div style="margin-top:5px">
            <el-button @click="look(4, scope)" size="mini" type="info" plain>
              <i class="el-icon-chat-line-square"></i> 反馈</el-button
            >
            <el-button
              v-if="scope.row.release != '1'"
              size="mini"
              type="danger"
              @click="remove(scope)"
              plain
            >
              <i class="el-icon-close"></i> 删除</el-button
            >
          </div>
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
    <div style="text-align:right">
      <el-button size="mini" type="primary" @click="look(3)">
        <i class="el-icon-plus"></i> 添加</el-button
      >
    </div>
    <managementdetails
      v-if="visible"
      :visible="visible"
      :formConfig="detailsFormConfig"
      :type="type"
      @onclose="onclose"
    ></managementdetails>
  </div>
</template>

<script>
import tform from '../common/t_form';
import ttable from '../common/t_table';
import managementdetails from './module/managementDetails';
import { act_query, act_delete, act_release, act_modify } from './api/index';
import { trim } from '@/utils/index';
export default {
  name: 'management',
  components: { ttable, tform, managementdetails },
  data() {
    return {
      userId: this.$store.state.admin.userInfo.logonUser.userIdStr,
      visible: false,
      disabled: false,
      type: 1,
      fileList: [],
      fileListImg: '',
      dicOptions: {
        //特色活动类型
        type: trim(
          this.$store.getters['dictionary/recruit_special_activity_type']
        )
      },
      params: {
        pageIndex: 1,
        total: 0,
        pageSize: 10
      },
      detailsFormConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '160px',
        isBtn: true,
        formItemList: [
          {
            type: 'select',
            label: '活动类型',
            rules: [],
            key: 'actType',
            style: { width: '190px' },
            options: trim(
              this.$store.getters['dictionary/recruit_special_activity_type']
            )
          },
          {
            type: 'input',
            label: '活动名称',
            style: { width: '190px' },
            placeholder: '请输入活动名称',
            rules: [],
            key: 'actName'
          },

          {
            type: 'datetimerange',
            label: '活动开始时间',
            style: { width: '553px' },
            placeholder: '请输入开始时间',
            rules: [],
            format: 'yyyy-MM-dd HH:mm:ss',
            key: 'acttime'
          },
          // {
          //   type: 'date',
          //   label: '活动开始时间',
          //   style: { width: '190px' },
          //   placeholder: '请输入开始时间',
          //   rules: [],
          //   format: 'yyyyMMdd',
          //   key: 'actStartTime'
          // },
          // {
          //   type: 'date',
          //   label: '活动结束时间',
          //   style: { width: '190px' },
          //   placeholder: '请输入结束时间',
          //   rules: [],
          //   format: 'yyyyMMdd',
          //   key: 'actEndTime'
          // },
          {
            type: 'radio',
            label: '是否专家参与',
            rules: [],
            style: { width: '190px' },
            key: 'expertJoin',
            options: trim(this.$store.getters['dictionary/yesno'])
          },
          {
            type: 'input',
            label: '活动地点',
            style: { width: '190px' },
            placeholder: '请输入活动地点',
            rules: [],
            key: 'actAddress',
            value: '123'
          },
          {
            type: 'textarea',
            label: '主要内容',
            style: { width: '554px' },
            placeholder: '请输入主要内容',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'content'
          },
          {
            type: 'datetimerange',
            label: '报名开始时间',
            style: { width: '553px' },
            placeholder: '请输入开始时间',
            rules: [],
            format: 'yyyy-MM-dd HH:mm:ss',
            key: 'applytime'
          },
          // {
          //   type: 'date',
          //   label: '报名开始时间',
          //   format: 'yyyyMMdd',
          //   style: { width: '190px' },
          //   placeholder: '请输入开始时间',
          //   rules: [],
          //   key: 'applyStartTime'
          // },
          // {
          //   type: 'date',
          //   label: '报名结束时间',
          //   format: 'yyyyMMdd',
          //   style: { width: '190px' },
          //   placeholder: '请输入结束时间',
          //   rules: [],
          //   key: 'applyEndTime'
          // },
          {
            type: 'input',
            label: '最大自主报名人数',
            style: { width: '190px' },
            placeholder: '请输入最大自主报名人数',
            rules: [],
            key: 'selfApplyMax'
          },
          {
            type: 'input',
            label: '最大推荐报名人数',
            style: { width: '190px' },
            placeholder: '请输入最大推荐报名人数',
            rules: [],
            key: 'recApplyMax'
          }
        ]
      },
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',

        formItemList: [
          {
            type: 'select',
            label: '活动类型',
            rules: [],
            key: 'actType',
            style: { width: '210px' },
            options: trim(
              this.$store.getters['dictionary/recruit_special_activity_type']
            )
          },
          {
            type: 'daterange',
            label: '活动日期',
            rules: [],
            format: 'yyyyMMdd',
            key: 'time'
          },
          {
            type: 'input',
            label: '活动名称',
            style: { width: '210px' },
            placeholder: '请输入活动名称',
            rules: [],
            key: 'actName'
          }
        ]
      },
      columns: [
        { title: '序号', type: 'index' },
        { title: '活动类型', prop: 'actType', slot: 'actType' },
        { title: '活动名称', prop: 'actName' },
        { title: '是否专家参与', prop: 'expertJoin', slot: 'expertJoin' },
        { title: '活动开始时间', prop: 'actStartTime' },
        { title: '活动结束时间', prop: 'actEndTime' },
        { title: '最大自主报名人数', prop: 'selfApplyMax' },
        { title: '是否发布', prop: 'release', slot: 'release' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [],
      dataList: {}
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
    remove(e) {
      let data = { ...e.row };
      act_delete(
        data,
        res => {
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
            console.log(res.result.data.msg);
            this.$message({
              message: res.result.data.msg,
              type: 'warning'
            });
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    feedback(e) {
      let data = { ...e.row };
      data.propagandaImageBase64 = this.fileListImg;
      act_modify(
        data,
        res => {
          document.body.click();
          if (res.result.data.result) {
            this.$message({
              message: '操作成功',
              type: 'success'
            });
          } else {
            console.log(res.result.data.msg);
            this.$message({
              message: res.result.data.msg,
              type: 'warning'
            });
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    confirm(e) {
      let data = { ...e.row };
      act_release(
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
      this.params.pageIndex = e;
      this.advancedSearch(this.dataList);
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
      let data = { ...e, ...this.params };
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex - 1));
      if (data.time) {
        data.actStartDate = data.time[0];
        data.actEndDate = data.time[1];
      }

      this.dataList = data;
      act_query(
        data,
        res => {
          if (res.status == 200) {
            this.message('success', '操作成功');
            let pageresult = res.result.data;
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
    formattime(time) {
      if (time.length > 6) {
        let t = time.split(' ')[0];
        return t.replace(/-/g, '');
      }
      return '';
    },
    look(type, scope) {
      //1 编辑 2 查看 3 新增 4反馈
      if (type == 1) {
        this.type = 1;
        this.detailsFormConfig.disabled = false;
      } else if (type == 2) {
        this.type = 2;
        this.detailsFormConfig.disabled = true;
      } else if (type == 3) {
        this.type = 3;
        this.detailsFormConfig.disabled = false;
      } else {
        this.type = 4;
        this.detailsFormConfig.disabled = true;
      }
      console.log(type);
      //把数据合并到表单里面
      if (type != '3') {
        scope.row.applytime = [
          scope.row.applyStartTime,
          scope.row.applyEndTime
        ];
        scope.row.acttime = [scope.row.actStartTime, scope.row.actEndTime];

        this.detailsFormConfig.dataList = scope.row;
      }
      this.visible = true;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
