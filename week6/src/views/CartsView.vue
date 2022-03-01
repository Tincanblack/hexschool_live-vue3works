<template lang="">
	<h2 class="my-3">購物車</h2>
	<div class="container">
		<table class="table align-middle">
			<thead>
				<tr>
					<th>圖片</th>
					<th>商品名稱</th>
					<th>價格</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="product in products" :key="product.id">
					<td style="width: 200px">
						<div
							style="
								height: 100px;
								background-size: cover;
								background-position: center;
							"
							:style="{
								backgroundImage: `url(${product.imageUrl})`,
							}"
						></div>
					</td>
					<td>
						{{ product.title }}
					</td>
					<td>
						<div
							class="h5"
							v-if="product.price === product.origin_price"
						>
							{{ product.price }} 元
						</div>
						<div v-else>
							<del class="h6"
								>原價 {{ product.origin_price }} 元</del
							>
							<div class="h5">
								現在只要 {{ product.price }} 元
							</div>
						</div>
					</td>
					<td>
						<button
							type="button"
							class="btn btn-outline-danger"
							@click="addToCart(product.id)"
							:disabled="isLoadingItem === product.id"
						>
							<span
								v-show="isLoadingItem === product.id"
								class="spinner-border spinner-border-sm"
							></span>
							加到購物車
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import emitter from "@/libs/emitter";

export default {
	data() {
		return {
			cartsData: {
				carts: [],
			},
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
		addToCart(id, qty = 1) {
			const data = {
				product_id: id,
				qty,
			};
			this.isLoadingItem = id;
			this.$http
				.post(
					`${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart/`,
					{ data }
				)
				.then((res) => {
					alert(res.data.message);
					this.isLoadingItem = "";
					emitter.emit("get-cart-count");
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
