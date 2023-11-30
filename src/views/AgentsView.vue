
<template>
  <Navbar />

  <main class="w-screen h-screen text-white pt-6 bg-valorant">
    <div class="bg-black/60 mt-3">


      <section>
        <div v-if="agent" class="flex w-10/12 mx-auto">
          <aside class="w-4/12">
            <h1 class="text-6xl font-extrabold scale-x-50 -ml-[9.5dvw]">
              {{ agent.displayName }}
            </h1>

            <div>
              <h3 class="text-xl scale-y-75  font-semibold mt-2">ROLE</h3>
              <p class="font-bold flex items-center gap-2 text-2xl">
                <img :src="agent.role.displayIcon" alt="" class="w-6 h-6">
                <span class="uppercase scale-x-75 -ml-[1.2dvw]">
                  {{ agent.role.displayName }}
                </span>
              </p>
            </div>

            <div>
              <h3 class="font-bold mt-5">
                BIOGRAPHY
              </h3>
              <p class="mt-2 text-sm">
                {{ agent.description }}
              </p>
            </div>
          </aside>

          <div class="w-4/12">
            <img v-if="agent" :src="agent.fullPortrait" alt="" class="w-96">
            <div v-else>
              <p>Loading agent image...</p>
            </div>
          </div>

          <aside class="w-4/12">
            <div>
              <h3 class="text-center text-4xl font-extrabold">
                ABILITIES
              </h3>
              <div class="flex gap-4 mt-4">
                <button v-for="(abilityItem, index) in agent.abilities" :key="index"
                  @click="handleSelectAbility(abilityItem)"
                  :class="{ 'border border-red-500 bg-red-500': abilityItem.slot === selectedAbility.slot, 'border': abilityItem.slot !== ability && abilityItem.displayIcon }">
                  <img v-if="abilityItem && abilityItem.displayIcon" :src="abilityItem.displayIcon" alt=""
                    class="p-2 w-16 h-16">
                </button>
              </div>
            </div>

            <div v-if="selectedAbility">
              <h3 class="font-bold text-2xl mt-5">
                {{ selectedAbility.displayName }}
              </h3>
              <p class="overflow-auto h-32 text-sm mt-2">
                {{ selectedAbility.description }}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section class="w-8/12 mx-auto mt-2">
        <div v-if="agents.length" class="flex flex-wrap gap-1">
          <button v-for="(item, index) in agents" :key="index" @click="handleSelectAgent(item.uuid)"
            :class="{ 'border-red-800 border-2': item.uuid === selectedAgentUuid, 'border-black border': item.uuid !== selectedAgentUuid }">
            <img
              :src="item.displayIcon || 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'"
              class="w-[5dvw] h-[5dvw] object-cover" />
          </button>
        </div>
      </section>
    </div>

  </main>
</template>


<script setup>
import Navbar from '../components/Navbar.vue';

import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const agents = ref([]);
const agent = ref(null);
const selectedAgentUuid = ref(null);
const abilities = ref([]);
const selectedAbility = ref(null);

onMounted(() => {
  getAgents();
});

watch(selectedAgentUuid, (newAgentUuid) => {
  getAgentByUUID(newAgentUuid);
});


const getAgents = async () => {
  try {
    const response = await axios.get('https://valorant-api.com/v1/agents');
    agents.value = response.data.data;
    agent.value = response.data.data[0];
    selectedAgentUuid.value = response.data.data[0].uuid;
    abilities.value = response.data.data[0].abilities;
    selectedAbility.value = response.data.data[0].abilities[0];
  } catch (error) {
    console.error('Error get agents: ', error);
  }
};

const getAgentByUUID = (agentUuid) => {
  const existingAgent = agents.value.find((a) => a.uuid === agentUuid);

  if (existingAgent) {
    agent.value = existingAgent;
    abilities.value = existingAgent.abilities;
    selectedAbility.value = existingAgent.abilities[0];
  }

};

const handleSelectAgent = (agentUuid) => {
  selectedAgentUuid.value = agentUuid;
  getAgentByUUID(agentUuid);
};

const handleSelectAbility = (ability) => {
  selectedAbility.value = ability;
};

</script>


<style scoped>
.bg-valorant {
  background-image: url('https://i.ytimg.com/vi/Cw_WC5VM2IY/maxresdefault.jpg');
  @apply bg-cover bg-bottom;
}
</style>