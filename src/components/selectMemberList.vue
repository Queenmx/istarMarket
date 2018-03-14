<template>
    <ul class="wrap selectMemberList" >
        <li class="flex item" v-for="item in list" :key="item.userId" @click="toggleUser(item)">
            <div class="icon-wrap">
                <i :class="[{'active':selectedMember[item.userId]},'el-icon-circle-check']" @click="check(item)"></i>
            </div>
            <div class="avatar-wrap">
                <img class="avatar" :src="item.headPic">
            </div>
            <div class="name">
                <span>{{item.userName}}</span>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
  props: {
    isAll: {
      type: Boolean,
      default: false
    },
    /**
     * list格式
     * userName: item.userName,
       headPic: item.headPic,
       userId: tiem.userId
     */
    list: {
      type: Array,
      default: []
    },
    /**
     * selectedMember格式
     * key:userId
     * val:1
     */
    selectedMember: {
      type: Object,
      default: {}
    }
  },
  //   watch: {
  //     list: function(list) {
  //       var all = !list.some(item => {
  //         return !item.isActive;
  //       });
  //       console.log(111);
  //       this.$emit("update:isAll", all);
  //     }
  //   },
  //   computed: {
  //     check() {
  //       var all = !this.list.some(item => {
  //         return !item.isActive;
  //       });
  //       console.log(12);
  //       this.$emit("update:isAll", all);
  //     }
  //   },
  methods: {
    check(item) {
      item.isActive = !item.isActive;
      var all = !this.list.some(item => {
        return !item.isActive;
      });

      if (all) {
        this.$emit("selectAll");
      }
    },
    toggleUser(item) {
      let id = item.userId;
      if (this.selectedMember[id]) {
        this.$delete(this.selectedMember, id);
      } else {
        this.$set(this.selectedMember, id, 1);
      }
      this.$emit("update:seletedDepartment", this.selectedMember);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/common.scss";
.selectMemberList {
  background: #fff;
  .item {
    height: rem(149px);
    border-bottom: 1px solid $bdcolor;
  }
  .avatar-wrap {
    margin-right: rem(18px);
    margin-left: rem(28px);
  }
  .el-icon-circle-check {
    font-size: rem(42px);
    color: #d7d4d4;
    &.active {
      color: $blue;
    }
  }
  .avatar {
    width: rem(91px);
    height: rem(94px);
  }
  .name {
    font-size: rem(32px);
    color: $black;
  }
}
</style>

