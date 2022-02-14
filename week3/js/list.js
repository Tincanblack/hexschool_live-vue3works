import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";
const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "works";
let productModal = null;
let delProductModal = null;
const app = {
	data() {
		return {
			targetProduct: {
				imagesUrl: [],
			},
			products: [],
			isNew: false,
		};
	},
	methods: {
		getProductsList() {
			axios
				.get(`${apiUrl}/api/${apiPath}/admin/products`)
				.then((res) => {
					// 將收到的data資料展開至products
					this.products = [...res.data.products];
				})
				.catch((err) => {
					// 跳出錯誤訊息
					alert(err.data.message);
				});
		},
		checkLogin() {
			// 將token寫入至headers
			const token = document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/, "$1");
			axios.defaults.headers.common["Authorization"] = token;
			axios
				.post(`${apiUrl}/api/user/check`)
				.then((res) => {
					// 如果成功驗證登入狀態則執行將產品列表render出來
					this.getProductsList();
				})
				.catch((err) => {
					// 如果無登入情況時瀏覽產品頁面或是驗證失敗會導向至登入頁並重新登入
					alert(err.data.message);
					location.href = "login.html";
				});
		},
		checkItemDetail(item) {
			// 當點擊時取得點到的item並將資料複製到temp裡去
			this.targetProduct = { ...item };
		},
		openModal(action, item) {
			if (action === "add") {
				// 如果是新增將template重置
				this.targetProduct = {
					imagesUrl: [],
				};
				this.isNew = true;
				productModal.show();
			} else if (action === "edit") {
				// 利用深拷貝將產品拷貝至template
				this.targetProduct = JSON.parse(JSON.stringify(item));
				this.isNew = false;
				productModal.show();
			} else if (action === "del") {
				// 利用深拷貝將產品拷貝至template
				this.targetProduct = JSON.parse(JSON.stringify(item));
				delProductModal.show();
			}
		},
		updateProduct() {
			// 新增產品 setting
			let url = `${apiUrl}/api/${apiPath}/admin/product`;
			let method = "post";
			// 更新產品 setting
			if (!this.isNew) {
				url = `${apiUrl}/api/${apiPath}/admin/product/${this.targetProduct.id}`;
				method = "put";
			}
			// AJAX
			axios[method](url, { data: this.targetProduct })
				.then((res) => {
					this.getProductsList();
					productModal.hide();
				})
				.catch((err) => {
					alert(err.data.message);
				});
		},
		delProduct() {
			// 刪除產品
			axios
				.delete(`${apiUrl}/api/${apiPath}/admin/product/${this.targetProduct.id}`)
				.then((res) => {
					this.getProductsList();
					delProductModal.hide();
				})
				.catch((err) => {
					alert(err.data.message);
				});
		},
	},
	mounted() {
		this.checkLogin();

		// 建立 bootstrap modal, 賦予至變數上
		// 編輯與新增modal
		productModal = new bootstrap.Modal(document.getElementById("productModal"));
		// 刪除商品modal
		delProductModal = new bootstrap.Modal(document.getElementById("delProductModal"));
	},
};
createApp(app).mount("#app");
