<template>
  <div class="dropdown">
      <div class="mask" v-show="isShowDropdown" @click="isShowDropdown=false" ref="mask"></div>
      <div>
        <div ref="header" @click.stop="isShowDropdown=!isShowDropdown" class="dropdown-header">
            <i :class="[{'icon-img':iconImg},iconImg]"></i>
            <span class="title">{{curTitle}}</span>
            <i :class="[{'icon-arrow':iconClass},iconClass]"></i>
        </div>
        <div v-show="isShowDropdown" ref="down" class="dropdown-body">
            <van-row>
                <van-col :span="col" v-for="(item,index) in dataArr" :key="index" class="item">
                    <div @click="selectData(item,index)">
                        <span :class="[{'active':activeIndex==index}]">{{item.text}}
                    </span>
                    </div>
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
    iconClass: {
      type: String,
      default: "icon-arrow-down"
    },
    iconImg: {
      type: String,
      default: ""
    },
    defalutIndex: { type: Number, default: 0 },
    col: {
      default: 8
    }
  },
  data() {
    return {
      activeIndex: this.defalutIndex,
      curTitle: this.title,
      isShowDropdown: true
    };
  },
  mounted() {
    this.$refs.down.style.width = document.documentElement.clientWidth + "px";
    let top = getElementTop(this.$refs.down);
    this.$refs.mask.style.top = top + "px";
    this.isShowDropdown = false;
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
  text-align: center;
  flex: 1;
  .activeItem {
    .item {
      color: $blue;
    }
  }
  .icon-checked {
    @include icon(rem(32px), rem(28px));
    vertical-align: text-bottom;
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
  .icon-img {
    @include icon(rem(52px), rem(52px));
  }
  .title {
    display: inline-block;
    vertical-align: middle;
  }
  .item {
    position: relative;
    height: rem(100px);
    line-height: rem(100px);
    font-size: rem(32px);
    color: #666666;
    div {
      height: 100%;
    }
  }
  .active {
    color: #4d7bff;
    &::after {
      content: "";
      position: absolute;
      bottom: rem(36px);
      right: rem(30px);
      margin-left: rem(18px);
      @include icon(rem(32px), rem(28px));
      background-image: url("../assets/images/icon-checked@3x.png");
    }
  }
  .icon-arrow {
    @include icon(rem(32px), rem(19px));
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
