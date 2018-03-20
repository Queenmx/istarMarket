<template>
<div class="rooterEle attendanceGroup">
    <v-header class="wrap">
        <i slot="left" class="el-icon-arrow-left"></i>
        <p slot="title">考勤组管理</p>
    </v-header>
    <div>
        <p class="wrap info">全公司{{coNum}}人，参与考勤{{gpNum}}人</p>
        <p class="wrap link" @click="modifyGroup('add','')">添加考勤组</p>
        <p class="wrap info">考勤规则相同的人设置到同一考勤组，方便统计</p>
        <ul class="list" v-if="list&&list.length">
            <li class="item" v-for="item in list" :key="item.groupId">
                <div class="wrap content">
                    <h4 class="flex"><span class="rest">{{item.groupName}}</span><i class="el-icon-circle-close" @click="del(item.groupId)"></i></h4>
                    <p class="sub-item">
                        <i class="user"></i>
                        <span>成员：{{item.userNum}}人</span>
                    </p>
                    <p class="sub-item">
                        <i class="map"></i>
                        <span>{{item.location}}</span>
                    </p>
                </div>
                <div class="wrap btn-wrap">
                    <span class="btn-red"  @click="modifyGroup('modify',item)">修改成员及负责人</span>
                </div>
                <split></split>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
import { oaAttendanceGroupQuery, oaAttendanceGroupDel } from "@/util/axios";
import { getItem } from "@/util/util";
export default {
  data() {
    return {
      userInfo: JSON.parse(getItem("userInfo")),
      list: [],
      coNum: 0,
      gpNum: 0
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      let data = {
        companyId: this.userInfo.companyId
      };
      let res = await oaAttendanceGroupQuery(data);
      if (res.code === "0000") {
        this.list = res.data.list;
        this.coNum = res.data.coNum;
        this.gpNum = res.data.gpNum;
      }
    },
    modifyGroup(str, item) {
      this.$router.push({
        path: "/oaSystem/addAttendanceGroup",
        query: { status: str, groupId: item.groupId, groupName: item.groupName }
      });
      localStorage.setItem("addAttendanceGroup", str);
    },
    async del(id) {
      let data = {
        groupId: id
      };
      let res = await oaAttendanceGroupDel(data);
      if (res.code === "0000") {
        this.initData();
      } else {
        this.$message(res.msg);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.attendanceGroup {
  .info {
    padding-top: rem(30px);
    padding-bottom: rem(30px);
    color: #979797;
    font-size: rem(26px);
  }
  .link {
    height: rem(98px);
    line-height: rem(98px);
    font-size: rem(32px);
    background: #fff;
  }
  .list {
    background: #fff;
  }
  .item {
    h4 {
      font-size: rem(32px);
      color: #646464;
      i {
        color: #969696;
      }
    }
    .content {
      padding-top: rem(45px);
      padding-bottom: rem(45px);
      color: #646464;
    }
    .sub-item {
      padding-top: rem(30px);
      font-size: rem(26px);
      color: #969696;
    }
  }
  .btn-wrap {
    padding-top: rem(19px);
    padding-bottom: rem(19px);
    text-align: right;
    border-top: 1px solid $bdcolor;
    border-bottom: 1px solid $bdcolor;
    .btn-red {
      font-size: rem(24px);
    }
  }
  .user {
    @include icon(rem(30px),rem(33px));
    margin-right: rem(19px);
    vertical-align: text-bottom;
    background-image: url("../../assets/images/icon-user.png");
  }
  .map {
    @include icon(rem(29px),rem(38px));
    margin-right: rem(19px);
    vertical-align: text-bottom;
    background-image: url("../../assets/images/icon-map.png");
  }
}
</style>

