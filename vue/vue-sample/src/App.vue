<template>
  <div>
    <Menubar/>
    <JobsList :jobs= 'jobs'/>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import Menubar from './components/Menubar.vue';
import JobsList from './components/JobsList.vue';
import faker from 'faker';
import Job from './types/Job';

  export default defineComponent({
    name: 'App',
    components: {
      Menubar,
      JobsList,
    },
    setup() {
      const jobs = ref<Job[]>([
        { title: faker.name.jobTitle(), location: faker.random.locale(), salary: faker.random.number(), id: faker.random.uuid(), description: faker.lorem.text() },
        { title: faker.name.jobTitle(), location: faker.random.locale(), salary: faker.random.number(), id: faker.random.uuid(), description: faker.lorem.text() },
        { title: faker.name.jobTitle(), location: faker.random.locale(), salary: faker.random.number(), id: faker.random.uuid(), description: faker.lorem.text() },
        { title: faker.name.jobTitle(), location: faker.random.locale(), salary: faker.random.number(), id: faker.random.uuid(), description: faker.lorem.text() },
        { title: faker.name.jobTitle(), location: faker.random.locale(), salary: faker.random.number(), id: faker.random.uuid(), description: faker.lorem.text() },
      ]);
      return { jobs }
    },
    data() {
    },
    methods: {
      
    },
  })

</script>
