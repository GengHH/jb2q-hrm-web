<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-17 15:16:47
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
      class="demo-ruleForm clearfix"
    >
      <el-col :span="12" class="form-item-left">
        <el-form-item required>
          <pl-input
            v-model="corporationInfo.tyshxym"
            label="社会信用代码"
            :disabled="true"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item required>
          <pl-input
            v-model="corporationInfo.corpName"
            label="单位名称"
            :disabled="true"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item required>
          <pl-date-picker
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
        <el-form-item required>
          <pl-input
            v-model="corporationInfo.unitResidence"
            label="单位住所"
            :disabled="true"
          >
          </pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item required>
          <pl-input
            v-model="corporationInfo.corpNature"
            label="单位性质"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item required prop="tranBaseSymbol">
          <pl-input
            v-model="corporationInfo.tranBaseSymbol"
            label="见习基地标志"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item required>
          <el-col :span="18" class="form-item-left">
            <pl-select
              v-model="corporationInfo.corpNature"
              :optionData="dicQx"
              label="管理所属区"
            >
            </pl-select>
          </el-col>
          <el-col :span="6" class="form-item-rigth text-right">
            <pl-button
              class="orange-btn btn-small-style"
              :auto-loading="true"
              @click="changeQx"
            >
              变更
            </pl-button>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item required>
          <pl-select
            v-model="corporationInfo.industryType"
            label="行业类别"
            :optionData="dicStreet"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item required>
          <pl-input
            v-model="corporationInfo.contactAddress"
            label="单位联系地址"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item prop="contactPhone">
          <pl-input
            v-model="corporationInfo.contactPhone"
            label="单位联系人"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="businessRange">
          <pl-input
            v-model="corporationInfo.businessRange"
            label="经营范围"
            :disabled="true"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="introduce">
          <el-input
            type="textarea"
            autosize
            placeholder="公司简介（不超过2000字符）"
            maxlength="2000"
            show-word-limit
            :rows="12"
            v-model="corporationInfo.introduce"
          >
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item prop="recruitChargeName">
          <pl-input
            v-model="corporationInfo.recruitChargeName"
            label="招聘负责人姓名"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item prop="recruitChargePhone">
          <pl-input
            v-model="corporationInfo.recruitChargePhone"
            label="招聘负责人手机"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item required>
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
      <el-button class="white-btn btn-style" @click="getcorporationInfo()"
        >取消</el-button
      >
    </div>
  </div>
</template>

<script>
import { phonePattern } from '@/utils/regexp';
import { loadCorpInfo, saveCorpInfo } from '@/api/corporationApi';
import plButton from '@/components/common/BaseLoadingButton';
import plInput from '@/components/common/BaseLabelInput';
import plSelect from '@/components/common/BaseLabelSelect';
import plDatePicker from '@/components/common/BaseLabelDatepicker';
export default {
  name: 'corporationApp',
  components: {
    plButton,
    plInput,
    plSelect,
    plDatePicker
  },
  data() {
    return {
      path: require('@/assets/logo.png'),
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
      rules: {
        recruitChargePhone: [
          { required: true, message: '请输手机号', trigger: 'blur' },
          {
            pattern: phonePattern,
            message: '请输入正确格式的手机号',
            trigger: ['blur', 'change']
          }
        ],
        recruitStaffPhone1: [
          { required: true, message: '请输手机号', trigger: 'blur' },
          {
            pattern: phonePattern,
            message: '请输入正确格式的手机号',
            trigger: ['blur', 'change']
          }
        ],
        recruitStaffPhone2: [
          { required: true, message: '请输手机号', trigger: 'blur' },
          {
            pattern: phonePattern,
            message: '请输入正确格式的手机号',
            trigger: ['blur', 'change']
          }
        ],
        livingAddress: [
          { required: true, message: '请输入联系地址', trigger: 'blur' }
        ],
        livingAddressTest: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      dicQx: this.$store.getters['dictionary/ggjbxx_qx'],
      dicStreet: [
        { value: '1309', label: '区域一' },
        { value: '1310', label: '区域二' }
      ],
      colRowGutter: 40,
      labelPosition: ''
    };
  },
  computed: {
    // jobFaieList: function() {
    //   return this.showList ? this.showList.slice(0, 3) : [];
    // }
  },
  methods: {
    async getcorporationInfo() {
      //! TODO 可以改成$refs,不需要再查一遍
      try {
        if (!this.$store.getters['corporation/token']) {
          this.$message({
            showClose: true,
            message: '请先登录，谢谢',
            type: 'error'
          });
          // Notification({
          //   title: '系统提示',
          //   message: '请先登录，谢谢',
          //   //duration: 4500,
          //   type: 'error'
          // });
          setTimeout(() => {
            window.location.href = '/ggzp-shrs/index.html';
          }, 2000);
        }
        // TODO 更换cid this.$store.getters['corporation/cid']
        let result = await loadCorpInfo({
          pid: this.$store.getters['corporation/cid'] || '201002025628331'
        });
        console.log('result', result);
        if (result.status === 200 && result.result.data.cid)
          this.$set(this, 'corporationInfo', result.result.data);
        else
          this.$message({
            type: 'error',
            message: '未查询到任何信息'
          });
      } catch (error) {
        console.log(error);
      }
    },
    submitForm(done, formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let formData = JSON.parse(JSON.stringify(this.corporationInfo));
          console.log(reusult);
          let reusult = await saveCorpInfo(formData);
          if (reusult && reusult.status === 200) {
            done();
            this.$message({
              showClose: true,
              message: '保存成功!',
              type: 'success'
            });
          } else {
            done();
            this.$message({
              showClose: true,
              message: 'error submit!',
              type: 'error'
            });
          }
        } else {
          done();
          console.log('error submit!!');
          return false;
        }
      });
    },
    changeQx() {}
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
  .text-right {
    text-align: right;
  }
  .orange-btn {
    color: #fff;
    background: #ff9954 linear-gradient(to right, #ff9854, #fc703d);
    border-color: #ff9954;
  }
  .btn-small-style {
    border-radius: 6px;
  }

  .btn-style {
    width: 200px;
    border-radius: 6px;
  }
  .white-btn {
    color: #fc6f3d;
    background-color: #fff;
    border-color: #ff9954;
  }
}
</style>
