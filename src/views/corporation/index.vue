<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-17 16:47:44
 * @Description:
 * @FilePath: \jb2q-hrm-web\src\views\corporation\index.vue
-->
<template>
  <!-- <router-view></router-view> -->
  <div id="indexBody">
    <div class="title-style">单位信息维护</div>
    <el-form
      :model="corporationInfo"
      :label-position="labelPosition"
      :rules="rules"
      ref="corporationInfo"
      label-width="0px"
      class="clearfix"
    >
      <el-col :span="12" class="form-item-left">
        <el-form-item prop="tyshxym">
          <pl-input
            required
            v-model="corporationInfo.tyshxym"
            label="社会信用代码"
            :disabled="true"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item prop="corpName">
          <pl-input
            required
            v-model="corporationInfo.corpName"
            label="单位名称"
            :disabled="true"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item prop="establishDate">
          <pl-date-picker
            required
            v-model="corporationInfo.establishDate"
            type="date"
            value-format="yyyyMMdd"
            label="单位设立日期"
            :disabled="true"
          >
          </pl-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item prop="unitResidence">
          <pl-input
            required
            v-model="corporationInfo.unitResidence"
            label="单位住所"
            :disabled="true"
          >
          </pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item prop="corpNature">
          <pl-select
            required
            v-model="corporationInfo.corpNature"
            :optionData="dicCorpNature"
            label="单位性质"
            :disabled="true"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item prop="tranBaseSymbol">
          <pl-select
            required
            v-model="corporationInfo.tranBaseSymbol"
            label="见习基地标志"
            :optionData="dicData"
            :disabled="true"
          ></pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item prop="districtCode">
          <el-col :span="isSc ? 24 : 18" class="form-item-left">
            <pl-select
              required
              v-model="corporationInfo.districtCode"
              :optionData="dicQx"
              label="管理所属区"
            >
            </pl-select>
          </el-col>
          <el-col v-if="!isSc" :span="6" class="form-item-rigth text-right">
            <el-button
              class="orange-btn btn-small-style"
              :auto-loading="true"
              @click="changeQx"
            >
              变更
            </el-button>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item prop="industryType">
          <pl-select
            required
            v-model="corporationInfo.industryType"
            label="行业类别"
            :optionData="dicIndustryType"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item prop="contactAddress">
          <pl-input
            required
            v-model="corporationInfo.contactAddress"
            label="单位联系地址"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item required prop="contactPhone">
          <pl-input
            required
            v-model="corporationInfo.contactPhone"
            label="单位联系人"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="businessRange">
          <!-- <pl-input
            required
            v-model="corporationInfo.businessRange"
            label="经营范围"
            :disabled="true"
          ></pl-input> -->
          <pl-input
            required
            type="textarea"
            autosize
            label="经营范围"
            show-word-limit
            :rows="12"
            :disabled="true"
            v-model="corporationInfo.businessRange"
          >
          </pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="introduce">
          <pl-input
            required
            type="textarea"
            autosize
            label="公司简介（不超过2000字符）"
            maxlength="2000"
            show-word-limit
            :rows="12"
            v-model="corporationInfo.introduce"
          >
          </pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item prop="recruitChargeName">
          <pl-input
            required
            v-model="corporationInfo.recruitChargeName"
            label="招聘负责人姓名"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item prop="recruitChargePhone">
          <pl-input
            required
            v-model="corporationInfo.recruitChargePhone"
            label="招聘负责人手机"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item prop="recruitStaffName1">
          <pl-input
            v-model="corporationInfo.recruitStaffName1"
            label="招聘工作人员一姓名"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item prop="recruitStaffPhone1">
          <pl-input
            v-model="corporationInfo.recruitStaffPhone1"
            label="招聘工作人员一手机"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item prop="recruitStaffName2">
          <pl-input
            v-model="corporationInfo.recruitStaffName2"
            label="招聘工作人员二姓名"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item prop="recruitStaffPhone2">
          <pl-input
            v-model="corporationInfo.recruitStaffPhone2"
            label="招聘工作人员二手机"
          ></pl-input>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="form-btns">
      <pl-button
        class="orange-btn btn-style"
        :auto-loading="true"
        @click="submitForm($event, 'corporationInfo')"
      >
        保存
      </pl-button>
      <pl-button class="white-btn btn-style" @click="dialogClear($event)"
        >取消</pl-button
      >
    </div>

    <el-dialog title="变更原因" :visible.sync="dialogFormVisible">
      <el-form :model="areaForm" ref="reasonForm" :rules="arearules">
        <el-form-item prop="changeReason">
          <el-input
            type="textarea"
            autosize
            placeholder="（不超过1000字符）"
            maxlength="1000"
            show-word-limit
            :rows="12"
            v-model="areaForm.changeReason"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <pl-button type="primary" @click="doChangeQx($event)">确 定</pl-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { phonePattern } from '@/utils/regexp';
