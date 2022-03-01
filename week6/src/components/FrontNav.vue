<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light py-3">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/">前台</router-link>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav me-auto">
					<li class="nav-item">
						<router-link class="nav-link" to="/">首頁</router-link>
					</li>
					<li class="nav-itemF">
						<router-link class="nav-link" to="/products"
							>產品列表</router-link
						>
					</li>
				</ul>
				<ul class="navbar-nav d-flex">
					<li>
						<router-link class="btn btn-primary position-relative" to="/carts">
							去結帳
							<span
								class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
							>
								{{ cartsData.carts.length }}
								<span class="visually-hidden"
									>unread messages</span
								>
							</span>
						</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/admin"
							>後臺管理</router-link
						>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
import emitter from "@/libs/emitter";

export default {
	data() {
		return {
			cartsData: {
				carts: [],
			},
		};
	},
	methods: {
		getCartList() {
			this.$http
				.get(
					`${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`
				)
				.then((res) => {
					// 將收到的data資料展賦予給cartsData
					this.cartsData = res.data.data;
				})
				.catch((err) => {
					// 跳出錯誤訊息
					alert(err.data.message);
				});
		},
	},
	mounted() {
		this.getCartList();
		emitter.on("get-cart-count", () => {
			this.getCartList();
		});
	},
};
</script>
