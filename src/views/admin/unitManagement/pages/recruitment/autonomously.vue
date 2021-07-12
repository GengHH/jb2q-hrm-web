<!--
 * @Author: your name
 * @Date: 2021-04-14 17:01:28
 * @LastEditTime: 2021-07-02 18:34:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\pages\recruitment\autonomously.vue
-->
<template>
  <el-dialog
    title="自主招聘"
    width="80%"
    :visible="resVisible"
    @close="onclose"
    append-to-body
  >
    <div style="height:500px;overflow: auto">
      <!-- <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform> -->
      <div style="margin:0 10px 0 0">
        <el-form
          :inline="true"
          size="small"
          ref="queryForm"
          :model="queryForm"
          label-width="125px"
        >
          <el-form-item label="技能证书">
            <el-input
              style="width:210px"
              v-model="queryForm.certName"
              placeholder="技能证书"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input
              style="width:210px"
              v-model="queryForm.zjhm"
              placeholder="身份证号"
            ></el-input>
          </el-form-item>
          <el-form-item label="职业分类">
            <el-select
              style="width:210px"
              v-model="queryForm.age"
              placeholder="职业分类"
              :filterable="true"
            >
              <el-option
                v-for="item in dicOptions.s_type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行业分类">
            <el-select
              :filterable="true"
              style="width:150px"
              v-model="queryForm.age"
              placeholder="行业分类"
            >
              <el-option
                v-for="item in dicOptions.type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作性质">
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
          </el-form-item>
          <el-form-item label="工作区域">
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
          </el-form-item>
          <el-form-item label="学历要求">
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
            <el-select
              style="width:150px"
              v-model="queryForm.languageType"
              placeholder="语种"
            >
              <el-option
                v-for="item in dicOptions.language"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              style="width:150px"
              v-model="queryForm.age"
              placeholder="年龄"
            >
              <el-option
                v-for="item in dicOptions.age"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="语种">
            <el-select
              style="width:150px"
              v-model="queryForm.languageType"
              placeholder="语种"
            >
              <el-option
                v-for="item in dicOptions.language"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="语种等级">
            <el-select
              style="width:150px"
              v-model="queryForm.languageLevel"
              placeholder="语种等级"
            >
              <el-option
                v-for="item in dicOptions.language_l"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄">
            <el-select
              style="width:150px"
              v-model="queryForm.age"
              placeholder="年龄"
            >
              <el-option
                v-for="item in dicOptions.age"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
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
          <el-form-item label="简历最近修改时间">
            <el-date-picker
              v-model="queryForm.aditTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="账号最近登录时间">
            <el-date-picker
              v-model="queryForm.accountTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
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
        <el-table-column slot="xm" label="简历名称" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="12">
                <div style="color:#fc6f3d;text-align:left">
                  {{ scope.row.xm }}
                </div>
                <div style="text-align:left">
                  <template v-for="(v, k) in dicOptions.qx">
                    <span :key="k + 'a'" v-if="v.value == scope.row.workArea">
                      {{ v.label }}
                    </span>
                  </template>
                  <el-divider direction="vertical"></el-divider>
                  <span> {{ scope.row.age }}岁 </span>
                  <el-divider direction="vertical"></el-divider>
                  <template v-for="(v, k) in dicOptions.edu">
                    <span :key="k + 'b'" v-if="v.value == scope.row.eduLevel">
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
                  <span>{{ scope.row.positionName }}</span>
                </div>
                <div>
                  <span style="color:#bbbbbb"
                    >期望薪资：{{ scope.row.salaryMin }}-{{
                      scope.row.salaryMax
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
      <el-dialog
        :visible="resumeVisible"
        @close="
          resumeVisible = false;
          userPid = '';
        "
        title="简历查看"
        width="800px"
        append-to-body
      >
        <div style="height:500px;overflow: auto">
          <resume v-if="userPid" :userPid="userPid"></resume>
        </div>
      </el-dialog>
    </div>
  </el-dialog>
</template>
<script>
import tform from '../../../common/t_form'; //高级查询
import ttable from '../../../common/t_table';
import resume from '../../../serviceManagement/pages/resume'; //简历信息
import {
  agency_position_verify,
  agency_resume_query,
  agency_rec
} from '../../api/index';
import { trim } from '@/utils/index';
export default {
  name: 'autonomously',
  props: ['resVisible', 'data', 'type'],
  components: { tform, ttable, resume },
  data() {
    return {
      userPid: '',
      resumeVisible: false,
      dataList: {},
      queryForm: {},
      initQueryForm: {
        salaryMin: undefined,
        workArea: '',
        eduLevel: '',
        salaryMax: undefined,
        workNature: ''
      },
      pageParam: {
        pageSize: 5,
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
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx']),
        //语种
        language: trim(this.$store.getters['dictionary/recruit_language_type']),
        //语种等级
        language_l: trim(
          this.$store.getters['dictionary/recruit_language_level']
        ),
        //年龄
        age: trim(this.$store.getters['dictionary/recruit_age_type']),
        //意向类型为职业分类时
        s_type: trim(this.$store.getters['dictionary/recruit_position_s_type']),
        //意向类型为行业分类时
        type: trim(this.$store.getters['dictionary/recruit_industry_type'])
      },
      columns: [
        { title: '序号', type: 'index' },
        { title: '简历名称', prop: 'xm', slot: 'xm' },
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
    audit(e) {
      let data = { ...e.row, ...this.data };
      data.cid = data.corpId;
      //'1', '推荐简历  2', '推荐职位
      data.recType = '1';
      agency_rec(
        data,
        res => {
          if (typeof res != 'string') {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000
            });
          } else {
            let d = this.ClearBr(res);
            this.$message({
              message: trim(d),
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
    ClearBr(key) {
      key = key.replace(/<\/?.+?>/g, '');
      key = key.replace(/[\r\n]/g, '');
      return key;
    },
    getHtml(data) {
      let result = data.match(/<td(.*?)<\/td>/g).map(function(val) {
        return val.replace(/<\/?td>/g, '');
      });
      return result[1].split('>')[1];
    },
    look(e) {
      this.userPid = e.row.pid;
      this.resumeVisible = true;
    },
    handleChange(e) {
      this.pageParam.pageIndex = e;
      this.advancedSearch(this.dataList);
    },
    onclose(type) {
      this.$emit('onclose', type);
    },
    advancedSearch() {
      console.log(this.queryForm);
      let data = {
        cid: this.data.corpId,
        pageParam: this.pageParam,
        ...this.queryForm
      };
      data.pageParam.pageIndex =
        JSON.parse(JSON.stringify(this.pageParam.pageIndex)) - 1;
      this.dataList = data;
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
