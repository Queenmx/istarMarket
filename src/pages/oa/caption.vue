<template>
    <div class="caption">
        <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">考勤组负责人</p>
        </v-header>
        <ul class="wrap">
            <li v-for="(item,index) in list" :key="index" class="item">
                <h4>{{item.title}}</h4>
                <p class="text">{{item.text}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          title: "什么是考勤组负责人？",
          text:
            "阿萨德客户开发赶不及sad和部分速度防守打法还 是接收到回复vsdvfsdf水电费速度速度与法国是独 孤有适当收到一份收到一份"
        },
        {
          title: "考勤组负责人权限包括哪些？",
          text:
            "阿萨德客户开发赶不及sad和部分速度防守打法还 是接收到回复vsdvfsdf水电费速度速度与法国是独 孤有适当收到一份收到一份"
        },
        {
          title: "考勤组负责人权限不包括哪些？",
          text:
            "阿萨德客户开发赶不及sad和部分速度防守打法还 是接收到回复vsdvfsdf水电费速度速度与法国是独 孤有适当收到一份收到一份"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.caption {
  .item {
    padding-top: rem(50px);
    h4 {
      margin-bottom: rem(35px);
      font-size: rem(32px);
      color: #646464;
    }
    .text {
      font-size: rem(28px);
      color: #969696;
    }
  }
}
</style>


