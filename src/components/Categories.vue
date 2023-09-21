<script setup>
	import { ref, onMounted } from "vue";
	import { RouterLink } from "vue-router";
	import axios from "axios";
	let categories = ref([]);
	onMounted(async () => {
		try {
			const { data } = await axios.get(
				"https://dummyjson.com/products/categories"
			);
			categories.value = data;
			console.log(data);
		} catch (error) {
			console.log("Fetchin error: ", error);
		}
	});
</script>
<template>
	<div class="container mx-auto py-10 px-10 md:px-16 lg:px-20 xl:px-36">
		<div class="text-center pb-10">
			<h2 class="text-4xl">All Categories</h2>
		</div>
		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5"
		>
			<div v-for="category in categories" :key="category.id">
				<RouterLink
					to="#"
					class="bg-sky-500 border border-sky-500 text-white rounded-lg flex justify-center items-center py-2 px-2 hover:bg-transparent hover:text-sky-500 hover:transition-all"
				>
					{{ category }}
				</RouterLink>
			</div>
		</div>
	</div>
</template>
