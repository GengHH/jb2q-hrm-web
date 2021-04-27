<!--
 * @Author: your name
 * @Date: 2021-04-20 11:07:54
 * @LastEditTime: 2021-04-26 11:19:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\recruitmentManagement\pages\resultDetails.vue
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
        <div>
          <div class="title-style">职位发布信息</div>
          <ttable :columns="columns2" :list="list2">
            <el-table-column
              slot="positionName"
              label="职位名称"
              align="center"
            >
              <template slot-scope="scope">
                <span
                  @click="queryPosition(scope)"
                  style="color:blue;cursor: pointer;"
                >
                  {{ scope.row.positionName }}</span
                >
              </template> </el-table-column
            ><el-table-column slot="eduRequire" label="学历要求" align="center">
              <template slot-scope="scope">
                <template v-for="(v, k) in dicOptions.edu">
                  <div :key="k" v-if="v.value == scope.row.eduRequire">
                    {{ v.label }}
                  </div>
                </template>
              </template>
            </el-table-column>
            <el-table-column slot="salary" label="薪酬" align="center">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.ageMin + '-' + scope.row.ageMax }}
                </div>
              </template>
            </el-table-column></ttable
          >
          <el-pagination
            @size-change="handleChange"
            @current-change="handleChange"
            :current-page.sync="params2.pageIndex"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="params2.total"
          >
          </el-pagination>
        </div>
        <div>
          <div class="title-style">求职记录</div>
          <ttable :columns="columns3" :list="list3"
            ><el-table-column slot="sexId" label="性别" align="center">
              <template slot-scope="scope">
                <template v-for="(v, k) in dicOptions.sex">
                  <div :key="k" v-if="v.value == scope.row.sexId">
                    {{ v.label }}
                  </div>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              slot="likeArea"
              label="意向工作区域"
              align="center"
            >
              <template slot-scope="scope">
                <div v-for="(v, k) in dicOptions.qx" :key="k">
                  <el-tag v-if="v.value == scope.row.likeArea">{{
                    v.label
                  }}</el-tag>
                </div>
              </template>
            </el-table-column></ttable
          >
          <el-pagination
            @size-change="handleChange"
            @current-change="handleChange"
            :current-page.sync="params3.pageIndex"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="params3.total"
          >
          </el-pagination>
        </div>
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
  name: 'resultDetails',
  props: ['visible', 'lookList', 'disabled', 'type'],
  components: { tform, ttable },
  data() {
    return {
      params: {
        pageIndex: 1,
        total: 0
      },
      params2: {
        pageIndex: 1,
        total: 0
      },
      params3: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      list: [],
      list2: [],
      list3: [],
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
      columns2: [
        { title: '序号', type: 'index' },
        { title: '职位名称', prop: 'positionName', slot: 'positionName' },
        { title: '学历要求', prop: 'eduRequire', slot: 'eduRequire' },
        { title: '薪酬', prop: 'salary', slot: 'salary' },
        { title: '职位描述', prop: 'workYearNeed' }
      ],
      columns3: [
        { title: '序号', type: 'index' },
        { title: '姓名', prop: 'xm' },
        { title: '证件号码', prop: 'zjhm' },
        { title: '性别', prop: 'sexId', slot: 'sexId' },
        { title: '意向工作区域', prop: 'likeArea', slot: 'likeArea' }
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
            type: 'select',
            label: '管理区',
            rules: [],
            disabled: true,
            key: 'distictCode',
            style: { width: '260px' },
            options: trim(this.$store.getters['dictionary/ggjbxx_qx'])
          },
          {
            type: 'radio',
            label: '是否面向高校毕业生',
            rules: [],
            disabled: true,
            key: 'forCollegeGraduates',
            style: { width: '260px' },
            options: trim(this.$store.getters['dictionary/yesno'])
          },
          {
            type: 'input',
            label: '招聘单位数',
            style: { width: '260px' },
            placeholder: '请输入招聘单位数',
            rules: [],
            disabled: true,
            key: 'corpCount'
          },
          {
            type: 'input',
            label: '其中：面向高校毕业生的招聘单位数',
            style: { width: '260px' },
            placeholder: '请输入面向高校毕业生的招聘单位数',
            rules: [],
            disabled: true,
            key: 'collegeCorpCount'
          },
          {
            type: 'input',
            label: '招聘职位数',
            style: { width: '260px' },
            placeholder: '请输入招聘职位数',
            rules: [],
            disabled: true,
            key: 'positionCount'
          },
          {
            type: 'input',
            label: '其中：面向高校毕业生的招聘职位数',
            style: { width: '260px' },
            placeholder: '请输入面向高校毕业生的招聘职位数',
            rules: [],
            disabled: true,
            key: 'collegePositionCount'
          },
          {
            type: 'input',
            label: '招聘人数',
            style: { width: '260px' },
            placeholder: '请输入招聘人数',
            rules: [],
            disabled: true,
            key: 'peopleCount'
          },
          {
            type: 'input',
            label: '其中：面向高校毕业生的招聘职人数',
            style: { width: '260px' },
            placeholder: '请输入面向高校毕业生的招聘职人数',
            rules: [],
            disabled: true,
            key: 'collegePeopleCount'
          },
          {
            type: 'input',
            label: '投递简历人次数（线上）',
            style: { width: '260px' },
            placeholder: '请输入投递简历人次数',
            rules: [],
            disabled: true,
            key: 'deliveryOnTCount'
          },
          {
            type: 'input',
            label: '其中：高校毕业生的投递简历人次数（线上）',
            style: { width: '260px' },
            placeholder: '请输入高校毕业生的投递简历人次数',
            rules: [],
            disabled: true,
            key: 'collegeDeliveryTon'
          },
          {
            type: 'input',
            label: '投递简历人次数（线下）',
            style: { width: '260px' },
            placeholder: '请输入投递简历人次数',
            rules: [],
            key: 'deliveryUnderTCount'
          },
          {
            type: 'input',
            label: '其中：高校毕业生的投递简历人次数（线下）',
            style: { width: '260px' },
            placeholder: '请输入高校毕业生的投递简历人次数',
            rules: [],
            key: 'collegeDeliveryTUnder'
          },
          {
            type: 'input',
            label: '投递简历人数（线上）',
            style: { width: '260px' },
            placeholder: '请输入投递简历人数',
            rules: [],
            disabled: true,
            key: 'deliveryOnCount'
          },
          {
            type: 'input',
            label: '其中：高校毕业生的投递简历人数（线上）',
            style: { width: '260px' },
            placeholder: '请输入高校毕业生的投递简历人数',
            rules: [],
            disabled: true,
            key: 'collegeDeliveryOn'
          },
          {
            type: 'input',
            label: '投递简历人数（线下）',
            style: { width: '260px' },
            placeholder: '请输入投递简历人数',
            rules: [],
            key: 'deliveryUnderCount'
          },
          {
            type: 'input',
            label: '其中：高校毕业生的投递简历人数（线下）',
            style: { width: '260px' },
            placeholder: '请输入高校毕业生的投递简历人数',
            rules: [],
            key: 'collegeDeliveryUnder'
          },
          {
            type: 'input',
            label: '入场人次数',
            style: { width: '260px' },
            placeholder: '请输入入场人次数',
            rules: [],
            key: 'admissionCount'
          },
          {
            type: 'input',
            label: '其中：高校毕业生的入场人次数',
            style: { width: '260px' },
            placeholder: '请输入高校毕业生的入场人次数',
            rules: [],
            key: 'collegeAdmissionCount'
          },
          {
            type: 'input',
            label: '通知面试人次数（线上）',
            style: { width: '260px' },
            placeholder: '请输入通知面试人次数',
            rules: [],
            disabled: true,
            key: 'noticeInterviewCount'
          },
          {
            type: 'input',
            label: '其中：高校毕业生的通知面试人次数（线上）',
            style: { width: '260px' },
            placeholder: '请输入高校毕业生的通知面试人次数',
            rules: [],
            disabled: true,
            key: 'colNotInterCount'
          },
          {
            type: 'input',
            label: '意向录用人次数（线上）',
            style: { width: '260px' },
            placeholder: '请输入意向录用人次数',
            rules: [],
            disabled: true,
            key: 'likeCountOn'
          },
          {
            type: 'input',
            label: '其中：高校毕业生的意向录用人次数（线上）',
            style: { width: '260px' },
            placeholder: '请输入高校毕业生的意向录用人次数',
            rules: [],
            disabled: true,
            key: 'colLikeCountOn'
          },
          {
            type: 'input',
            label: '意向录用人次数（线下）',
            style: { width: '260px' },
            placeholder: '请输入意向录用人次数',
            rules: [],
            key: 'likeCountUnder'
          },
          {
            type: 'input',
            label: '其中：高校毕业生的意向录用人次数（线下）',
            style: { width: '260px' },
            placeholder: '请输入高校毕业生的意向录用人次数',
            rules: [],
            key: 'colLikeCountUnder'
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
