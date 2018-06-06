<template>
<div class="rooterEle attendanceGroup">
    <v-header title="考勤组管理">
    </v-header>
    <div>
        <!-- 无考勤组头部 -->
        <div class="header1" v-if="list.length==0">
            <div class="icon-wrap">
                <router-link to="/oaSystem/addAttendanceGroup" class="icon-addGroup"></router-link>
            </div>
            <div>
                <p class="title">全公司{{coNum}}人，参与考勤{{gpNum}}人</p>
                <p class="hint">目前还没有添加任何考勤组哦</p>
            </div>
        </div>
        <!-- 有考勤组头部 -->
        <div class="header2" v-else>
            <div class="slider-header">
                <div class="sub-header1" v-if="isSet">
                    <div class="header-main">
                    <div class="iconGroup">
                        <i class="icon-cancel" v-show="isDelete" @click="isDelete=false"></i>
                        <i class="icon-bin" v-show="!isDelete" @click="isDelete=true"></i>
                    </div>
                    <div class="icon-wrap">
                       <router-link to="/oaSystem/addAttendanceGroup" class="icon-addGroup"></router-link>
                    </div>
                    <div>
                        <p class="title">全公司{{coNum}}人，参与考勤{{gpNum}}人</p>
                        <p class="hint">考勤规则相同的人设置到同一考勤组，方便统计</p>
                    </div>
                </div>
                <div class="group">
                    <van-row>
                        <van-col span="4" v-for="item in list" :key="item.groupId">
                            <div class="group-item" @click="delGroup(item)">
                                <div class="avatar-wrap">
                                    <img src="http://img2.imgtn.bdimg.com/it/u=3799333761,2545428405&fm=27&gp=0.jpg"/>
                                </div>
                                <div>
                                    <p class="group-name">{{item.groupName}}</p>
                                </div>
                                <i class="icon-delete-red" v-show="isDelete"></i>
                            </div>
                        </van-col>
                    </van-row>
                </div>
                </div>
                <div>
                    <p class="ladder" @click="isSet=!isSet" :class="[isSet?'ladder-grey':'ladder-white','ladder']">
                        <i class="icon-arrow-down"></i>
                        <span v-show="!isSet">点击管理</span>
                        <span v-show="isSet">点击收起</span>
                    </p>
                </div>
            </div>
            <div class="sub-header2" v-if="!isSet">
                考勤规则相同的人设置到同一考勤组，方便统计
            </div>
        </div>
        <ul class="list">
            <li v-for="item in list" :key="item.groupId">  
                <split></split>
                <div class="flex item">
                    <div class="avatar-wrap">
                        <img src="http://img2.imgtn.bdimg.com/it/u=3799333761,2545428405&fm=27&gp=0.jpg">
                    </div>
                    <div class="rest item">
                        <div class="flex subItem">
                            <p class="rest">{{item.groupName}}</p>
                            <p class="grey">
                                <i class="icon-user-group"></i>
                                <span>{{item.userNum}}人</span>
                            </p>
                        </div>
                        <div class="link subItem" >
                            <router-link class="link" :to="{path:'/oaSystem/addAttendanceGroup',query:{groupId:item.groupId,groupName:item.groupName}}">修改成员及负责人</router-link></div>
                    </div>
                </div>
            </li>
        </ul>
        <footer class="wrap flex footer" v-show="isDelete&&deleteGroup.length">
                <div class="rest">
                    <span>{{deleteGroup|getNames}}</span>
                </div>
                <div class="btn-wrap" @click="del">
                    <span>确认({{deleteGroup.length}})</span>
                </div>
        </footer>
    </div>
