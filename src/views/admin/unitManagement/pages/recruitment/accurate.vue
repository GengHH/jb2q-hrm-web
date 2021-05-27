<!--
 * @Author: your name
 * @Date: 2021-04-14 17:01:28
 * @LastEditTime: 2021-05-27 16:04:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\pages\recruitment\accurate.vue
-->
<template>
  <el-dialog
    title="精准推荐"
    width="730px"
    :visible="resVisible"
    @close="onclose"
    append-to-body
  >
    <div style="height:500px;overflow: scroll;overflow-x: hidden;">
      <ttable :columns="columns" :list="list">
        <el-table-column slot="xm" label="简历名称" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="12">
                <div style="color:#fc6f3d;text-align:left">
                  {{ scope.row.userName }}
                </div>
                <div style="text-align:left">
                  <template v-for="(v, k) in dicOptions.qx">
                    <span :key="k + 'a'" v-if="v.value == scope.row.residence">
                      {{ v.label }}
                    </span>
                  </template>
                  <el-divider direction="vertical"></el-divider>
                  <span> {{ scope.row.age }}岁 </span>
                  <el-divider direction="vertical"></el-divider>
                  <template v-for="(v, k) in dicOptions.edu">
                    <span :key="k + 'b'" v-if="v.value == scope.row.degree">
                      {{ v.label }}
                    </span>
                  </template>
                  <el-divider direction="vertical"></el-divider>
                  <template v-for="(v, k) in dicOptions.workNature">
                    <span
                      :key="k + 'c'"
                      v-if="v.value == scope.row.expectedWorkingNature"
                    >
                      {{ v.label }}
                    </span>
                  </template>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <template v-for="(v, k) in dicOptions.type">
                    <span
                      :key="k + 'c'"
                      v-if="v.value == scope.row.expectedJobName"
                    >
                      {{ v.label }}
                    </span>
                  </template>
                </div>
                <div>
                  <span style="color:#bbbbbb"
                    >期望薪资：{{ scope.row.lowSalaryExpectation }}-{{
                      scope.row.highSalaryExpectation
                    }}</span
                  >
                </div>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column width="100" slot="aaa010" label="操作" align="center">
          <template slot-scope="scope">
            <div>
              <el-button size="mini" type="primary" plain @click="look(scope)">
                <i class="el-icon-search"></i> 查看</el-button
              >
            </div>
            <div style="margin-top:5px">
              <el-button size="mini" type="success" plain @click="audit(scope)">
                <i class="el-icon-chat-dot-round"></i> 推荐</el-button
              >
            </div>
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
import { agency_rec, accurate_info } from '../../api/index';
import { trim } from '@/utils/index';
export default {
  name: 'accurate',
  props: ['resVisible', 'data'],
  components: { tform, ttable },
  data() {
    return {
      queryForm: {},
      pageParam: {
        pageSize: 10,
        total: 0,
        pageIndex: 1
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
      columns: [
        { title: '序号', type: 'index' },
        { title: '简历名称', prop: 'xm', slot: 'xm' },
        { title: '工作区域', prop: 'workArea', slot: 'workArea' },
        { title: '学历要求', prop: 'eduLevel', slot: 'eduLevel' },
        { title: '工作性质', prop: 'workNature', slot: 'workNature' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: []
    };
  },
  computed: {},
  methods: {
    look(e) {
      console.log(e);
    },
    handleChange(e) {
      console.log(e);
    },
    onclose(type) {
      this.$emit('onclose', type);
    },

    audit(e) {
      let data = { ...e.row };
      console.log(this.data);
      console.log(e.row);
      return;
      agency_rec(
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
    accurate_info(
      //   { jobNo: this.data.positionId },
      { jobNo: 22 },
      res => {
        let data = res.result.data;
        data =
          '{"statusCode":200,"message":"","result":[{"address":"闵行区浦江镇联航路1518号","matchingDegree":"2.0","userId":"201608111877450","userName":"陈进福","jobIntention":"0307","age":"","cardType":"01","cardId":"460036199307066817","phoneNo":"18321460953","degree":"","educationExperience":"","major":"","freshGraduate":"","residence":"04","workingSeniority":"","lowSalaryExpectation":"50000","highSalaryExpectation":"99999","expectedJobCategory":"1","expectedIndustryType":"","expectedJobName":"0307","expectedWorkingArea":"04","expectedWorkingNature":"01","gender":"1","nationality":"","nation":"","birthday":"19930706","timeToWork":"","graduatedFrom":"","graduationTime":"","politicalStatus":"","maritalStatus":"","resumeUpdateTime":"2021-05-20 18:11:08"},{"address":"闵行区浦江镇联航路1518号","matchingDegree":"2.0","userId":"201608111877450","userName":"陈进福","jobIntention":"0306","age":"","cardType":"01","cardId":"460036199307066817","phoneNo":"18321460953","degree":"","educationExperience":"","major":"","freshGraduate":"","residence":"04","workingSeniority":"","lowSalaryExpectation":"50000","highSalaryExpectation":"99999","expectedJobCategory":"1","expectedIndustryType":"","expectedJobName":"0306","expectedWorkingArea":"04","expectedWorkingNature":"01","gender":"1","nationality":"","nation":"","birthday":"19930706","timeToWork":"","graduatedFrom":"","graduationTime":"","politicalStatus":"","maritalStatus":"","resumeUpdateTime":"2021-05-20 18:11:08"},{"address":"闵行区浦江镇联航路1518号","matchingDegree":"2.0","userId":"201608111877450","userName":"陈进福","jobIntention":"09","age":"","cardType":"01","cardId":"460036199307066817","phoneNo":"18321460953","degree":"","educationExperience":"","major":"","freshGraduate":"","residence":"04","workingSeniority":"","lowSalaryExpectation":"50000","highSalaryExpectation":"99999","expectedJobCategory":"2","expectedIndustryType":"","expectedJobName":"09","expectedWorkingArea":"04","expectedWorkingNature":"01","gender":"1","nationality":"","nation":"","birthday":"19930706","timeToWork":"","graduatedFrom":"","graduationTime":"","politicalStatus":"","maritalStatus":"","resumeUpdateTime":"2021-05-20 18:11:08"},{"address":"天山路1800号203室","matchingDegree":"2.0","userId":"200709138518590","userName":"李珍","jobIntention":"1511","age":"","cardType":"01","cardId":"320681198506010225","phoneNo":"15921900607","degree":"","educationExperience":"","major":"","freshGraduate":"","residence":"05","workingSeniority":"","lowSalaryExpectation":"10000","highSalaryExpectation":"30000","expectedJobCategory":"1","expectedIndustryType":"","expectedJobName":"1511","expectedWorkingArea":"05","expectedWorkingNature":"01","gender":"2","nationality":"","nation":"","birthday":"19850601","timeToWork":"","graduatedFrom":"","graduationTime":"","politicalStatus":"","maritalStatus":"","resumeUpdateTime":"2021-05-20 17:17:06"},{"address":"天山路1800号203室","matchingDegree":"2.0","userId":"200709138518590","userName":"李珍","jobIntention":"1902","age":"","cardType":"01","cardId":"320681198506010225","phoneNo":"15921900607","degree":"","educationExperience":"","major":"","freshGraduate":"","residence":"05","workingSeniority":"","lowSalaryExpectation":"10000","highSalaryExpectation":"30000","expectedJobCategory":"1","expectedIndustryType":"","expectedJobName":"1902","expectedWorkingArea":"05","expectedWorkingNature":"01","gender":"2","nationality":"","nation":"","birthday":"19850601","timeToWork":"","graduatedFrom":"","graduationTime":"","politicalStatus":"","maritalStatus":"","resumeUpdateTime":"2021-05-20 17:17:06"},{"address":"天山路1800号203室","matchingDegree":"2.0","userId":"200709138518590","userName":"李珍","jobIntention":"01","age":"","cardType":"01","cardId":"320681198506010225","phoneNo":"15921900607","degree":"","educationExperience":"","major":"","freshGraduate":"","residence":"05","workingSeniority":"","lowSalaryExpectation":"10000","highSalaryExpectation":"30000","expectedJobCategory":"2","expectedIndustryType":"","expectedJobName":"01","expectedWorkingArea":"05","expectedWorkingNature":"01","gender":"2","nationality":"","nation":"","birthday":"19850601","timeToWork":"","graduatedFrom":"","graduationTime":"","politicalStatus":"","maritalStatus":"","resumeUpdateTime":"2021-05-20 17:17:06"},{"address":"闵行区浦江镇联航路1518号","matchingDegree":"2.0","userId":"201608111873360","userName":"沈任高","jobIntention":"1504","age":"","cardType":"01","cardId":"320682199409291556","phoneNo":"15501300879","degree":"","educationExperience":"","major":"","freshGraduate":"","residence":"07","workingSeniority":"","lowSalaryExpectation":"99999","highSalaryExpectation":"99999","expectedJobCategory":"1","expectedIndustryType":"","expectedJobName":"1504","expectedWorkingArea":"00","expectedWorkingNature":"01","gender":"1","nationality":"","nation":"","birthday":"19940929","timeToWork":"","graduatedFrom":"","graduationTime":"","politicalStatus":"","maritalStatus":"","resumeUpdateTime":"2021-05-20 17:16:56"},{"address":"闵行区浦江镇联航路1518号","matchingDegree":"2.0","userId":"201608111873360","userName":"沈任高","jobIntention":"04","age":"","cardType":"01","cardId":"320682199409291556","phoneNo":"15501300879","degree":"","educationExperience":"","major":"","freshGraduate":"","residence":"07","workingSeniority":"","lowSalaryExpectation":"99999","highSalaryExpectation":"99999","expectedJobCategory":"2","expectedIndustryType":"","expectedJobName":"04","expectedWorkingArea":"00","expectedWorkingNature":"01","gender":"1","nationality":"","nation":"","birthday":"19940929","timeToWork":"","graduatedFrom":"","graduationTime":"","politicalStatus":"","maritalStatus":"","resumeUpdateTime":"2021-05-20 17:16:56"}]}';

        data = JSON.parse(data.replace(/'\'/g, ''));
        let dataList = data.result;
        if (dataList.length) {
          this.list = dataList;
        }
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
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
