<template>
	<div class="users">
		<div class="img-wrap">
			<div class="users-wrap">
				<img :src="headPic" class="users-photo">		
			</div>
			
            <div class="tel">{{companyName}}</div>
            <div class="company">{{userName}}</div>
		</div>
		<div v-for="(items,i) in data" :key="i">
			<split></split>
			<ul>
				<li class="wrap flex item" v-for="(item,i) in items" v-if="item.url" :key="i" @click="goFun(item.url)">
					<span :class="item.class"></span>
					<div class="desc">{{item.desc}}</div>
					<i class="el-icon-arrow-right" :class="[{'el-icon-arrow-right':item.isIcon},'right']" v-if="item.isIcon"></i>
				</li>
			</ul>
		</div>
		
		<v-footer :activeIndex="3"></v-footer>
	</div>
</template>

<script>
import { getUserinfo } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      headPic: "",
      phone: "",
      companyName: "",
      userName: "",
      accountType: JSON.parse(getItem("userInfo")).accountType,
      data: []
    };
  },
  mounted() {
    this.setItems();
    this.initData();
  },
  methods: {
    setItems() {
      var data = [
        [
          {
            class: "icon-money",
            desc: "星币",
            isIcon: true,
            url: "/users/money"
          },
          // { class: "icon-myProduct", desc: "我的产品", isIcon: true, url: "" },
          {
            class: "icon-agency",
            desc: "我的订单",
            isIcon: true,
            url: "/users/agency"
          }
        ],
        [
          //   {
          //     class: "icon-myService",
          //     desc: "我的客服",
          //     isIcon: true,
          //     url: "/users/myService"
          //   },
          {
            class: "icon-myService",
            desc: "我的客服",
            isIcon: true,
            url: this.accountType === "主账号" ? "/users/myService" : ""
          },
          { class: "icon-set", desc: "设置", isIcon: true, url: "/users/set" }
        ]
      ];
      this.data = data;
    },
    async initData() {
      getItem("userinfo");
      console.log(localStorage);
      let userinfo = JSON.parse(localStorage.userInfo);
      console.log(userinfo);
      var data = {
        userId: userinfo.userId
      };
      // var endata = strEnc(data);
      var endata = strEnc("你好", "ZND20171030APIMM");
      console.log(endata);
      var dedata = strDec(endata, "ZND20171030APIMM");
      console.log(dedata);
      let res = await getUserinfo(data);
      if (res.code === "0000") {
        this.phone = res.data.phone;
        this.companyName = res.data.companyName;
        this.headPic = res.data.headPic;
        this.userName = res.data.userName;
        this.accountType = res.data.accountType;
      }
    },

    goFun(url) {
      if (url) {
        this.$router.push({ path: url });
      } else {
        this.$message({ message: "正在升级中", duration: 1000 });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.users {
  width: 100%;
  padding-bottom: rem(200px);
  .img-wrap {
    background: url(../assets/images/bg-users.png) no-repeat center;
    height: rem(510px);
    background-size: 100%;
    .users-wrap {
      position: absolute;
      width: rem(170px);
      height: rem(170px);
      border-radius: 100%;
      background-color: #fff;
      overflow: hidden;
      padding: rem(3px);
      top: rem(138px);
      left: 50%;
      margin-left: rem(-85px);
    }
    .users-photo {
      width: rem(170px);
      height: rem(170px);
      border-radius: 100%;
    }
    .tel {
      color: #fff;
      font-size: rem(36px);
      font-weight: 500;
      padding-top: rem(350px);
      text-align: center;
    }
    .company {
      color: #fff;
      font-size: rem(28px);
      padding-top: rem(35px);
      text-align: center;
    }
  }
  .item {
    height: rem(96px);
    background-color: #fff;
    color: #636363;
    font-size: rem(30px);
    border-bottom: 1px solid $bdcolor;
    position: relative;
    .right {
      color: #c8c8c8;
      position: absolute;
      top: rem(35px);
      right: rem(25px);
    }
    .desc {
      margin-left: rem(18px);
    }
  }
}
.icon-money {
  @include icon(rem(44px),rem(44px));
  background-image: url("../assets/images/money.png");
}
.icon-myProduct {
  @include icon(rem(44px),rem(44px));
  background-image: url("../assets/images/myProduct.png");
}
.icon-agency {
  @include icon(rem(44px),rem(44px));
  background-image: url("../assets/images/agency.png");
}
.icon-myService {
  @include icon(rem(44px),rem(44px));
  background-image: url("../assets/images/myService.png");
}
.icon-set {
  @include icon(rem(44px),rem(44px));
  background-image: url("../assets/images/set.png");
}
</style>
