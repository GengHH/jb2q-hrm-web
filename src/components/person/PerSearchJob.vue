<!--
 * @Author: GengHH
 * @Date: 2020-12-21 17:18:03
 * @LastEditTime: 2021-04-23 14:48:02
 * @LastEditors: GengHH
 * @Description: 个人简历界面-子菜单显示组件
 * @FilePath: \jb2q-hrm-web\src\components\person\PerSearchJob.vue
-->
<template>
  <!-- S 信息部分 -->
  <div>
    <!-- <div class="div-box bg-gray" v-if="jobData.length">
      <el-checkbox v-model="checkAll" @change="handleCheckAllChange"
        >全选</el-checkbox
      >
      <span class="favorite"
        ><i class="el-icon-star-off" @click.stop="allStarAction"></i>收藏</span
      >
    </div> -->
    <!-- <div class="div-box padd0">
      <el-row>
        <el-col :span="1" class="mat-15">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          ></el-checkbox>
        </el-col>
        <el-col :span="10">
          <div class="infor-module">
            <p class="name-infor font-or">
              项目经理 <i class="i-style">介</i> <span>12k-18k</span>
            </p>
            <p class="span-infor">
              <span>上海</span>
              <el-divider direction="vertical"></el-divider>
              <span>本科</span>
              <el-divider direction="vertical"></el-divider>
              <span>全职</span>
              <el-divider direction="vertical"></el-divider>
              <span>经验1~2年</span>
              <el-button type="primary" class="gray-btn"
                ><i class="el-icon-chat-dot-round"></i> 立即沟通</el-button
              >
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <p class="time-p sixteen-opacity">
            万达信息股份有限公司
            <img class="ico_rz" src="../../assets/images/ico_rz.png" alt="" />
          </p>
          <p class="span-infor">
            <span>移动互联网</span>
            <el-divider direction="vertical"></el-divider>
            <span>股份</span>
            <el-divider direction="vertical"></el-divider>
            <span>10000人以上</span>
          </p>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" class="release-btn">
            <i class="el-icon-position"></i>投递</el-button
          >
          <el-button type="primary" class="white-btn"
            ><i class="el-icon-star-off"></i> 收藏</el-button
          >
        </el-col>
      </el-row>
      <div class="foot-span">
        <el-col :span="11">
          <span class="fourteen-opacity marl-65">招聘人数 <i>8</i>人</span>
        </el-col>
        <el-col :span="8">
          <span class="fourteen-opacity"
            >发布机构：上海某某职业代理有限公司</span
          >
        </el-col>
        <el-col :span="5">
          <span class="fourteen-opacity">发布时间：2020-11-06</span>
        </el-col>
      </div>
    </div>
    <div class="div-box padd0">
      <el-row>
        <el-col :span="1" class="mat-15">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          ></el-checkbox>
        </el-col>
        <el-col :span="10">
          <div class="infor-module">
            <p class="name-infor font-or">
              项目经理 <i class="bl-bg i-style">见习</i> <span>12k-18k</span>
            </p>
            <p class="span-infor">
              <span>上海</span>
              <el-divider direction="vertical"></el-divider>
              <span>本科</span>
              <el-divider direction="vertical"></el-divider>
              <span>全职</span>
              <el-divider direction="vertical"></el-divider>
              <span>经验1~2年</span>
              <el-button type="primary" class="gray-btn"
                ><i class="el-icon-chat-dot-round"></i> 立即沟通</el-button
              >
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <p class="time-p sixteen-opacity">
            万达信息股份有限公司
            <img class="ico_rz" src="../../assets/images/ico_rz.png" alt="" />
          </p>
          <p class="span-infor">
            <span>移动互联网</span>
            <el-divider direction="vertical"></el-divider>
            <span>股份</span>
            <el-divider direction="vertical"></el-divider>
            <span>10000人以上</span>
          </p>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" class="release-btn" @click="selectJob">
            <i class="el-icon-position"></i>投递</el-button
          >
          <el-button type="primary" class="white-btn" @click="favorJob"
            ><i class="el-icon-star-off"></i> 收藏</el-button
          >
        </el-col>
      </el-row>
      <div class="foot-span">
        <el-col :span="19">
          <span class="fourteen-opacity marl-65">招聘人数 <i>8</i>人</span>
        </el-col>
        <el-col :span="5">
          <span class="fourteen-opacity">发布时间：2020-11-06</span>
        </el-col>
      </div>
    </div> -->
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
              @click="showJobDetial(index, jobItem.positionId)"
            >
              <span class="positionName"> {{ jobItem.positionName }} </span>
              <i class="bl-bg i-style">见习</i>
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
              <el-button
                type="primary"
                class="gray-btn"
                @click="callPositionCorp(jobItem.positionId)"
                ><i class="el-icon-chat-dot-round"></i> 立即沟通</el-button
              >
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <p class="time-p sixteen-opacity">
            {{ jobItem.corpName }}
            <img class="ico_rz" src="../../assets/images/ico_rz.png" alt="" />
          </p>
          <p class="span-infor">
            <span>A移动互联网</span>
            <el-divider direction="vertical"></el-divider>
            <span>A股份</span>
            <!-- <el-divider direction="vertical"></el-divider>
            <span>A10000人以上</span> -->
          </p>
        </el-col>
        <el-col :span="5" class="text-right">
          <el-button
            type="primary"
            class="release-btn"
            @click="selectJob(index, jobItem.positionId)"
          >
            <i class="el-icon-position"></i>投递</el-button
          >
          <el-button
            type="primary"
            class="white-btn job-bar-btn"
            @click="favorJob(jobItem.favor, index, jobItem.positionId)"
          >
            <i v-if="jobItem.favor" class="el-icon-star-on">已收藏</i>
            <i v-else class="el-icon-star-off">收藏</i>
          </el-button>
        </el-col>
      </el-row>
      <div class="foot-span">
        <el-col :span="1"> </el-col>
        <el-col :span="18">
          <span class="fourteen-opacity marl-65"
            >招聘人数 <i>{{ jobItem.recruitNum }}</i
            >人</span
          >
        </el-col>
        <el-col :span="5" class="text-right">
          <span class="fourteen-opacity"
            >发布时间：{{ jobItem.releaseTime }}</span
          >
        </el-col>
      </div>
    </div>
    <!-- 分页器 -->
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
    }
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      currentPage: 0,
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
      if (this.$parent.queryJobs) {
        this.$parent.queryJobs(this.$parent.queryParams.positionName);
      }
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      if (this.$parent.queryJobs) {
        this.$parent.queryJobs(this.$parent.queryParams.positionName);
      }
    },
    handlePrevClick(currentPage) {
      this.currentPage = currentPage;
      if (this.$parent.queryJobs) {
        this.$parent.queryJobs(this.$parent.queryParams.positionName);
      }
    },
    handleNextClick(currentPage) {
      this.currentPage = currentPage;
      if (this.$parent.queryJobs) {
        this.$parent.queryJobs(this.$parent.queryParams.positionName);
      }
    },
    selectJob(index, positionId) {
      //投递简历
      this.$confirm('确认向该职位投递简历？')
        .then(() => {
          this.$emit('deliveryResume', index, positionId); //通知父组件改变。
        })
        .catch(err => {
          console.log(err);
        });
    },
    favorJob(favor, index, positionId) {
      //收藏或者取消收藏职位
      let str = favor ? '确认取消收藏该职位？' : '确认收藏该职位？';
      this.$confirm(str)
        .then(() => {
          this.$emit('favorJob', index, positionId, favor);
        })
        .catch(err => {
          console.log(err);
        });
    },
    allStarAction(event) {
      console.log(event);
    },
    handleCheckAllChange() {},
    showJobDetial(index, positionId) {
      this.$emit('showJobDetials', index, positionId);
    },
    callPositionCorp(index, positionId) {
      this.$emit('callPositionCorp', index, positionId);
      this.$alert('暂时无法进行沟通');
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
    background-color: #8b614d;
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
  .gray-btn,
  .gray-btn:hover {
    color: #fc6f3d;
    background-color: transparent;
    border-color: #d1d1d1;
    padding: 3px 10px;
    border-radius: 20px;
  }
}
#jobListpager {
  display: inline-block;
  width: 100%;
}
</style>
