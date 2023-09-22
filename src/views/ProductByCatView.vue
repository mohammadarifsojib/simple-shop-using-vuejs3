<script setup>
	import { ref, onMounted } from "vue";
	import { useRoute, RouterLink } from "vue-router";
	import axios from "axios";
	import Navbar from "../components/Navbar.vue";
	import Products from "../components/Products.vue";
	const route = useRoute();
	let productByCat = ref([]);
	onMounted(async () => {
		try {
			const { data } = await axios.get(
				`https://dummyjson.com/products/category/${route.params.category}`
			);
			productByCat.value = data.products;
		} catch (error) {
			console.log("Fetching error: ", error);
		}
	});
</script>
<template>
	<Navbar />
	<div
		v-if="productByCat.length > 1"
		class="container mx-auto py-10 px-10 md:px-16 lg:px-20 xl:px-36"
	>
		<div class="text-center">
			<h2 class="text-4xl">
				Products of
				<span class="text-sky-500">{{ route.params.category }}</span>
			</h2>
		</div>
		<div
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-14"
		>
			<Products
				v-for="product in productByCat"
				:key="product.id"
				:product="product"
			/>
		</div>
	</div>
	<div v-else class="container mx-auto py-10 px-10 md:px-16 lg:px-20 xl:px-36">
		<div class="text-center">
			<h1 class="text-4xl">
				No products found of the category
				<span class="text-sky-500 italic">{{ route.params.category }}</span>
			</h1>
		</div>
	</div>
</template>
