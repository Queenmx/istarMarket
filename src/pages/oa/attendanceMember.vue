<template>
  <div class="rooterEle attendanceMember">
      <v-header class="wrap" :isBack="false" @leftEvent="cancel">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">{{title}}</p>
        </v-header>
        <div class="wrap search" v-if="isSearch">
            <input type="text" placeholder="请填写搜索人员" v-model="searchUser">
            <i class="el-icon-search icon-search" @click="search"></i>
        </div>
      <select-member-list :isAll="isAll" :list="userList" :selectedMember.sync="selectedMember"></select-member-list>
      <div class="footer">
      <footer2 :text="getLength+'人'" :isAll="isAll" @sure="sure" @selectAll="seletedAll" ></footer2>
      </div>
  </div>
</template>
<script>
import selectMemberList from "../../components/selectMemberList";
import footer2 from "../../components/footer2";
import { getMembers, oaSearchUser } from "@/util/axios";
import { getItem } from "@/util/util";
export default {
  props: ["memberFlag", "inUsers", "leader"],
  data() {
    return {
      status: this.$route.query.status,
      title: "",
      isSearch: true,
      backUrl: "",
      isAll: false,
      userInfo: JSON.parse(getItem("userInfo")),
      userList: [],
      selectedMember: {},
      pageFlag: "",
      searchUser: ""
    };
  },
  watch: {
    memberFlag: function() {
      switch (this.memberFlag) {
        case "other":
          this.title = "其他参与人员";
          this.selectedMember = JSON.parse(JSON.stringify(this.inUsers));
          console.log(JSON.stringify(this.selectedMember));
          break;
        case "leader":
          this.title = "考勤组负责人";
          this.selectedMember = JSON.parse(JSON.stringify(this.leader));
          break;
      }
      console.log(this.memberFlag);
    }
  },
  mounted() {
    this.initTemplate();
    this.initData();
  },
  computed: {
    getLength() {
      let length = Object.getOwnPropertyNames(this.selectedMember).length - 1;
      if (this.userList.length && length == this.userList.length) {
        this.isAll = true;
      } else {
        this.isAll = false;
      }
      return length;
    }
  },
  components: {
    selectMemberList,
    footer2
  },
  methods: {
    seletedAll() {
      if (this.isAll) {
        this.selectedMember = {};
      } else {
        this.userList.forEach(item => {
          this.$set(this.selectedMember, item.userId, 1);
        });
      }
    },
    initTemplate() {
      if (!this.status) {
        this.title = "未知";
        return;
      }
      switch (this.status) {
        case "staff":
          this.title = "其他参与人员";
          break;
        case "leader":
          this.title = "考勤组负责人";
          break;
        case "apartment":
          this.title = "参与考勤员工";
          this.isSearch = false;
          break;
        default:
          this.title = "未知";
      }
    },
    async initData() {
      let data = {
        companyId: this.userInfo.companyId
      };
      let res = await getMembers(data);
      if (res.code === "0000") {
        res.data.forEach(item => {
          this.userList.push({
            userName: item.userName,
            headPic: item.headPic,
            userId: item.userId
          });
        });
      }
    },
    sure() {
      if (this.memberFlag == "other") {
        this.$emit("update:inUsers", this.selectedMember);
      } else if (this.memberFlag == "leader") {
        this.$emit("update:leader", this.selectedMember);
      }
      this.$emit("close");
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
      let res = await oaSearchUser(data);
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
  .search {
    position: relative;
    padding-top: rem(20px);
    padding-bottom: rem(20px);
    input {
      padding: rem(20px);
      padding-right: rem(50px);
      width: 100%;
      font-size: rem(32px);
      border: none;
      border-radius: 5px;
      box-sizing: border-box;
    }
    .icon-search {
      position: absolute;
      right: rem(40px);
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>


