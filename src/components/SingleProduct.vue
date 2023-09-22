<script setup>
	import { ref, onMounted } from "vue";
	import { useRoute, RouterLink } from "vue-router";
	import axios from "axios";
	let product = ref([]);
	const route = useRoute();
	let id = route.params.id;
	onMounted(async () => {
		try {
			const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
			product.value = await data;
		} catch (error) {
			console.log("Fetchin error: ", error);
		}
	});
</script>
<template>
	<div class="container mx-auto py-10 px-10 md:px-16 lg:px-20 xl:px-36">
		<nav class="flex" aria-label="Breadcrumb">
			<ol class="inline-flex items-center space-x-1 md:space-x-3">
				<li class="inline-flex items-center">
					<RouterLink
						:to="{ name: 'home' }"
						class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
					>
						<svg
							class="w-3 h-3 mr-2.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
							/>
						</svg>
						Home
					</RouterLink>
				</li>
				<li>
					<div class="flex items-center">
						<svg
							class="w-3 h-3 text-gray-400 mx-1"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 9 4-4-4-4"
							/>
						</svg>
						<span
							class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
						>
							{{ product.title }}
						</span>
					</div>
				</li>
			</ol>
		</nav>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 py-14">
			<div class="border border-gray-300 rounded-lg p-4 text-center">
				<img :src="product.thumbnail" :alt="product.title" class="mx-auto" />
			</div>
			<div class="space-y-3 px-4 py-5">
				<h3 class="text-lg text-gray-900 font-bold">
					Product:
					{{ product.title }}
				</h3>

				<p v-if="product.discountPercentage">
					<b>Price:</b>
					<span class="text-sky-500 font-bold">
						${{
							product.price -
							Math.ceil((product.price * product.discountPercentage) / 100)
						}}
					</span>
					<del class="text-red-500 text-sm ml-2">${{ product.price }}</del>
				</p>
				<p v-else>
					<b>Price: </b>
					<span class="text-sky-500 font-bold">${{ product.price }}</span>
				</p>
				<p><b>Discount:</b> {{ product.discountPercentage }}%</p>
				<p>
					<b>Brand: </b>
					<span class="text-sky-500">{{ product.brand }}</span>
				</p>
				<p>
					<b>Category: </b>
					<span class="text-sky-500">{{ product.category }}</span>
				</p>
				<p class="mb-6">
					<b>Descriptions:</b>
					{{ product.description }}
				</p>
			</div>
		</div>
	</div>
</template>
