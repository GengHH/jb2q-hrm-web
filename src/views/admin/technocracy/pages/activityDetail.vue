<!--
 * @Author: your name
 * @Date: 2021-03-30 18:19:39
 * @LastEditTime: 2021-03-31 18:22:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\pages\activityDetail.vue
-->
<template>
  <el-dialog
    title="专家结对记录"
    width="850px"
    :visible="visible"
    @close="onclose"
  >
    <div style="height:500px;overflow: scroll;overflow-x: hidden;">
      <el-form
        ref="form"
        :rules="rules"
        :disabled="disabled"
        :model="form"
        label-width="150px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="专家编号" prop="expertId">
              <el-input v-model="form.expertId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动类型" prop="actType">
              <el-select v-model="form.actType" style="width:100%">
                <el-option
                  v-for="(v, k) in dicOptions.act_type"
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
            <el-form-item label="活动日期" prop="actDate">
              <el-date-picker
                v-model="form.actDate"
                type="date"
                style="width:100%"
                value-format="yyyyMMdd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动日期类型" prop="actDateType">
              <el-select v-model="form.actDateType" style="width:100%">
                <el-option
                  v-for="(v, k) in dicOptions.date_type"
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
            <el-form-item label="参与人员标识" prop="pid">
              <el-select v-model="form.pid" style="width:100%">
                <el-option label="陈进福" value="201605238646380"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="参与人员证件号码" prop="zjhm">
              <el-input v-model="form.zjhm" maxlength="18"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="参与人员姓名" prop="xm">
              <el-input v-model="form.xm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="参与人员联系电话" prop="contactNumber">
              <el-input v-model="form.contactNumber" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动名称" prop="actName">
              <el-input v-model="form.actName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="参数人数" prop="psnlCount">
              <el-input v-model="form.psnlCount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item v-if="!disabled" label="结对协议书">
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
                  只能上传1张jpg/png格式文件，且不超过2MB
                </div>
              </el-upload>
            </el-form-item>

            <img
              width="600px"
              v-if="disabled && form.pairImageBase64 != ''"
              :src="form.pairImageBase64"
              alt="协议书"
            />
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
import { trim } from '@/utils/index';
import { activity_add, activity_edit } from '../api/index';
export default {
  name: 'activityDetail',
  props: ['visible', 'disabled', 'form', 'type'],
  components: {},
  data() {
    return {
      dicOptions: {
        //日期类型
        date_type: trim(
          this.$store.getters['dictionary/recruit_act_date_type']
        ),
        //活动类型
        act_type: trim(this.$store.getters['dictionary/recruit_act_type'])
      },
      rules: {
        expertId: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        actType: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        actDate: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        actDateType: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        pid: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        zjhm: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        xm: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        contactNumber: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        actName: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        psnlCount: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ]
      },
      fileList: []
    };
  },
  computed: {},
  methods: {
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
    //base64
    uploadChange(file) {
      this.getBase64(file.raw, 'recordImageBase64');
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    onSubmit() {
      let data = { ...this.form };
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!data.recordImageBase64) {
            this.$message({
              message: '操作成功',
              type: 'warning'
            });
            return;
          }
          if (this.type == 3) {
            activity_add(
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
          } else {
            activity_edit(
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
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onclose(type) {
      this.$emit('onclose', type || 0);
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
