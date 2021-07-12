<!--
 * @Author: your name
 * @Date: 2021-03-15 15:07:03
 * @LastEditTime: 2021-06-29 15:56:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\module\managementAdd.vue
-->
<template>
  <el-dialog
    :close-on-click-modal="false"
    title="申请"
    width="70%"
    :visible="visible"
    @close="onclose"
    @open="open"
  >
    <div style="height:500px;overflow: scroll;overflow-x: hidden;">
      <el-form
        ref="form"
        :disabled="disabled"
        :rules="rules"
        :model="form"
        label-width="150px"
      >
        <el-row style="height:122px">
          <el-col :span="12">
            <el-form-item label="姓名" prop="xm">
              <el-input :disabled="isAdminEdit" v-model="form.xm"></el-input>
            </el-form-item>
          </el-col>
          <el-col style="height:100px" :span="12">
            <el-form-item
              style="height:100px"
              label="证件照"
              prop="psnlPhotoBase64"
            >
              <el-upload
                action=""
                class="avatar-uploader"
                :on-remove="handleRemove"
                :file-list="fileList2"
                :auto-upload="false"
                :on-change="uploadUserChange"
                :limit="1"
                :show-file-list="false"
              >
                <template v-if="form.psnlPhotoBase64">
                  <img :src="form.psnlPhotoBase64" class="avatar" />
                </template>
                <template v-if="!form.psnlPhotoBase64">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </template>
              </el-upload>
              <div class="userClose" @click="imgRemove">
                <i class="el-icon-close"></i>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出生年月" prop="birthDate">
              <el-date-picker
                :disabled="isAdminEdit"
                v-model="form.birthDate"
                type="date"
                style="width:100%"
                value-format="yyyyMMdd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12"
            ><el-form-item label="联系电话" prop="contactNumber">
              <el-input v-model="form.contactNumber" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="民族" prop="nationId">
              <el-select v-model="form.nationId" style="width:100%">
                <el-option
                  v-for="(v, k) in dicOptions.nationality"
                  :key="k"
                  :label="v.label"
                  :value="v.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sexId">
              <el-select
                :disabled="isAdminEdit"
                v-model="form.sexId"
                style="width:100%"
              >
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="证件类型" prop="zjlxId">
              <el-select v-model="form.zjlxId" style="width:100%">
                <el-option
                  v-for="(v, k) in dicOptions.type"
                  :key="k"
                  :label="v.label"
                  :value="v.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱">
              <el-input v-model="form.mail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="毕业学校" prop="collegesName">
              <el-input v-model="form.collegesName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号码" prop="zjhm">
              <el-input
                :disabled="isAdminEdit"
                v-model="form.zjhm"
                maxlength="18"
                @input="userIdEdit"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="专业" prop="majorName">
              <el-input v-model="form.majorName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历" prop="eduId">
              <el-select v-model="form.eduId" style="width:100%">
                <el-option
                  v-for="(v, k) in dicOptions.edu"
                  :key="k"
                  :label="v.label"
                  :value="v.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="职务" prop="positionName">
              <el-input v-model="form.positionName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作单位" prop="corpName">
              <el-input v-model="form.corpName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮编">
              <el-input v-model="form.postcode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职称">
              <el-input v-model="form.positionTitle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系住址所属区" prop="contactDistrict">
              <el-select v-model="form.contactDistrict" style="width:100%">
                <el-option
                  v-for="(v, k) in dicOptions.qx"
                  :key="k"
                  :label="v.label"
                  :value="v.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="联系住址（详细住址）" prop="contactAddress">
              <el-input maxlength="40" v-model="form.contactAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="个人工作经历及主要业绩（起止年月）"
              prop="laborInfo"
            >
              <el-input
                :autosize="{ minRows: 5, maxRows: 7 }"
                type="textarea"
                v-model="form.laborInfo"
                maxlength="1000"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="曾获荣誉、专业成果及担任社会职务"
              prop="majorResult"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 7 }"
                maxlength="1000"
                v-model="form.majorResult"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="可提供服务时间" prop="timeday">
              <el-select
                v-model="form.timeday"
                @change="timedayClick"
                style="width:100%"
              >
                <el-option label="所有时间均可提供服务" value="all"></el-option>
                <el-option label="工作日可提供服务" value="workday"></el-option>
                <el-option label="周末可提供服务" value="weekend"></el-option>
                <el-option
                  label="其他时间可提供服务"
                  value="otherTime"
                ></el-option>
              </el-select>
              <el-input
                v-if="form.timeday == 'otherTime'"
                v-model="form.otherTime"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="银行账号" prop="bankaccount">
              <el-input v-model="form.bankaccount" maxlength="18"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户银行" prop="bankId">
              <el-select v-model="form.bankId" style="width:100%">
                <el-option
                  v-for="(v, k) in dicOptions.jhh"
                  :key="k"
                  :label="v.label"
                  :value="v.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="form.expertId" :span="12">
            <el-form-item label="聘期开始时间">
              <el-input disabled v-model="form.startDate"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="form.expertId" :span="12">
            <el-form-item label="聘期结束时间">
              <el-input disabled v-model="form.endDate"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="form.expertId" :span="12">
            <el-form-item label="专家编号">
              <el-input disabled v-model="form.expertId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="申请人满足的准入条件" prop="approvalEntry">
              <el-checkbox-group v-model="form.approvalEntry">
                <el-checkbox
                  v-for="(v, k) in dicOptions.entry"
                  :key="k"
                  :label="v.value"
                  :value="v.value"
                  name="type"
                  >{{ v.label }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="申请人适合提供的服务内容"
              prop="serviceContent"
            >
              <el-checkbox-group v-model="form.serviceContent">
                <el-checkbox
                  v-for="(v, k) in dicOptions.content"
                  :key="k"
                  :label="v.value"
                  :value="v.value"
                  name="type"
                  >{{ v.label }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="申请人所熟悉的行业类型" prop="industryType">
              <el-radio-group
                v-model="form.industryType"
                @change="indTypeChange"
              >
                <el-radio
                  style="margin:5px 10px"
                  v-for="(v, k) in dicOptions.industry"
                  :key="k"
                  :label="v.value"
                  name="type"
                  >{{ v.label }}</el-radio
                >
                <el-input
                  style="margin-left:5px;width:150px"
                  size="mini"
                  :disabled="indType"
                  v-model="form.industryTypeOther"
                  placeholder="请输入内容"
                ></el-input>
              </el-radio-group>
              <!-- <el-checkbox-group
               
                :max="1"
              >
                <el-checkbox
                  v-for="(v, k) in dicOptions.industry"
                  :key="k"
                  :label="v.value"
                  :value="v.value"
                  name="type"
                  >{{ v.label
                  }}<el-input
                    style="margin-left:5px"
                    size="mini"
                    :disabled="indType"
                    v-if="v.value == '14'"
                    v-model="form.industryTypeOther"
                    placeholder="请输入内容"
                  ></el-input
                ></el-checkbox>
              </el-checkbox-group> -->
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="申请人所擅长的专业领域"
              prop="professionalField"
            >
              <el-checkbox-group v-model="form.professionalField">
                <el-checkbox
                  v-for="(v, k) in dicOptions.professional"
                  :key="k"
                  :label="v.value"
                  :value="v.value"
                  name="type"
                  >{{ v.label
                  }}<el-input
                    style="margin-left:5px"
                    size="mini"
                    v-if="v.value == '09'"
                    v-model="form.professionalFieldOther"
                    placeholder="请输入内容"
                  ></el-input
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="其他说明事项(用于满足第5类条件的专家，区需写出招募原因)"
              prop="otherMemo"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 7 }"
                maxlength="500"
                v-model="form.otherMemo"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="签字后的登记表">
              <template v-if="disabled">
                <img
                  :src="'data:image/png;base64,' + form.formImageBase64"
                  class="avatar"
                />
              </template>
              <el-upload
                v-if="!disabled"
                class="upload-demo"
                ref="upload"
                action=""
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
                :on-change="uploadChange"
                :limit="1"
              >
                <el-button slot="trigger" size="small" type="primary"
                  >选取文件</el-button
                >
                <div
                  slot="tip"
                  class="el-upload__tip"
                  style="display: inline-block;margin-top: 0px;margin-left: 10px;"
                >
                  只能上传1张jpg/png格式文件，且不超过2MB
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <div v-if="!disabled" style="text-align:center">
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { joinTeam_add, expert_modify } from '../api/index';
import { trim } from '@/utils/index';
import { cP, cP15 } from '@/utils/regexp';
export default {
  name: 'managementAdd',
  props: ['visible', 'form', 'disabled', 'type'],
  data() {
    return {
      isAdminEdit: false,
      adminId: this.$store.state.admin.userInfo.logonUser.areaInfo.areaCode,
      fileList: [],
      fileList2: [],
      imageUrl: '',
      indType: true,
      dicOptions: {
        //专家准入条件
        entry: trim(
          this.$store.getters['dictionary/recruit_expert_approval_entry_type']
        ),
        //专家服务内容
        content: trim(
          this.$store.getters['dictionary/recruit_expert_service_content_type']
        ),
        //专家行业类型
        industry: trim(
          this.$store.getters['dictionary/recruit_expert_industry_type']
        ),
        //专家专业领域类型
        professional: trim(
          this.$store.getters['dictionary/recruit_expert_professional_type']
        ),
        //性别
        sex: trim(this.$store.getters['dictionary/ggjbxx_sex']),
        //民族
        nationality: trim(this.$store.getters['dictionary/ggjbxx_nationality']),
        //证件类型
        type: trim(this.$store.getters['dictionary/ggjbxx_zjlx']),
        //银行
        jhh: trim(this.$store.getters['dictionary/sybx_jhh']),
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx']),
        //学历
        edu: trim(this.$store.getters['dictionary/recruit_edu'])
      },
      rules: {
        collegesName: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        majorName: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        positionName: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        corpName: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],

        contactNumber: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        majorResult: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        laborInfo: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        psnlPhotoBase64: [
          { required: true, message: '请上传照片', trigger: 'blur' }
        ],
        nationId: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        zjlxId: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        zjhm: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        xm: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        sexId: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        birthDate: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        eduId: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        contactAddress: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        contactDistrict: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        districtCode: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        timeday: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        bankId: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        bankaccount: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],

        approvalEntry: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        serviceContent: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        industryType: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        professionalField: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        otherMemo: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {},
  methods: {
    imgRemove() {
      this.form.psnlPhotoBase64 = '';
      this.imageUrl = '';
      this.fileList2 = [];
    },
    indTypeChange(e) {
      if (e == '14') {
        this.indType = false;
      } else {
        this.indType = true;
      }
    },
    userIdEdit(e) {
      console.log(this.$store);
      let arr = this.getBirthday(e);
      if (arr.length == 1) {
        this.form.sexId = arr[0];
      } else if (arr.length == 2) {
        this.form.sexId = arr[0];
        this.form.birthDate = arr[1];
      }
    },
    getBirthday(e) {
      let arr = [];
      if (e.length == 15) {
        if (cP15.test(e) === true) {
          let s = e.substring(14, 15);
          arr = [s % 2 == 0 ? '2' : '1'];
        }
        return arr;
      } else if (e.length == 18) {
        if (cP.test(e) === true) {
          let b = e.substring(6, 14);
          let s = e.substring(16, 17);
          arr = [s % 2 == 0 ? '2' : '1', b];
        }
        return arr;
      }
      return arr;
    },
    open() {},
    timedayClick(e) {
      if (e == 'workday') {
        this.form.workday = 1;
        this.form.weekend = 0;
        this.form.otherTime = '';
      } else if (e == 'weekend') {
        this.form.workday = 0;
        this.form.weekend = 1;
        this.form.otherTime = '';
      } else if (e == 'otherTime') {
        this.form.workday = 0;
        this.form.weekend = 0;
      } else if (e == 'all') {
        this.form.workday = 1;
        this.form.weekend = 1;
      }
    },
    getBase64(file, name) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        this.form[name] = reader.result;
      };
      reader.onerror = function(error) {
        console.log('Error: ', error);
      };
    },
    //登记表base64
    uploadChange(file) {
      if (this.beforeAvatarUpload(file)) {
        this.getBase64(file.raw, 'formImageBase64');
      }
      this.fileList = [];
    },
    //照片base64
    uploadUserChange(file) {
      console.log(123);
      if (this.beforeAvatarUpload(file)) {
        console.log(456);
        this.getBase64(file.raw, 'psnlPhotoBase64');
        this.imageUrl = URL.createObjectURL(file.raw);
      }
      this.fileList2 = [];
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.timeday == 'otherTime') {
            if (!this.form.otherTime) {
              this.$message({
                message: '请填写其他时间',
                type: 'warning'
              });
              return;
            }
          }
          let data = { ...this.form };
          if (!data.psnlPhotoBase64) {
            this.$message({
              message: '请上传证件照',
              type: 'warning'
            });
            return;
          }
          data.psnlPhotoBase64 = data.psnlPhotoBase64.split(',')[1].toString();

          if (data.formImageBase64.split(',')[0] == 'data:image/png;base64,') {
            data.formImageBase64 = data.formImageBase64
              .split(',')[1]
              .toString();
          }

          data.approvalEntry = data.approvalEntry.toString();
          data.serviceContent = data.serviceContent.toString();

          data.industryType = data.industryType.toString();
          data.professionalField = data.professionalField.toString();
          if (this.type == '1') {
            expert_modify(
              data,

              res => {
                if (res.result.data.result) {
                  this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1000,
                    onClose: () => {
                      this.onclose();
                    }
                  });
                } else {
                  this.$message({
                    message: res.result.data.msg,
                    type: 'warning',
                    duration: 1500
                  });
                }
                console.log(res);
              },
              err => {
                console.log(err);
              }
            );
          } else {
            joinTeam_add(
              data,

              res => {
                if (res.result.data.result) {
                  this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1000,
                    onClose: () => {
                      this.onclose();
                    }
                  });
                } else {
                  this.$message({
                    message: res.result.data.msg,
                    type: 'warning',
                    duration: 1500
                  });
                }
                console.log(res);
              },
              err => {
                console.log(err);
              }
            );
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onclose() {
      this.$emit('onclose');
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/jpg';
      const isLt2M = file.size / 1024 / 1024 < 0.5;
      if (!isJPG) {
        this.$message.error('图片只能是 jpeg/jpg/png/ 格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 500KB!');
        return false;
      }
      return true;
    },
    isAdmin(e) {
      //   { value: '01', label: '新聘未审核' },
      // { value: '02', label: '新聘审核通过' },
      // { value: '03', label: '新聘审核不通过' },
      // { value: '04', label: '续聘未审核' },
      // { value: '05', label: '续聘审核通过' },
      // { value: '06', label: '续聘审核不通过' },
      // { value: '07', label: '退团未审核' },
      // { value: '08', label: '退团审核通过' },
      // { value: '09', label: '退团审核不通过' }
      let cur = e.currStatus;
      if (!cur) {
        return false;
      }
      if (this.adminId == '00') {
        return false;
      }
      if (
        (cur == '01' ||
          cur == '03' ||
          cur == '04' ||
          cur == '06' ||
          cur == '07' ||
          cur == '09') &&
        this.adminId != '00'
      ) {
        return false;
      } else if (
        (cur == '02' || cur == '05' || cur == '08') &&
        this.adminId == '00'
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    console.log(this.type);
    this.form.industryType = this.form.industryType[0];
    if (!this.disabled) {
      this.isAdminEdit = this.isAdmin(this.form);
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.userClose {
  position: absolute;
  left: 100px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  text-align: center;
}
.avatar-uploader {
  height: 100px;
  position: absolute;
  border: 1px solid #dcdfe6;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
