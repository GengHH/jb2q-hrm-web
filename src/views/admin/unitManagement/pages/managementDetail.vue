<!--
 * @Author: your name
 * @Date: 2021-04-01 13:42:18
 * @LastEditTime: 2021-04-13 14:22:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\pages\managementDetail.vue
-->
<template>
  <el-dialog
    title="单位账号管理"
    width="800px"
    :visible="visible"
    @close="onclose"
  >
    <div style="height:500px;overflow: scroll;overflow-x: hidden;">
      <el-form
        ref="form"
        size="mini"
        :rules="rules"
        :disabled="disabled"
        :model="form"
        label-width="150px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="单位名称" prop="meetTheme">
              <el-input v-model="form.corpName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位状态" prop="meetTime">
              <el-select
                :disabled="disabled"
                v-model="form.frozen"
                style="width:100%"
              >
                <el-option label="冻结" value="1"></el-option>
                <el-option label="正常" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="冻结/解冻时间" prop="meetAddress">
              <el-date-picker
                v-model="form.frozenTime"
                type="date"
                style="width:100%"
                value-format="yyyyMMdd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div style="color:#fc6f3d;height: 28px;line-height: 28px;">
              查看详情>>
            </div>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="会议召集人" prop="meetCaller">
              <el-input v-model="form.meetCaller"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="冻结/解冻原因" prop="expertNames">
              <el-input
                type="textarea"
                :rows="4"
                v-model="form.frozenReason"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div style="color:#fc6f3d;height: 84px;line-height: 84px;">
              查看详情>>
            </div>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="与会其他人员" prop="meetOtherPeople">
              <el-input v-model="form.meetOtherPeople"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="单位标签" prop="meetOtherPeople">
              <el-checkbox
                v-model="form.tranBaseSymbol"
                label="就业见习基地"
              ></el-checkbox>
              <el-checkbox
                v-model="form.humanResourceReg"
                label="人力资源机构"
              ></el-checkbox>
              <el-checkbox
                v-model="form.entrustStatus"
                label="代理招聘企业"
              ></el-checkbox>
              <el-checkbox
                v-model="form.keypointCorp"
                label="重点企业"
              ></el-checkbox>
              <el-checkbox
                v-model="form.specialCorp"
                label="特定单位"
              ></el-checkbox>
            </el-form-item>
          </el-col>

          <el-col v-if="form.specialCorp" :span="20" style="margin-left:150px">
            <el-checkbox
              v-model="form.resumeSearch"
              label="是否需要简历搜索"
            ></el-checkbox>
            <el-checkbox
              v-model="form.resumeFavor"
              label="是否允许简历收藏"
            ></el-checkbox>
            <el-checkbox
              v-model="form.resumeDownload"
              label="是否允许简历下载"
            ></el-checkbox
            ><span>每周简历下载最大数 30份</span>
            <el-checkbox
              v-model="form.indexRec"
              label="是否进入首页“推荐单位”"
            ></el-checkbox>
          </el-col>
        </el-row>
        <el-row style="margin-top:15px">
          <el-col :span="24">
            <el-form-item v-if="!disabled" label="公司LOGO">
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
              alt="logo"
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
import { management_edit } from '../api/index';
import { trim } from '@/utils/index';
export default {
  name: 'managementDetail',
  props: ['visible', 'disabled', 'form', 'type'],
  components: {},
  data() {
    return {
      checkListStatus: false,
      checkList2: [],
      checkList: [],
      dicOptions: {
        //专家状态
        status: trim(this.$store.getters['dictionary/recruit_corp_status'])
      },
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
    isYes(obj, arr) {
      for (let j = 0; j < arr.length; j++) {
        for (let i in obj) {
          if (i == arr[j]) {
            obj[i] = obj[i] ? '1' : '0';
          }
        }
      }
      return obj;
    },
    onSubmit() {
      let data = { ...this.form };
      data = this.isYes(data, [
        'tranBaseSymbol',
        'humanResourceReg',
        'keypointCorp',
        'specialCorp',
        'entrustStatus',
        'resumeSearch',
        'resumeFavor',
        'resumeDownload',
        'indexRec'
      ]);
      this.$refs.form.validate(valid => {
        if (valid) {
          // if (!data.meetImageBase64) {
          //   this.$message({
          //     message: '请上传签字记录',
          //     type: 'warning'
          //   });
          //   return;
          // }
          management_edit(
            data,
            res => {
              if (res.result.data.result) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.onclose(1);
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
          console.log('参数错误');
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
