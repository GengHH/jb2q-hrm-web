<!--
 * @Author: GengHH
 * @Date: 2021-01-28 15:49:10
 * @LastEditors: GengHH
 * @LastEditTime: 2021-01-29 11:32:27
 * @Description: 信息通知显示卡片
 * @FilePath: \jb2q-hrm-web\src\components\common\BaseInfoNotificationCard.vue
-->
<template>
  <el-row class="card-list-row" :gutter="40">
    <el-col
      class="card-list-item"
      :span="8"
      v-for="(item, index) in data"
      :key="index"
    >
      <div class="card green">
        <div class="additional">
          <div class="user-card">
            <span class="type-label">NEW!</span>
            <div class="level center">等级 13</div>
            <div class="points center">HR 刘经理</div>
            <base-svg></base-svg>
          </div>
          <!-- <div class="more-info">
            <h1>Jane Doe</h1>
            <div class="coords">
              <span>Group Name</span><span>Joined January 2019</span>
            </div>
            <div class="coords">
              <span>Position/Role</span><span>City, Country</span>
            </div>
            <div class="stats">
              <div>
                <div class="title">Awards</div>
                <i class="fa fa-trophy"></i>
                <div class="value">2</div>
              </div>
              <div>
                <div class="title">Matches</div>
                <i class="fa fa-gamepad"></i>
                <div class="value">27</div>
              </div>
              <div>
                <div class="title">Pals</div>
                <i class="fa fa-group"></i>
                <div class="value">123</div>
              </div>
              <div>
                <div class="title">Coffee</div>
                <i class="fa fa-coffee"></i>
                <div class="value infinity">∞</div>
              </div>
            </div>
          </div> -->
        </div>
        <div class="general">
          <h3>你好！</h3>
          <p>
            看了你的简历，我们发现你很适合我公司的一些职位，不知可否相互了解一下？
          </p>
          <span class="notice-date">2021-01-11</span>
        </div>
        <div>
          <el-checkbox
            class="card-checkbox"
            v-model="item.checked"
          ></el-checkbox>
        </div>
        <div class="card-btn-group">
          <el-tooltip class="item" effect="dark" content="回复" placement="top">
            <el-button type="info" icon="el-icon-message" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </el-tooltip>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import Vue from 'vue';
// import { Tooltip } from 'element-ui';
// Vue.use(Tooltip);
import BaseSvg from '@/components/common/svg/BaseSvg.vue';
export default {
  name: 'BaseInfoNotificationCard',
  components: { BaseSvg },
  props: {
    data: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      checked: true
    };
  },
  created() {
    //   if (this.data && this.data.length) {
    //     console.log(this.data);
    //     this.data.map((row, rowIndex) => {
    //       //给每一行添加不可枚举属性rowIndex来标识当前行
    //       Object.defineProperty(row, 'rowIndex', {
    //         value: rowIndex,
    //         writable: true
    //         //enumerable: false
    //       });
    //     });
    //     console.log(this.data);
    //   }
  }
};
</script>

<style lang="scss" scoped>
.card-list-row {
  margin: 10px 0 !important;
  .card-list-item {
    margin: 20px 0;
  }
}
.card {
  //width: 450px;
  height: 150px;
  background-color: #f9f9f9;
  /* background: linear-gradient(#f8f8f8, #fff); */
  box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  // margin: 1.5rem;
  display: block;
  .additional {
    position: absolute;
    width: 150px;
    height: 100%;
    //background: linear-gradient(#de685e, #ee786e);
    transition: width 0.4s;
    overflow: hidden;
    z-index: 2;
    .user-card {
      width: 150px;
      height: 100%;
      position: relative;
      float: left;
      .type-label {
        font-size: 12px;
        color: #ffc107;
        height: 16px;
        width: 70px;
        display: block;
        background-color: #fc6f3d;
        transform: rotate(-45deg);
        text-align: center;
        left: -16px;
        top: 10px;
        position: absolute;
      }
      .card .additional .user-card svg {
        top: 50%;
      }

      .level {
        top: 15%;
        color: #fff;
        text-transform: uppercase;
        font-size: 0.75em;
        font-weight: bold;
        background: rgba(0, 0, 0, 0.15);
        padding: 0.125rem 0.75rem;
        border-radius: 100px;
        white-space: nowrap;
      }
      .points {
        top: 85%;
        color: #fff;
        text-transform: uppercase;
        font-size: 1em;
        font-weight: bold;
        background: rgba(0, 0, 0, 0.15);
        padding: 0.25rem 0.75rem;
        border-radius: 100px;
        white-space: nowrap;
      }
    }
  }
  .general {
    //width: 300px;
    margin-left: 150px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    box-sizing: border-box;
    padding: 1em;
    padding-top: 0;
    h3 {
      margin-top: 8px;
      color: #333;
    }
    p {
      margin-top: 10px;
      line-height: 1.5em;
      text-indent: 2em;
      max-height: 80px;
      overflow: hidden;
    }
    .notice-date {
      position: absolute;
      bottom: 1em;
      font-size: 0.75em;
      color: #999;
    }
  }
  .card-checkbox {
    position: absolute;
    right: 1em;
    top: 8px;
  }
  .card-btn-group {
    position: absolute;
    right: 1em;
    bottom: 0.5em;
    .el-button {
      position: relative;
      padding: 4px;
      font-size: 0.75em;
      z-index: 9;
    }
  }
}
.card.green {
  .additional {
    //background: linear-gradient(#ff572275, #ff980073);
    background: linear-gradient(#ff572236, #ff980033);
  }
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
}
</style>
