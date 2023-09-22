<script setup>
	import { defineProps } from "vue";
	import { RouterLink } from "vue-router";
	defineProps({
		category: Array,
	});
</script>
<template>
	<div>
		<RouterLink
			:to="{ name: 'product-by-cat', params: { category: category } }"
			class="bg-sky-500 border border-sky-500 text-white rounded-lg flex justify-center items-center py-2 px-2 hover:bg-transparent hover:text-sky-500 hover:transition-all"
		>
			{{ category }}
		</RouterLink>
	</div>
</template>
