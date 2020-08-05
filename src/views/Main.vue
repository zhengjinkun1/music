<template>
  <div class="main">
    <van-tabs v-model="activeName" :sticky="true">
      <van-tab title="推荐音乐" name="a">
        <remdMusic></remdmusic>
      </van-tab>
      <van-tab title="热歌榜" name="b">
        <hotMusic></hotMusic>
      </van-tab>
      <van-tab title="搜索" name="c">
        <searchPage></searchPage>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import RemdMusic from "../components/RemdMusci";
import hotMusic from "../components/HotMusic";
import searchPage from "../components/Search";

export default {
  data() {
    return {
      activeName: "a"
    };
  },
  components: {
    RemdMusic,
    hotMusic,
    searchPage
  }
};
</script>

<style lang="less" scoped>
</style>