<template>
  <div>
    <div>
      <van-nav-bar :fixed="isFixed" title="歌单详情" left-text="返回" left-arrow @click-left="back" />
    </div>
    <div class="list-box">
      <div class="title clearFix" :style="{backgroundImage:'url('+creator.backgroundUrl+')'}">
        <div class="title-left fl">
          <span class="remd-back">{{playCount}}</span>
          <img class="auto-img" :src="musicList.coverImgUrl" alt />
        </div>
        <div class="title-right fl">
          <div class="title-right-top">{{musicList.name}}</div>
          <div class="title-right-bottom clearFix">
            <div class="title-icon fl">
              <img class="auto-img" :src="creator.avatarUrl" alt />
            </div>
            <div class="title-text fl">{{creator.nickname}}</div>
          </div>
        </div>
      </div>
      <div v-if="isDesc">
      <div class="tag clearFix">
        <span class="tag-text">标签：</span>
        <ul>
          <li class="tag-list" v-for="(item,index) in tag" :key="index">{{item}}</li>
          <!-- <li class="tag-list">wode</li> -->
        </ul>
      </div>
      
        <div class="show-content" v-if="isHas">
          <div class="show-choose">
            <span class="show-text">{{musicList.description}}</span>
            <br />
            <br />
            <span class="show-artist">封面插画师:Paco_Yao</span>
          </div>
          <div class="show-icon" @click="changeShow(1)">
            <i class="fa fa-angle-down fr" aria-hidden="true"></i>
          </div>
        </div>
        <div class="show-content" v-else>
          <div class="show-choose1">
            <span class="show-text">{{musicList.description}}</span>
            <br />
            <br />
            <span class="show-artist">封面插画师:Paco_Yao</span>
          </div>
          <div class="show-icon1" @click="changeShow">
            <i class="fa fa-angle-up" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div class="pmusic-list">
        <div class="pmusic-list-title">
          <h3 class="pmusic-list-title-con">歌曲列表</h3>
        </div>

        <div
          class="content1"
          v-for="(item,index) in musicList.tracks"
          :key="index"
          @click="getMusicId(index)"
        >
          <div class="fl content1-item">
            <div class="content1-item-top">
              <i class="content1-index">{{index}}</i>
              {{item.name}}
            </div>
            <div class="content1-item-bottom">
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
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.id = this.$route.query.id;
    
    this.getRemdList();
    
  },
  data() {
    return {
      isFixed: true,
      musicList: [],
      tag: [],
      creator: [],
      playCount: "",
      isHas: true,
      id: "",
      isDesc:true
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
    changeShow(index) {
      if (index == 1) {
        this.isHas = false;
      } else {
        this.isHas = true;
      }
    },
    getMusicId(index) {
      let id = this.musicList.tracks[index].id;
      // 
      this.$router.push({ name: "PlayMusic", query: { id } });
    },
    back() {
      this.$router.go(-1);
    },

    getRemdList(index) {
      // 

      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        // 延迟自动关闭加载提示，为0不会关闭
        duration: 0
      });
      this.axios({
        method: "get",
        url: "/playlist/detail",
        // post传参需要在data中写
        params: {
          id: this.id
        }
      })
        .then(result => {
          this.$toast.clear();
          
          if (result.data.code == 200) {
            this.musicList = result.data.playlist;
            
            this.playCount = this.changeNum(this.musicList.playCount);
            this.creator = this.musicList.creator;
            // this.creator = this.musicList.subscribers;
            

            this.tag = this.musicList.tags;
            if(this.musicList.description == null) {
              this.isDesc = false;
            }
          }
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    }
  }
};
</script>

<style lang="less" scoped>
.list-box {
  margin-top: 46px;
}
.title {
  width: 100%;
  height: 186px;
}
.title-left {
  position: relative;
  width: 126px;
  height: 126px;
  vertical-align: middle;
  padding: 20px;
  margin-top: 10px;
}
.title-right {
  position: relative;
  width: 208px;
  height: 126px;
  vertical-align: middle;
  // padding-right: 20px;
}
.title-right-top {
  height: 44px;
  margin-top: 32px;
  color: #fff;
  font-size: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.title-right-bottom {
  margin-top: 25px;
  height: 30px;
}
.title-icon {
  height: 30px;
  width: 30px;

  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    // border: 1px solid #000;
    border-radius: 50%;
    // box-sizing: border-box;
  }
}
.title-text {
  margin-left: 10px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #d6d0cf;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.tag {
  padding: 10px 10px 0 10px;
}
.tag-text {
  float: left;
  //   height: 21px;
  line-height: 25px;
  margin: 0 -10px 10px 10px;
}
.tag-list {
  // width: 40px;
  height: 21px;
  padding: 0px 10px;
  border: 1px solid #ccc;
  line-height: 21px;
  border-radius: 21px;
  float: left;
  text-align: center;
  margin-left: 10px;
}
.show-content {
  position: relative;
  margin-left: 20px;
}
.show-choose {
  height: 56px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 14px;
  color: #888888;
}
.show-choose1 {
  font-size: 14px;
  color: #888888;
}
.show-artist {
  font-size: 14px;
  color: #666;
}
.show-icon {
  // margin-top: 5px;
  font-size: 18px;
  margin-right: 10px;
  color: #888888;
}
.show-icon1 {
  position: absolute;
  bottom: -10px;
  right: 10px;
  font-size: 18px;
  // margin-right: 10px;
  color: #888888;
}
.pmusic-list-title {
  background-color: #eeeff0;
  // margin-left: 20px;
}
.pmusic-list-title-con {
  margin-left: 10px;
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

  .content1-item {
    // margin-left: 5px;

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
        margin-left: 10px;
        margin-right: 10px;
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

      .content1-item-text {
        margin-left: 30px;
        width: 250px;
        height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        color: #a7a7a7;
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

.remd-back {
  background-image: url("../assets/images/1.svg");
  position: absolute;
  right: 20px;
  top: 22px;
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
</style>