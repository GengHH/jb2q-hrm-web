<template>
  <div id="indexBody">
    <!-- 区县 -->
    <el-row>
      <el-col :sm="3" :md="2" :lg="2" :xl="1" style="padding: 10px;">
        区县：</el-col
      >
      <el-col :sm="21" :md="22" :lg="22" :xl="23">
        <el-radio-group v-model="qx" size="medium">
          <el-radio-button
            :label="item.value"
            v-for="(item, index) in dicQx"
            :key="index"
            >{{ item.label }}</el-radio-button
          >
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- 排序 -->
    <el-row>
      <el-col :sm="3" :md="2" :lg="2" :xl="1" style="padding: 10px;">
        排序：</el-col
      >
      <el-col :sm="21" :md="22" :lg="22" :xl="23">
        <el-radio-group v-model="order" size="medium">
          <el-radio-button label="1">默认</el-radio-button>
          <el-radio-button label="2">最新</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>

    <!-- 展示栏 -->
    <el-row :gutter="20">
      <el-col
        :sm="24"
        :md="12"
        :lg="8"
        :xl="6"
        v-for="(item, index) in fairInfo"
        :key="index"
      >
        <pl-flipper
          class="card"
          width="100%"
          height="300px"
          :flipped="item.isFlipped"
          @mouseenter="item.isFlipped = !item.isFlipped"
          @mouseleave="item.isFlipped = !item.isFlipped"
        >
          <div class="card__pattern" slot="front">
            <img
              class="fair-img"
              src="../../../assets/img/img04.png"
              alt="未加载"
            />
          </div>
          <div class="card__face" slot="back">
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
              <span class="gray-font"> 主办单位：</span>{{ item.mainCorpName }}
            </p>
            <p class="line30">
              <span class="gray-font"> 联系人：</span>{{ item.contactName }}
            </p>
            <p class="line30">
              <span class="gray-font"> 联系电话：</span>{{ item.contactPhone }}
            </p>
            <p class="line30">
              <span class="gray-font"> 招聘地点：</span>{{ item.address }}
              <span class="blue-font" style="color:#7386f1">
                <i class="icon iconfont">&#xe654;</i>
                <span @click="showMap">附近交通</span></span
              >
            </p>
          </div>
        </pl-flipper>
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
  </div>
</template>

<script>
import PlMap from '@/components/common/BaseMap';
import { queryJobFairList } from '@/api/personApi';
import plFlipper from '@/components/common/BaseFlipper.vue';
export default {
  name: 'personApp',
  components: {
    plFlipper,
    PlMap
  },
  data() {
    return {
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
        },
        {
          id: '2',

          isFlipped: false
        },
        {
          id: '11',
          isFlipped: false
        },
        {
          id: '12',

          isFlipped: false
        },
        {
          id: '21',
          isFlipped: false
        },
        {
          id: '22',

          isFlipped: false
        }
      ],
      rules: {
        livingArea: [
          { required: true, message: '请输入居住区域', trigger: 'blur' }
        ],
        livingStreet: [
          { required: true, message: '请输入居住街镇', trigger: 'blur' }
        ],
        livingAddress: [
          { required: true, message: '请输入联系地址', trigger: 'blur' }
        ],
        livingAddressTest: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      dicQx: this.$store.getters['dictionary/ggjbxx_qx'],
      dicXb: [
        { value: '1', label: '男' },
        { value: '2', label: '女' }
      ],
      dicZjlx: [
        { value: '01', label: '身份证' },
        { value: '02', label: '护照' }
      ]
    };
  },
  computed: {
    // jobFaieList: function() {
    //   return this.fairInfo ? this.fairInfo.slice(0, 3) : [];
    // }
  },
  created() {
    this.query();
  },
  methods: {
    showFairInfo(meetId) {
      console.log(meetId);
    },
    /**
     *  查询招聘会信息
     */
    query() {
      let params = {
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
  .el-col {
    margin: 10px 0;
  }
  .fair-img {
    width: 100%;
    height: 100%;
  }
  ::v-deep .el-radio-button__inner {
    border: 0px;
  }
}
</style>

<style lang="scss">
.card {
  &__face,
  &__pattern {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(rgb(61, 61, 61), 0.35);
    cursor: pointer;
  }
  // &__face {
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: space-between;
  //   height: 100%;
  //   padding: 15px;
  // }
  p {
    padding: 0px 10px;
  }
  .fair-title {
    font-size: 16px;
    font-weight: 800;
    // margin: 20px 0;
    padding: 20px 10px;
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
  .gray-font {
    color: #999;
  }
  .line30 {
    line-height: 30px;
  }
}
</style>
