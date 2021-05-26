<template>
  <div id="indexBody">
    <el-row :gutter="40" class="fair-box">
      <el-col :span="12" style="padding: 10px;" class="img-box">
        <img
          v-if="item.propagandaImage || item.propagandaImage === ''"
          class="fair-img"
          :src="'data:image/jpg;base64,' + item.propagandaImage"
          @error="defImg"
          alt="未加载"
        />
      </el-col>
      <el-col :span="12">
        <!-- <b class="fair-title">2020高校毕业生全国网络联合招聘 </b> -->
        <p class="fair-title">
          <b>{{ item.meetName }}</b>
          <span
            v-if="item.meetType === '1' || item.meetType === '2'"
            class="span-line"
            >线上</span
          >
          <span v-if="item.meetType === '2'" class="span-line2">线下</span>
        </p>
        <p class="line30">
          <span class="orange-font"> <i class="el-icon-time"></i></span>
          {{ item.startTime }}
          至
          {{ item.endTime }}
        </p>
        <p class="line30">
          <span class="gray-font"
            ><i class="el-icon-office-building"></i> 主办单位：</span
          >{{ item.mainCorpName }}
        </p>
        <p class="line30">
          <span class="gray-font"> <i class="el-icon-user"></i> 联系人：</span
          >{{ item.contactName }}
        </p>
        <p class="line30">
          <span class="gray-font"
            ><i class="el-icon-phone-outline"></i> 联系电话：</span
          >{{ item.contactPhone }}
        </p>
        <p class="line30">
          <span class="gray-font">
            <i class="el-icon-location-outline"></i> 招聘地点：</span
          >{{ item.address }}
          <span class="blue-font" style="color:#7386f1">
            <i class="icon iconfont">&#xe654;</i>
            <span @click="showMap">附近交通</span></span
          >
        </p>
      </el-col>
    </el-row>
    <!-- 公司和职位信息 -->
    <el-tabs
      id="jobInfoGloriette"
      v-model="activeName"
      @tab-click="jobHandleClick"
    >
      <el-tab-pane label="招聘公司" name="corporation">
        <!-- <FairBoxShow v-for="index in showList" :key="index.id"></FairBoxShow> -->
        <el-input
          placeholder="请输入公司名称进行检索"
          prefix-icon="el-icon-search"
          v-model="input1"
        >
        </el-input>
        <div class="no-data">暂无数据</div>
      </el-tab-pane>
      <el-tab-pane label="招聘职位" name="position">
        <!-- <FairBoxShow v-for="index in showList" :key="index.id"></FairBoxShow> -->
        <el-input
          placeholder="请输入职位名称进行检索"
          prefix-icon="el-icon-search"
          v-model="input2"
        >
        </el-input>
        <div class="no-data">暂无数据</div>
      </el-tab-pane>
    </el-tabs>
    <!-- <el-button id="listMore" class="more-btn white-btn" @click="showMore"
      >加载更多</el-button
    > -->
    <!-- 地图弹框 -->
    <el-dialog
      class="width75 dialog-content-full-screen"
      :visible.sync="mapDialog"
      :before-close="mapHandleClose"
    >
      <pl-map :pointList="pointList"></pl-map>
    </el-dialog>
  </div>
</template>

