export default {
	props: ["id", "apiUrl", "apiPath"],
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
				.get(`${this.apiUrl}/api/${this.apiPath}/product/${this.id}`)
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
	}
};