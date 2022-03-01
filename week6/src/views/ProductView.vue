<template lang="">
	<h2 class="my-3">產品</h2>
	<div class="container">
		<img :src="product.imageUrl" />
	</div>
</template>
<script>
export default {
	data() {
		return {
			product: {},
		};
	},
	methods: {
		getProduct() {
			console.log(this.$route.params.id);
			const { id } = this.$route.params;
			this.$http
				.get(
					`${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/product/${id}`
				)
				.then((res) => {
					// 將收到的data資料展賦予給products
					this.product = res.data.product;
				})
				.catch((err) => {
					// 跳出錯誤訊息
					alert(err.data.message);
				});
		},
	},
	mounted() {
		this.getProduct();
	},
};
</script>
