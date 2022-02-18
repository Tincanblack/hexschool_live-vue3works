import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";
const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "works";
const app = createApp({
	components: {},
	data() {
		return {
			cartData: {},
			products: [],
			targetProduct: {},
		};
	},
	methods: {
		getProductsList() {
			axios
				.get(`${apiUrl}/api/${apiPath}/products/all`)
				.then((res) => {
					// 將收到的data資料展開至products
					this.products = res.data.products;
				})
				.catch((err) => {
					// 跳出錯誤訊息
					alert(err.data.message);
				});
		},
		openProductModal() {
			productModal;
		},
	},
	mounted() {
		this.getProductsList();
	},
});

app.component("product-modal", {
	props: ["targetProduct"],
	template: `#userProductModal`,
	mounted() {
		const productModal = new bootstrap.Modal(this.$refs.modal);
	},
});

app.mount("#app");
