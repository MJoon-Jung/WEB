<template>
    <div class="bg-gray-100 text-gray-700  font-sans quicksand">
        <div class="p-16">
            <div class="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 m-5 mb-10">
                <div v-for="memo in memos" :key="memo.memoid" class="bg-white overflow-hidden hover:bg-green-100 border border-gray-200 p-3">
                    <div class="m-2 text-justify text-sm">
                        <p class="text-right text-xs">{{ memo.savedTime }}</p>
                        <h2 class="font-bold text-lg h-2 mb-8">{{ memo.title }}</h2>
                        <p class="text-xs">
                            {{ memo.content }}
                        </p>
                    </div>
                    <div class="w-full text-right mt-4">
                        <router-link :to="{ name: 'Read', params: { memoid: memo.memoid }}" class="text-green-400 uppercase font-bold text-sm" >자세히 보기</router-link>
                        <button @click="clickDeleteMemo(memo.memoid)" class="ml-5 text-red-400 uppercase font-bold text-sm" href="#">삭제 하기</button>
                        <button @click="clickUpdateMemo(memo.memoid)" class="ml-5 text-blue-400 uppercase font-bold text-sm" href="#">업데이트 하기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
    setup() {
        const store = useStore();
        const memos = computed(() => store.state.Memos.memos);
        const loadMemos = () => store.dispatch('Memos/getMemos');
        const deleteMemo = (memoid) => store.dispatch('Memos/deleteMemo', memoid);
        loadMemos();

        return { memos, deleteMemo };
    },
    methods: {
        clickDeleteMemo(memoid) {
            this.deleteMemo(memoid);
        }
    }
})
</script>


