// import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";
const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "works";

VeeValidate.defineRule("email", VeeValidateRules["email"]);
VeeValidate.defineRule("required", VeeValidateRules["required"]);

Object.keys(VeeValidateRules).forEach((rule) => {
	if (rule !== "default") {
		VeeValidate.defineRule(rule, VeeValidateRules[rule]);
	}
});

// Activate the locale
VeeValidate.configure({
	generateMessage: VeeValidateI18n.localize("zh_TW"),
	validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const app = Vue.createApp({
	components: {},
	data() {
		return {
			cartsData: {},
			products: [],
			selectItemId: "",
			isLoadingItem: "",
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
					console.log(res);
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
					console.log(res);
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
	},
	mounted() {
		this.getProductsList();
		this.getCartList();
	},
});

// 將 產品詳情 modal元件做全域註冊
app.component("product-detail-modal", {
	props: ["id"],
	template: `#userProductModal`,
	data() {
		return {
			modal: {},
			selectProduct: {},
			qty: 1,
		};
	},
	watch: {
		// 監控id當有變化時執行getProduct()
		id() {
			this.getProduct();
		},
	},
	methods: {
		openModal() {
			this.modal.show();
		},
		closeModal() {
			this.modal.hide();
		},
		getProduct() {
			axios
				.get(`${apiUrl}/api/${apiPath}/product/${this.id}`)
				.then((res) => {
					// 將收到的data資料展賦予給products
					this.selectProduct = res.data.product;
				})
				.catch((err) => {
					// 跳出錯誤訊息
					alert(err.data.message);
				});
		},
		addToCart() {
			this.$emit("add-cart", this.selectProduct.id, this.qty);
			this.closeModal();
		},
	},
	mounted() {
		// 建立 bootstrap modal 實體, 賦予至modal
		this.modal = new bootstrap.Modal(this.$refs.modal);
	},
});

app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);

app.mount("#app");
