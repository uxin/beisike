<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <lay_foot v-if="!($route.path=='/show'||$route.path=='/login'||$route.path=='/register')"></lay_foot>
  </div>
</template>

<script>
import { Tabbar, TabItem } from "mint-ui";
// import lay_head from "@/components/layout/head";
import lay_foot from "@/components/layout/foot";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.commit("vueXInit");
  },
  components: {
    // lay_head,
    lay_foot,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

