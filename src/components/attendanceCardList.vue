<template>
    <div class="attendanceCardList">
        <ul>
            <li class="wrap flex item">
                <div class="rest">
                    <div class="avatar-wrap">
                        <img class="avatar" src="http://xrjf.oss-cn-shanghai.aliyuncs.com/xgf/platform/f4328fd041ca46859e37.png">
                    </div>
                    <div class="inblock mes-wrap">
                        <p class="title">{{userName}}</p>
                        <p class="mes">考勤组：{{groupName}}</p>
                    </div>
                </div>
                <div class="date-wrap">
                     <el-date-picker readonly ref="picker" v-model="value1" type="date" @change="getData" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                     <!-- <i class="date-arrow el-icon-arrow-down" @click="showPicker"></i> -->
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { getItem, formateTime } from "@/util/util";
export default {
  props: {
    groupName: ""
  },
  data() {
    var date = new Date();
    return {
      value1: formateTime(date, "yyyy-MM-dd"),
      showFlag: true,
      userName: JSON.parse(getItem("userInfo")).userName
    };
  },
  methods: {
    showPicker() {
      if (this.showFlag) {
        this.$refs.picker.focus();
      } else {
        this.$refs.picker.blur();
      }
      this.showFlag = !this.showFlag;
    },
    getData(e) {
      this.$emit("getData", e);
    }
  }
};
</script>
<style lang="scss">
@import "../assets/style/common.scss";
.attendanceCardList {
  .item {
    align-items: flex-end;
    padding-top: rem(20px);
    padding-bottom: rem(20px);
    border-bottom: 1px solid $bdcolor;
    background: #fff;
  }
  .title {
    margin-bottom: rem(22px);
    font-size: rem(32px);
    color: $black;
  }
  .mes {
    font-size: rem(24px);
    color: $grey;
  }
  .avatar {
    width: rem(91px);
    height: rem(94px);
  }
  .mes-wrap {
    vertical-align: middle;
  }
  .date-wrap {
    position: relative;
    .date-arrow {
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 150px;
    // box-sizing: border-box;
    input {
      border: none;
    }
  }
}
</style>


