<template>
  <div>
    <!-- <router-view></router-view> -->
    <div id="indexBody">
      <!--S 专栏部分 -->
      <div class="middle-box white-bg ">
        <el-row>
          <el-col :span="12" class="act-img-box">
            <!-- <img width="100%" src="../../../assets/img/img02.png" alt="" /> -->
            <img
              v-if="
                activityItem.propagandaImage ||
                  activityItem.propagandaImage === ''
              "
              class="activity-img"
              :src="'data:image/jpg;base64,' + activityItem.propagandaImage"
              @error="defImg"
              alt="未加载"
            />
            <div
              v-if="activityItem.actType === '01'"
              class="activity-type activity-type-one"
            >
              <i class="circle-sty"></i
              >{{
                getDicText(
                  $store.getters['dictionary/recruit_special_activity_type'],
                  activityItem.actType
                )
              }}
            </div>
            <div
              v-if="activityItem.actType === '02'"
              class="activity-type activity-type-two"
            >
              <i class="circle-sty"></i
              >{{
                getDicText(
                  $store.getters['dictionary/recruit_special_activity_type'],
                  activityItem.actType
                )
              }}
            </div>
            <div
              v-if="activityItem.actType === '03'"
              class="activity-type activity-type-three"
            >
              <i class="circle-sty"></i
              >{{
                getDicText(
                  $store.getters['dictionary/recruit_special_activity_type'],
                  activityItem.actType
                )
              }}
            </div>
            <div
              v-if="activityItem.actType === '04'"
              class="activity-type activity-type-four"
            >
              <i class="circle-sty"></i
              >{{
                getDicText(
                  $store.getters['dictionary/recruit_special_activity_type'],
                  activityItem.actType
                )
              }}
            </div>
            <div
              v-if="activityItem.actType === '05'"
              class="activity-type activity-type-four"
            >
              <i class="circle-sty"></i
              >{{
                getDicText(
                  $store.getters['dictionary/recruit_special_activity_type'],
                  activityItem.actType
                )
              }}
            </div>
          </el-col>
          <el-col class="ul-style" :span="12">
            <p class="font-size24 line30">
              <!-- 2020上海某银行校园招聘公告解读备考指导特别讲座 -->
              {{ activityItem.actName }}
              <span v-if="activityItem.expertJoin" class="span-line">{{
                activityItem.expertJoin === '1' ? '专家' : '非专家'
              }}</span>
            </p>
            <p class="six-hui  line30 or-font mat-15">
              <i class="icon iconfont six-hui">&#xe651;</i>
              {{ activityItem.actStartTime }} 至
              {{ activityItem.actEndTime }}
            </p>
            <p class="six-hui  line30">
              <i class="icon iconfont">&#xe652;</i> 人数限制 ：{{
                activityItem.selfApplyMax
              }}
              人
            </p>
            <p class="six-hui  line30" v-if="activityItem.expertJoin === '1'">
              <i class="icon iconfont">&#xe652;</i> 参与专家：刘专家 李专家
              张专家
            </p>
            <p class="six-hui  line30">
              <i class="icon iconfont">&#xe650;</i>
              活动地点：长宁区就业促进中心(长宁区武夷路517号)
              {{ activityItem.actAddress }}
              <el-link class="blue-font" :underline="false">
                <i class="icon iconfont">&#xe654;</i>
                <span @click="showMap(activityItem.actAddress)"
                  >附近交通</span
                ></el-link
              >
            </p>
            <p class="six-hui  line30">
              <i class="icon iconfont six-hui">&#xe651;</i> 报名时间：{{
                activityItem.applyStartTime
              }}
              至
              {{ activityItem.applyEndTime }}
            </p>
            <p class="six-hui  line30 mat-15">
              <!-- <el-button class="release-btn font-size18" type="primary"
                ><i class="icon iconfont font-size20">&#xe653;</i>
                去报名</el-button
              > -->
              还剩名额：<i class="or-font">28</i> 个
            </p>
          </el-col>
        </el-row>
      </div>
      <!-- E 专栏部分 -->
      <div class="middle-box">
        <div class="bout-us-box2">
          <!--S 特色专栏部分 -->
          <!-- <div class="tit-box"><span>活动介绍</span></div> -->

          <el-tabs id="jobInfoGloriette" v-model="activeName">
            <el-tab-pane label="活动介绍" name="activity">
              <!-- <p class="t-indent content-font mat-15">
                开学啦！
                开学啦！刚步入大学校园的你，还在为未来而迷茫吗？身处毕业前最后一年的你，还在为工作而担忧吗？脑中拥有无限创意才华的你，还在为无处施展而苦恼吗？年轻er总比别人跑得快！所以等待着你们的也比别人多！相信我，这一次，等待着你的一定是极品装备~
              </p>
              <p class="t-indent content-font">
                应某某人力资源和社会保障局、某某人才服务中心邀请，我司将配合9月18日在某某人才服务中心举办地的毕业生专场招聘会现场安排《专题讲座如何在本次招聘会中被成功录用——心理专家谈面试官招聘心理及应对策略》，讲座邀请资深心理专家为你解读面试主管的心理需求，并现场互动，调适求职心理。
              </p>
              <p class="font-size16 or-font mat-15">讲座时间：</p>
              <p class="t-indent content-font">
                9月18日（周五）10:00—11:30（招聘会时间：9：00—12：00）
              </p>
              <p class="font-size16 or-font mat-15">讲座地点：</p>
              <p class="t-indent content-font">某某人才服务中心</p>
              <p class="font-size16 or-font mat-15">讲座对象：</p>
              <p class="t-indent content-font">
                2009年100多万毕业未就业学生及其他就业困难人员
              </p>
              <p class="font-size16 or-font mat-15">特约讲师：</p>
              <p class="t-indent content-font">
                赵冬杉，男，毕业于中国科学院心理研究所，中国心理培训心理咨询专家，国际传统与现代催眠专业委员会副秘书长，亿铭职业发展俱乐部特约专家。曾被中央电视台、北京电视台、北京电台、北京青年报、中国青少年学习报等多家媒体采访报道。
              </p>
              <p class="font-size16 or-font mat-15">主办：</p>
              <p class="t-indent content-font">某某人力资源和社会保障局</p>
              <p class="t-indent content-font">某某人才服务中心</p>
              <p class="font-size16 or-font mat-15">主要内容：</p>
              <p class="t-indent content-font">
                开学啦！
                开学啦！刚步入大学校园的你，还在为未来而迷茫吗？身处毕业前最后一年的你，还在为工作而担忧吗？脑中拥有无限创意才华的你，还在为无处施展而苦恼吗？年轻er总比别人跑得快！所以等待着你们的也比别人多！相信我，这一次，等待着你的一定是极品装备~
              </p>
              <p class="t-indent content-font">
                应某某人力资源和社会保障局、某某人才服务中心邀请，我司将配合9月18日在某某人才服务中心举办地的毕业生专场招聘会现场安排《专题讲座如何在本次招聘会中被成功录用——心理专家谈面试官招聘心理及应对策略》，讲座邀请资深心理专家为你解读面试主管的心理需求，并现场互动，调适求职心理。
                开学啦！
                开学啦！刚步入大学校园的你，还在为未来而迷茫吗？身处毕业前最后一年的你，还在为工作而担忧吗？脑中拥有无限创意才华的你，还在为无处施展而苦恼吗？年轻er总比别人跑得快！所以等待着你们的也比别人多！相信我，这一次，等待着你的一定是极品装备~
              </p>
              <p class="t-indent content-font">
                应某某人力资源和社会保障局、某某人才服务中心邀请，我司将配合9月18日在某某人才服务中心举办地的毕业生专场招聘会现场安排《专题讲座如何在本次招聘会中被成功录用——心理专家谈面试官招聘心理及应对策略》，讲座邀请资深心理专家为你解读面试主管的心理需求，并现场互动，调适求职心理。
              </p> -->

              {{ activityItem.content }}
              <!--E 特色专栏部分 -->
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
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
import { querySpecialActivityDetail } from '@/api/indexApi';
import { getDicText } from '@/utils';
export default {
  name: 'activityItemDetails',
  components: {
    PlMap
  },
  // props: {
  //   activityItems: Object,
  //   default: {
  //     propagandaImage: '1234',
  //   }
  // },
  data() {
    return {
      defaultImg: require('@/assets/images/break-img.svg'),
      activeName: 'activity',
      actId: '',
      activityItem: { propagandaImage: '' },
      mapDialog: false,
      pointList: ['长宁区就业促进中心(长宁区武夷路517号)']
    };
  },
  methods: {
    showMap(actAddress) {
      if (actAddress) {
        this.pointList = [];
        this.pointList.push(actAddress);
      }
      this.mapDialog = true;
    },
    getDicText(data, value) {
      return getDicText(data, value);
    },
    mapHandleClose() {
      this.mapDialog = false;
    },
    async loadActDetailsInfo() {
      let queryRes = await querySpecialActivityDetail({
        actId: this.actId
      });
      if (queryRes && queryRes.status === 200) {
        // this.$message.success('区·')
        this.activityItem = queryRes.result.data || {};
      } else if (queryRes) {
        // this.activityItem = {};
        this.$message.error('获取活动详细信息失败');
      }
    },
    /**
     * 定义加载不到图片时显示默认图片
     */
    defImg() {
      let img = event.target;
      img.src = this.defaultImg;
      img.onerror = null; //防止闪图
    }
  },
  created() {
    console.log(this.$route.params);
    //根据url上的参数查询职位信息
    if (this.$route.query && Object.keys(this.$route.query).length > 0) {
      this.actId = this.$route.query.activityId;
      //查询单位信息
      this.loadActDetailsInfo();
    }
  }
};
</script>

