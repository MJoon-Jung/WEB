<template>
    <div id="app">
        <div class="navbar"></div>
        <div class="cart">
            <p>Cart {{ cart.length }}</p>
        </div>
        <product @add-to-cart="addToCart"></product>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Product from './Product.vue';

const cart: number[] = [];
export default defineComponent({
    name: 'ProductPage',
    components: {
        Product
    },
    data: function() {
        return {
            cart,
        };
    },
    methods: {
        addToCart(variantId: number) {
            this.cart.push(variantId);
        },
    }
})
</script>

<style>

</style>