<script>
import TimeTracker from './components/time-tracker/TimeTracker.vue';
import TimeTrackerClient from './components/time-tracker/TimeTrackerClient';


export default {
  components: {
    TimeTracker
  },
  data() {
    return {
      workEntries: null
    }
  },
  created() { 
    TimeTrackerClient.workEntries()
      .then(res => this.workEntries = res.data.data);
  },
}

</script>

<template>
  <main class=" h-screen 
                flex items-center justify-center 
              bg-extra-light-grey">
    <div v-if="workEntries">
      <TimeTracker :workEntry="workEntries[0]"/>
    </div>
  </main>
</template>

<style>
@import './assets/base.css';
</style>
