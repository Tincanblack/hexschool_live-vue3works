import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
	{
		path: "/",
		component: () => import("@/views/FrontView.vue"),
		children: [
			{
				path: "",
				component: () => import("@/views/HomeView.vue"),
			},
			{
				path: "carts",
				component: () => import("@/views/CartsView.vue"),
			},
			{
				path: "products",
				component: () => import("@/views/ProductsView.vue"),
			},
			{
				path: "product/:id",
				component: () => import("@/views/ProductView.vue"),
			},
		],
	},
	{
		path: "/login",
		component: () => import("@/views/LoginView.vue"),
	},
	{
		path: "/admin",
		component: () => import("@/views/admin/AdminView.vue"),
		children: [
			{
				path: "products",
				component: () => import("@/views/admin/AdminProducts.vue"),
			},
			{
				path: "orders",
				component: () => import("@/views/admin/AdminOrders.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	linkActiveClass: "active",
});

export default router;
