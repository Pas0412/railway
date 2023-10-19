<template>
  <div class="box">
    <div id="container" style="width: 70%; height: 500px; position: relative">
      <input
        v-model="keyword"
        class="keyword"
        id="keyword"
        placeholder="请输入搜索位置"
        style="position: absolute; z-index: 99;"
      />
    </div>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import { ref, shallowRef } from 'vue';

export default {
  props: {
    center: Array
  },
  setup(props) {
    const keyword = ref('');
    const form = ref({
      address: '',
    });
    let map = shallowRef(null);

    const ininMap = () => {
      AMapLoader.load({
        key: '',
        version: '1.4.4',
        plugins: ['AMap.PlaceSearch', 'AMap.AutoComplete']
      })
        .then((AMap) => {
          map = new AMap.Map('container', {
            resizeEnable: true,
            zoom: 15,
            center: props.center,
          });
          AMap.plugin(
            ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geocoder'],
            function () {
              const autoOptions = {
                input: 'keyword',
              };
              const autocomplete = new AMap.Autocomplete(autoOptions);
              const placeSearch = new AMap.PlaceSearch({
                map: map,
              });
              const geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: 'all',
              });
              AMap.event.addListener(autocomplete, 'select', function (e) {
                placeSearch.setCity(e.poi.adcode);
                placeSearch.search(e.poi.name, function (status, result) {
                  const pois = result.poiList.pois;
                  for (let i = 0; i < pois.length; i++) {
                    if (pois[i].name === e.poi.name) {
                      console.log('搜索结果', pois[i]);
                      geocoder.getAddress(
                        [pois[i].location.lng, pois[i].location.lat],
                        function (status, result) {
                          console.log(result);
                          if (status === 'complete' && result.info === 'OK') {
                            form.value.address = result.regeocode.formattedAddress;
                          } else {
                            form.value.address = '';
                          }
                        }
                      );
                    }
                  }
                });
              });
            }
          );
        })
        .catch((e) => {
          console.log(e);
        });
    };

    ininMap();

    return {
      keyword,
      form,
    };
  },
};
</script>
