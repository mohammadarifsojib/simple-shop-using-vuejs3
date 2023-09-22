import { createRouter, createWebHistory } from "vue-router";
const HomeView = () => import("../views/HomeView.vue");
const SingleProduct = () => import("../views/SingleProductView.vue");
const Categories = () => import("../views/CategoriesView.vue");
const ProductByCat = () => import("../views/ProductByCatView.vue");

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/product/:id",
			name: "single-product",
			component: SingleProduct,
			params: true,
		},
		{
			path: "/categories",
			name: "categories",
			component: Categories,
		},
		{
			path: "/categories/:category",
			name: "product-by-cat",
			component: ProductByCat,
			params: true,
		},
	],
});

export default router;
