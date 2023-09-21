<script setup>
	import { ref, onMounted } from "vue";
	import axios from "axios";
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

	// short description
	function shortDesc(text, maxLength) {
		if (text.length <= maxLength) {
			return text;
		} else {
			const lastSpaceIndex = text.lastIndexOf(" ", maxLength);
			if (lastSpaceIndex === -1) {
				return text.slice(0, maxLength) + "...";
			} else {
				return text.slice(0, lastSpaceIndex) + "...";
			}
		}
	}
</script>

<template>
	<div class="container mx-auto py-10 px-10 md:px-16 lg:px-20 xl:px-36">
		<div class="text-center">
			<h2 class="text-4xl">All Products</h2>
		</div>
		<div
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-14"
		>
			<article
				v-for="product in products"
				:key="product.id"
				class="relative space-y-3 border border-gray-300 px-4 py-5 rounded-lg"
			>
				<!-- In Stock -->
				<span
					v-if="product.stock > 0"
					class="absolute top-0 right-0 text-sm bg-sky-500 text-white px-2 py-1 rounded-tr-lg"
					>In Stock</span
				>
				<span
					v-else
					class="absolute top-0 right-0 text-sm bg-sky-500 text-white py-1 px-2 rounded-tr-lg"
					>Out Of Stock</span
				>
				<RouterLink
					:to="{ name: 'single-product', params: { id: product.id } }"
				>
					<img
						class="h-[160px] w-full"
						:src="product.thumbnail"
						:alt="product.title"
					/>
				</RouterLink>
				<RouterLink
					:to="{ name: 'single-product', params: { id: product.id } }"
					class="block mt-5"
				>
					<h3 class="text-lg text-gray-900 font-bold">{{ product.title }}</h3>
				</RouterLink>

				<p class="text-sm" v-if="product.discountPercentage">
					Sale Price:
					<span class="text-sky-500 font-bold">
						${{
							product.price -
							Math.ceil((product.price * product.discountPercentage) / 100)
						}}
					</span>
					<del class="text-red-500 text-sm ml-2">${{ product.price }}</del>
				</p>
				<p v-else class="text-sm">
					Price:
					<span class="text-sky-500 font-bold">${{ product.price }}</span>
				</p>
				<p class="mb-6">{{ shortDesc(product.description, 40) }}</p>
				<RouterLink
					:to="{ name: 'single-product', params: { id: product.id } }"
					class="inline-block bg-sky-500 text-white text-sm border border-sky-500 px-3 py-1 capitalize rounded-lg hover:bg-transparent hover:text-sky-500 hover:border-sky-500 hover:transition-all"
				>
					View Details
				</RouterLink>
			</article>
		</div>
	</div>
</template>

<style scoped></style>
