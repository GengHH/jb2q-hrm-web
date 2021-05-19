<template>
  <!--S 特色专栏部分 -->
  <div class="activity-box-module">
    <el-row>
      <el-col :sm="2" :md="4" :lg="6" class="pr">
        <img src="../../assets/img/img04.png" alt="" />
        <div v-if="online" class="float-div">
          <i class="circle-sty"></i> 进行中
        </div>
        <div v-if="offline" class="float-div2">
          <i class="circle-sty"></i> 未开始
        </div>
      </el-col>
      <el-col class="ul-style" :sm="22" :md="20" :lg="9">
        <p class="black-font">
          <b>{{ fairInfo.meetName }} </b>
          <span
            v-if="fairInfo.meetType === '1' || fairInfo.meetType === '2'"
            class="span-line"
            >线上</span
          >
          <span v-if="fairInfo.meetType === '2'" class="span-line2">线下</span>
        </p>
        <el-row class="mat-15 details-info">
          <el-col :span="24">
            <p class="line30 or-font">
              <i class="icon iconfont ">&#xe651;</i>{{ fairInfo.startTime }} 至
              {{ fairInfo.endTime }}
            </p>
            <p class="line30 mat-15">
              <i class="icon iconfont">&#xe652;</i> 剩余展位 ：<i
                class="or-font"
                >{{ fairInfo.boothCount }}</i
              >
              个
            </p>
          </el-col>
        </el-row>
      </el-col>
      <el-col class="ul-style" :sm="22" :md="20" :lg="9">
        <el-row class="mat-15 details-info">
          <el-col :span="18">
            <p class="line30">
              <span class="gray-font"> 主办单位：</span
              >{{ fairInfo.mainCorpName }}
            </p>
            <p class="line30">
              <span class="gray-font"> 联系人：</span>{{ fairInfo.contactName }}
            </p>
            <p class="line30">
              <span class="gray-font"> 联系电话：</span
              >{{ fairInfo.contactPhone }}
            </p>
            <p class="line30">
              <span class="gray-font"> 招聘地点：</span>{{ fairInfo.address }}
              <el-link class="blue-font" :underline="false">
                <i class="icon iconfont">&#xe654;</i>
                <span @click="showMap">附近交通</span></el-link
              >
            </p>
          </el-col>
          <el-col :span="6" class="text-right">
            <el-button
              v-if="cannotApply"
              class="gray-btn font-size18 mat-15"
              type="primary"
              @click="hadApply"
              ><i class="icon iconfont font-size20">&#xe653;</i>
              已报名</el-button
            >
            <el-button
              v-else
              class="release-btn font-size18 mat-15"
              type="primary"
              @click="queryJobFairPositionList"
              ><i class="icon iconfont font-size20">&#xe653;</i>
              单位报名</el-button
            >
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 地图弹框 -->
    <el-dialog
      class="width75 dialog-content-full-screen"
      :visible.sync="mapDialog"
      :before-close="mapHandleClose"
    >
      <pl-map :pointList="pointList"></pl-map>
    </el-dialog>
    <!-- 单位职位列表弹框 -->
    <el-dialog
      class="width75 dialog-content-full-screen"
      :visible.sync="positionDialog"
      :before-close="positionHandleClose"
    >
      <div style="padding-top: 60px" v-if="positionList && positionList.length">
        <el-checkbox-group v-model="positsionId" size="small">
          <el-checkbox
            v-for="(item, index) in positionList"
            :key="index"
            :label="item.positionId"
            border
            >{{ item.positionName }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
      <div v-else class="gray-font" style="text-align:center">没有职位信息</div>
      <el-divider></el-divider>
      <el-form
        ref="bmForm"
        :model="form"
        :rules="rules"
        label-width="0px"
        style="padding:0 20px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item style="margin-bottom:25px" prop="applyContactName">
              <pl-input
                required
                label="参会联系人"
                v-model="form.applyContactName"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item style="margin-bottom:25px" prop="applyContactPhone">
              <pl-input
                required
                label="参会联系手机"
                v-model="form.applyContactPhone"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> </el-row>
        <el-form-item style="margin-bottom:25px" prop="memo">
          <pl-input
            type="textarea"
            label="备注（1000字符）"
            v-model="form.memo"
          ></pl-input>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <div id="addPositionBtn">
        <pl-button @click="applyJobFair($event)">确认添加</pl-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PlMap from '@/components/common/BaseMap';
import { phonePattern } from '@/utils/regexp';
import { queryJobFairPositionInfo, applyJobFair } from '@/api/corporationApi';
export default {
  name: 'ActivityBoxShow',
  components: {
    PlMap
  },
  props: {
    fairInfo: Object,
    default: () => ({
      // meetId: '22',
      // meetName: 'wert',
      // meetIntroduce: '23411',
      // meetType: '1',
      // startTime: '2021-05-11 00:00:00',
      // endTime: '2021-05-29 00:00:00',
      // address: '1234',
      // boothCount: '1234',
      // traffic: '123',
      // mainCorpName: '1234',
      // contactName: '12341',
      // contactPhone: '18818881888',
      // propagandaImage: 'MQ==',
      // districtCode: '05',
      // districtCodeList: ['05'],
      // onTop: '0',
      // releaseStatus: '1',
      // applyStatus: '1',
      // userId: '9000003910',
      // releaseTime: '2021-05-05 15:55:58',
      // endApplyTime: '',
      // meetIdList: []
    })
  },
  data() {
    return {
      online: true,
      offline: false,
      mapDialog: false,
      positsionId: [],
      positionList: [],
      positionDialog: false,
      pointList: ['长宁区就业促进中心(长宁区武夷路517号)'],
      cannotApply: false,
      form: {
        applyContactName: '',
        applyContactPhone: '',
        memo: ''
      },
      rules: {
        applyContactName: [
          {
            required: true,
            message: '请输入参会联系人',
            trigger: ['blur', 'change']
          },
          { max: 10, message: '不得超过10字符', trigger: 'blur' }
        ],
        applyContactPhone: [
          {
            required: true,
            message: '请输入参会联系手机',
            trigger: ['blur', 'change']
          },
          {
            pattern: phonePattern,
            message: '请输入正确格式的手机号码',
            trigger: ['blur', 'change']
          }
        ],
        memo: [{ max: 1000, message: '不得超过1000字符', trigger: 'blur' }]
      }
    };
  },
  methods: {
    showMap() {
      this.pointList = [];
      this.pointList.push(this.fairInfo.address);
      this.mapDialog = true;
    },
    /**
     * 查询职位信息
     */
    queryJobFairPositionList() {
      queryJobFairPositionInfo({
        cid: this.$store.getters['corporation/cid']
      }).then(queryRes => {
        if (queryRes && queryRes.status === 200) {
          this.positionList = queryRes.result.data;
        } else {
          this.positionList = [];
        }
      });
      this.positionDialog = true;
    },
    /**
     * 报名参见招聘会
     */
    applyJobFair(done) {
      if (
        !this.positionList ||
        (this.positionList && !this.positionList.length)
      ) {
        this.$alert('没有选择职位信息，无法添加');
        return;
      }
      this.$refs['bmForm'].validate(valid => {
        if (valid) {
          let params = {
            cid: this.$store.getters['corporation/cid'],
            corpName: this.$store.getters['corporation/username'],
            meetId: this.fairInfo.meetId,
            applyContactName: this.form.applyContactName,
            applyContactPhone: this.form.applyContactPhone,
            memo: this.form.memo,
            positsionId: this.positsionId
          };
          applyJobFair(params).then(applyRes => {
            if (applyRes && applyRes.status === 200) {
              if (!applyRes.result.data?.result) {
                this.$alert(applyRes.result.data.msg);
              } else {
                this.positionDialog = false;
                this.$message({
                  type: 'success',
                  message: '报名成功'
                });
                //禁用按钮
                this.cannotApply = true;
              }
            } else if (applyRes) {
              this.$message({
                type: 'error',
                message: '报名失败'
              });
            }
          });
          done();
        }
      });
    },
    mapHandleClose() {
      this.mapDialog = false;
    },
    positionHandleClose() {
      this.positionDialog = false;
    },
    hadApply() {
      this.$alert('已经报名，无法再次报名');
    }
  }
};
</script>

<style lang="scss" scoped>
.activity-box-module {
  background-color: #ffffff;
  border-bottom: 1px solid #ededed;
  height: 250px;
  padding: 30px 0;
  & > .el-row {
    height: 100%;
    width: 100%;
  }
  img {
    height: 100%;
    width: 100%;
  }

  .line30 {
    line-height: 30px;
  }
  .mat-15 {
    margin-top: 15px;
  }

  .ul-style {
    height: 100%;
    position: relative;
    text-align: left;
    padding-left: 20px;

    .details-info {
      position: absolute;
      bottom: 0;
      left: 20px;
      right: 0;
      .blue-font {
        color: #4766a4;
      }
    }
  }
  .pr {
    height: 100%;
    position: relative;
    .float-div,
    .float-div2 {
      position: absolute;
      top: 10px;
      left: 0;
      padding: 5px 10px;
      border-radius: 0 15px 15px 0;
      font-size: 16px;
      color: #fff;
    }
    .float-div {
      background: rgba(252, 111, 61, 0.9);
    }
    .float-div2 {
      background: rgba(71, 102, 164, 0.9);
    }
  }
  .black-font {
    font-size: 20px;
    color: #000000;
    line-height: 30px;
    .span-line,
    .span-line2 {
      padding: 3px 7px;
      font-size: 16px;
      color: #fff;
      border-radius: 5px;
    }
    .span-line {
      background-color: #fc7a43;
    }
    .span-line2 {
      background-color: #4766a4;
    }
  }
  .gray-font {
    color: #999;
  }

  #addPositionBtn {
    text-align: right;
    padding-right: 20px;
    padding-bottom: 20px;
  }
  ::v-deep .el-checkbox-group {
    margin: 10px;
    label {
      margin: 10px !important;
    }
  }
  .gray-btn {
    background-color: #aaa;
    border-color: #aaa;
  }
}
</style>
