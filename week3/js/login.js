import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";
const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const app = {
	data() {
		return {
			user: {
				username: "",
				password: "",
			},
		};
	},
	methods: {
		login() {
			const formData = {
				...this.user,
			};
			axios
				.post(`${apiUrl}/admin/signin`, formData)
				.then((res) => {
					const { token, expired } = res.data;
					// 將token與過期時間寫入cookie中並導向至商品頁
					document.cookie = `userId=${token};expires=${new Date(expired)}; path=/`;
					location.href = "list.html";
				})
				.catch((err) => {
					// 跳出錯誤訊息
					alert(err.data.message);
				});
		},
	},
};
createApp(app).mount("#app");
