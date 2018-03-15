<template>
  <div class="set">
    <v-header class="header">
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">个人信息</p>
		</v-header>
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
				<li class="wrap flex item">
					<div class="news">所属公司</div>
					<div class="news1">
              {{companyName}}  
          </div>
				</li>
        <li class="wrap flex item">
					<div class="news">账号</div>
					<div class="news1">
              {{userName}}
          </div>
				</li>
        <li class="wrap flex item" @click="changeContact" >
					<div class="news">联系人</div>
					<div class="news1">{{realName}}
            <i class="el-icon-arrow-right" ></i>
          </div>
				</li>
        <li class="wrap flex item" @click="changePhone">
					<div class="news">联系人手机</div>
					<div class="news1">{{phone}}
            <i class="el-icon-arrow-right" ></i>
          </div>
				</li>
        <li class="wrap flex item" @click="changepwd">
					<div class="news">修改密码</div>
					<div class="news1">
            <i class="el-icon-arrow-right" ></i>
          </div>
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
export default {
  data() {
    return {
      headPic: "",
      companyName: "",
      realName: "",
      phone: "",
      userName: ""
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      getItem("userInfo");
      let userinfo = JSON.parse(localStorage.userInfo);
      console.log(userinfo);
      var data = {
        userId: userinfo.userId,
        userName: userinfo.userName
      };
      let res = await getSet(data);
      if (res.code === "0000") {
        console.log(res.data);
        this.companyName = res.data.companyName;
        this.realName = res.data.realName;
        this.phone = res.data.phone;
        this.userName = res.data.userName;
        this.headPic = res.data.headPic;
      }
    },
    changepwd() {
      this.$router.push("/users/changepwd");
    },
    out() {
      // localStorage.removeItem("userInfo");
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
    width: 80%;
    margin-left: 10%;
    margin-top: rem(82px);
    background-color: $blue;
    border: 0;
    border-radius: 5px;
    color: #fff;
    font-size: rem(26px);
    height: rem(81px);
  }
}
</style>