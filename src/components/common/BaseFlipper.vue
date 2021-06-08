<!--
 * @Author: GengHH
 * @Date: 2021-05-19 11:06:25
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-25 13:39:06
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\components\common\BaseFlipper.vue
-->
<template>
  <div
    v-on="$listeners"
    v-bind="$attrs"
    :class="['Flipper', { 'Flipper--flipped': flipped }]"
    :style="styles.wrapper"
  >
    <div class="Flipper__face Flipper__face--front" :style="styles.face">
      <slot name="front" />
    </div>
    <div class="Flipper__face Flipper__face--back" :style="styles.face">
      <slot name="back" />
    </div>
  </div>
</template>

<script>
import { isCSSLength, isCSSTime } from '@/utils/regexp';
export default {
  name: 'pl-flipper',
  props: {
    flipped: Boolean,
    width: {
      type: String,
      default: '100%',
      validator: isCSSLength
    },
    height: {
      type: String,
      default: '100%',
      validator: isCSSLength
    },
    minHeight: {
      type: String,
      default: '100%',
      validator: isCSSLength
    },
    duration: {
      type: String,
      default: '0.5s',
      validator: isCSSTime
    },
    transition: {
      type: String,
      default: 'ease-out'
    }
  },
  computed: {
    styles() {
      return {
        wrapper: {
          width: this.width,
          height: this.height,
          minHeight: this.minHeight
        },
        face: {
          transitionDuration: this.duration,
          transitionTimingFunction: this.transition
        }
      };
    }
  }
};
</script>

<style lang="css" scoped>
.Flipper {
  position: relative;
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
  perspective: 1000px;
}
.Flipper__face {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;
}
.Flipper--flipped .Flipper__face--front,
.Flipper__face--back {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  transform: rotateY(180deg);
  visibility: hidden;
}
.Flipper--flipped .Flipper__face--back {
  -webkit-transform: rotateY(360deg);
  -moz-transform: rotateY(360deg);
  transform: rotateY(360deg);
  visibility: visible;
}
</style>
