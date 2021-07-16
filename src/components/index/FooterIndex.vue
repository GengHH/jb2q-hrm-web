<template>
  <!-- S demo8 首页底部内容 -->
  <div id="indexFooter" class="middle-box padding-tf">
    <el-row>
      <el-col :span="12" class="ba-info">
        <p class="mat-15 white-font">上海市人力资源和社会保障局 ©️ 版权所有</p>
        <p class="mat-30 white-font">
          沪ICP备2021016245号-2 沪公网安备:31011502006427
          政府网站标识码:3100000115 版权所有:上海市人力资源和社会保障局
          主办单位:上海市就业促进中心 邮编:200051
          对外办公时间:工作日9:00-11:30,13:30-17:00 咨询电话:12333
        </p>
      </el-col>
      <el-col :span="5" class="tac">
        <img class="help mat-15" src="@/assets/img/bangzhu.png" alt="" />
        <p class="white-font mat-5">使用帮助</p>
      </el-col>
      <el-col :span="7" class="tac">
        <div class="code-box">
          <el-popover
            placement="top-start"
            title="扫码即可下载"
            width="200"
            height="200"
            trigger="hover"
          >
            <img
              src="@/assets/img/code.png"
              alt=""
              slot
              style="width:100%;height:100%;"
            />
            <div slot="reference">
              <img src="@/assets/img/code.png" alt="" />
              <p class="white-font img-font mat-5">微信公众号</p>
            </div>
          </el-popover>
        </div>
        <div class="code-box">
          <el-popover
            placement="top-start"
            title="扫码即可下载"
            width="200"
            height="200"
            trigger="hover"
          >
            <img
              src="@/assets/img/rsj-az.png"
              alt=""
              slot
              style="width:100%;height:100%;"
            />
            <div slot="reference">
              <img src="@/assets/img/rsj-az.png" alt="" />
              <p class="white-font img-font mat-5">上海人社APP安卓</p>
            </div>
          </el-popover>
        </div>
        <div class="code-box">
          <el-popover
            placement="top-start"
            title="扫码即可下载"
            width="200"
            height="200"
            trigger="hover"
          >
            <img
              src="@/assets/img/rsj-pg.png"
              alt=""
              slot
              style="width:100%;height:100%;"
            />
            <div slot="reference">
              <img src="@/assets/img/rsj-pg.png" alt="" />
              <p class="white-font img-font mat-5">上海人社APP IOS</p>
            </div>
          </el-popover>
        </div>
      </el-col>
    </el-row>
  </div>
  <!-- E demo8 首页底部内容 -->
</template>

<script>
export default {
  name: 'FooterIndex',
  data() {
    return {
      inco: true,
      navList: [
        { id: '1', path: '/', nvaText: '首页' },
        { id: '2', path: '', nvaText: '活动管理' },
        { id: '3', path: '', nvaText: '活动列表' }
      ]
    };
  }
};
</script>

<style lang="scss">
#indexFooter {
  height: 130px;
  width: 100%;
  // position: fixed;
  // left: 0;
  // bottom: 0;
  background-color: #fc7a43;
  z-index: 999;
  //position: relative;
  .el-row {
    //margin-top: 15px;
    padding-top: 15px;
    .ba-info {
      padding: 0 10px;
      line-height: 1.2em;
      text-align: center;
    }
  }
  .or-bg {
    background: #fc7a43;
  }
  .mat-50 {
    margin-top: 50px;
  }
  .help {
    width: 25px;
    height: 20px;
    display: inline-block;
  }
  .mat-5 {
    margin-top: 5px;
  }
  .mat-15 {
    margin-top: 15px;
  }
  .mat-30 {
    margin-top: 30px;
  }
  .white-font {
    color: #fff;
  }
  .img-font {
    font-size: 12px;
  }
  .code-box {
    width: 74px;
    margin: 0 15px;
    display: block;
    float: left;
    & img {
      width: 70%;
      display: inline-block;
    }
  }
}
</style>
