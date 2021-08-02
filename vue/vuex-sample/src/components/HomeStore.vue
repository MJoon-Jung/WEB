<template>
  <h1>Welcome {{ userId }}</h1>
  <input v-model="newId" type="text" />
  <button @click="saveUserId(newId)">Save</button>
  <button @click="updateReviews">Update</button>
  <h1>{{ reviewsCount }}</h1>
  <ul>
    <li v-for="r in reviews" :key="r.id">
      <p>{{ r.body }}</p>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const userId = computed(() => store.state.user.userId);
    const reviews = computed(() => store.state.reviews.reviews);
    const reviewsCount = computed(() => store.getters["reviews/reviewCount"]);
    const saveUserId = (newId: string) =>
      store.commit("user/updateUserId", newId);
    const updateReviews = () => store.dispatch("reviews/getReviews");
    return { userId, reviewsCount, reviews, updateReviews, saveUserId };
  },
  // data() {
  //   return { newId: "" };
  // },
  // methods: {
  //   ...mapMutations(["updateUserId"]),
  //   ...mapActions("reviews", ["getReviews"]),
  //   saveUserId() {
  //     this.updateUserId(this.newId);
  //   },
  //   updateReviews() {
  //     this.getReviews();
  //   },
  //   updateUserId() {
  //     this.$store.commit("user/updateUserId", this.newId);
  //     this.newId = "";
  //   },
  //   updateReviews() {
  //     this.$store.dispatch("reviews/getReviews");
  //   },
  // },
});
</script>

<style></style>
