<script setup>
	import { ref, onMounted } from "vue";
	import axios from "axios";

	import Navbar from "../components/Navbar.vue";
	import Products from "../components/Products.vue";
	let products = ref([]);
	let postLimit = 12;
	// get all products
	onMounted(async () => {
		try {
			const { data } = await axios.get(
				`https://dummyjson.com/products?limit=${postLimit}`
			);
			products.value = data.products;
		} catch (error) {
			console.log("Fetchin error: ", error);
		}
	});
</script>

<template>
	<Navbar />
	<div class="container mx-auto py-10 px-10 md:px-16 lg:px-20 xl:px-36">
		<div class="text-center">
			<h2 class="text-4xl">All Products</h2>
		</div>
		<div
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-14"
		>
			<Products
				v-for="product in products"
				:key="product.id"
				:product="product"
			/>
		</div>
	</div>
</template>