<style lang="scss" scoped>
#indexBody {
  width: 90%;
  min-height: 100%;
  //max-height:1000px;
  padding-top: 100px;
  margin: 0 auto 150px;
  #activityBox {
    background-color: #fff;
    margin-top: 32px;
    margin-bottom: 50px;
    padding: 40px;
  }
  .middle-box {
    .el-row {
      height: 300px;
      .el-col {
        text-align: left;
        height: 100%;
        img {
          height: 100%;
          margin: 0 auto;
        }
      }
    }
  }
  .act-img-box {
    height: 100%;
    position: relative;
    .activity-type {
      position: absolute;
      top: 10px;
      left: 0;
      padding: 5px 10px;
      border-radius: 0 15px 15px 0;
      font-size: 16px;
      color: #fff;
      &-one {
        background: rgba(255, 152, 0, 0.6);
      }
      &-two {
        background: rgba(3, 169, 244, 0.6);
      }
      &-three {
        background: rgba(0, 150, 136, 0.6);
      }
      &-four {
        background: rgba(153, 153, 153, 0.6);
      }
    }
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
  .padding10 {
    padding: 10px;
    box-sizing: border-box;
  }
  .white-bg {
    background: #fff;
  }
  .ul-style {
    padding-top: 20px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .line30 {
    line-height: 30px;
  }
  .font-size24 {
    font-size: 24px;
  }
  .line30 {
    line-height: 30px;
  }
  .mat-15 {
    margin-top: 15px;
  }
  .font-size16 {
    font-size: 16px;
  }
  .font-size18 {
    font-size: 18px;
  }
  .six-hui {
    font-size: 16px;
    color: #868686;
  }
  .content-font {
    font-size: 14px;
    color: #656565;
    line-height: 34px;
    text-indent: 2em;
  }
  .bout-us-box2 {
    background-color: #fff;
    margin-top: 32px;
    margin-bottom: 50px;
    padding: 25px;
  }
}
</style>
