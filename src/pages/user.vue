<template>
	<div class="users">
		<div class="img-wrap">
			<!-- <div class="users-wrap">
				<img :src="headPic" class="users-photo">		
			</div> -->
            <!-- <div class="tel">{{companyName}}</div>
            <div class="company">{{userName}}</div> -->
		</div>
        <!--  -->
        <div class="name-card">
            <div class="users-wrap">
                <img :src="headPic" class="users-photo">
                <span>{{userName}}</span>
            </div>
            <div class="user-info">
                <van-row>
                    <van-col span="16">
                        <ul class="user-phone">
                            <li><img src="../assets/images/mobile.png">{{phone}}</li>
                            <li><img src="../assets/images/location.png">上海市浦东新区巨峰路991号</li>
                        </ul>
                    </van-col>
                    <van-col span="8" class="small-logo"><img src="../assets/images/group.png"></van-col>
                </van-row>
                
            </div>
            
        </div>
        <div class="wrap title">常用工具</div>
		<div v-for="(items,i) in data" :key="i">
			<ul>
				<li class="wrap flex item" v-for="(item,i) in items" v-if="item.url" :key="i" @click="goFun(item.url)">
					<span :class="item.class"></span>
					<div class="desc">{{item.desc}}</div>
					<i :class="[{'icon-arrow-right':item.isIcon},'right']" v-if="item.isIcon"></i>
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
          //   {
          //     class: "icon-agency",
          //     desc: "我的订单",
          //     isIcon: true,
          //     url: "/users/agency"
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
      // console.log(userinfo);
      var data = {
        userId: userinfo.userId
      };
      let res = await getUserinfo(data);
      //   let deData1 = strDec(res.data, "ZND20171030APIMM");
      let deData = JSON.parse(res.data);
      console.log(deData);
      if (res.code === "0000") {
        this.phone = deData.phone;
        this.companyName = deData.companyName;
        this.headPic = deData.headPic;
        this.userName = deData.userName;
        this.accountType = deData.accountType;
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
  height: 100%;
  //   padding-bottom: rem(200px);
  background: #f1f0f0;
  .title {
    font-size: rem(32px);
    color: #444;
    line-height: rem(60px);
  }
  .img-wrap {
    background-image: linear-gradient(
      135deg,
      rgba(89, 159, 254, 0.9) 0%,
      rgba(49, 88, 224, 0.9) 100%
    );
    height: rem(210px);
    background-size: 100%;
  }
  .name-card {
    width: 92%;
    height: rem(400px);
    background: #fff;
    margin: rem(-90px) auto rem(50px);
    border-radius: rem(16px);
    box-shadow: 0 1px rem(16px) 0 rgba(102, 102, 102, 0.5);
    &:after {
      content: "";
      width: 100%;
      height: rem(18px);
      background-image: linear-gradient(-90deg, #599ffe 0%, #3158e0 100%);
    }
  }
  .users-wrap {
    // width: rem(100px);
    height: rem(100px);
    border-radius: 100%;
    background-color: #fff;
    padding: rem(3px);
    span {
      color: #4d7bff;
      font-size: rem(36px);
    }
  }
  .user-info {
    padding-top: rem(90px);
  }
  .user-phone {
    margin-left: rem(44px);
    border-right: 1px solid #eee;
    li {
      line-height: rem(72px);
      font-size: rem(26px);
      color: #666;
      img {
        width: rem(36px);
        height: rem(36px);
        padding-right: rem(10px);
        vertical-align: middle;
      }
    }
  }
  .small-logo {
    width: rem(100px);
    height: rem(100px);
    margin: rem(30px) 0 0 rem(60px);
    img {
      width: 100%;
    }
  }
  .users-photo {
    width: rem(100px);
    height: rem(100px);
    border-radius: 100%;
    border: #4d7bff solid 2px;
    margin: rem(-20px) rem(24px) 0;
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
  .item {
    height: rem(96px);
    background-color: #fff;
    color: #636363;
    font-size: rem(30px);
    border-bottom: rem(20px) solid $bdcolor;
    position: relative;
    .right {
      width: rem(28px);
      height: rem(28px);
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
  @include icon(rem(44px), rem(44px));
  background-image: url("../assets/images/xingbi.png");
}
.icon-myProduct {
  @include icon(rem(44px), rem(44px));
  background-image: url("../assets/images/myProduct.png");
}
.icon-agency {
  @include icon(rem(44px), rem(44px));
  background-image: url("../assets/images/agency.png");
}
.icon-myService {
  @include icon(rem(44px), rem(44px));
  background-image: url("../assets/images/servicenew.png");
}
.icon-set {
  @include icon(rem(44px), rem(44px));
  background-image: url("../assets/images/setting.png");
}
</style>
