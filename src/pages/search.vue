<template>
	<div class="search">
        <header class="header">
          查询工具
        </header>
		<div class="wrap search_list">
			<el-row v-for="(items,index) in listArr" :key="index">
			  <el-col :span="8" v-for="(item,i) in items" :key="i">
			  	<div class="grid-content" @click="goFunc(item.url)">
			  		<i :class="item.class"></i>
			  		<p class="name">{{item.text}}</p>
			  	</div>
			  </el-col>
			</el-row>
            <section v-for="(items,index) in listArr" :key="index" class="part">
                <h3 class="title">{{items.title}}</h3>
                <van-row>
                    <van-col span="12" v-for="(item,i) in items.items" :key="i" class="item">
                        <div @click="goFunc(item.url)" class="flex">
                            <i :class="item.class"></i>
                            <div class="rest content">
                                <p class="name">{{item.text}}</p>
                                <small class="hint">{{item.hint}}</small>
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </section>
		</div>
		<v-footer :activeIndex="1"></v-footer>
	</div>
</template>
<script>
export default {
  data() {
    return {
      listArr: [
        {
          title: "查询管理",
          items: [
            {
              class: "icon-creditcard",
              text: "信用查询",
              url: "/search/creditAuthorize",
              hint: "人性化查询"
            },
            {
              class: "icon-illegal",
              text: "违章查询",
              url: "",
              hint: "人性化查询"
            },
            {
              class: "icon-insurance-car",
              text: "车险查询",
              url: "",
              hint: "人性化查询"
            },
            {
              class: "icon-housing-fund",
              text: "公积金查询",
              url: "",
              hint: "人性化查询"
            },
            {
              class: "icon-insurance",
              text: "社保查询",
              url: "",
              hint: "人性化查询"
            }
          ]
        },
        {
          title: "费用管理",
          items: [
            {
              class: "icon-electric",
              text: "电费",
              url: "",
              hint: "电费查询"
            },
            { class: "icon-fire", text: "燃气费", url: "", hint: "燃气查询" },
            { class: "icon-water", text: "水费", url: "", hint: "水费查询" },
            {
              class: "icon-recharge",
              text: "手机充值",
              url: "",
              hint: "手机查询"
            }
          ]
        }
      ]
    };
  },
  methods: {
    goFunc(url) {
      this.$toast.clear();
      if (url) {
        this.$router.push({ path: url });
      } else {
        this.$toast("正在升级中");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.search {
  height: 100%;
  padding-bottom: rem(98px);
  box-sizing: border-box;
  header {
    height: rem(88px);
    line-height: rem(88px);
    font-size: rem(34px);
    color: #fefefe;
    text-align: center;
    background-image: linear-gradient(
      135deg,
      rgba(89, 159, 254, 0.9) 0%,
      rgba(49, 88, 224, 0.9) 100%
    );
  }
  .search_list {
    padding-top: rem(4px);
  }
  .item {
    padding: rem(38px) 0;
    .name {
      font-size: rem(28px);
      color: #020202;
      letter-spacing: rem(0.34px);
    }
    .hint {
      font-size: rem(24px);
      color: #666666;
      letter-spacing: rem(0.28px);
    }
    .content {
      margin-left: rem(20px);
    }
  }
  .title {
    font-size: rem(32px);
    color: #666666;
    letter-spacing: rem(0.38px);
  }
  .part {
    padding-top: rem(30px);
    &:not(:last-child) {
      border-bottom: rem(2px) solid #e7e4e4;
    }
  }
  .icon-creditcard,
  .icon-illegal,
  .icon-insurance-car,
  .icon-housing-fund,
  .icon-insurance,
  .icon-electric,
  .icon-fire,
  .icon-water,
  .icon-recharge {
    @include icon(rem(84px), rem(84px));
  }
}
</style>