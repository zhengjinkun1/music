<template>
  <div class="hotMusic">
    <div class="recommend">
      <h2 class="title">推荐歌单</h2>
    </div>
    <div class="remd-song">
      <div class="remd-song-item" @click="getRemdList(index)" v-for="(item,index) in musicList" :key="index">
        <span class="remd-back">{{item.playCount}}</span>
        <img class="auto-img" :src="item.picUrl" alt />
        <div class="remd-song-text">{{item.name}}</div>
      </div>
    </div>
    <div class="new-mucis">
      <h2 class="title">最新音乐</h2>
    </div>
    <div class="music">
      <div class="content" v-for="(item,index) in newMusic" :key="index" @click="getMusicId(index)">
        <div class="fl content-item">
          <div class="content-item-top">{{item.name}}</div>
          <div class="content-item-bottom">
            <div class="content-item-icon fl"></div>
            <div class="content-item-text fl">{{item.song.artists.map(art => art.name).join(' / ')}} - {{item.name}}</div>
          </div>
        </div>
        <div class="content-box fr">
          <div class="content-box-icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getMusicList();
    this.getNewMusic();
    // this.$store.dispatch('getid',347230);
  },
  data() {
    return {
      musicList: [],
      playCount: [],
      newMusic: [],
      new: [],
      newName: [],
      // id:''
    };
  },
  methods: {
    changeNum(count) {
      let num = count / 10000;
      if (num < 1) {
        return num;
      } else if (num >= 1 && num < 10000) {
        return Math.floor(num * 10) / 10 + "万";
      } else {
        return Math.floor(num / 1000) / 10 + "亿";
      }
    },

    //处理名字
    name(arr) {
      arr.map(v => {
        return v.name;
      });
    },
    // 获取歌单
    getMusicList() {
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        // 延迟自动关闭加载提示，为0不会关闭
        duration: 0
      });
      this.axios({
        method: "get",
        url: "/personalized",
        // post传参需要在data中写
        params: {
          limit: 6
        }
      })
        .then(result => {
          this.$toast.clear();
          
          if (result.data.code == 200) {
            this.musicList = result.data.result;
            // 
            
            this.musicList.forEach(v => {
              v.playCount = this.changeNum(v.playCount);
              // 
              // this.playCount.push(a);
            });
          }
          
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },
    // 获取最新音乐
    getNewMusic(index) {
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        // 延迟自动关闭加载提示，为0不会关闭
        duration: 0
      });
      this.axios({
        method: "get",
        url: "/personalized/newsong"
        // post传参需要在data中写
      })
        .then(result => {
          this.$toast.clear();
          
          if (result.data.code == 200) {
            this.newMusic = result.data.result;
            
           
          }
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },
    // 获取歌单详情
    getRemdList(index){
      // 
      
      // this.$toast.loading({
      //   message: "加载中",
      //   forbidClick: true,
      //   // 延迟自动关闭加载提示，为0不会关闭
      //   duration: 0
      // });
      // this.axios({
      //   method: "get",
      //   url: "/playlist/detail",
      //   // post传参需要在data中写
      //   params:{
      //     id:this.musicList[index].id
      //   }
      // })
      //   .then(result => {
      //     this.$toast.clear();
      //     
      //     if(result.data.code == 200){
      //       this.$store.list = result.data.playlist;
        this.$router.push({name:'MusicList',query:{id:this.musicList[index].id}});
        //     
        //   }
        // })
        // .catch(err => {
        //   this.$toast.clear();
        //   
        // });
    },
    // 获取歌曲id
    getMusicId(index){
      let id =this.newMusic[index].id;
      // 
      this.$router.push({name:'PlayMusic',query:{id}})
    }
  }
};
</script>

<style lang="less" scoped>
.recommend {
  padding-top: 10px;
  .title {
    position: relative;
    padding-left: 9px;
    margin-bottom: 14px;
    font-size: 17px;
    height: 20px;
    line-height: 20px;
    &::after {
      content: " ";
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -9px;
      width: 2px;
      height: 16px;
      background-color: #d33a31;
    }
  }
}
.remd-song {
  margin-top: 10px;
  height: 350px;
  // border: 1px solid #000;
  .remd-song-item {
    position: relative;
    float: left;
    height: calc(350px / 2);
    padding-left: 2px;
    padding-right: 2px;
    // border: 1px solid #000;
    width: 33.3%;
    box-sizing: border-box;
    .remd-back {
      background-image: url("../assets/images/1.svg");
      position: absolute;
      right: 5px;
      top: 2px;
      z-index: 3;
      padding-left: 13px;
      color: #fff;
      font-size: 12px;
      background-position: 0;
      background-repeat: no-repeat;
      background-size: 11px 10px;
      text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
      &::after {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 20px;
        z-index: 2;
        background-image: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0)
        );
      }
    }
  }
  .remd-song-text {
    margin-top: 5px;
    margin-left: 5px;
    font-size: 13px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}

.new-mucis {
  .title {
    position: relative;
    padding-left: 9px;
    margin-bottom: 14px;
    font-size: 17px;
    height: 20px;
    line-height: 20px;
    &::after {
      content: " ";
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -9px;
      width: 2px;
      height: 16px;
      background-color: #d33a31;
    }
  }
}
.content {
  position: relative;
  height: 50px;
  // line-height: 40px;
  border-bottom: 1px solid #ccc;
  width: 99%;
  margin-left: 1%;
  &.last-child {
      border-bottom: none;
  }
  .content-item {
    margin-left: 5px;
    .content-item-top {
      height: 30px;
      line-height: 30px;
      font-size: 17px;
    }
    .content-item-bottom {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #888;
      .content-item-icon {
        background-image: url("../assets/images/icon_2.png");
        display: inline-block;
        width: 12px;
        height: 8px;
        margin-right: 4px;
        margin-top: 6px;
        background-size: 166px 97px;
      }
      .content-item-text {
        width: 250px;
        height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
  }

  .content-box {
    // width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .content-box-icon {
      position: absolute;
      right: 10px;
      top: 14px;
      display: inline-block;
      width: 22px;
      height: 22px;
      background-image: url("../assets/images/icon_2.png");
      background-size: 166px 97px;
      background-position: -24px 0;
    }
  }
}
</style>