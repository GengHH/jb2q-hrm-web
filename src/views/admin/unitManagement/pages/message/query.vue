<!--
 * @Author: your name
 * @Date: 2021-04-12 16:38:40
 * @LastEditTime: 2021-06-03 17:29:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\pages\message\query.vue
-->
<template>
  <el-dialog
    title="查看简历"
    width="800px"
    :visible="visible"
    @close="onclose"
    append-to-body
  >
    <div style="height:500px;overflow: scroll;overflow-x: hidden;">
      <ttable :options="{ loading: loading }" :columns="columns" :list="list">
        <el-table-column
          fixed="right"
          slot="aaa010"
          label="操作"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="look(scope)" plain>
              查看</el-button
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
      <el-tabs v-show="show" v-model="activeName">
        <el-tab-pane label="简历信息" name="first">
          <resume :form="resume"></resume>
          <div>
            <div class="title-style">状态</div>
            <div>
              <el-row class="rightText">
                <el-col :span="12">
                  反馈状态：
                  <template v-for="(v, k) in dicOptions.status"
                    ><span
                      class="textColor"
                      :key="k + 'a'"
                      v-if="v.value == interview.feedbackStatus"
                      >{{ v.label }}</span
                    ></template
                  >
                </el-col>
              </el-row>
            </div>
            <div class="title-style">通知面试情况</div>
            <div>
              <el-row class="rightText">
                <el-col :span="12">
                  是否参加面试：
                  <template v-for="(v, k) in dicOptions.yesno"
                    ><span
                      class="textColor"
                      :key="k + 'b'"
                      v-if="v.value == interview.reply"
                      >{{ v.label }}</span
                    ></template
                  >
                </el-col>
                <el-col :span="12">
                  通知面试时间：
                  <span class="textColor">{{ interview.noticeInterview }}</span>
                </el-col>
              </el-row>
              <el-row class="rightText">
                <el-col :span="12">
                  面试时间：
                  <span class="textColor">{{ interview.interviewTime }}</span>
                </el-col>
                <el-col :span="12">
                  面试联系人：
                  <span class="textColor">{{
                    interview.interviewContactName
                  }}</span>
                </el-col>
              </el-row>
              <el-row class="rightText">
                <el-col :span="12">
                  面试联系电话：
                  <span class="textColor">{{
                    interview.interviewContactPhone
                  }}</span>
                </el-col>
                <el-col :span="12">
                  面试地址：
                  <span class="textColor">{{
                    interview.interviewAddress
                  }}</span>
                </el-col>
              </el-row>
              <el-row class="rightText">
                <el-col :span="24">
                  面试备注：
                  <span class="textColor">{{
                    interview.interviewRemarks
                  }}</span>
                </el-col>
              </el-row>
            </div>
            <div class="title-style">面试反馈情况</div>
            <div>
              <el-row class="rightText">
                <el-col :span="12">
                  反馈来源：
                  <template v-for="(v, k) in dicOptions.source"
                    ><span
                      class="textColor"
                      :key="k + 'b'"
                      v-if="v.value == interview.feedbackSource"
                      >{{ v.label }}</span
                    ></template
                  >
                </el-col>
                <el-col :span="12">
                  反馈时间：
                  <span class="textColor">{{ interview.feedbackTime }}</span>
                </el-col>
              </el-row>
            </div>
            <div class="title-style">意向录用情况</div>
            <div>
              <el-row class="rightText">
                <el-col :span="12">
                  报到日期：
                  <span class="textColor">{{ interview.reportDate }}</span>
                </el-col>
                <el-col :span="12">
                  报到联系人：
                  <span class="textColor">{{
                    interview.reportContactName
                  }}</span>
                </el-col>
              </el-row>
              <el-row class="rightText">
                <el-col :span="12">
                  报到联系电话：
                  <span class="textColor">{{
                    interview.reportContactPhone
                  }}</span>
                </el-col>
                <el-col :span="12">
                  报到地址：
                  <span class="textColor">{{ interview.reportAddress }}</span>
                </el-col>
              </el-row>
              <el-row class="rightText">
                <el-col :span="24">
                  报到备注：
                  <span class="textColor">{{ interview.reportRemarks }}</span>
                </el-col>
              </el-row>
            </div>
            <div class="title-style">职位评价情况</div>
            <div>
              <el-row class="rightText">
                <el-col :span="12">
                  职位评价星级：
                  <span class="textColor" v-if="interview.evaluationLevel"
                    >{{ interview.evaluationLevel }}星</span
                  >
                </el-col>
                <el-col :span="12">
                  职位评价内容：
                  <span class="textColor">{{
                    interview.evaluationContent
                  }}</span>
                </el-col>
              </el-row>
              <el-row class="rightText">
                <el-col :span="12">
                  职位评价时间：
                  <span class="textColor">{{ interview.evaluationTime }}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script>
import { trim } from '@/utils/index';
import ttable from '../../../common/t_table';
import { unit_query_resume } from '../../api/index';
import resume from '../../../serviceManagement/pages/resume'; //简历信息
export default {
  name: 'query',
  props: ['visible', 'form'],
  components: {
    ttable,
    resume
  },
  data() {
    return {
      dicOptions: {
        //反馈类型
        status: trim(this.$store.getters['dictionary/recruit_feedback_status']),
        yesno: trim(this.$store.getters['dictionary/yesno']),
        //反馈类型
        source: trim(this.$store.getters['dictionary/recruit_feedback_source'])
      },
      interview: {},
      activeName: 'first',
      resume: {},
      show: false,
      params: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      loading: true,
      list: [],
      columns: [
        { title: '序号', type: 'index' },
        { title: '姓名', prop: 'xm' },
        { title: '证件号码', prop: 'zjhm' },
        { title: '操作', slot: 'aaa010' }
      ],
      dataList: {}
    };
  },
  computed: {},
  methods: {
    look(e) {
      this.resume = { ...e.row };
      this.interview = { ...e.row };
      this.show = true;
    },
    handleChange(e) {
      console.log(e);
      this.params.pageIndex = e;
      this.query(this.dataList);
    },
    onclose() {
      this.$emit('onclose');
    },
    query(data) {
      unit_query_resume(
        data,
        res => {
          if (res.status == 200) {
            let pageresult = res.result.pageresult;
            this.list = pageresult.data;
            this.params.pageIndex = Number(pageresult.pageIndex) + 1;
            this.params.total = pageresult.total;
            this.loading = false;
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
    console.log(this.form);
    let data = { ...this.form };
    console.log(data);
    data.pageSize = this.pageSize;
    data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex)) - 1;
    this.dataList = data;
    this.query(data);
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.textColor {
  color: #999999;
}
.rightText {
  margin: 0 10px 10px 10px;
}
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
