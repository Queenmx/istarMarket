<template>
  <div class="rooterEle attendanceMember">
      <v-header title="其他参与人员"></v-header>
        <!-- <div class="wrap search" v-if="isSearch">
            <input type="text" placeholder="请填写搜索人员" v-model="searchUser">
            <i class="el-icon-search icon-search" @click="search"></i>
        </div> -->
      <div class="wrap">
          <selectData :allData="allUser" :selectedData="inUsers" value="userName" compareKey="userId"></selectData>
      </div>
      <footer class="wrap flex footer" :class="[inUsers.length==allUser.length?'active':'']">
                <div class="rest">
                    <i :class="[allUser.length==inUsers.length?'icon-checked-circle-active':'icon-checked-circle']"></i>
                    <span>全选</span>
                </div>
                <div class="btn-wrap" @click="sure">
                    <span>确认({{inUsers.length}})</span>
                </div>
        </footer>
  </div>
</template>
<script>
import selectData from "@/components/selectData";
import { getMembers, oaSearchUser } from "@/util/axios";
import { getItem } from "@/util/util";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      userInfo: getItem("userInfo"),
      selectUser: [],
      allUser: []
    };
  },
  mounted() {
    this.init();
  },
  components: {
    selectData
  },
  computed: {
    ...mapState(["inUsers"])
  },
  methods: {
    async init() {
      let data = {
        companyId: this.userInfo.companyId
      };
      let res = await getMembers(data);
      if (res.code === "0000") {
        this.allUser = res.data;
      } else {
        this.$toast(res.msg);
      }
    },
    ...mapMutations(["SET_INUSERS"]),
    sure() {
      this.SET_INUSERS(this.inUsers);
      this.$router.go(-1);
    },
    cancel() {
      if (this.memberFlag) {
        this.$emit("close");
      } else {
        this.$router.go(-1);
      }
    },
    async search() {
      if (!this.searchUser.trim()) {
        this.$message("请输入搜索内容");
        return;
      }

      let data = {
        companyId: this.userInfo.companyId,
        userName: this.searchUser
      };

      data = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await oaSearchUser(data);
      res = JSON.parse(strDec(res, "ZND20171030APIMM"));
      if (res.code === "0000") {
        this.userList = [];
        res.data.forEach(item => {
          this.userList.push({
            userName: item.userName,
            headPic: item.headPic,
            userId: item.userId
          });
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.attendanceMember {
  padding-bottom: rem(100px);
  font-size: rem(30px);
  color: #020202;
  background: #fff;
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: rem(100px);
    font-size: rem(30px);
    color: #999999;
    background: #fcfafa;
    border-top: rem(1px) solid #cccccc;
    .btn-wrap {
      color: #4d7bff;
      text-align: right;
      width: rem(120px);
    }
    &.active {
      color: #4d7bff;
    }
  }
  .icon-checked-circle,
  .icon-checked-circle-active {
    @include icon(rem(41px), rem(43px));
    vertical-align: middle;
  }
  //   padding-bottom: rem(100px);
  //   .search {
  //     position: relative;
  //     padding-top: rem(20px);
  //     padding-bottom: rem(20px);
  //     input {
  //       padding: rem(20px);
  //       padding-right: rem(50px);
  //       width: 100%;
  //       font-size: rem(32px);
  //       border: none;
  //       border-radius: 5px;
  //       box-sizing: border-box;
  //     }
  //     .icon-search {
  //       position: absolute;
  //       right: rem(40px);
  //       top: 50%;
  //       transform: translateY(-50%);
  //     }
  //   }
  //   .footer {
  //     position: fixed;
  //     left: 0;
  //     right: 0;
  //     bottom: 0;
  //   }
}
</style>


