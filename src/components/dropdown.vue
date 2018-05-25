<template>
  <div class="dropdown">
      <div class="mask" v-show="isShowDropdown" @click="isShowDropdown=false" ref="mask"></div>
      <div>
        <div ref="header" @click.stop="isShowDropdown=!isShowDropdown">
            <span class="title">{{curTitle}}</span>
            <i class="icon iconfont icon-down" ></i>
        </div>
        <div v-show="isShowDropdown" ref="down" class="dropdown-body">
            <van-row>
                <van-col :span="col" v-for="(item,index) in dataArr" :key="index">
                    <span @click="selectData(item,index)" class="item active" :class="[{'active':activeIndex==index},'item']">{{item.text}}</span>
                </van-col>
            </van-row>
        </div>
      </div>
  </div>
</template>
<script>
import { getElementTop } from "@/util/util";
export default {
  props: {
    title: "",
    dataArr: "",
    textArr: "",
    defalutIndex: 0,
    col: {
      default: 8
    }
  },
  data() {
    return {
      activeIndex: this.defalutIndex,
      curTitle: this.title,
      isShowDropdown: false
    };
  },
  mounted() {
    this.$refs.down.style.width = document.documentElement.clientWidth + "px";
    let top = getElementTop(this.$refs.down);
    this.$refs.mask.style.top = top + "px";
    this.isShowDropdown = false;
    console.log("000");
    document.onclick = () => {
      this.isShowDropdown = false;
    };
  },
  methods: {
    selectData(item, index) {
      this.activeIndex = index;
      this.isShowDropdown = false;
      if (this.textArr) {
        this.curTitle = this.textArr[index];
      } else {
        this.curTitle = this.dataArr[index].text;
      }
      if (item.id !== undefined) {
        this.$emit("selectedEvent", item.id);
      } else {
        this.$emit("selectedEvent", item.text);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.dropdown {
  .activeItem {
    .item {
      color: $blue;
    }
  }
  .dropdown-body {
    position: fixed;
    left: 0;
    right: 0;
    // top: rem(95px);
    z-index: 500;
    background: #fff;
    span {
      line-height: rem(80px);
    }
  }
  .title {
    display: inline-block;
    vertical-align: middle;
  }
  .item {
    color: $black;
  }
  .icon-down {
    font-size: rem(12px);
  }
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.7);
  }
}
</style>