import {
  loadCorpInfo,
  saveCorpInfo,
  updateDistrictCode
} from '@/api/corporationApi';
// import plButton from '@/components/common/BaseLoadingButton';
// import plInput from '@/components/common/BaseLabelInput';
// import plSelect from '@/components/common/BaseLabelSelect';
// import plDatePicker from '@/components/common/BaseLabelDatepicker';
export default {
  name: 'corporationApp',
  components: {
    // plButton,
    // plInput,
    // plSelect,
    // plDatePicker
  },
  data() {
    return {
      path: require('@/assets/logo.png'),
      isSc: this.$store.getters['corporation/first_login'],
      dialogFormVisible: false,
      corporationInfo: {
        cid: '',
        tyshxym: '',
        corpName: '',
        establishDate: '',
        businessRange: '',
        unitResidence: '',
        specific: '',
        corpNature: '',
        contactPhone: '',
        statusId: '',
        industryType: '',
        contactAddress: '',
        tranBaseSymbol: '',
        introduce: '',
        humanResourceReg: '',
        frozen: '',
        keypointCorp: '',
        specialCorp: '',
        entrustStatus: '',
        entrustValid: '',
        recruitChargeName: '',
        recruitChargePhone: '',
        recruitStaffName1: '',
        recruitStaffPhone1: '',
        recruitStaffName2: '',
        recruitStaffPhone2: ''
      },
      areaForm: {
        changeReason: ''
      },
      rules: {
        introduce: [
          { required: true, message: '请输公司简介', trigger: 'blur' },
          {
            max: 2000,
            message: '最长不可超过2000字符',
            trigger: ['blur', 'change']
          }
        ],
        recruitChargePhone: [
          { required: true, message: '请输手机号', trigger: 'blur' },
          {
            pattern: phonePattern,
            message: '请输入正确格式的手机号',
            trigger: ['blur', 'change']
          }
        ],
        recruitStaffPhone1: [
          {
            pattern: phonePattern,
            message: '请输入正确格式的手机号',
            trigger: ['blur', 'change']
          }
        ],
        recruitStaffPhone2: [
          {
            pattern: phonePattern,
            message: '请输入正确格式的手机号',
            trigger: ['blur', 'change']
          }
        ],
        contactAddress: [
          { required: true, message: '请输入联系地址', trigger: 'blur' }
        ]
      },
      arearules: {
        changeReason: [
          { required: true, message: '请输变更原因', trigger: 'blur' },
          {
            max: 1000,
            message: '最长不可超过1000字符',
            trigger: ['blur', 'change']
          }
        ]
      },
      dicData: this.$store.getters['dictionary/yesno'],
      dicQx: this.$store.getters['dictionary/ggjbxx_qx'],
      dicCorpNature: this.$store.getters['dictionary/recruit_corp_nature'],
      dicIndustryType: this.$store.getters['dictionary/recruit_industry_type'],
      labelPosition: ''
    };
  },
  computed: {
    // jobFaieList: function() {
    //   return this.showList ? this.showList.slice(0, 3) : [];
    // }
  },
  methods: {
    async getcorporationInfo(done) {
      //! TODO 可以改成$refs,不需要再查一遍
      try {
        if (!this.$store.getters['corporation/token']) {
          this.$message({
            showClose: true,
            message: '请先登录，谢谢',
            type: 'error'
          });
          setTimeout(() => {
            window.location.href = '/ggzp-shrs/index.html';
          }, 2000);
        }
        let result = await loadCorpInfo({
          cid: this.$store.getters['corporation/cid'] || ''
        });
        console.log('result', result);
        if (result.status === 200 && result.result.data) {
          this.$set(this, 'corporationInfo', result.result.data);
          if (done) done();
        } else {
          this.$message({
            type: 'error',
            message: '未查询到任何信息'
          });
          if (done) done();
        }
      } catch (error) {
        if (done) done();
        console.log(error);
      }
    },
    submitForm(done, formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //let formData = JSON.parse(JSON.stringify(this.corporationInfo));
          let formData = this.$refs[formName].model;
          console.log(formData);
          let reusult = await saveCorpInfo(formData).catch(() => {
            done();
            this.$message({
              showClose: true,
              message: '系统异常，保存失败',
              type: 'error'
            });
          });
          if (reusult && reusult.status === 200) {
            done();
            this.$message({
              showClose: true,
              message: '保存成功!',
              type: 'success'
            });
            //改成非首次登录
            this.isSc = false;
            this.$store.commit('corporation/SET_FIRST_LOGIN', false);
          } else {
            done();
            this.$message({
              showClose: true,
              message: '保存失败',
              type: 'error'
            });
          }
        }
      });
    },
    changeQx() {
      this.dialogFormVisible = true;
    },
    doChangeQx(done) {
      //变更区县
      let that = this;
      this.$refs.reasonForm.validate(async valid => {
        if (valid) {
          let saveResult = await updateDistrictCode({
            cid: that.$store.getters['corporation/cid'],
            inDistrict: that.corporationInfo.districtCode,
            transferReason: that.areaForm.changeReason
          }).catch(() => {
            done();
            this.$message({
              type: 'error',
              message: '系统异常，保存失败'
            });
          });
          if (saveResult) {
            if (saveResult.status === 200) {
              this.$message({
                type: 'success',
                message: '保存成功'
              });
            } else {
              this.$message({
                type: 'error',
                message: '保存失败'
              });
            }
          }
          this.dialogFormVisible = false;
          //this.$alert('暂时没有此Api接口，请稍后！');
        }
        done();
      });
    },
    dialogClear(done) {
      //清空弹出框
      //this.$refs.corporationInfo.resetFields();
      this.getcorporationInfo(done);
    }
  },
  created() {
    // console.log("index begin creating");
    // console.log(this);
    // console.log(this.$data);
    // this.axios.get('/admin/index').then(res =>{
    //   this.$set(this.obj,'siet',res.data)
    // }).catch( err=>{
    //   console.log(err)
    // });
    this.getcorporationInfo();
  }
};
</script>

<style lang="scss" scoped>
#indexBody {
  width: 90%;
  min-height: 100%;
  //max-height:1000px;
  margin: 0 auto 150px;
  padding-top: 60px;
  background-color: $g-white-color;
  .title-style {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
    line-height: 40px;
    border-bottom: 1px solid #e9eef3;
    text-align: left;
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: 10px;
    position: relative;
  }
  .title-style::before {
    content: '';
    width: 4px;
    height: 16px;
    background: #fc7a43;
    position: absolute;
    left: 12px;
    top: 13px;
  }
  .el-form {
    margin-top: 20px;
    & > .el-col {
      min-height: 80px;
    }
    .el-input,
    .el-select {
      width: 100%;
    }
    ::v-deep textarea {
      min-height: 150px !important;
    }
    .form-item-left {
      .el-form-item {
        padding-right: 15%;
      }
    }
    .form-item-right {
      .el-form-item {
        padding-left: 15%;
      }
    }
  }
  .form-btns {
    margin-top: 30px;
    text-align: center;
  }
}
</style>