</div>
</template>
<script>
import { oaAttendanceGroupQuery, oaAttendanceGroupDel } from "@/util/axios";
import { getItem } from "@/util/util";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      userInfo: getItem("userInfo"),
      list: [],
      coNum: 0,
      gpNum: 0,
      deleteGroup: [],
      isSet: false, //是否要管理
      isDelete: false //是否删除
    };
  },

  mounted() {
    this.init();
  },
  filters: {
    getNames(list) {
      let arr = list.map(item => {
        return item.groupName;
      });
      return arr.join(",");
    }
  },
  methods: {
    init() {
      this.getGroups();
    },
    //查询所有考勤组
    async getGroups() {
      let data = {
        companyId: this.userInfo.companyId
      };
      let res = await oaAttendanceGroupQuery(data);
      if (res.code === "0000") {
        this.list = res.data.list;
        this.coNum = res.data.coNum;
        this.gpNum = res.data.gpNum;
      } else {
        this.$toast(res.msg);
      }
    },
    modifyGroup(str, item) {
      this.$router.push({
        path: "/oaSystem/addAttendanceGroup",
        query: { status: str, groupId: item.groupId, groupName: item.groupName }
      });
      localStorage.setItem("addAttendanceGroup", str);
    },
    //选择删除考勤组
    delGroup(delItem) {
      if (!this.isDelete) return;
      let isHas = this.deleteGroup.some(item => {
        return item.groupId == delItem.groupId;
      });
      if (!isHas) {
        this.deleteGroup.push(delItem);
      }
    },
    //删除考勤组
    async del() {
      let id = this.deleteGroup
        .map(item => {
          return item.groupId;
        })
        .join(",");
      let data = {
        groupId: id
      };
      let res = await oaAttendanceGroupDel(data);
      if (res.code === "0000") {
        this.getGroups();
        this.deleteGroup = [];
        this.isDelete = false;
      } else {
        this.$toast(res.msg);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.attendanceGroup {
  background: #fff;
  .header1 {
    padding-top: rem(156px);
    text-align: center;
  }
  .header2 {
    position: relative;
    height: rem(172px);
    text-align: center;
    .group-name {
      font-size: rem(24px);
      color: #333333;
    }
    .slider-header {
      position: absolute;
      left: 0;
      right: 0;
      background: #fff;
    }
    .sub-header2 {
      //   padding-top: rem(64px);
      height: rem(172px);
      line-height: rem(190px);
      font-size: rem(28px);
      color: #fff;
      //   box-sizing: border-box;
      background-image: linear-gradient(
        128deg,
        #5ca4ff 0%,
        #599ffe 0%,
        #3158e0 100%
      );
    }
  }
  .header-main {
    position: relative;
    padding-bottom: rem(48px);
  }
  .icon-cancel {
    @include icon(rem(42px), rem(50px));
  }
  .icon-bin {
    @include icon(rem(32px), rem(40px));
  }
  .iconGroup {
    position: absolute;
    right: rem(36px);
    top: 0;
  }
  .title {
    margin-bottom: rem(12px);
    font-size: rem(28px);
    color: #020202;
  }
  .hint {
    font-size: rem(24px);
    color: #333333;
  }
  .icon-wrap {
    padding-bottom: rem(70px);
  }
  .icon-addGroup {
    @include icon(rem(319px), rem(278px));
  }
  .avatar-wrap {
    padding-bottom: rem(12px);
    width: rem(88px);
    height: rem(88px);
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }
  .group {
    padding-top: rem(36px);
    // padding-bottom: rem(20px);
    background: #f5f4f4;
    border: rem(1px) solid #eaeaea;
    .group-item {
      position: relative;
      padding-bottom: rem(20px);
    }
  }
  .ladder-grey {
    background: #f5f4f4;
    &::before,
    &::after {
      background: #f5f4f4;
    }
  }
  .ladder-white {
    background: #fff;
    &::before,
    &::after {
      background: #fff;
    }
  }
  .ladder {
    display: inline-block;
    position: absolute;
    left: 50%;
    margin-left: rem(-95px);
    width: rem(170px);
    height: rem(40px);
    line-height: rem(40px);
    &::before {
      content: "";
      display: block;
      width: rem(24px);
      height: rem(40px);
      position: absolute;
      transform: skewX(20deg);
      top: 0;
      left: rem(-11px);
      border-bottom-left-radius: rem(4px);
    }
    &:after {
      content: "";
      display: block;
      width: rem(24px);
      height: rem(40px);
      position: absolute;
      transform: skewX(-20deg);
      top: 0;
      right: rem(-11px);
      border-bottom-right-radius: rem(4px);
    }
  }
  .icon-delete-red {
    position: absolute;
    top: rem(10px);
    right: rem(10px);
    @include icon(rem(24px), rem(24px));
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
  .list {
    .item {
      padding-top: rem(6px);
      background: #fff;
    }
    .avatar-wrap {
      margin: 0 rem(44px);
    }
    img {
      height: rem(104px);
      width: rem(104px);
      border-radius: 50%;
    }
    .subItem {
      padding-right: rem(48px);
      height: rem(92px);
      line-height: rem(92px);
      font-size: rem(30px);
      &:not(:last-child) {
        border-bottom: rem(1px) solid $bdcolor;
      }
    }
    .link {
      font-size: rem(28px);
      text-align: right;
      color: #4d7bff;
    }
  }
  .icon-user-group {
    @include icon(rem(39px), rem(30px));
    vertical-align: middle;
  }
  .grey {
    color: #666666;
  }
}
</style>

