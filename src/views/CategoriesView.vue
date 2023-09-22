<script setup>
	import { ref, onMounted } from "vue";
	import axios from "axios";
	import Navbar from "../components/Navbar.vue";
	import Categories from "../components/Categories.vue";
	let categories = ref([]);
	onMounted(async () => {
		try {
			const { data } = await axios.get(
				"https://dummyjson.com/products/categories"
			);
			categories.value = data;
		} catch (error) {
			console.log("Fetchin error: ", error);
		}
	});
</script>
<template>
	<Navbar />
	<div class="container mx-auto py-10 px-10 md:px-16 lg:px-20 xl:px-36">
		<div class="text-center pb-10">
			<h2 class="text-4xl">All Categories</h2>
		</div>
		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5"
		>
			<Categories
				v-for="category in categories"
				:key="category.id"
				:category="category"
			/>
		</div>
	</div>
</template>
<style scoped></style>
