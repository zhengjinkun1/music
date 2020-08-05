<template>
  <div class="search">
    <div class="search-inp">
      <van-search
        v-model="keyword"
        @input="search"
        @search="searchHistory(keyword)"
        shape="round"
        background="#fff"
        placeholder="请输入搜索关键词"
        @clear="aa"
      />
    </div>
    <!-- 热门搜索 -->
    <div class="before-result" v-if="isNum">
      <div class="hot-search" v-if="!isShow">
        <h3>热门搜索</h3>
        <ul class="list">
          <li class="content" @click="searchHistory(item.searchWord,index)" v-for="(item,index) in hotList" :key="index">{{item.searchWord}}</li>
        </ul>
      </div>
      <!-- 搜索建议 -->
      <div class="search-advise" v-if="isShow">
        <div class="search-show">
          <h3>{{text}}"{{keyword}}"</h3>
          <ul>
            <li class="search-advise-list" @click="searchHistory(item.keyword,index)" v-for="(item,index) in showList" :key="index">
              <i class="s-svg"></i>
              <span class="s-list">{{item.keyword}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 搜索历史 -->
      <div class="search-history" v-if="!isShow">
        <ul>
          <li class="search-advise-list"  v-for="(item,index) in historyList" :key="index">
            <i class="s-svg"></i>
            <span class="s-list" @click="searchHistory(item)">{{item}}</span>
            <i class="r-svg" @click="remove"></i>
          </li>
        </ul>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="search-result" v-if="!isNum">
      <div class="music">
        <div class="content1" v-for="(item,index) in searchList" :key="index" @click="getMusicId(index)">
          <div class="fl content1-item">
            <div class="content1-item-top">{{item.name}}</div>
            <div class="content1-item-bottom">
              <div class="content1-item-icon fl"></div>
              <div
                class="content1-item-text fl"
              >{{item.artists.map(art => art.name).join(' / ')}} - {{item.name}}</div>
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
  data() {
    return {
      text: "搜索",
      keyword: "",
      hotList: [],
      isShow: false,
      isNum: true,
      showList: [],
      historyList: [],
      searchList: []
    };
  },
  created() {
    this.getHotSearch();
    // 
  },
  methods: {
    // 获取热搜
    getHotSearch() {
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        // 延迟自动关闭加载提示，为0不会关闭
        duration: 0
      });
      this.axios({
        method: "get",
        url: "/search/hot/detail"
        // post传参需要在data中写
      })
        .then(res => {
          this.$toast.clear();
          
          if (res.data.code == 200) {
            this.hotList = res.data.data.slice(0, 10);
            // 
          }
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },
    aa() {
      this.searchList = [];
      this.isShow = false;
      this.isNum = true;
    },
    // 搜索建议
    search() {
      if (this.keyword.length != 0) {
        this.isShow = true;
      } else {
        this.isShow = false;
        return;
      }
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        // 延迟自动关闭加载提示，为0不会关闭
        duration: 0
      });
      this.axios({
        method: "get",
        url: "/search/suggest",
        params: {
          keywords: this.keyword,
          type: "mobile"
        }
      })
        .then(res => {
          this.$toast.clear();
          
          if (res.data.code == 200) {
            this.showList = res.data.result.allMatch;
            // 
          }
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },
    //搜索
    searchHistory(keyword,index) {
      
      
      this.isNum = false;
    
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        // 延迟自动关闭加载提示，为0不会关闭
        duration: 0
      });

      this.axios({
        method: "get",
        url: "/search",
        params: {
          keywords: keyword
        }
      })
        .then(res => {
          this.$toast.clear();

          this.historyList.unshift(this.keyword);

          

          // 
          if (res.data.code == 200) {
            this.searchList = res.data.result.songs;
          

          }
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },
    // 移除搜索历史
    remove(index) {
      this.historyList.splice(index, 1);
    },
    // 获取歌曲id
    getMusicId(index){
      let id =this.searchList[index].id;
      // 
      this.$router.push({name:'PlayMusic',query:{id}})
    }
  }
};
</script>

<style lang="less" scoped>
.van-search {
  border-bottom: 1px solid #f5f6f7;
}
.van-search__content {
  background: #ebecec;
}
/deep/ .van-icon {
  color: #d4d4d5;
}
.hot-search {
  padding: 15px 10px 0;
  h3 {
    font-size: 12px;
    line-height: 12px;
    color: #666;
  }
  .list {
    margin: 10px 0 7px;
    .content {
      display: inline-block;
      height: 32px;
      margin-right: 8px;
      margin-bottom: 8px;
      padding: 0 14px;
      font-size: 14px;
      line-height: 32px;
      color: #333;
      border: 1px solid #d3d4da;
      border-radius: 32px;
    }
  }
}
.search-advise {
  h3 {
    // position: relative;
    height: 45px;
    margin: 0px 0 0px 10px;
    padding-right: 10px;
    font-size: 15px;
    line-height: 50px;
    color: #507daf;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    border-bottom: 1px solid #eeeff0;
  }
}
.search-advise-list {
  position: relative;
  height: 45px;
  padding-left: 10px;
  display: flex;
}
.s-svg {
  margin-right: 7px;
  width: 15px;
  height: 15px;
  background-image: url("../assets/images/2.svg");
  display: inline-block;
  margin-top: 15px;
  flex: 0 0 auto;
}
.s-list {
  display: inline-block;
  flex: 1;
  padding-right: 10px;
  font-size: 15px;
  line-height: 45px;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  border-bottom: 1px solid #eeeff0;
}
.r-svg {
  position: absolute;
  right: 5px;
  top: 16px;
  width: 12px;
  height: 12px;
  background-image: url("../assets/images/3.svg");
  display: inline-block;
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
