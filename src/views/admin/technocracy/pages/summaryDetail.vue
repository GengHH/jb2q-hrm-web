<!--
 * @Author: your name
 * @Date: 2021-03-30 18:19:39
 * @LastEditTime: 2021-04-01 10:10:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\pages\summaryDetail.vue
-->
<template>
  <el-dialog
    title="专家会议纪要"
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
            <el-form-item label="会议议题" prop="meetTheme">
              <el-input v-model="form.meetTheme"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会议日期" prop="meetTime">
              <el-date-picker
                v-model="form.meetTime"
                type="date"
                style="width:100%"
                value-format="yyyyMMdd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="会议地点" prop="meetAddress">
              <el-input v-model="form.meetAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会议召集人" prop="meetCaller">
              <el-input v-model="form.meetCaller"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="与会专家" prop="expertNames">
              <el-select v-model="form.expertNames" style="width:100%">
                <el-option label="测试专家" value="0052103001"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="与会其他人员" prop="meetOtherPeople">
              <el-input v-model="form.meetOtherPeople"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item v-if="!disabled" label="签字记录">
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
              v-if="disabled && form.meetImageBase64 != ''"
              :src="form.meetImageBase64"
              alt="签字记录"
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
import { summary_add, summary_edit } from '../api/index';
export default {
  name: 'summaryDetail',
  props: ['visible', 'disabled', 'form', 'type'],
  components: {},
  data() {
    return {
      rules: {
        pid: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        expertId: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        xm: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        zjhm: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        contactNumber: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        pairStartTime: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        serviceCount: [
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
      this.getBase64(file.raw, 'meetImageBase64');
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    onSubmit() {
      let data = { ...this.form };
      this.$refs.form.validate(valid => {
        if (valid) {
          data.expertJoinDatas = [{ expertId: '0052103001' }];
          // if (!data.meetImageBase64) {
          //   this.$message({
          //     message: '请上传签字记录',
          //     type: 'warning'
          //   });
          //   return;
          // }
          if (this.type == 3) {
            summary_add(
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
            summary_edit(
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