<script>
import PlMap from '@/components/common/BaseMap';
// import { queryJobFairList } from '@/api/personApi';
import { queryJobFairList } from '@/api/corporationApi';
export default {
  name: 'personApp',
  components: {
    PlMap
  },
  data() {
    return {
      defaultImg: require('@/assets/images/break-img.svg'),
      activeName: 'corporation',
      input1: '',
      input2: '',
      qx: '',
      order: '1',
      mapDialog: false,
      pointList: ['长宁区就业促进中心(长宁区武夷路517号)'],
      totalCount: 0,
      fairInfo: [
        {
          id: '1',
          isFlipped: false,
          mainCorpName: '中国是大法官到时sdfsdfsdfsdf代光华a',
          contactName: '张三',
          contactPhone: '13333343434',
          address: '中国是大法官到时代光华a（防守打法胜多负少）',
          meetType: '1'
        }
      ],
      item: {
        meetId: '3',
        meetName: '招聘会名称测试12222',
        meetIntroduce: '招聘会名称',
        meetType: '1',
        startTime: '2021-04-25 00:00:00',
        endTime: '2021-04-30 00:00:00',
        address: '天山路1800号',
        boothCount: '60',
        traffic: '地铁2，3，4，15号线',
        mainCorpName: '万达信息',
        contactName: '令狐冲',
        contactPhone: '123123122312',
        propagandaImage: 'MQ==',
        districtCode: '06,09',
        onTop: '1',
        releaseStatus: '1',
        applyStatus: '1',
        userId: '-1        ',
        releaseTime: '2021-04-28 15:13:27',
        endApplyTime: '',
        meetIdList: []
      },
      dicQx: this.$store.getters['dictionary/ggjbxx_qx']
    };
  },
  computed: {},
  created() {
    //根据url上的参数查询职位信息
    console.log(this.$route.query);
    if (this.$route.query && Object.keys(this.$route.query).length > 0) {
      let query = this.$route.query;
      this.findFairDetail();
    }
  },
  methods: {
    jobHandleClick() {},
    /**
     *  懒加载信息
     */
    showMore() {},
    /**
     *  查询指定的某个招聘会具体信息
     */
    findFairDetail() {
      return;
      let params = {
        pageIndex: 0,
        pageSize: 12
        //pageIndex: this.$refs.page.currentPage - 1 || 0,
        //pageSize: this.$refs.page.pageSize,
        //date: this.date,
        //address: this.address,
        //type: this.type
      };
      queryJobFairList(params).then(queryRes => {
        console.log(queryRes);
        if (queryRes && queryRes.status === 200) {
          this.totalCount = queryRes.result.pageresult.total || 0;
          queryRes.result.pageresult.data.forEach(i => {
            i.isFlipped = false;
          });
          this.fairInfo = queryRes.result.pageresult.data || [];
          if (
            !this.totalCount ||
            (this.totalCount && Number(this.totalCount) === 0)
          ) {
            this.$message({ type: 'success', message: '未查询到结果' });
          }
        } else if (queryRes) {
          this.$message({ type: 'error', message: '查询失败' });
        }
      });
    },
    /**
     * 展示地图
     */
    showMap() {
      // this.pointList = [];
      // this.pointList.push(this.fairInfo.address);
      this.mapDialog = true;
    },
    mapHandleClose() {
      this.mapDialog = false;
    },
    /**
     * 查看招聘会详情
     */
    showFairDetails() {},
    /**
     * 定义加载不到图片时显示默认图片
     */
    defImg(event) {
      let img = event.target;
      img.src = this.defaultImg;
      img.onerror = null; //防止闪图
    }
  }
};
</script>

<style lang="scss" scoped>
#indexBody {
  width: 90%;
  min-height: 100%;
  //max-width: 1360px;
  margin: 0 auto;
  padding-top: 60px;
  background-color: $g-white-color;
  .fair-box {
    //min-height: 300px;
    margin-bottom: 20px;
    .el-col {
      height: 300px;
      //margin: 10px 0;
      height: 100%;
    }
  }
  .img-box {
    background-color: rgba(235, 231, 231, 0.4);
    .fair-img {
      //width: 100%;
      margin: 0 auto;
      height: 100%;
    }
  }

  ::v-deep .el-radio-button__inner {
    border: 0px;
  }
  .back-divider {
    width: 100%;
    margin: 10px 0;
    position: absolute;
    bottom: 30px;
  }
  .back-detail-btn {
    position: absolute;
    display: block;
    width: 100%;
    bottom: 0;
    color: #999;
    &:hover {
      color: #fc7a43;
    }
  }
  .fair-title {
    font-size: 20px;
    font-weight: 800;
    // margin: 20px 0;
    padding: 20px 0;
    line-height: 30px;
    b {
      font-family: 宋体, Arial, Verdana, sans-serif;
      font-size: 20px;
      font-weight: 800;
    }
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

  #listMore {
    //width: 100%;
    display: block;
    margin: 20px auto;
  }
  .orange-font {
    color: #fc7a43;
  }
  .gray-font {
    color: #999;
  }
  .line30 {
    line-height: 30px;
  }
}
.no-data {
  width: 100%;
  margin: 100px 0;
  text-align: center;
}
</style>
