<!--
 * @Author: your name
 * @Date: 2021-04-13 17:33:01
 * @LastEditTime: 2021-07-15 10:45:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\recruitmentManagement\pages\feedbackDetails.vue
-->
<template>
  <el-dialog
    title="招聘会报名信息"
    width="850px"
    :visible="visible"
    @close="onclose"
  >
    <div style="padding: 0 10px 0 0;">
      <div class="title-style">预约报名信息</div>
      <el-form size="mini" :model="form" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="招聘会名称">
              <el-input disabled v-model="form.meetName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位名称">
              <el-input disabled v-model="form.corpName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="参会联系人">
              <el-input disabled v-model="form.applyContactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="参会联系手机">
              <el-input disabled v-model="form.applyContactPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="报名时间">
              <el-date-picker
                v-model="form.applyTime"
                type="date"
                style="width:100%"
                disabled
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input disabled v-model="form.memo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="title-style">单位招聘信息列表</div>
      <ttable :columns="columns" :list="list">
        <el-table-column slot="eduRequire" label="学历要求" align="center">
          <template slot-scope="scope">
            <template v-for="(v, k) in dicOptions.edu">
              <div :key="k" v-if="v.value == scope.row.eduRequire">
                {{ v.label }}
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column slot="recruitType" label="招聘类型" align="center">
          <template slot-scope="scope">
            <template v-for="(v, k) in dicOptions.recruit_type">
              <div :key="k" v-if="v.value == scope.row.recruitType">
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
        </el-table-column>
        <el-table-column slot="aaa010" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="look(scope)" plain>
              详情</el-button
            >
          </template>
        </el-table-column>
      </ttable>
      <div class="title-style">
        报名反馈
      </div>
      <el-form
        :rules="rules"
        size="mini"
        ref="form"
        :model="form"
        label-width="150px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="参会回执" prop="applyResult">
              <el-select
                @change="userResult"
                :disabled="disabled"
                v-model="form.applyResult"
                style="width:100%"
              >
                <el-option label="报名成功" value="1"></el-option>
                <el-option label="报名失败" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="lookList.meetType == '2' && isUserResult" :span="12">
            <el-form-item label="入场时间" prop="admisstionTime">
              <el-date-picker
                v-model="form.admisstionTime"
                type="datetime"
                style="width:100%"
                value-format="yyyyMMddHHmmss"
                :disabled="disabled"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="lookList.meetType == '2' && isUserResult" :span="12">
            <el-form-item label="展位号" prop="boothSeq">
              <el-input :disabled="disabled" v-model="form.boothSeq"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="!isUserResult" :span="24">
            <el-form-item label="失败原因" prop="reasonsFailure">
              <el-input
                type="textarea"
                :rows="4"
                :disabled="disabled"
                v-model="form.reasonsFailure"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="isUserResult" :span="24">
            <el-form-item label="注意事项" prop="precautions">
              <el-input
                type="textarea"
                :rows="4"
                :disabled="disabled"
                v-model="form.precautions"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="isUserResult">
          <el-col :span="12">
            <el-form-item label="区或街镇现场联系人" prop="meetContactName">
              <el-input
                :disabled="disabled"
                v-model="form.meetContactName"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="meetContactPhone">
              <el-input
                :disabled="disabled"
                v-model="form.meetContactPhone"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div v-if="!disabled" style="text-align:center">
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </div>
    </div>
    <position
      v-if="positionVisible"
      :data="positionData"
      :resVisible="positionVisible"
      :type="0"
      @onclose="positionVisible = false"
    ></position>
  </el-dialog>
</template>

<script>
import { trim } from '@/utils/index';
import ttable from '../../common/t_table';
import position from '../../unitManagement/pages/recruitment/position';
import {
  feedback_look,
  feedback_info_query,
  feedback_update
} from '../api/index';
export default {
  name: 'feedbackDetails',
  props: ['visible', 'lookList', 'disabled'],
  components: { ttable, position },
  data() {
    let othis = this;
    return {
      positionData: {},
      positionVisible: false,
      isUserResult: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > othis.getTimeNumber(); //如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      form: {},
      params: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      fileList: [],
      dicOptions: {
        type: trim(this.$store.getters['dictionary/recruit_meet_type']),
        //学历
        edu: trim(this.$store.getters['dictionary/recruit_edu']),
        yesno: trim(this.$store.getters['dictionary/yesno']),
        recruit_type: trim(this.$store.getters['dictionary/recruit_type']),
        position_s_type: trim(
          this.$store.getters['dictionary/recruit_position_s_type']
        ),
        nature: trim(this.$store.getters['dictionary/recurit_work_nature']),
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx']),
        year: trim(this.$store.getters['dictionary/recurit_work_year']),
        verify_status: trim(
          this.$store.getters['dictionary/recruit_verify_status']
        ),
        release_status: trim(
          this.$store.getters['dictionary/recruit_release_status']
        )
      },
      columns: [
        { title: '序号', type: 'index' },
        { title: '职位名称', prop: 'positionName' },
        { title: '学历要求', prop: 'eduRequire', slot: 'eduRequire' },
        { title: '薪酬', prop: 'salary', slot: 'salary' },
        { title: '招聘类型', prop: 'recruitType', slot: 'recruitType' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [],
      startTime: '',
      rules: {
        applyResult: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        admisstionTime: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        boothSeq: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        reasonsFailure: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        precautions: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        meetContactPhone: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        meetContactName: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {},
  methods: {
    userResult(e) {
      if (e == '1') {
        this.isUserResult = true;
      } else {
        this.isUserResult = false;
      }
      console.log(e);
    },
    getTimeNumber(time) {
      let d = new Date(this.startTime);
      let t = d.getTime(d);
      return t;
    },
    look(scope) {
      this.positionData = { ...scope.row, topTiele: '详情' };
      this.positionVisible = true;
    },
    soldOut(scope) {},
    alteration() {},
    onSubmit() {
      let data = { ...this.form };
      this.$refs.form.validate(valid => {
        if (valid) {
          feedback_update(
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
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onclose(type) {
      this.$emit('onclose', type || 0);
    },
    formatTime(time) {
      if (time) {
        if (time.length > 8) {
          let t = time.split(' ')[0];
          let tt = t.replace(/-/g, '');
          let h = time.split(' ')[1];
          let hh = h.replace(/:/g, '');
          return tt + '' + hh;
        } else {
          return time;
        }
      } else {
        return '';
      }
    }
  },
  mounted() {
    let data = { ...this.lookList };
    feedback_look(
      data,
      res => {
        if (res.status == 200) {
          let data = res.result.data;
          data.admisstionTime = this.formatTime(data.admisstionTime);
          this.form = { ...data, ...this.lookList };
          this.startTime = this.form.startTime;
        }
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
    feedback_info_query(
      data,
      res => {
        if (res.status == 200) {
          let data = res.result.data;
          this.list = [...data];
        }
        console.log(res);
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
.el-table--scrollable-x .el-table__body-wrapper {
  z-index: 1;
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
