import { apiUrl, apiPath } from "./config.js";
import productDetailModal from "./components/productDetailModal.js";

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate; // 驗證
const { required, email, min, max } = VeeValidateRules; // 規則
const { localize, loadLocaleFromURL } = VeeValidateI18n; // 語系

// 定義驗證規則
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

// 載入語系
loadLocaleFromURL("https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json");

configure({
	generateMessage: localize("zh_TW"), //啟用 locale
});

const app = Vue.createApp({
	// 將 Vee-Validate 做區域註冊
	components: {
		VForm: Form,
		VField: Field,
		ErrorMessage: ErrorMessage,
	},
	data() {
		return {
			apiUrl,
			apiPath,
			cartsData: {
				carts: []
			},
			products: [],
			selectItemId: "",
			isLoadingItem: "",
			form: {
				user: {
					email: "",
					name: "",
					tel: "",
					address: "",
				},
				message: "",
			},
		};
	},
	methods: {
		getProductsList() {
			axios
				.get(`${apiUrl}/api/${apiPath}/products/all`)
				.then((res) => {
					// 將收到的data資料展賦予給products
					this.products = res.data.products;
				})
				.catch((err) => {
					// 跳出錯誤訊息
					alert(err.data.message);
				});
		},
		openProductModal(id) {
			this.selectItemId = id;
			// 透過refs觸發元件內openModal();
			this.$refs.productDetailModal.openModal();
		},
		getCartList() {
			axios
				.get(`${apiUrl}/api/${apiPath}/cart`)
				.then((res) => {
					// 將收到的data資料展賦予給cartsData
					this.cartsData = res.data.data;
				})
				.catch((err) => {
					// 跳出錯誤訊息
					alert(err.data.message);
				});
		},
		addToCart(id, qty = 1) {
			const data = {
				product_id: id,
				qty,
			};
			this.isLoadingItem = id;
			axios
				.post(`${apiUrl}/api/${apiPath}/cart/`, { data })
				.then((res) => {
					alert(res.data.message);
					this.getCartList();
					this.isLoadingItem = "";
				})
				.catch((err) => {
					// 跳出錯誤訊息
					alert(err.data.message);
				});
		},
		removeCartList() {
			axios
				.delete(`${apiUrl}/api/${apiPath}/carts`)
				.then((res) => {
					alert(res.data.message);
					this.getCartList();
				})
				.catch((err) => {
					// 跳出錯誤訊息
					alert(err.data.message);
				});
		},
		removeCartItem(id) {
			this.isLoadingItem = id;
			axios
				.delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
				.then((res) => {
					alert(res.data.message);
					this.getCartList();
					this.isLoadingItem = "";
				})
				.catch((err) => {
					// 跳出錯誤訊息
					alert(err.data.message);
				});
		},
		updateCartItem(item) {
			this.isLoadingItem = item.id;
			const data = {
				product_id: item.id,
				qty: item.qty,
			};
			axios
				.put(`${apiUrl}/api/${apiPath}/cart/${data.product_id}`, { data })
				.then((res) => {
					this.getCartList();
					this.isLoadingItem = "";
				})
				.catch((err) => {
					// 跳出錯誤訊息
					alert(err.data.message);
				});
		},
		createOrder() {
			const order = this.form;
			axios
				.post(`${apiUrl}/api/${apiPath}/order`, { data: order })
				.then((res) => {
					alert(res.data.message);
					this.$refs.form.resetForm();
					this.getCartList();
				})
				.catch((err) => {
					alert(err.data.message);
				});
		},
	},
	mounted() {
		this.getProductsList();
		this.getCartList();
	},
});

// 將 產品詳情 modal元件做全域註冊
app.component("product-detail-modal", productDetailModal);

app.mount("#app");
