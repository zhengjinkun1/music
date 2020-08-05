<template>
  <div class="hotMusic">
    <div class="top-img">
      <div class="top-text"></div>
      <div class="changeDate">更新日期:7月9日</div>
    </div>

    <van-list v-model="loadOptions.isLoading" :finished="loadOptions.isFinished" :finished-text="loadOptions.finishedText" @load="loadMusic">
      <div class="music">
        <div class="content1" v-for="(item,index) in musicList" :key="index" @click="getMusicId(index)">
          <div class="fl content1-item">
            <div class="content1-item-top">
              <i class="content1-index">{{index < 9 ? '0'+ (index +1) : index +1}}</i>
              {{item.name}}
            </div>
            <div class="content1-item-bottom">
              <div class="content1-item-icon fl"></div>
              <div
                class="content1-item-text fl"
              >{{item.ar.map(art => art.name).join(' / ')}} - {{item.name}}</div>
            </div>
          </div>
          <div class="content1-box">
            <div class="content1-box-icon"></div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allMusicList: [],
      musicList:[],
      loadCount:20,
      loadOptions: {
        //是否处于加载状态，加载过程中不触发load事件
        isLoading: true,

        //是否完成加载所有数据
        isFinished: false,

        finishedText: '没有数据可加载了'
      },
    };
  },
  created() {
    this.getMusic();
  },
  methods: {
    // 获取音乐列表
    getMusic() {
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        // 延迟自动关闭加载提示，为0不会关闭
        duration: 0
      });
      this.axios({
        method: "get",
        url: "/top/list",
        // post传参需要在data中写
        params: {
          idx: 1
        }
      })
        .then(res => {
          this.$toast.clear();
          // 
          if (res.data.code == 200) {
            this.allMusicList = res.data.playlist.tracks;
            this.musicList = this.allMusicList.splice(0,this.loadCount);
            
            if(this.allMusicList.length > 0) {
               this.loadOptions.isLoading = false;
            }
            // else {
            //   this.loadOptions.isLoading = true;
            //   this.loadOptions.isFinished = true;
            // }

            // if (this.musicList.length == 0) {
            //   this.loadOptions.finishedText  = '';
            // }
          
          }
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },
    loadMusic(){
      setTimeout(() => {
        this.loadOptions.isLoading = false;
        this.musicList.push(...this.allMusicList.splice(0,this.loadCount))
        if (this.allMusicList.length == 0) {
          this.loadOptions.isLoading =true;
          this.loadOptions.isFinished = true;
        }
      }, 1000);
      // 

      
    },

     // 获取歌曲id
    getMusicId(index){
      let id =this.musicList[index].id;
      // 
      this.$router.push({name:'PlayMusic',query:{id}})
    }
  }
};
</script>

<style lang="less" scoped>
.top-img {
  position: relative;
  padding-top: 38.9%;
  overflow: hidden;
  background: url("../assets/images/1.jpg") no-repeat;
  background-size: contain;

  .top-text {
    width: 142px;
    height: 67px;
    background-image: url("../assets/images/icon_2.png");
    background-size: 166px 97px;
    background-repeat: no-repeat;
    background-position: -24px -30px;
    position: absolute;
    left: 20px;
    top: 30px;
    z-index: 2;
  }
  .changeDate {
    position: absolute;
    top: 107px;
    left: 20px;
    color: #fff;
  }
}
.content1 {
  height: 50px;
  // line-height: 40px;
  border-bottom: 1px solid #ccc;
  position: relative;
  width: 99%;
  margin-left: 1%;
  &.last-child {
    border-bottom: none;
  }
  &:nth-child(-n + 3) {
    .content1-item {
      .content1-item-top {
        .content1-index {
          color: red;
        }
      }
    }
  }
  .content1-item {
    margin-left: 5px;

    .content1-item-top {
      width: 293.14px;
      height: 30px;
      line-height: 30px;
      font-size: 17px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;

      .content1-index {
        font-style: normal;
        color: #ccc;
      }
    }
    .content1-item-bottom {
      width: 293.14px;

      //   width: 100%;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #888;
      position: relative;
      .content1-item-icon {
        background-image: url("../assets/images/icon_2.png");
        display: inline-block;
        width: 12px;
        height: 8px;
        margin-right: 4px;
        margin-top: 6px;
        background-size: 166px 97px;
      }
      .content1-item-text {
        width: 250px;
        height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
  }

  .content1-box {
    // width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .content1-box-icon {
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