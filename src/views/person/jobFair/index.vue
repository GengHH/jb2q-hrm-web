<template>
  <div id="indexBody">
    <!-- 区县 -->
    <el-row>
      <el-col :sm="2" :md="2" :lg="1" :xl="1" style="padding: 10px;">
        区县：</el-col
      >
      <el-col :sm="22" :md="22" :lg="23" :xl="23">
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
      <el-col :sm="2" :md="2" :lg="1" :xl="1" style="padding: 10px;">
        排序：</el-col
      >
      <el-col :sm="22" :md="22" :lg="23" :xl="23">
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
          class="Card"
          width="100%"
          height="300px"
          :flipped="item.isFlipped"
          @mouseenter="item.isFlipped = !item.isFlipped"
          @mouseleave="item.isFlipped = !item.isFlipped"
          @click="showFairInfo(item.id)"
        >
          <div class="Card__pattern" slot="front">
            <img
              class="fair-img"
              src="../../../assets/img/img04.png"
              alt="未加载"
            />
            <span>{{ item.id }}</span>
          </div>
          <div class="Card__face" slot="back">
            <span class="Card__value Card__value--top">10</span>
            <span class="Card__center">♣</span>
            <span class="Card__value Card__value--bottom">10</span>
          </div>
        </pl-flipper>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getPersonBaseInfo, updatePersonBaseInfo } from '@/api/personApi';
import plFlipper from '@/components/common/BaseFlipper.vue';
export default {
  name: 'personApp',
  components: {
    plFlipper
  },
  data() {
    return {
      qx: '',
      order: '1',
      fairInfo: [
        {
          id: '1',
          isFlipped: false
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
    jobFaieList: function() {
      return this.showList ? this.showList.slice(0, 3) : [];
    }
  },
  methods: {
    showFairInfo(meetId) {
      console.log(meetId);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
#indexBody {
  width: 90%;
  //max-width: 1360px;
  /* min-height: 100%; */
  /* margin: 0 auto; */
  background-color: #ffffff;
  position: absolute;
  bottom: 0;
  top: 60px;
  left: 5%;
  background-color: $g-white-color;
  .el-col {
    margin: 10px 0;
  }
  .fair-img {
    width: 100%;
  }
}
</style>

<style lang="scss">
.Card {
  &__face,
  &__pattern {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(rgb(61, 61, 61), 0.35);
    cursor: pointer;
  }
  &__face {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 15px;
  }

  &__value {
    display: block;
    font-size: 18pt;

    &--top {
      align-self: flex-start;
    }

    &--bottom {
      align-self: flex-end;
    }
  }

  &__center {
    display: block;
    font-size: 32pt;
    align-self: center;
  }
}
</style>
