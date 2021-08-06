<template>
  <div class="p-56">
    <div class="w-96 m-auto ">
        <div class=" grid grid-cols-3 grid-rows-7 grid-flow-row overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <div class="col-span-3 row-span-4 p-1 m-1">
            <a href="#">
              <img
                src="https://picsum.photos/640/400/?random"
                alt="Placeholder"
                class="rounded-t-xl object-cover h-48 w-full"
              />
            </a>
          </div>
  
          <div class="col-span-3 row-span-1">
            <div class="flex align-bottom flex-col leading-none p-2 md:p-4">
              <div class="flex flex-row justify-between items-center">
                <a
                  class="flex items-center no-underline hover:underline text-black"
                  href="#"
                >
                  <img
                    alt="Placeholder"
                    class="block rounded-full"
                    src="https://picsum.photos/32/32/?random"
                  />
                  <span class="ml-2 text-sm"> {{ memo.userid }} </span>
                </a>
              </div>
            </div>
          </div>            
          <h1 class="p-5 font-bold">{{ memo.title }}</h1>
  
          <div class="col-span-3 row-span-1">
            <header
              class="flex items-center justify-between leading-tight p-2 md:p-4"
            >
            <h1 class="text-lg">
              <a class="no-underline hover:underline text-black" href="#">
                {{ memo.content }}
              </a>
            </h1>
            <p class="text-grey-darker text-sm">* min ago</p>
          </header>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  props: {
    memoid: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    store.dispatch('Memos/getMemo', props.memoid);
    const memo = computed(() => store.state.Memos.memo);
    
    return { memo };
  }
});
</script>
