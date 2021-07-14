<!--
 * @Author: GengHH
 * @Date: 2020-12-21 17:18:03
 * @LastEditTime: 2021-07-14 18:26:19
 * @LastEditors: GengHH
 * @Description: 个人简历界面-子菜单显示组件
 * @FilePath: \jb2q-hrm-web\src\components\index\IndexSearchJob.vue
-->
<template>
  <!-- S 信息部分 -->
  <div>
    <!-- for everyone -->
    <div class="div-box padd0" v-for="(jobItem, index) in jobData" :key="index">
      <el-row>
        <el-col :span="1" class="mat-15">
          <!-- <el-checkbox
            v-model="checkAll"
            @change="handleCheckAllChange"
          ></el-checkbox> -->
        </el-col>
        <el-col :span="10">
          <div class="infor-module">
            <p
              class="name-infor font-or"
              @click="showJobDetial(index, jobItem.positionId, jobItem.recId)"
            >
              <span class="positionName"> {{ jobItem.positionName }} </span>
              <!-- <i class="bl-bg i-style" v-if="jobItem.workNature === '03'">见习</i> -->
              <i
                class="bl-bg i-style jx-style"
                v-if="jobItem.tranBaseSymbol === '1'"
                >见习</i
              >
              <i
                class="bl-bg i-style jz-style"
                v-if="jobItem.recruitType === '2'"
                ><img
                  src="../../assets/images/zhijie.png"
                  alt=""
                  style="width: 1.5em;display: inline-block;"
              /></i>
              <i
                class="bl-bg i-style rl-style"
                v-if="jobItem.agencyRecruit === '1'"
                >人力</i
              >
              <span>{{ jobItem.salaryMin }}- {{ jobItem.salaryMax }}</span>
            </p>
            <p class="span-infor">
              <span>上海{{ jobItem.workAreaText }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ jobItem.eduRequireText }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ jobItem.workNatureText }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ Number(jobItem.workYearNeed) }}年</span>
              <!-- <el-button
                type="primary"
                class="call-btn"
                @click="callPositionCorp(index, jobItem.corpId)"
                ><i class="el-icon-chat-dot-round"></i> 立即沟通</el-button
              > -->
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <p class="time-p sixteen-opacity">
            {{ jobItem.corpName }}
            <img
              class="ico_rz"
              src="../../assets/images/ico_rz.png"
              alt=""
              style="height: .9em;"
            />
          </p>
          <p class="span-infor">
            <span>{{ jobItem.industryTypeText }}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ jobItem.corpNatureText }}</span>
            <!-- <el-divider direction="vertical"></el-divider>
            <span>A10000人以上</span> -->
          </p>
        </el-col>
        <el-col :span="5" class="text-right">
          <!-- 投递按钮 -->
          <!-- <el-button
            v-if="jobItem.applyFor"
            type="primary"
            class="gray-btn job-bar-btn"
            @click="
              selectJob(
                jobItem.applyFor,
                index,
                jobItem.positionId,
                jobItem.recId
              )
            "
          >
            <i class="el-icon-position">已投递</i></el-button
          >
          <el-button
            v-if="!jobItem.applyFor"
            type="primary"
            class="white-btn job-bar-btn"
            @click="
              selectJob(
                jobItem.applyFor,
                index,
                jobItem.positionId,
                jobItem.recId
              )
            "
          >
            <i class="el-icon-position">投递</i></el-button
          > -->
          <!-- 收藏按钮 -->
          <!-- <el-button
            v-if="jobItem.favor"
            type="primary"
            class="gray-btn job-bar-btn"
            @click="
              favorJob(jobItem.favor, index, jobItem.positionId, jobItem.recId)
            "
          >
            <i class="el-icon-star-on">已收藏</i>
          </el-button>
          <el-button
            v-if="!jobItem.favor"
            type="primary"
            class="white-btn job-bar-btn"
            @click="
              favorJob(jobItem.favor, index, jobItem.positionId, jobItem.recId)
            "
          >
            <i class="el-icon-star-off">收藏</i>
          </el-button> -->
          <el-button
            type="primary"
            class="white-btn job-bar-btn"
            @click="showJobDetial(index, jobItem.positionId, jobItem.recId)"
          >
            <i class="el-icon-view">职位详情</i></el-button
          >
        </el-col>
      </el-row>
      <div class="foot-span">
        <el-col :span="1"> </el-col>
        <el-col :span="10">
          <span class="fourteen-opacity marl-65"
            >招聘人数 <i>{{ jobItem.recruitNum }}</i
            >人</span
          >
        </el-col>
        <el-col :span="8">
          <span
            v-if="jobItem.recruitType === '2'"
            class="fourteen-opacity jz-font-style"
            ><span class="gray-font">发布机构：</span
            ><i>{{
              jobItem.districtCodeText
                ? jobItem.districtCodeText + '就业促进中心'
                : '未知'
            }}</i></span
          >

          <span
            v-if="jobItem.agencyRecruit === '1'"
            class="fourteen-opacity rl-font-style"
            ><span class="gray-font">委托代招：</span
            ><i>{{ jobItem.entrustCorpName }}</i></span
          >
        </el-col>
        <el-col
          v-if="jobItem.recruitType === '2' || jobItem.agencyRecruit === '1'"
          :span="5"
          class="text-right"
        >
          <span class="fourteen-opacity"
            ><span class="gray-font">发布时间：</span
            >{{ jobItem.releaseTime }}</span
          >
        </el-col>
        <el-col v-else :span="5">
          <span class="fourteen-opacity"
            ><span class="gray-font">发布时间：</span
            >{{ jobItem.releaseTime }}</span
          >
        </el-col>
      </div>
    </div>
    <!-- 分页器 （基本上都是采用后端分页）-->
    <el-pagination
      id="jobListpager"
      v-show="showPager"
      v-bind="pageAttrs"
      :class="pagerClass"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
      :current-page="currentPage"
      :total="totalCount"
    >
    </el-pagination>
  </div>
  <!-- E 信息部分 -->
