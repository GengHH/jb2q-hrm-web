<template>
  <div id="indexBody">
    <BaseSearch></BaseSearch>
    <!-- S demo2筛选部分 -->
    <div id="demo2">
      <div class="filter-content">
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">工作年限：</div>
          </el-col>
          <el-col :span="22">
            <el-radio-group v-model="jobRadio" size="medium">
              <el-radio-button label="不限">不限</el-radio-button>
              <el-radio-button label="1">1年以下</el-radio-button>
              <el-radio-button label="2">1~2年</el-radio-button>
              <el-radio-button label="3">3~5年</el-radio-button>
              <el-radio-button label="4">6~9年</el-radio-button>
              <el-radio-button label="5">10年及以上</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">意向职位：</div>
          </el-col>
          <el-col :span="20">
            <el-radio-group v-model="jobRadio" size="medium">
              <el-radio-button label="不限">不限</el-radio-button>
              <el-radio-button label="销售/客服/技术支持">居民服务和其他服务业</el-radio-button>
              <el-radio-button label="会计/金融/银行/保险">水利、环境和公共设施管理业</el-radio-button>
              <el-radio-button label="生产/营运/采购/物流">科学研究、技术服务和地质勘查业</el-radio-button>
              <el-radio-button label="生物/制药/医疗/护理">租赁和商务服务业</el-radio-button>
              <el-radio-button label="广告/市场/媒体/艺术">不</el-radio-button>
              <el-radio-button label="建筑/房地产">科学研究、技术服务和地质勘查业</el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple more-ico">
              <span>更多</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">意向行业：</div>
          </el-col>
          <el-col :span="20">
            <!-- <el-form-item label="" required> -->
            <el-radio-group v-model="jobRadio" size="medium">
              <el-radio-button label="不限">不限</el-radio-button>
              <el-radio-button label="销售/客服/技术支持">销售/客服/技术支持</el-radio-button>
              <el-radio-button label="会计/金融/银行/保险">会计/金融/银行/保险</el-radio-button>
              <el-radio-button label="生产/营运/采购/物流">生产/营运/采购/物流</el-radio-button>
              <el-radio-button label="生物/制药/医疗/护理">生物/制药/医疗/护理</el-radio-button>
              <el-radio-button label="广告/市场/媒体/艺术">广告/市场/媒体/艺术</el-radio-button>
              <el-radio-button label="建筑/房地产">建筑/房地产</el-radio-button>
            </el-radio-group>
            <!-- </el-form-item> -->
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple more-ico">
              <span>更多</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">单位性质：</div>
          </el-col>
          <el-col :span="22">
            <!-- <div class="grid-content bg-purple-light">
              <div class="radio-span">
                <span class="active-span">不限</span>
                <span>国有</span>
                <span>私营</span>
                <span>民营</span>
                <span>股份制</span>
              </div>
            </div>-->

            <el-radio-group v-model="jobRadio" size="medium">
              <el-radio-button label="不限">不限</el-radio-button>
              <el-radio-button label="销售/客服/技术支持">国有</el-radio-button>
              <el-radio-button label="会计/金融/银行/保险">私营</el-radio-button>
              <el-radio-button label="生产/营运/采购/物流">民营</el-radio-button>
              <el-radio-button label="生物/制药/医疗/护理">股份制</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <div class="place-holder">placeHolder</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple filter-select">
              <template>
                <el-select v-model="value" placeholder="意向薪酬">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select v-model="value" placeholder="工作区域">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select v-model="value" placeholder="学历要求">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select v-model="value" placeholder="学历">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select v-model="value" placeholder="专业">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple more-ico">
              <i class="el-icon-delete"></i>
              <span>清空筛选条件</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- E demo2筛选部分 -->
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch.vue';
export default {
  name: 'JobSearch',
  components:{
    BaseSearch
  },
  data(){
    return {
      jobRadio : '不限',
      value:'',
      options:[{
        label:'123',
        value:'haha'
      }]
    };
  }

};
</script>

<style lang="scss" scoped>
#indexBody {
  width: 90%;
  min-height: 100%;
  //max-height:1000px;
  margin: 0 auto 150px;
  padding-top: 60px;
  background-color: $g-white-color;
  .more-btn {
    margin: 20px auto;
    padding-left: 50px;
    padding-right: 50px;
    color: #fc6f3d;
    border: 1px solid #fc6f3d;
    display: block;
  }

  #demo2 {
    ::v-deep .el-radio-button__inner {
      border: 0;
    }
    ::v-deep .el-input__inner {
      border: 0;
      width: 100px !important;
      color: rgba(0, 0, 0, 0.8);
      text-align: center;
    }

    .filter-content {
      .place-holder {
        visibility: hidden;
      }
      .el-row {
        border-bottom: 1px solid #eeeeee;
      }
      .el-radio-group {
        line-height: 52px;
        text-align: center;
        ::v-deep .el-radio-button__inner {
          border-radius: 0;
        }
      }
      .bg-purple {
        line-height: 52px;
        text-align: center;
      }
      .filter-select {
        text-align: left;
      }
    }
  }
}
</style>
