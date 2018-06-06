<template>
    <div class="selectData">
        <ul>
            <li class="flex item" v-for="item in allData" :key="item[compareKey]" @click="setData(item)">
                <span class="rest">{{item[value]}}</span>
                <i class="icon-checked" v-show="isChecked(item)"></i>
            </li>
        </ul>
        <!-- <footer class="wrap flex footer">
                <div class="rest">
                    <slot name="footerContent">
                       <div>
                           <i></i>
                           <span>全选</span>
                       </div>
                    </slot>
                </div>
                <div class="btn-wrap" @click="del">
                    <span>确认({{deleteGroup.length}})</span>
                </div>
        </footer> -->
    </div>
</template>
<script>
export default {
  props: {
    allData: {
      type: Array,
      default: []
    }, //全部数据
    selectedData: {
      type: Array,
      default: []
    }, //选中数据
    value: {
      type: String
    }, //显示字段
    compareKey: {
      type: String
    } //对比字段
  },
  methods: {
    isChecked(data) {
      let key = this.compareKey;
      let res = false;
      res = this.selectedData.some(item => {
        return item[key] == data[key];
      });
      return res;
    },
    setData(data) {
      let key = this.compareKey;
      let value = data[key];
      let res = this.selectedData.some((item, index, array) => {
        if (item[key] == value) {
          array.splice(index, 1);
          return true;
        }
      });
      if (!res) {
        this.selectedData.push(data);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/common.scss";
.selectData {
  .item {
    height: rem(100px);
    border-bottom: rem(1px) solid $bdcolor;
  }
  .icon-checked {
    @include icon(rem(32px), rem(28px));
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: rem(100px);
    font-size: rem(30px);
    background: #fcfafa;
    border-top: rem(1px) solid #cccccc;
    .btn-wrap {
      color: #4d7bff;
      text-align: right;
      width: rem(120px);
    }
  }
}
</style>

