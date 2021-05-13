/* eslint-disable quotes */
<!--
 * @Author: GengHH
 * @Date: 2020-12-07 13:17:05
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-13 09:49:27
 * @Description: 聊天弹框
 * @FilePath: \jb2q-hrm-web\src\components\common\BaseWChat.vue
-->
<template>
  <JwChat-index
    class="pl-wchat"
    :config="config"
    :showRightBox="false"
    scrollType="noroll"
    :taleList="taleList"
    @enter="bindEnter"
    @clickTalk="talkEvent"
    v-model="inputMsg"
    :toolConfig="tool"
    :winBarConfig="winBarConfig"
  />
</template>

<script>
import { formatTime, isPerson, isCorporation } from '@/utils';
import { openSession, sendSession } from '@/api/common';
export default {
  name: 'pl-wchat',
  props: {
    targetObjId: {
      type: String,
      default: ''
    },
    targetObjName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputMsg: '',
      taleList: [
        // {
        //   date: '2020/04/25 21:19:07',
        //   text: { text: '起床不' },
        //   mine: false,
        //   name: '留恋人间不羡仙',
        //   img: require('@/assets/images/cover.png')
        // },
        // {
        //   date: '2020/04/25 21:19:07',
        //   text: {
        //     text: '123'
        //   },
        //   mine: false,
        //   name: '只盼流星不盼雨',
        //   img: require('@/assets/images/cover.png')
        // },
        // {
        //   date: '2020/04/25 21:19:07',
        //   text: { text: 'hahaha' },
        //   mine: false,
        //   name: '只盼流星不盼雨',
        //   img: require('@/assets/images/cover.png')
        // },
        // {
        //   date: '2020/04/16 21:19:07',
        //   text: {
        //     text: '456'
        //   },
        //   mine: true,
        //   name: 'JwChat',
        //   img: require('@/assets/images/cover.png')
        // },
        // {
        //   date: '2021/03/02 13:14:21',
        //   mine: false,
        //   name: '留恋人间不羡仙',
        //   img: require('@/assets/images/cover.png'),
        //   text: {
        //     system: {
        //       title: '在接入人工前，智能助手将为您首次应答。',
        //       subtitle: '猜您想问:',
        //       content: [
        //         {
        //           id: 'system1',
        //           text: '组件如何使用'
        //         },
        //         {
        //           id: 'system2',
        //           text: '组件参数在哪里查看'
        //         },
        //         {
        //           id: 'system',
        //           text: '我可不可把组件用在商业'
        //         }
        //       ]
        //     }
        //   }
        // }
      ],
      tool: {
        // 现在只配置了 ["file", "video", "img", "hongbao", "more", "history"]
        show: ['file', 'history', 'img', ['文件1', '', '图片']], // 二级数组中放自定义名称
        showEmoji: true, // 是否显示表情图标

        callback: this.toolEvent
      },
      config: {
        img: require('@/assets/images/cover.png'),
        name: this.targetObjName, //'JwChat',
        dept: '最简单、最便捷',
        callback: this.bindCover,
        historyConfig: {
          show: true,
          tip: '加载更多',
          callback: this.bindLoadHistory
        },
        quickList: [
          { text: '这里是jwchat，您想了解什么问题。' },
          { text: 'jwchat是最好的聊天组件' },
          { text: '谁将烟焚散，散了纵横的牵绊；听弦断，断那三千痴缠。' },
          { text: '长夏逝去。山野间的初秋悄然涉足。' }
        ]
      },
      winBarConfig: {
        // active: 'win00',
        // width: '160px',
        // listHeight: '60px',
        // list: [
        //   {
        //     id: 'win00',
        //     img: '..//image/cover.png',
        //     name: 'JwChat',
        //     dept: '最简单、最便捷',
        //     readNum: 99
        //   },
        //   {
        //     id: 'win01',
        //     img: '..//image/three.jpeg',
        //     name: '阳光明媚爱万物',
        //     dept: '沙拉黑油',
        //     readNum: 12
        //   },
        //   {
        //     id: 'win02',
        //     img: '..//image/two.jpeg',
        //     name: '只盼流星不盼雨',
        //     dept: '最后说的话'
        //   },
        //   {
        //     id: 'win03',
        //     img: '..//image/one.jpeg',
        //     name: '留恋人间不羡仙',
        //     dept: '这里可以放万物'
        //   },
        //   {
        //     id: 'win04',
        //     img: '..//image/three.jpeg',
        //     name: '阳光明媚爱万物',
        //     dept: '官方客服'
        //   }
        // ],
        // callback: this.bindWinBar
      },
      sessionId: '',
      createId: '',
      sendName: ''
    };
  },
  mounted() {
    if (this.targetObjId) {
      console.log('targetObjId', this.targetObjId);
      this.targetId = this.targetObjId;
      this.openSession();
    } else {
      this.$alert('未知名对象');
    }
  },
  methods: {
    /**
     * @description: 输入框点击就发送或者回车触发的事件
     * @return {*}
     */
    bindEnter() {
      const msg = this.inputMsg;
      if (!msg) return;
      //发送信息
      sendSession({
        sessionId: this.sessionId,
        createId: this.createId,
        sendName: this.sendName,
        content: msg
      }).then(sendRes => {
        if (sendRes && sendRes.status === 200) {
          const msgObj = {
            date: formatTime(new Date()),
            text: { text: msg },
            mine: true,
            name: 'JwChat',
            img: require('@/assets/images/cover.png')
          };
          this.taleList.push(msgObj);
        } else if (sendRes) {
          this.$message({ type: 'error', message: '发送失败' });
        }
      });
    },
    /**
     * @description:
     * @param {*} type 当前点击的按钮
     * @param {*} plyload 附加文件或者需要处理的数据
     * @return {*}
     */
    toolEvent(type, plyload) {
      console.log('tools', type, plyload);
      if (type === 'more') {
        this.$alert('暂时没有更多新功能');
      }
    },
    /**
     * @description: 点击加载更多的回调函数
     * @param {*}
     * @return {*}
     */
    bindLoadHistory() {
      const history = new Array(3).fill().map((i, j) => {
        return {
          date: '2020/05/20 23:19:07',
          text: { text: j + new Date() },
          mine: false,
          name: 'JwChat',
          img: 'image/three.jpeg'
        };
      });
      let list = history.concat(this.list);
      this.list = list;
      console.log('加载历史', list, history);
    },
    bindCover(type) {
      console.log('header', type);
    },
    bindWinBar(play = {}) {
      const { type, data = {} } = play;
      console.log(data);
      if (type === 'winBar') {
        const { id, dept, name, img } = data;
        this.winBarConfig.active = id;
      }
    },
    talkEvent() {},
    /**
     *查询历史信息
     */
    openSession() {
      let queryParams = {
        //打开聊天框的对象，个人填pid，单位填cid
        openId: '',
        //RECRUIT_LOGIN_TYPE
        openType: '',
        //聊天目标，个人填pid，单位填cid
        targetId: '',
        //RECRUIT_LOGIN_TYPE
        targetType: ''
      };
      console.log(this.targetObjId);
      if (isPerson(this)) {
        //个人发给单位
        this.sendName = this.$store.getters['person/username'];
        this.createId = queryParams.openId = this.$store.getters['person/pid'];
        queryParams.openType = '1';
        queryParams.targetId = this.targetObjId;
        queryParams.targetType = '2';
      } else {
        //单位发给个人
        this.sendName = this.$store.getters['corporation/username'];
        this.createId = queryParams.openId = this.$store.getters[
          'corporation/cid'
        ];
        queryParams.openType = '2';
        queryParams.targetId = this.targetObjId;
        queryParams.targetType = '1';
      }
      //开始查询
      openSession(queryParams).then(queryRes => {
        if (queryRes && queryRes.status === 200) {
          this.sessionId = queryRes.result.sessionInfo.sessionId;
          let target = this.coverMsgs(queryRes.result.sessionInfo.msgs || []);
          console.log(target);
          this.taleList = target;
        } else if (queryRes) {
          this.$message({ type: 'error', message: '无法获取历史聊天信息' });
        }
      });
    },
    /**
     *转换数据（将后台显示的数据转换成需要的数据格式）
     */
    coverMsgs(source) {
      if (source && Array.isArray(source)) {
        return source.map(msg => {
          let _obj = { ...msg };
          _obj.date = msg.createTime;
          _obj.name = msg.sendName || '';
          _obj.text = {
            text: msg.content || ''
          };
          _obj.img = require('@/assets/images/cover.png');
          return _obj;
        });
      }
      return [];
    }
  }
};
</script>

<style lang="scss" scoped>
.pl-wchat {
  ::v-deep .wrapper {
    text-align: center;
    margin: 10px auto;
    color: #aaa;
  }
  ::v-deep .header {
    background-color: #f1b6b6 !important;
  }
}
</style>
