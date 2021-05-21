<!--
 * @Author: your name
 * @Date: 2021-04-14 17:01:28
 * @LastEditTime: 2021-05-21 17:58:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\pages\recruitment\autonomously.vue
-->
<template>
  <el-dialog
    title="自主招聘"
    width="730px"
    :visible="resVisible"
    @close="onclose"
    append-to-body
  >
    <div style="height:500px;overflow: scroll;overflow-x: hidden;">
      <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
      <ttable :columns="columns" :list="list">
        <el-table-column slot="workArea" label="工作区域" align="center">
          <template slot-scope="scope">
            <template v-for="(v, k) in dicOptions.qx">
              <div :key="k" v-if="v.value == scope.row.workArea">
                {{ v.label }}
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column slot="eduLevel" label="学历要求" align="center">
          <template slot-scope="scope">
            <template v-for="(v, k) in dicOptions.edu">
              <div :key="k" v-if="v.value == scope.row.eduLevel">
                {{ v.label }}
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column slot="workNature" label="工作性质" align="center">
          <template slot-scope="scope">
            <template v-for="(v, k) in dicOptions.workNature">
              <div :key="k" v-if="v.value == scope.row.workNature">
                {{ v.label }}
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column slot="aaa010" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="audit(scope)">
              <i class="el-icon-chat-dot-round"></i> 推荐</el-button
            >
          </template>
        </el-table-column>
      </ttable>
      <el-pagination
        @size-change="handleChange"
        @current-change="handleChange"
        :current-page.sync="pageParam.pageIndex"
        :page-size="pageParam.pageSize"
        layout="total, prev, pager, next"
        :total="pageParam.total"
      >
      </el-pagination>
    </div>
  </el-dialog>
</template>
<script>
import tform from '../../../common/t_form'; //高级查询
import ttable from '../../../common/t_table';
import { agency_position_verify, agency_resume_query } from '../../api/index';
import { trim } from '@/utils/index';
export default {
  name: 'autonomously',
  props: ['resVisible', 'data', 'type'],
  components: { tform, ttable },
  data() {
    return {
      pageParam: {
        pageSize: 10,
        total: 0,
        pageIndex: 1
      },
      dicOptions: {
        //学历
        edu: trim(this.$store.getters['dictionary/recruit_edu']),
        //工作年限
        year: trim(this.$store.getters['dictionary/recruit_work_year']),
        //工作性质
        workNature: trim(this.$store.getters['dictionary/recruit_work_nature']),
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx'])
      },
      columns: [
        { title: '序号', type: 'index' },
        { title: '简历名称', prop: 'corpName' },
        { title: '工作区域', prop: 'workArea', slot: 'workArea' },
        { title: '学历要求', prop: 'eduLevel', slot: 'eduLevel' },
        { title: '工作性质', prop: 'workNature', slot: 'workNature' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [],
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',
        style: {
          width: '100%',
          margin: '0 auto'
        },
        formItemList: [
          {
            type: 'input',
            label: '姓名',
            style: { width: '210px' },
            placeholder: '',
            rules: [],
            key: 'xm'
          },

          {
            type: 'select',
            label: '工作区域',
            rules: [],
            style: { width: '210px' },
            key: 'workArea',
            options: trim(this.$store.getters['dictionary/ggjbxx_qx'])
          },
          {
            type: 'select',
            label: '学历要求',
            rules: [],
            style: { width: '210px' },
            key: 'eduLevel',
            options: trim(this.$store.getters['dictionary/recruit_edu'])
          },
          {
            type: 'select',
            label: '工作性质',
            rules: [],
            style: { width: '210px' },
            key: 'workNature',
            options: trim(this.$store.getters['dictionary/recruit_work_nature'])
          }
          // {
          //   type: 'max',
          //   label: '薪酬',
          //   rules: [],
          //   style: { width: '160px' },
          //   key: 'max',
          //   maxplaceholder: '薪酬最大金额',
          //   minplaceholder: '薪酬最小金额',
          // }
        ]
      }
    };
  },
  computed: {},
  methods: {
    handleChange(e) {
      console.log(e);
    },
    onclose(type) {
      this.$emit('onclose', type);
    },
    advancedSearch(e) {
      let data = {
        cid: this.data.corpId,
        pageParam: this.pageParam,
        ...e
      };
      data.pageParam.pageIndex =
        JSON.parse(JSON.stringify(this.pageParam.pageIndex)) - 1;

      agency_resume_query(
        data,
        res => {
          if (res.result.pageresult.data) {
            let pageresult = res.result.pageresult;
            this.list = pageresult.data;
            this.pageParam.pageIndex = Number(pageresult.pageIndex) + 1;
            this.pageParam.total = pageresult.total;
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
      console.log(data);
    },
    onSubmit() {
      agency_position_verify(
        data,
        res => {
          if (res.result.data.result) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.onclose('1');
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
    }
  },
  mounted() {
    console.log(this.data);
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
  margin: 0 0 15px 0;
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
