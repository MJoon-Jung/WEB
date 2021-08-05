<template>
    <div class="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
        style="background-image: url(https://images.unsplash.com/photo-1624916888581-48904076264b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80);">
        <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div class="mt-2 items-center z-10">
            <form class="p-14 bg-white max-w-sm mx-auto rounded-xl shadow-xl overflow-hidden p-6 space-y-10">
                <h2 class="text-4xl font-bold text-center text-indigo-600">Register</h2>
                <div class="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500">
                    <input v-model="user.userid" type="text" name="userid" placeholder="ID"
                        class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent" />
                </div>
                <div class="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500">
                    <input v-model="user.name" type="text" name="name" placeholder="Name"
                        class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent" />
                </div>
                <div class="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500">
                    <input v-model="user.password" type="password" name="password" placeholder="Password"
                        class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent" />
                </div>
                <div class="block mt-2">
                    <label for="" class="flex items-center">
                        <input type="checkbox"
                            class="ml-2 rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <span class="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>
                <div class="flex items-center flex items-center justify-end mt-4">
                    <a class="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                        Forgot Password?
                    </a>
                    <button @click.prevent="registerListener"
                        class="px-6 py-2 ml-4 font-semibold cursor-pointer text-center focus:outline-none transition hover:shadow-lg shadow hover:bg-indigo-700 rounded-full text-white bg-indigo-600 ">
            register
        </button>
        </div>
    </form>
    </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from 'vuex';
export default defineComponent({
    setup() {
        const store = useStore();
        const register = (userInfo) => store.dispatch("Users/register", userInfo);
        return { register }
    },
    data() {
        return {
            user: {
                userid: '',
                name: '',
                password: '',
            },
        }
    },
    methods: {
        registerListener() {
            this.register(this.user)
        },
    },
})
</script>

// const store = useStore();
// const userId = computed(() => store.state.user.userId);
// const reviews = computed(() => store.state.reviews.reviews);
// const reviewsCount = computed(() => store.getters["reviews/reviewCount"]);
// const saveUserId = (newId: string) =>
// store.commit("user/updateUserId", newId);
// const updateReviews = () => store.dispatch("reviews/getReviews");
// return { userId, reviewsCount, reviews, updateReviews, saveUserId };

        // loginListener() {
        //     axios
        //         .post("/api/users", this.user)
        //         .then(() => console.log("register: ", this.user))
        //         .catch((err) => console.error(err));
        // },