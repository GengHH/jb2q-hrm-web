<template>
  <div id="indexBody">
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
        >
          <div class="Card__face" slot="front">
            <span class="Card__value Card__value--top">10</span>
            <span class="Card__center">♣</span>
            <span class="Card__value Card__value--bottom">10</span>
          </div>

          <div class="Card__pattern" slot="back">
            <span>{{ item.id }}</span>
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
  methods: {},
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
    margin: 20px 0;
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

  /* &__pattern {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNjAiIGhlaWdodD0iMzAiPgo8ZGVmcz4KPHJlY3QgaWQ9InIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIxNSIgZmlsbD0iI2JiMDg1ZiIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZT0iIzdhMDU0ZCI+PC9yZWN0Pgo8ZyBpZD0icCI+Cjx1c2UgeGxpbms6aHJlZj0iI3IiPjwvdXNlPgo8dXNlIHk9IjE1IiB4bGluazpocmVmPSIjciI+PC91c2U+Cjx1c2UgeT0iMzAiIHhsaW5rOmhyZWY9IiNyIj48L3VzZT4KPHVzZSB5PSI0NSIgeGxpbms6aHJlZj0iI3IiPjwvdXNlPgo8L2c+CjwvZGVmcz4KPHVzZSB4bGluazpocmVmPSIjcCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtMjUpIHNrZXdZKDQwKSI+PC91c2U+Cjx1c2UgeGxpbms6aHJlZj0iI3AiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwIDApIHNrZXdZKC00MCkiPjwvdXNlPgo8L3N2Zz4=');
  } */

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
