<template>
  <div class="set">
    <v-header title="个人信息"></v-header>
    <split></split>
    <div>
      <div class="wrap flex item">
        <div class="wrap-img">
          <img :src="headPic" alt="">
        </div>
        <!-- <div class="right" @click="change">
          <span>更改头像</span>
          <i class="el-icon-arrow-right"></i>
        </div> -->
      </div>
      <split></split>
      <div >
			<!-- <split></split> -->
            <ul>
                <li class="wrap flex item" v-for="(item,index) in mainData" :key="index">
                    <div class="news">{{item.lable}}</div>
					<div class="news1">
                        {{userData[item.key]}}
                    </div>
                </li>
            </ul>
            <split></split>
            <ul>
                <li class="wrap flex item" v-for="(item,index) in phone" :key="index">
                    <div class="news">{{item.lable}}</div>
					<div class="news1">
                        {{userData[item.key]}}
                    </div>
                </li>
            </ul>
            <split></split>
            <ul>
                <li class="wrap flex item">
                    <div class="news">修改密码</div>
					<div class="news1"></div>
                </li>
                <split></split>
                <li class="wrap flex item">
                    <div class="news">关于星融</div>
					<div class="news1"></div>
                </li>
            </ul>
		</div>
    </div>
   <div class="btn-wrap">
			<button type="primary" class="btn" @click="out" >退出登录</button>
		</div>
  </div>
</template>
<script>
import { getSet } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      headPic: "",
      companyName: "",
      realName: "",
      phone: "",
      userName: "",
      accountType: "",
      mainData: [
        { lable: "所属公司", key: "companyName" },
        { lable: "账号", key: "userName" },
        { lable: "账号类型", key: "accountType" }
      ],
      phone: [
        { lable: "联系人", key: "realName" },
        { lable: "联系人手机", key: "phone" }
      ],
      userInfo: getItem("userInfo"),
      userData: {}
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      var data = {
        userId: this.userInfo.userId,
        userName: this.userInfo.userName
      };
      let res = await getSet(data);
      if (res.code === "0000") {
        this.userData = res.data;
        // this.companyName = res.data.companyName;
        // this.realName = res.data.realName;
        // this.phone = res.data.phone;
        // this.userName = res.data.userName;
        // this.headPic = res.data.headPic;
        // this.accountType = res.data.accountType;
      }
    },
    changepwd() {
      this.$router.push("/users/changepwd");
    },
    out() {
      //   localStorage.removeItem("userInfo");
      // console.log(localStorage.userinfo)
      window.localStorage.clear();
      this.$router.push({ path: "/login" });
    },
    change() {
      this.$message({ message: "正在升级中", duration: 1000 });
    },
    changeContact() {
      this.$message({ message: "正在升级中", duration: 1000 });
    },
    changePhone() {
      this.$message({ message: "正在升级中", duration: 1000 });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.set {
  background-color: #f8f8f8;
  height: 100%;
  .header {
    border-bottom: 0;
  }
  .wrap-img {
    border-radius: 100%;
    overflow: hidden;
    img {
      vertical-align: middle;
      width: rem(122px);
      height: rem(122px);
    }
  }
  .item {
    line-height: rem(96px);
    border-bottom: 1px solid #eeeeee;
    justify-content: space-between;
    font-size: rem(28px);
    background-color: #fff;
    .right {
      padding: rem(30px) 0;
      span {
        color: #959595;
      }
    }
    .news {
      font-size: rem(28px);
    }
    .news1 {
      color: #959595;
      font-size: rem(28px);
    }
  }
  .btn {
    width: 100%;
    margin-top: rem(82px);
    background-color: #fff;
    border: 0;
    border-radius: 5px;
    color: #000;
    font-size: rem(30px);
    height: rem(100px);
  }
}
</style>