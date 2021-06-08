<!--
 * @Author: your name
 * @Date: 2021-03-05 09:55:06
 * @LastEditTime: 2021-05-18 18:24:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">剩余</div>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../common/t_form';
import ttable from '../common/t_table';
import adddetails from './module/addDetails';
import addright from './module/addRight';
import {
  user_query,
  user_querySysm,
  user_edit,
  user_del,
  user_add
} from './api/index';

export default {
  name: 'surplus',
  components: { ttable, tform, adddetails, addright },
  data() {
    return {
      dicOptions: {
        //角色类型
        role: trim(this.$store.getters['dictionary/recruit_user_role'])
      }
    };
  },
  computed: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss" scoped></style>
