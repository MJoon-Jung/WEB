<template>
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock > 0">In Stoke</p>
            <p v-else>Out Stoke</p>
            <ul>
                <li v-for="(detail, i) in details" :key="i">{{ detail }}</li>
            </ul>
            <div v-for="(variant, index) in variants" :key="variant.variantId" @mouseover="updateProduct(index)" class="color-box" :style="{ backgroundColor: variant.variantColor }"><p>{{ variant.variantColor }}</p></div>
            <button @click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock} ">Add to Cart</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Variants from '../types/Variants';

const variants: Variants[] = [
    { variantId: 2234, variantColor: 'green', variantImage: require('@/assets/images/socks1.jpg'), variantQuantity: 10 },
    { variantId: 2235, variantColor: 'blue', variantImage: require('@/assets/images/socks2.jpg'), variantQuantity: 0},
];

export default defineComponent({
    data: function() {
        return {
            brand: 'Vue',
            product: 'Socks',
            selectedVariant: 0,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants,
        };
    },
    methods: {
        updateProduct(index: number) {
            this.selectedVariant = index;
        },
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        }
    },
    computed: {
        title(): string {
            return `${this.brand} ${this.product}`;
        },
        image(): string {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(): number {
            return this.variants[this.selectedVariant].variantQuantity;
        }
    }
})
</script>

<style>

</style>