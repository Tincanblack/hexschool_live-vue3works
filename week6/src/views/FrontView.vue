<template lang="">
	<FrontNav></FrontNav>
	<router-view></router-view>
</template>
<script>
import FrontNav from "@/components/FrontNav.vue";
export default {
	components: {
		FrontNav,
	},
};
</script>
<style lang=""></style>
