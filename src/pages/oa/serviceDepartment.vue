<template>
  <div>
     <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">客服部</p>
        </v-header>
   <div v-for="(items,i) in data" :key="i">
			<ul>
				<li class="wrap flex item" v-for="(item,i) in items" :key="i">
					<div><img src="../../assets/images/avatar.jpg" alt=""></div>
					<div class="desc">{{item.name}}</div>
				</li>
			</ul>
		</div>
  </div>
</template>

<script>
import { centerTabs } from "../../util/util.js";
export default {
  data(){
    return{
        data:[
				[
				 {name:'王昭君',},
				 {name:'王昭君'},
         {name:'王昭君'},
         
         
				]
			
			]
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/style/common.scss";
    .item{
      width: 100%；
      height：rem(150px);
      line-height: rem(150px);
      div{
       
        overflow: hidden;
        
        img{
          width: rem(80px);
          height:rem(80px);
           border-radius:50%;
           vertical-align: middle;
           
        }
      }
      .desc{
        margin-left: rem(40px);
        font-size: rem(30px);
      }

    }
</style>



