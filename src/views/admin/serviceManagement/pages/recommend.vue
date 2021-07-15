<!--
 * @Author: your name
 * @Date: 2021-03-09 17:47:29
 * @LastEditTime: 2021-07-14 18:37:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\recommend.vue
-->
<template>
  <el-dialog width="800px" title="推荐职位" :visible="visible" @close="onclose">
    <div style="height:650px;">
      <div style="margin:0 10px 0 0">
        <el-form
          size="small"
          ref="queryForm"
          :model="queryForm"
          label-width="100px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="职位名称">
                <el-input v-model="queryForm.positionName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="薪酬">
                <el-input-number
                  :controls="false"
                  v-model="queryForm.salaryMin"
                  label="薪酬下限"
                ></el-input-number>
                -
                <el-input-number
                  :controls="false"
                  v-model="queryForm.salaryMax"
                  label="薪酬上限"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="其他选项">
            <el-select
              style="width:150px"
              v-model="queryForm.workNature"
              placeholder="工作性质"
            >
              <el-option
                v-for="item in dicOptions.workNature"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              style="width:150px"
              v-model="queryForm.workArea"
              placeholder="工作区域"
            >
              <el-option
                v-for="item in dicOptions.qx"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              style="width:150px"
              v-model="queryForm.eduLevel"
              placeholder="学历要求"
            >
              <el-option
                v-for="item in dicOptions.edu"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align:right">
        <el-button size="mini" type="primary" plain @click="advancedSearch()">
          <i class="el-icon-search"></i> 查询</el-button
        >
        <el-button
          size="mini"
          type="primary"
          plain
          @click="queryForm = { ...initQueryForm }"
        >
          <i class="el-icon-refresh"></i> 重置</el-button
        >
      </div>
      <ttable :columns="columns" :list="list">
        <el-table-column slot="positionName" label="职位" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="12">
                <div style="color:#fc6f3d;text-align:left">
                  {{ scope.row.positionName }}
                </div>
                <div style="text-align:left">
                  <template v-for="(v, k) in dicOptions.qx">
                    <span :key="k + 'a'" v-if="v.value == scope.row.workArea">
                      {{ v.label }}
                    </span>
                  </template>
                  <el-divider direction="vertical"></el-divider>
                  <template v-for="(v, k) in dicOptions.edu">
                    <span :key="k + 'b'" v-if="v.value == scope.row.eduRequire">
                      {{ v.label }}
                    </span>
                  </template>
                  <el-divider direction="vertical"></el-divider>
                  <template v-for="(v, k) in dicOptions.workNature">
                    <span :key="k + 'c'" v-if="v.value == scope.row.workNature">
                      {{ v.label }}
                    </span>
                  </template>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <span>{{ scope.row.corpName }}</span>
                </div>
                <div>
                  <span style="color:#bbbbbb"
                    >薪酬：{{ scope.row.salaryMin }}-{{
                      scope.row.salaryMax
                    }}</span
                  >
                </div>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column width="150" slot="aaa009" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="opendio(scope)" type="primary">
              <i class="el-icon-edit"></i> 推荐</el-button
            >
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
    </div>
  </el-dialog>
</template>

<script>
import { trim } from '@/utils/index';
import ttable from '../../common/t_table';
import { emphasis_query } from '../api/index';
import { agency_rec } from '../../unitManagement/api/index';

export default {
  name: 'recommend',
  props: ['visible', 'dataList'],
  components: { ttable },
  data() {
    return {
      queryForm: {},
      initQueryForm: {
        positionName: '',
        salaryMin: undefined,
        workArea: '',
        eduLevel: '',
        salaryMax: undefined,
        workNature: ''
      },
      dicOptions: {
        //工作分类

        type: trim(this.$store.getters['dictionary/recruit_position_s_type']),
        //学历
        edu: trim(this.$store.getters['dictionary/recruit_edu']),
        //工作年限
        year: trim(this.$store.getters['dictionary/recruit_work_year']),
        //工作性质
        workNature: trim(this.$store.getters['dictionary/recruit_work_nature']),
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx'])
      },
      params: {
        pageIndex: 0,
        total: 0,
        pageSize: 10
      },
      list: [],
      columns: [
        { type: 'index' },
        { title: '职位', prop: 'positionName', slot: 'positionName' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ]
    };
  },
  computed: {},
  methods: {
    advancedSearch() {
      let data = {
        ...this.dataList,
        ...this.queryForm,
        pageParam: this.params
      };
      data.pageParam.pageIndex = 0;
      this.queryList(data);
    },
    opendio(e) {
      console.log(e);
      let data = { ...e.row, ...this.dataList };
      data.cid = data.corpId;
      //'1', '推荐简历  2', '推荐职位
      data.recType = '2';
      agency_rec(
        data,
        res => {
          if (res.result.data.result) {
            this.message('success', '推荐成功', () => {
              this.advancedSearch();
            });
          } else {
            this.message('warning', res.result.data.msg);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    message(type, msg, fn) {
      this.$message({
        message: msg,
        type: type,
        duration: 1000,
        onClose: () => {
          if (fn) {
            fn();
          }
        }
      });
    },
    handleChange(e) {
      this.params.pageIndex = e - 1;
      let data = {
        ...this.dataList,
        ...this.queryForm,
        pageParam: this.params
      };
      this.queryList(data);
    },
    queryList(e) {
      let data = { ...e };
      data.pageParam = this.params;
      //是否已推荐（0未推荐，1已推荐，不传则全查）
      data.recommend = '0';
      emphasis_query(
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
    onclose() {
      this.$emit('onclose');
    }
  },
  mounted() {
    console.log(this.dataList);
    this.queryList(this.dataList);
  },
  created() {}
};
</script>
<style lang="scss" scoped></style>
