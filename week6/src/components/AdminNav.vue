<template lang="">
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/admin">後臺管理</router-link>
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
						<router-link class="nav-link" to="/admin/orders"
							>訂單管理</router-link
						>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/admin/products"
							>產品管理</router-link
						>
					</li>
				</ul>
				<hr class="d-md-none text-white-50" />
				<ul class="navbar-nav d-flex flex-row flex-wrap ms-md-auto">
					<li class="nav-item col-6 col-md-auto">
						<router-link class="nav-link" to="/"
							>返回前台</router-link
						>
					</li>
					<li class="nav-item col-6 col-md-auto">
						<button
							class="btn btn-primary"
							type="button"
							@click.prevent="logOut"
						>
							登出
						</button>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
<script>
export default {
	methods: {
		logOut() {
			this.$emit("logOut");
		},
	},
};
</script>
<style lang=""></style>
