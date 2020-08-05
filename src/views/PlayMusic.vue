<template>
  <div class="playMusic">
    <div class="playMusic-for" v-for="(item,index) in songs" :key="index">
      <div class="playMusic-box">
        <div class="playMusic-box-item">
          <div class="m-turn">
            <div class="music-box">
              <div class="music-img">
                <img class="auto-img active" :src="item.al.picUrl" ref="turn" />
                <div class="play" @click="mPlay" v-if="isR">
                  <van-icon class="play-icon" name="play-circle-o" size="60" color="#fff" />
                  <audio :src="mUrl" autoplay ref="ddd"></audio>
                </div>
                <div class="play" @click="mPause" v-else>
                  <!-- <van-icon class="play-icon" name="play-circle-o" size="60" color="#fff" /> -->
                  <audio :src="mUrl" autoplay ref="ddd1"></audio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="music-line"></div>
      <div class="lyric">
        <div class="lyric-box">
          <h2 class="lyric-title">
            <span>{{item.name}}-</span>
            <span class="ar-name">{{item.ar.map(art => art.name).join(' / ')}}</span>
          </h2>
          <!-- <ul>
            <li class="lyric-content">{{list[i]}}</li>
          </ul> -->
        </div>
      </div>
    </div>

    <van-tabbar>
      <van-tabbar-item icon="replay" @click="go">返回</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created() {
    this.id = this.$route.query.id;
    
    this.getUrl();
    // this.getLyric();
    this.getLink();
    let a = setInterval(() => {
      // this.i++;
      if (this.isR == true) {
        clearInterval(a);
        return;
      } else {
        this.i++;
      }
    }, 2000);
  },
  data() {
    return {
      isR: false,
      audio: null,
      i: 0,
      id: "",
      songs: [],
      lyric: [],
      list: [],
      lyr: [],
      text: "",
      mUrl: ""
    };
  },
  methods: {
    // 获取歌曲详情
    getUrl() {
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        // 延迟自动关闭加载提示，为0不会关闭
        duration: 0
      });
      this.axios({
        method: "get",
        url: "/song/detail",
        // post传参需要在data中写
        params: {
          ids: this.id
        }
      })
        .then(result => {
          // 关闭加载提示
          this.$toast.clear();
          // 
          if (result.data.code == 200) {
            this.songs = result.data.songs;
            // this.list = result.data.songs[0].al.picUrl;
          }

          // 
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },
    // 获取歌词
    // getLyric() {
    //   this.$toast.loading({
    //     message: "加载中",
    //     forbidClick: true,
    //     // 延迟自动关闭加载提示，为0不会关闭
    //     duration: 0
    //   });
    //   this.axios({
    //     method: "get",
    //     url: "/lyric",
    //     // post传参需要在data中写
    //     params: {
    //       id: this.id
    //     }
    //   })
    //     .then(result => {
    //       // 关闭加载提示
    //       this.$toast.clear();
          
    //       this.lyric = result.data.lrc.lyric;
         
    //       // 将歌词取出
    //       this.lyric = this.lyric.split(/[\n\r]+/);
    //       // 
    //       for (var i = 0; i < this.lyric.length; i++) {
    //         // 
    //         this.lyr = this.lyric[i].split("]");
    //         // 
    //         this.text = this.lyr[1];
    //         // 
    //         this.list.push(this.text);
    //       }
    //       // 
    //     })
    //     .catch(err => {
    //       this.$toast.clear();
          
    //     });
    // },
    // 获取歌曲地址
    getLink() {
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        // 延迟自动关闭加载提示，为0不会关闭
        duration: 0
      });
      this.axios({
        method: "get",
        url: "/song/url",
        // post传参需要在data中写
        params: {
          id: this.id
        }
      })
        .then(result => {
          // 关闭加载提示
          this.$toast.clear();
          // 
          
          this.mUrl = result.data.data[0].url;
          
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },
    // 播放
    mPlay() {
      this.isR = false;
      let aa = this.$refs.ddd[0];
      // 
      aa.play();
      if (this.isR == false) {
        this.$refs.turn[0].classList.add("active");
      }
    },
    // 暂停
    mPause() {
      this.isR = true;
      let bb = this.$refs.ddd1[0];
      bb.pause();
      if (this.isR == true) {
        this.$refs.turn[0].classList.remove("active");
      }
    },
    go() {
      this.$router.go(-1);
    },
    // 歌词同步
    // parseLyric(text) {
    //   //将文本分隔成一行一行，存入数组
    //   var lines = text.split("\n"),
    //     //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
    //     pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
    //     //保存最终结果的数组
    //     result = [];
    //   //去掉不含时间的行
    //   while (!pattern.test(lines[0])) {
    //     lines = lines.slice(1);
    //   }
    //   //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
    //   lines[lines.length - 1].length === 0 && lines.pop();
    //   lines.forEach(function(v /*数组元素值*/, i /*元素索引*/, a /*数组本身*/) {
    //     //提取出时间[xx:xx.xx]
    //     var time = v.match(pattern),
    //       //提取歌词
    //       value = v.replace(pattern, "");
    //     //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
    //     time.forEach(function(v1, i1, a1) {
    //       //去掉时间里的中括号得到xx:xx.xx
    //       var t = v1.slice(1, -1).split(":");
    //       //将结果压入最终数组
    //       result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
    //     });
    //   });
    //   //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
    //   result.sort(function(a, b) {
    //     return a[0] - b[0];
    //   });
    //   return result;
    // }
  }
};
</script>

<style lang="less" scoped>
.playMusic {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #3C3A39;
}
.music-line {
  background-image: url("../assets/images/3.png");
  position: absolute;
  width: 96px;
  height: 137px;
  top: 0px;
  left: 185px;
  z-index: 10;
  background-size: contain;
}
.playMusic-box {
  margin-top: 70px;
  height: 296px;

  // border: 1px solid red;
}
.playMusic-box-item {
  width: 296px;
  height: 296px;
  margin: 0 auto;

  // border: 1px solid #fff;
  position: relative;
}
.m-turn {
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url("../assets/images/1.png");

  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  background-size: contain;
}
.music-box {
  width: 184px;
  height: 184px;
  margin: -92px 0 0 -92px;

  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 3;
}
.music-img {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ccc;
  box-sizing: border-box;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
  }
}
.play {
  position: absolute;
  left: 50%;
  margin-left: -28px;
  margin-top: -28px;
  top: 50%;
  display: block;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 10;
}
.active {
  @keyframes mymove {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  animation: mymove 15s infinite;

  // transition:transform infinite;
  // transition:transform 10s;
}
.play-icon {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
}
.lyric {
  margin-top: 25px;
  color: #fff;
}
.lyric-box {
  padding: 0 35px;
}
.lyric-title {
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.ar-name {
  color: #9d9ea0;
  font-size: 16px;
}
.lyric-content {
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
}
.van-tabbar {
  background-color: #ccc;
}
.van-tabbar-item--active {
  color: #716162;
}
</style>