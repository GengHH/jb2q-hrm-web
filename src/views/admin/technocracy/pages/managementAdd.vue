<!--
 * @Author: your name
 * @Date: 2021-03-15 15:07:03
 * @LastEditTime: 2021-04-09 15:47:53
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
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="xm">
              <el-input v-model="form.xm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件照">
              <el-upload
                action=""
                class="avatar-uploader"
                :on-remove="handleRemove"
                :file-list="fileList2"
                :auto-upload="false"
                :on-change="uploadUserChange"
                :before-upload="beforeAvatarUpload"
                :limit="1"
                :show-file-list="false"
              >
                <template v-if="disabled">
                  <img :src="form.psnlPhotoBase64" class="avatar" />
                </template>
                <template v-if="!disabled">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </template>
              </el-upload>
              <div
                class="userClose"
                @click="
                  imageUrl = '';
                  fileList2 = [];
                "
              >
                <i class="el-icon-close"></i>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出生年月" prop="birthDate">
              <el-date-picker
                v-model="form.birthDate"
                type="date"
                style="width:100%"
                value-format="yyyyMMdd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12"> </el-col>
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
              <el-select v-model="form.sexId" style="width:100%">
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
            <el-form-item label="毕业学校">
              <el-input v-model="form.collegesName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号码" prop="zjhm">
              <el-input v-model="form.zjhm" maxlength="18"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="专业">
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
            <el-form-item label="职务">
              <el-input v-model="form.positionName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作单位">
              <el-input v-model="form.corpName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="form.contactNumber" maxlength="11"></el-input>
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
          <el-col :span="12">
            <el-form-item label="邮编">
              <el-input v-model="form.postcode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="联系住址（详细住址）" prop="contactAddress">
              <el-input v-model="form.contactAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="个人工作经历及主要业绩（起止年月）">
              <el-input
                :autosize="{ minRows: 5, maxRows: 7 }"
                type="textarea"
                v-model="form.laborInfo"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="曾获荣誉、专业成果及担任社会职务">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 7 }"
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
          <!-- <el-col :span="12">
            <el-form-item label="管理所属区" prop="districtCode">
              <el-select v-model="form.districtCode" style="width:100%">
                <el-option
                  v-for="(v, k) in dicOptions.qx"
                  :key="k"
                  :label="v.label"
                  :value="v.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
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
              <el-input v-model="form.startDate"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="form.expertId" :span="12">
            <el-form-item label="聘期结束时间">
              <el-input v-model="form.endDate"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="form.expertId" :span="12">
            <el-form-item label="专家编号">
              <el-input v-model="form.expertId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="签字后的登记表">
              <template v-if="disabled">
                <img :src="form.formImageBase64" class="avatar" />
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
                :before-upload="beforeAvatarUpload"
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
import { joinTeam_add } from '../api/index';
import { trim } from '@/utils/index';
export default {
  name: 'managementAdd',
  props: ['visible', 'form', 'disabled'],
  data() {
    return {
      fileList: [],
      fileList2: [],
      imageUrl: '',

      dicOptions: {
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
        bankName: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        bankaccount: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {},
  methods: {
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
      } else {
        this.form.workday = 0;
        this.form.weekend = 0;
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
      this.getBase64(file.raw, 'formImageBase64');
    },
    //照片base64
    uploadUserChange(file) {
      this.getBase64(file.raw, 'psnlPhotoBase64');
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          joinTeam_add(
            trim(this.form),
            res => {
              if (res.status == 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.onclose();
                  }
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
    onclose() {
      this.$emit('onclose');
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/jpg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jpeg/jpg/png/ 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
