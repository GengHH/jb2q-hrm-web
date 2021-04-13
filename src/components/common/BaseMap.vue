<!--
 * @Author: GengHH
 * @Date: 2021-04-13 15:25:56
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-13 19:37:44
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\components\common\BaseMap.vue
-->
<template>
  <div id="myMap">
    <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler">
      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
      <bm-panorama></bm-panorama>
      <template v-if="!pointList.length">
        <bm-marker
          v-for="(item, index) in markPoint"
          :key="index"
          :position="{ lng: item.lng, lat: item.lat }"
          :dragging="true"
          animation="BMAP_ANIMATION_BOUNCE"
        >
          <bm-label :content="item.text" :offset="{ width: -35, height: 30 }" />
        </bm-marker>
      </template>
      <!-- <bm-info-window
        :show="show"
        @close="infoWindowClose"
        @open="infoWindowOpen"
        >我爱上海魔都</bm-info-window
      > -->
      <bm-control>
        <button id="goBackPoint" @click="goBack()">回到原点</button>
      </bm-control>
    </baidu-map>
  </div>
</template>

<script>
/**
 * 通用的地图组件
 */
export default {
  name: 'pl-map',
  props: {
    markPoint: {
      type: Array,
      default: () => [{ lng: 121.506377, lat: 31.245105, text: '我爱上海魔都' }]
    },
    pointList: {
      type: Array,
      default: () => []
    }
  },
  component: {},
  data() {
    return {
      center: { lng: 0, lat: 0 },
      BMap: '',
      map: '',
      zoom: 15,
      show: false
    };
  },
  methods: {
    handler({ BMap, map }) {
      //初始化定位，以东方明珠为中心点
      this.center.lng = 121.506377;
      this.center.lat = 31.245105;
      this.zoom = 15;

      console.log(BMap, map);
      this.map = map;
      this.BMap = BMap;
      //根据多个地址显示多个图片
      if (this.pointList.length > 0) {
        let local = new BMap.LocalSearch(map, {
          renderOptions: {
            map: map,
            autoViewport: true,
            selectFirstResult: true
          },
          pageCapacity: 1
        });
        local.setSearchCompleteCallback(function(searchResults) {
          console.log('+++++++');
          console.log(searchResults);

          let poi =
            searchResults.Hr.length > 0
              ? searchResults.Hr[0]
              : searchResults.Hr;
          console.log(poi);

          let marker = new BMap.Marker(
            new BMap.Point(poi.point.lng, poi.point.lat)
          );
          //alert("["+poi.point.lng+","+poi.point.lat+"]");
          //在地图上添加标识
          map.addOverlay(marker);
          //显示标题
          marker.setTitle(poi.address);
          //添加点击事件监听
          marker.addEventListener('click', makerClick);
        });
        //查询地址的坐标
        this.pointList.forEach(element => {
          console.log(213);
          local.search(element);
          return element;
        });
      }

      let makerClick = function() {
        let infoWindow = new BMap.InfoWindow(
          '<p style="font-size:14px;">' + this.getTitle() + '</p>'
        );
        this.openInfoWindow(infoWindow);
      };
    },
    infoWindowClose() {
      this.show = false;
    },
    infoWindowOpen() {
      this.show = true;
    },
    goBack() {
      this.map.setZoom(15);
      const point = new this.BMap.Point(this.center.lng, this.center.lat);
      this.map.panTo(point);
    }
  }
};
</script>

<style lang="scss">
#myMap {
  width: 100%;
  height: 100%;

  .map {
    width: 100%;
    height: 600px;
  }

  #goBackPoint {
    margin: 20px;
    padding: 10px 20px;
  }
}
</style>
