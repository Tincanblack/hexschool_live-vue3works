import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";
let productModal = null;
let delProductModal = null;
const app = {
	data() {
		return {
			apiUrl: "https://vue3-course-api.hexschool.io/v2",
			apiPath: "works",
			template: {
				imagesUrl: []
			},
			products: [],
			isNew: false,
		};
	},
	methods: {
		renderData() {
			axios
				.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
				.then((res) => {
					console.log(res);
					// 將收到的data資料展開至products
					this.products = [...res.data.products];
				})
				.catch((err) => {
					// 跳出錯誤訊息
					alert(err.data.message);
				});
		},
		checkLogin() {
			axios
				.post(`${this.apiUrl}/api/user/check`)
				.then((res) => {
					// 如果成功驗證登入狀態則執行將產品列表render出來
					this.renderData();
				})
				.catch((err) => {
					// 如果無登入情況時瀏覽產品頁面或是驗證失敗會導向至登入頁並重新登入
					alert(err.data.message);
					location.href = "login.html";
				});
		},
		checkItemDetail(item) {
			// 當點擊時取得點到的item並將資料複製到temp裡去
			this.template = { ...item };
		},
		openModal() {
			productModal.show();
		},
		// openModal(action, item) {
		// 	if (action === "new") {
		// 		this.isNew = true;
		// 		productModal.show();
		// 	}
		// },
	},
	mounted() {
		// Vue掛載完成時將token寫入至headers
		const token = document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/, "$1");
		axios.defaults.headers.common["Authorization"] = token;
		this.checkLogin();

		// 建立 bootstrap modal, 賦予至變數上
		// 編輯與新增modal
		productModal = new bootstrap.Modal(document.getElementById("productModal"));
		// 刪除商品modal
		delProductModal = new bootstrap.Modal(document.getElementById("delProductModal"));
	},
};
createApp(app).mount("#app");
