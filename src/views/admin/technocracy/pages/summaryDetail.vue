<!--
 * @Author: your name
 * @Date: 2021-03-30 18:19:39
 * @LastEditTime: 2021-06-29 15:29:13
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
          <el-col :span="24">
            <el-row>
              <el-col :span="12">
                <el-form-item label="与会专家" prop="expertJoinDatas">
                  <el-select
                    filterable
                    v-model="form.expertJoinDatas"
                    style="width:246px"
                    @change="setListExpert"
                  >
                    <el-option
                      v-for="(v, k) in userList"
                      :key="k"
                      :label="v.label"
                      :value="v"
                    >
                      <span style="float: left">{{ v.label }}</span>
                      <span
                        style="float: right; color: #8492a6; font-size: 13px"
                        >{{ v.value }}</span
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-select
                  filterable
                  v-model="form.expertJoinDatasQx"
                  placeholder="请选择区"
                  style="width:150px"
                  @change="queryQx"
                >
                  <el-option
                    v-for="(v, k) in dicOptions.qx"
                    :key="k"
                    :label="v.label"
                    :value="v.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="text-align: center">
                <el-tag
                  style="margin: 0 5px 10px 5px;"
                  v-for="(tag, key) in listExpert"
                  :key="key"
                  closable
                  type="success"
                  @close="removeListExpert(key)"
                >
                  {{ tag.name }} - {{ getQx(tag.districtCode) }}
                </el-tag>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="12">
            <el-form-item label="与会其他人员" prop="meetOtherPeople">
              <el-input v-model="form.meetOtherPeople"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动日期类型" prop="actDateType">
              <el-select v-model="form.meetDateType" style="width:100%">
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
        <div v-if="meetImage != ''">
          <img
            @click="setImg"
            :style="{ width: imgWidth + 'px', margin: ' 15px auto' }"
            :src="meetImage"
            alt="签字记录"
          />
        </div>

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
          <el-button type="success" @click="onSubmit('0')">保存</el-button>
          <el-button type="primary" @click="onSubmit('1')">提交</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { trim } from '@/utils/index';
import { summary_add, summary_edit, synthesize_query } from '../api/index';
export default {
  name: 'summaryDetail',
  props: ['visible', 'disabled', 'form', 'type'],
  components: {},
  data() {
    return {
      imgWidth: 150,
      listExpert: [],
      meetImage: '',
      adminId: this.$store.state.admin.userInfo.logonUser.areaInfo.areaCode,
      dicOptions: {
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx']),
        //日期类型
        date_type: trim(this.$store.getters['dictionary/recruit_act_date_type'])
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
      fileList: [],
      userList: []
    };
  },
  computed: {},
  methods: {
    setImg() {
      if (this.imgWidth > 150) {
        this.imgWidth = this.imgWidth / 2;
      } else {
        this.imgWidth = this.imgWidth * 2;
      }
    },
    removeListExpert(e) {
      this.listExpert.splice(e, 1);
    },
    getQx(code) {
      let data = trim(this.$store.getters['dictionary/ggjbxx_qx']);
      for (let i = 0; i < data.length; i++) {
        if (data[i].value == code) {
          return data[i].label;
        }
      }
    },
    setListExpert(e) {
      let list = this.listExpert;
      for (let i = 0; i < list.length; i++) {
        if (list[i].value == e.value) {
          return;
        }
      }
      this.listExpert.push({
        name: e.label,
        expertId: e.value,
        districtCode: e.districtCode
      });
    },
    getBase64(file, name) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        this.meetImage = reader.result;
        this.form[name] = reader.result.split(',')[1].toString();
      };
      reader.onerror = function(error) {
        console.log('Error: ', error);
      };
    },
    //base64
    uploadChange(file) {
      if (this.beforeAvatarUpload(file.raw)) {
        this.getBase64(file.raw, 'meetImageBase64');
      }
      this.fileList = [];
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    onSubmit(realSubmit) {
      let data = { ...this.form };
      data.realSubmit = realSubmit;
      data.expertJoinDatas = this.listExpert;
      this.$refs.form.validate(valid => {
        if (valid) {
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
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (
        file.type != 'image/png' &&
        file.type != 'image/jpg' &&
        file.type != 'image/jpeg'
      ) {
        this.$message.error('图片只能是 jpeg/jpg/png/ 格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!');
        return false;
      }
      return true;
    },
    queryQx(e) {
      this.form.expertJoinDatas = '';
      this.userList = [];
      this.queryExpert({ districtCode: e });
    },
    queryExpert(obj) {
      synthesize_query(
        {
          pageIndex: 0,
          pageSize: 999,
          valid: 1,
          ...obj
        },
        res => {
          if (res.status == 200) {
            let data = res.result.pageresult.data;
            data.map(e => {
              e.value = e.expertId;
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
  },
  mounted() {
    if (this.type == '1') {
      this.meetImage = 'data:image/png;base64,' + this.form.meetImage;
      this.listExpert = this.form.expertJoinDatas.map(e => {
        return {
          name: e.xm,
          expertId: e.expertId,
          districtCode: e.districtCode
        };
      });

      console.log(this.listExpert);
    }
    this.form.expertJoinDatasQx = this.adminId;
    this.queryExpert({ districtCode: this.adminId });
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