</template>

<script>
/**
 * 个人简历界面-子菜单显示组件
 */
// import { doDeliveryResume, doFavorJobs } from '@/api/personApi';
export default {
  name: 'PerSearchJob',
  props: {
    showPager: {
      type: Boolean,
      default: false
    },
    pagerClass: {
      type: String,
      default: 'peger-center'
    },
    jobData: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    callBackFuncName: {
      type: String,
      default: 'queryJobs'
    }
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      currentPage: 1,
      pageSize: 10
    };
  },
  updated() {
    // 更新滚动条
    $('#indexApp')
      .getNiceScroll()
      .resize();
  },
  computed: {
    pageAttrs() {
      return {
        ...this.$PlElement?.pageConfig,
        ...this.pageConfig
      };
    },
    pageTableData() {
      //前端分页实现逻辑
      return this.showPager
        ? this.jobData.slice(
            (this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize
          )
        : this.jobData;
    },
    totalCount() {
      return this.total ? this.total : this.jobData.length;
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (this.$parent.$parent.$parent[this.callBackFuncName]) {
        this.$parent.$parent.$parent[this.callBackFuncName](
          this.$parent.$parent.$parent?.queryParams?.positionName
        );
      } else {
        this.$emit('changePage');
      }
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      if (this.$parent.$parent.$parent[this.callBackFuncName]) {
        this.$parent.$parent.$parent[this.callBackFuncName](
          this.$parent.$parent.$parent?.queryParams?.positionName
        );
      } else {
        this.$emit('changePage');
      }
    },
    handlePrevClick(currentPage) {
      this.currentPage = currentPage;
      if (this.$parent.$parent.$parent[this.callBackFuncName]) {
        this.$parent.$parent.$parent[this.callBackFuncName](
          this.$parent.$parent.$parent?.queryParams?.positionName
        );
      } else {
        this.$emit('changePage');
      }
    },
    handleNextClick(currentPage) {
      this.currentPage = currentPage;
      if (this.$parent.$parent.$parent[this.callBackFuncName]) {
        this.$parent.$parent.$parent[this.callBackFuncName](
          this.$parent.$parent.$parent?.queryParams?.positionName
        );
      } else {
        this.$emit('changePage');
      }
    },
    selectJob(applyFor, index, positionId, recId) {
      if (applyFor) {
        this.$alert('已向改职位投递过简历，无法再次投递');
        return;
      }
      //投递简历
      this.$confirm('确认向该职位投递简历？')
        .then(() => {
          this.$emit('deliveryResume', index, positionId, recId); //通知父组件改变。
        })
        .catch(err => {
          console.log(err);
        });
    },
    favorJob(favor, index, positionId, recId) {
      //收藏或者取消收藏职位
      let str = favor ? '确认取消收藏该职位？' : '确认收藏该职位？';
      this.$confirm(str)
        .then(() => {
          this.$emit('favorJob', index, positionId, favor, recId);
        })
        .catch(err => {
          console.log(err);
        });
    },
    allStarAction(event) {
      console.log(event);
    },
    handleCheckAllChange() {},
    showJobDetial(index, positionId, recId) {
      this.$emit('showJobDetials', index, positionId, recId);
    },
    callPositionCorp(index, corpId) {
      //和单位聊天
      this.$emit('callPositionCorp', index, corpId);
    }
  }
};
</script>

<style lang="scss" scoped>
.div-box {
  padding: 15px 18px;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  margin-bottom: 16px;
  .positionName {
    font-size: 20px;
  }
  .positionName:hover {
    cursor: pointer;
  }
  .favorite {
    float: right;
    font-size: 14px;
    color: #000;
    margin-top: 3px;
    i {
      cursor: pointer;
      color: #fc7540;
      font-size: 18px;
    }
  }
  .foot-span {
    height: 32px;
    line-height: 32px;
    background-color: #f6f6f6;
  }
  .job-bar-btn {
    min-width: 100px;
  }
  .i-style {
    font-size: 14px;
    color: #fff;
    padding: 2px 5px;
    border-radius: 4px;
  }
  .jx-style {
    background-color: #8b614d;
  }
  // .jz-style {
  //   background-color: #3f51b5;
  // }
  .rl-style {
    background-color: #03a9f4;
  }
  .jz-font-style {
    color: #3f51b5;
  }
  .rl-font-style {
    color: #03a9f4;
  }
}
.bg-gray {
  background: #f7f7f7;
  margin-top: 16px;
}
.padd0 {
  padding: 0;
  .el-row {
    padding: 15px 18px;
  }
}
.marl-65 {
  margin-left: 65px;
}
.ico_rz {
  display: inline-block;
}
.span-infor {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 15px;
  .call-btn {
    color: #fc6f3d;
    background-color: transparent;
    border-color: #fc6f3d;
    padding: 3px 10px;
    border-radius: 20px;
  }
  .call-btn:hover {
    color: #fff;
    background-color: #fc6f3d;
  }
}
#jobListpager {
  display: inline-block;
  width: 100%;
}
.gray-font {
  color: #999;
}
</style>
