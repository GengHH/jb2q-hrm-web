/* eslint-disable quotes */
<!--
 * @Author: GengHH
 * @Date: 2020-12-07 13:17:05
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-23 18:25:04
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
import { formatTime } from '@/utils';
export default {
  name: 'pl-wchat',
  data() {
    return {
      inputMsg: '',
      taleList: [
        {
          date: '2020/04/25 21:19:07',
          text: { text: '起床不' },
          mine: false,
          name: '留恋人间不羡仙',
          img: require('@/assets/images/cover.png')
        },
        {
          date: '2020/04/25 21:19:07',
          text: {
            text: '123'
          },
          mine: false,
          name: '只盼流星不盼雨',
          img: require('@/assets/images/cover.png')
        },
        {
          date: '2020/04/25 21:19:07',
          text: { text: 'hahaha' },
          mine: false,
          name: '只盼流星不盼雨',
          img: require('@/assets/images/cover.png')
        },
        {
          date: '2020/04/16 21:19:07',
          text: {
            text: '456'
          },
          mine: true,
          name: 'JwChat',
          img: require('@/assets/images/cover.png')
        },
        {
          date: '2021/03/02 13:14:21',
          mine: false,
          name: '留恋人间不羡仙',
          img: require('@/assets/images/cover.png'),
          text: {
            system: {
              title: '在接入人工前，智能助手将为您首次应答。',
              subtitle: '猜您想问:',
              content: [
                {
                  id: 'system1',
                  text: '组件如何使用'
                },
                {
                  id: 'system2',
                  text: '组件参数在哪里查看'
                },
                {
                  id: 'system',
                  text: '我可不可把组件用在商业'
                }
              ]
            }
          }
        }
      ],
      tool: {
        // 现在只配置了 ["file", "video", "img", "hongbao", "more", "history"]
        show: ['file', 'history', 'img', ['文件1', '', '图片']], // 二级数组中放自定义名称
        showEmoji: true, // 是否显示表情图标

        callback: this.toolEvent
      },
      config: {
        img: require('@/assets/images/cover.png'),
        name: 'JwChat',
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
      }
    };
  },
  methods: {
    /**
     * @description: 输入框点击就发送或者回车触发的事件
     * @return {*}
     */
    bindEnter() {
      const msg = this.inputMsg;
      if (!msg) return;
      const msgObj = {
        date: formatTime(new Date()),
        text: { text: msg },
        mine: true,
        name: 'JwChat',
        img: require('@/assets/images/cover.png')
      };
      this.taleList.push(msgObj);
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
    talkEvent() {}
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
    background-color: #d35e5e69 !important;
  }
}
</style>
