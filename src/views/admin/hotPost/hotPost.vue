<!--
 * @Author: your name
 * @Date: 2021-03-05 09:55:06
 * @LastEditTime: 2021-07-01 10:38:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <tform
      ref="form"
      :formConfig="formConfig"
      @onsubmit="advancedSearch"
    ></tform>
    <ttable
      @handleSelectionChange="e => (selectData = e)"
      :columns="columns"
      :list="list"
    >
      <el-table-column slot="positionName" label="热门职业" align="center">
        <template slot-scope="scope">
          <template v-for="(v, k) in dicOptions.type">
            <el-tag :key="k" v-if="v.value == scope.row.positionFType">
              {{ v.label }}
            </el-tag>
          </template>
        </template>
      </el-table-column>
    </ttable>
    <el-dialog
      :visible="resumeVisible"
      @close="resumeVisible = false"
      title="新增热门职业"
      width="800px"
    >
      <div style="height:500px;overflow: auto">
        <span>添加热门职业：</span>
        <el-select
          :filterable="true"
          v-model="resumeValue"
          size="small"
          @change="recordListClick"
          placeholder="请选择"
        >
          <el-option
            v-for="item in dicOptions.type"
            :key="item.value"
            :label="item.label"
            :value="item"
          >
          </el-option>
        </el-select>
        <div style="padding:15px 0">
          <template v-for="(v, k) in tagList">
            <el-tag
              @close="tagList.splice(k, 1)"
              closable
              :key="k"
              style="margin:5px"
            >
              {{ v.label }}
            </el-tag>
          </template>
        </div>
        <div style="text-align:center">
          <el-button type="primary" v-if="tagList.length" @click="onsubmit"
            >提交</el-button
          >
        </div>
      </div>
    </el-dialog>
    <div style="text-align:right">
      <el-button size="small" type="primary" @click="resumeVisible = true">
        <i class="el-icon-plus"></i> 新增热门职业</el-button
      >
    </div>
  </div>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../common/t_form';
import ttable from '../common/t_table';
import { position_query, position_add } from './api/index';

export default {
  name: 'hotPost',
  components: { ttable, tform },
  data() {
    return {
      tagList: [],
      resumeValue: '',
      resumeVisible: false,
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',
        operation: {
          title: '查询'
        },
        formItemList: []
      },
      userId: this.$store.state.admin.userInfo.logonUser.userIdKey,
      columns: [
        { type: 'index' },
        { title: '热招职位名称', prop: 'positionName', slot: 'positionName' }
      ],
      list: [],
      selectData: null,
      dicOptions: {
        type: trim(this.$store.getters['dictionary/recruit_position_f_type'])
      }
    };
  },
  computed: {},
  methods: {
    recordListClick(e) {
      if (this.tagList.length > 8) {
        this.message('warning', '最多添加9条热门职业');
      } else {
        for (let i = 0; i < this.tagList.length; i++) {
          if (this.tagList[i].value == e.value) {
            return;
          }
        }
        this.tagList.push(e);
      }
    },
    message(type, msg) {
      this.$message({
        message: msg,
        type: type,
        duration: 1000,
        onClose: () => {}
      });
    },
    onsubmit() {
      if (this.tagList.length) {
        let data = {
          userId: this.userId,
          position: this.tagList.map(e => {
            return e.value;
          })
        };
        position_add(
          data,
          res => {
            if (res.status == 200) {
              this.message('success', '操作成功');
              this.resumeVisible = false;
              this.advancedSearch();
            } else {
              this.message('warning', res.result.data.msg);
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      } else {
        this.message('warning', '请选择热招职位名称');
      }
    },
    advancedSearch(e) {
      position_query(
        {},
        res => {
          if (res.status == 200) {
            this.message('success', '操作成功');
            let data = res.result.data;
            this.list = data;
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
  mounted() {
    this.advancedSearch();
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
