<template lang="">
	<h2 class="my-3">產品列表</h2>
	<div class="container">
		<div class="row row-cols-1 row-cols-lg-4 g-3">
			<div class="col" v-for="product in products" :key="product.id">
				<div class="card h-100">
					<img :src="product.imageUrl" class="card-img-top" />
					<div class="card-body">
						<h5 class="card-title">{{ product.title }}</h5>
						<p class="card-text">{{ product.description }}</p>
					</div>
					<div class="card-footer">
						<div class="btn-group btn-group-sm">
							<router-link
								class="btn btn-primary"
								:to="`/product/${product.id}`"
								>查看詳情</router-link
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			products: [],
			isLoadingItem: "",
		};
	},
	methods: {
		getProductsList() {
			this.$http
				.get(
					`${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products/all`
				)
				.then((res) => {
					// 將收到的data資料展賦予給products
					this.products = res.data.products;
				})
				.catch((err) => {
					// 跳出錯誤訊息
					alert(err.data.message);
				});
		},
	},
	mounted() {
		this.getProductsList();
	},
};
</script>
