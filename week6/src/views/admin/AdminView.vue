<template lang="">
	<AdminNav @logOut="logOut"></AdminNav>
	<router-view v-if="isCheckLogin"></router-view>
</template>
<script>
import AdminNav from "@/components/AdminNav.vue";

export default {
	components: {
		AdminNav,
	},
	data() {
		return {
			isCheckLogin: false,
		};
	},
	methods: {
		checkLogin() {
			// 將token寫入至headers
			const token = document.cookie.replace(
				/(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/,
				"$1"
			);
			if (token) {
				this.$http.defaults.headers.common["Authorization"] = token;
				this.$http
					.post(`${process.env.VUE_APP_URL}/api/user/check`, {
						api_token: this.token,
					})
					.then(() => {
						this.isCheckLogin = true;
					})
					.catch((err) => {
						// 如果無登入情況時或是驗證失敗會導向至登入頁並重新登入;
						alert(err.data.message);
						this.$router.push("/login");
					});
			} else {
				alert("尚未登入");
				this.$router.push("/login");
			}
		},
		logOut() {
			this.$http
				.post(`${process.env.VUE_APP_URL}/logout`)
				.then((res) => {
					this.isCheckLogin = false;
					alert(res.data.message);
					this.$router.push("/login");
				})
				.catch((err) => {
					alert(err.data.message);
				});
		},
	},
	mounted() {
		this.checkLogin();
	},
};
</script>
<style lang=""></style>
