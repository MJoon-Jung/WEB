Vue.component('product', {
    template:`
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock > 0">In Stoke</p>
            <p v-else>Out Stoke</p>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <div v-for="(variant, index) in variants" :key="variant.variantId" @mouseover="updateProduct(index)" class="color-box" :style="{ backgroundColor: variant.variantColor }"><p>{{ variant.variantColor }}</p></div>
            <button @click="addToCart" :disabled="!inStock" :class="{disabledButton:!inStock}">Add to Cart</button>
            
        </div>
    </div>
    `,
    data: function() {
        return {
            brand: 'Vue',
            product: 'Socks',
            selectedVariant: 0,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                { variantId: 2234, variantColor: 'green', variantImage: './assets/images/socks1.jpg', variantQuantity: 10 },
                { variantId: 2235, variantColor: 'blue', variantImage: './assets/images/socks2.jpg', variantQuantity: 0},
            ],
        };
    },
    methods: {
        updateProduct(index) {
            this.selectedVariant = index;
        },
        addToCart() {
            this.$emit('add-to-cart', this.variants.variantId);
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        cart: [],
    },
    methods: {
        addToCart(variantId) {
            this.cart.push(variantId);
        },
    }
});

// let app = new Vue({
//     el: '#app',
//     data: {
//         brand: 'Vue',
//         product: 'Socks',
//         selectedVariant: 0,
//         details: ['80% cotton', '20% polyester', 'Gender-neutral'],
//         variants: [
//             { variantId: 2234, variantColor: 'green', variantImage: './assets/images/socks1.jpg', variantQuantity: 10 },
//             { variantId: 2235, variantColor: 'blue', variantImage: './assets/images/socks2.jpg', variantQuantity: 0},
//         ],
//         cart: 0,
//     },
//     methods: {
//         addToCart() {
//             this.cart++;
//         },
//         updateProduct(index) {
//             this.selectedVariant = index;
//         },
//     },
//     computed: {
//         title() {
//             return this.brand + ' ' + this.product;
//         },
//         image() {
//             return this.variants[this.selectedVariant].variantImage;
//         },
//         inStock() {
//             return this.variants[this.selectedVariant].variantQuantity;
//         }
//     }
// })





{/* <div class="product">
<div class="product-image">
    <img v-bind:src="image">
</div>
<div class="product-info">
    <h1>{{ title }}</h1>
    <p v-if="inStock > 0">In Stoke</p>
    <p v-else>Out Stoke</p>
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    <div v-for="(variant, index) in variants" :key="variant.variantId" @mouseover="updateProduct(index)" class="color-box" :style="{ backgroundColor: variant.variantColor }"><p>{{ variant.variantColor }}</p></div>
    <button @click="addToCart" :disabled="!inStock" :class="{disabledButton:!inStock}">Add to Cart</button>
    <div class="cart">
        <p>Cart  {{ cart }}</p>
    </div>
</div>
</div>
`, */}