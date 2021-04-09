<!--
 * @Author: your name
 * @Date: 2021-03-30 18:19:39
 * @LastEditTime: 2021-04-09 18:22:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\pages\recordDetail.vue
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
        label-width="250px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="姓名" prop="xm">
              <el-select
                v-model="form.name"
                filterable
                remote
                reserve-keyword
                style="width:350px"
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading"
                @change="
                  e => {
                    form.expertId = e;
                  }
                "
              >
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span v-show="false">{{ (form.xm = item.label) }}</span>
                  <span>{{ item.label }}</span
                  >-<span>{{ item.value }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="专家编号" prop="expertId">
              <el-input
                style="width:350px"
                disabled
                v-model="form.expertId"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="结对人员姓名" prop="pid">
              <el-select
                v-model="form.pids"
                filterable
                remote
                reserve-keyword
                style="width:350px"
                placeholder="请输入关键词"
                :remote-method="orgRemoteMethod"
                :loading="loading"
                @change="
                  e => {
                    form.zjhm = e;
                  }
                "
              >
                <el-option
                  v-for="item in orgOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span v-show="false">{{ (form.pid = item.pid) }}</span>
                  <span>{{ item.label }}</span
                  >-<span>{{ item.value }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="结对人员证件号码" prop="zjhm">
              <el-input
                style="width:350px"
                disabled
                v-model="form.zjhm"
                maxlength="18"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="结对人员联系电话" prop="contactNumber">
              <el-input
                style="width:350px"
                v-model="form.contactNumber"
                maxlength="11"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="结对开始时间" prop="pairStartTime">
              <el-date-picker
                v-model="form.pairStartTime"
                type="date"
                style="width:350px"
                value-format="yyyyMMdd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
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
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item label="服务次数" prop="serviceCount">
              <el-input
                style="width:250px"
                v-model="form.serviceCount"
              ></el-input>
              <span
                style="float:right;color:#ff9350;margin-right:50px;cursor: pointer;"
                >查看详情》》</span
              >
            </el-form-item>
          </el-col>
        </el-row> -->
        <div v-if="!disabled" style="text-align:center">
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { trim } from '@/utils/index';
import {
  record_add,
  record_edit,
  record_queryPsnls,
  synthesize_query
} from '../api/index';
import { emphasis_keypoint } from '../../serviceManagement/api/index';
export default {
  name: 'recordDetail',
  props: ['visible', 'disabled', 'form', 'type'],
  components: {},
  data() {
    return {
      userOptions: [],
      orgOption: [],
      list: [],
      loading: false,

      userList: [],
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
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        let data = {
          xm: query,
          pageIndex: 0,
          pageSize: 10,
          valid: 1,
          districtCode: this.$store.state.admin.userInfo.areaInfo.areaCode
        };
        synthesize_query(
          data,
          res => {
            if (res.status == 200) {
              this.loading = false;
              let pageresult = res.result.pageresult.data;
              let list = pageresult.map(e => {
                return { value: e.expertId, label: e.xm };
              });
              this.userOptions = list;
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      } else {
        this.options = [];
      }
    },
    orgRemoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        let params = {
          xm: query,
          pageParam: {
            pageIndex: 0,
            pageSize: 10
          }
        };

        emphasis_keypoint(
          params,
          res => {
            if (res.status == 200) {
              this.loading = false;
              let pageresult = res.result.data.data;
              let list = pageresult.map(e => {
                return { value: e.zjhm, label: e.xm, pid: e.pid };
              });
              this.orgOption = list;
            }
            console.log(res);
          },
          err => {
            console.log('错误');
            console.log(err);
          }
        );
      } else {
        this.options = [];
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
    //base64
    uploadChange(file) {
      this.getBase64(file.raw, 'pairImageBase64');
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    onSubmit() {
      let data = { ...this.form };
      this.$refs.form.validate(valid => {
        if (valid) {
          // if (!data.pairImageBase64) {
          //   this.$message({
          //     message: '请上传协议书',
          //     type: 'warning'
          //   });
          //   return;
          // }
          if (this.type == 3) {
            record_add(
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
            record_edit(
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
  created() {
    //获取人员信息
    record_queryPsnls(
      {
        pageIndex: 0,
        pageSize: 100
      },
      res => {
        if (res.status == 200) {
          let data = res.result.pageresult.data;
          data.map(e => {
            e.value = e.pid;
            e.label = e.xm;
          });
          this.userList = data;
        } else {
          this.message('warning', res.result.data.msg);
        }
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
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
