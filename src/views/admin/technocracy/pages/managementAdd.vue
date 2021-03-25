<!--
 * @Author: your name
 * @Date: 2021-03-15 15:07:03
 * @LastEditTime: 2021-03-25 11:03:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\module\managementAdd.vue
-->
<template>
  <el-dialog title="申请" width="70%" :visible="visible" @close="onclose">
    <div style="height:500px;overflow: scroll;overflow-x: hidden;">
      <el-form ref="form" :model="form" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="form.xm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件照">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                class="avatar-uploader"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出生年月">
              <el-date-picker
                v-model="form.birthDate"
                type="date"
                style="width:100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12"> </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="民族">
              <el-select v-model="form.region" style="width:100%">
                <el-option label="汉" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-select v-model="form.sexId" style="width:100%">
                <el-option label="男" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="证件类型">
              <el-select v-model="form.zjlxId" style="width:100%">
                <el-option label="身份证" value="shanghai"></el-option>
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
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号码">
              <el-input v-model="form.zjhm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="专业">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历">
              <el-select v-model="form.eduId" style="width:100%">
                <el-option label="身份证" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="职务">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作单位">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="form.contactNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系住址所属区">
              <el-input v-model="form.contactDistrict"></el-input>
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
            <el-form-item label="联系住址（详细住址）">
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
          <el-col :span="12">
            <el-form-item label="可提供服务时间">
              <el-date-picker
                v-model="form.workday"
                type="date"
                style="width:100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理所属区">
              <el-input v-model="form.desc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="银行账号">
              <el-input v-model="form.bankaccount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户银行">
              <el-select v-model="form.bankName" style="width:100%">
                <el-option label="建设银行" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="签字后的登记表">
              <el-upload
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
                  只能上传1张jpg/png格式文件，且不超过500kb
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="text-align:center">
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'managementAdd',
  props: ['visible'],
  data() {
    return {
      fileList: [],
      imageUrl: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    };
  },
  computed: {},
  methods: {
    getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        console.log(reader.result);
      };
      reader.onerror = function(error) {
        console.log('Error: ', error);
      };
    },
    uploadChange(file, fileList) {
      console.log(file, fileList);
      this.getBase64(file.raw);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    onSubmit() {
      console.log('submit!');
    },
    onclose() {
      this.$emit('onclose');
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/jpg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
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
