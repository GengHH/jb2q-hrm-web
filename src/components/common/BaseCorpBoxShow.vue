<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-14 14:17:49
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\components\common\BaseCorpBoxShow.vue
-->
<template>
  <div class="module-two clearfix" @click="showCorpDetails">
    <!-- <img
      v-if="corpBoxInfoObj.zl"
      src="../../assets/images/zhilianLogo.png"
      alt=""
    /> -->
    <div v-if="corpBoxInfoObj.zl">
      <img
        v-if="corpBoxInfoObj.propagandaImage"
        :src="'data:image/jpg;base64,' + corpBoxInfoObj.propagandaImage"
        @error="defImg"
        alt="未加载"
      />
      <img v-else :src="defaultImg" alt="未加载" />
    </div>
    <!-- <img v-else src="../../assets/images/logos.png" alt="" /> -->
    <div v-else>
      <img
        v-if="corpBoxInfoObj.propagandaImage"
        :src="'data:image/jpg;base64,' + corpBoxInfoObj.propagandaImage"
        @error="defImg"
        alt="未加载"
      />
      <img v-else :src="defaultImg" alt="未加载" />
    </div>
    <p class="font-eighteen mat-15 long-text" v-if="corpBoxInfoObj.zl">
      智联招聘
    </p>
    <p class="font-eighteen mat-15 long-text" v-else>
      {{ corpBoxInfoObj.corpName }}
    </p>
    <p class="span-infor">
      <span>{{ corpBoxInfoObj.corpNatureText }}</span>
      <el-divider direction="vertical"></el-divider>
      <span>?人</span>
      <el-divider direction="vertical"></el-divider>
      <span>{{ corpBoxInfoObj.industryTypeText }}</span>
    </p>
    <span class="span-btn mat-15"><i class="or-font">?</i> 个在招职位</span>
  </div>
</template>

<script>
/**
 * 首页显示单位信息组件
 */
export default {
  name: 'BaseCorpBoxShow',
  props: {
    corpBoxInfoObj: Object,
    default: () => {}
  },
  data() {
    return {
      defaultImg: require('@/assets/images/break-img.svg')
    };
  },
  methods: {
    /**
     * 定义加载不到图片时显示默认图片
     */
    defImg(event) {
      let img = event.target;
      img.src = this.defaultImg;
      img.onerror = null; //防止闪图
    },
    /**
     * 定义加载不到图片时显示默认图片
     */
    showCorpDetails() {
      if (!this.corpBoxInfoObj.cid) {
        this.$alert('无法获取职位详细信息');
      } else {
        this.$router.push({
          path: '/corpDetails',
          query: {
            id: this.corpBoxInfoObj.cid
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.module-two {
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  background: #fff;
  padding: 22px;
  text-align: center;
  &:hover {
    border: 1px solid #fc6f3d;
  }
  img {
    display: inline-block;
  }
  .mat-15 {
    margin-top: 15px;
  }

  .font-eighteen {
    font-size: 18px;
    color: #000000;
  }

  .span-infor {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
    margin-top: 15px;
    .el-divider--vertical {
      display: inline-block;
      width: 1px;
      height: 1em;
      margin: 0 8px;
      vertical-align: middle;
      position: relative;
    }
  }

  .span-btn {
    padding: 8px 25px;
    border: 1px solid #dddddd;
    display: inline-block;
    color: #666;
    .or-font {
      color: #fda749;
    }
  }
}
// .clearfix {
//   zoom: 1;
// }
</style>
