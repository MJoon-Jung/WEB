<template>
    <nav class="bg-indigo-500 p-3 ">
        <div class="flex justify-around text-2xl text-white">
            <div><router-link to="/" class="mr-20">Home</router-link></div>
            <div v-if="!isUserLoggedIn">
                <router-link to="/signin" class="mr-20">login</router-link>
                <router-link to="/signup">register</router-link>
            </div>
            <div v-else>
                <router-link to="/add">add memo</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
    setup() {
        const store = useStore();
        const isUserLoggedIn = computed(() => store.state.Users.isUserLoggedIn);

        return { isUserLoggedIn };
    },
})
</script>
