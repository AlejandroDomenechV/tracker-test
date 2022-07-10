<template>
    <div class="flex  bg-lightest-grey px-6 py-2 rounded-3xl gap-4">
        <div class="flex items-center gap-5">
            <div class="flex align-center">
                <span class="text-xs font-sans font-light">
                    {{formatTime(elapsedTime)}}
                    <span   v-show="workStatus === 'online' || workStatus === 'paused'" 
                            class=" text-xs text-light-grey
                                    font-sans font-light ">
                        <span class="text-xs font-sans font-light"> / </span>
                        {{formatTime(totalTime)}}
                    </span>
                </span>
                
            </div>
            <div class="flex align-center gap-2">
                <button
                    @click="trackButtonEvent"
                    class=" flex items-center justify-center 
                            min-w-[7em] 
                            px-3 py-1.5 
                            rounded-3xl bg-teal">
                    <p class="  text-xs text-white
                                font-cera font-medium">
                        {{ workStatus === "offline" || paused ? "Entrar" : "Pausar" }}
                    </p>
                </button>
                <button v-show="workStatus === 'online' || workStatus === 'paused'" 
                        @click="stopTracking"  
                        class="
                            flex items-center justify-center 
                            min-w-[7em] px-3 py-1.5 
                            rounded-3xl bg-salmon">
                    <p class="
                            text-xs text-white
                            font-cera font-medium">
                        Salir
                    </p>
                </button>
            </div>
        </div>
        <div class="flex items-center border-r border-light-grey my-1"></div>
        <div class="flex items-center gap-5">
            <div class="relative">
                <img 
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=258&h=258&q=80" 
                alt="profile image"
                class="block h-7 rounded-full"
                >
                <div :class="statusColor" class="absolute w-2.5 h-2.5 left-[80%] top-[35%] rounded-full"></div>
            </div>
            <DropDown>
                <template #button="{toggle}">
                    <div class="flex items-center justify-center gap-2">
                        <button class="font-cera  font-medium" @mouseover="toggle">
                            {{ employeeFirstName }} {{ employeeLastName }}
                        </button>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-chevron-down" 
                            width="16" height="16" viewBox="0 0 24 24" 
                            stroke-width="2" stroke="#000000" 
                            fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </div>
                </template>
                <div class="absolute right-0 top-8 min-w-[14em]
                            flex flex-col 
                            align-center justify-center gap-px 
                            bg-extra-light-grey 
                            rounded-lg shadow-lg">
                    <div class="absolute top-[-10px] left-0 right-0 bottom-0"></div>
                    <div class="absolute top-[-10px] left-3/4 w-0 h-0 
                                border-l-transparent border-r-transparent 
                                border-l-4 border-r-4 
                                border-b-[10px] border-b-white"></div>
                    <DropDown>
                        <template #button="{toggle}">
                            <a href="/" @mouseover="toggle" 
                                class=" grid grid-cols-[1fr_auto_1fr] justify-center 
                                        font-cera text-xs py-4 px-2 
                                        text-center text-dark-grey 
                                        bg-white hover:bg-light-teal 
                                        first:rounded-t-lg last:rounded-b-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-chevron-left" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <polyline points="15 6 9 12 15 18" />
                                </svg>
                                <span>Mis cuentas</span>
                            </a>
                        </template>
                        <div class="absolute right-full top-0
                                px-1.5 min-w-[14em]
                                flex flex-col align-center justify-center gap-px 
                                bg-transparent rounded-lg">
                            <UserItem accountName="Sesame1" accountProfile="S1" userName="Kelly Pierce" timeRecorded="00:00" />
                            <UserItem accountName="Sesame2" accountProfile="S2" userName="Kelly Pierce" timeRecorded="00:00" />
                        </div>
                    </DropDown>
                    <ListItem>Vista Empleado</ListItem>
                    <ListItem>Mi perfil</ListItem>
                    <ListItem>Cerrar sesión</ListItem>
                </div>
            </DropDown>
        </div>
    </div>
</template>

<script>
    import DropDown from './DropDown.vue'
    import UserItem from './UserItem.vue'
    import ListItem from './ListItem.vue'
    import TimeTrackerClient from './TimeTrackerClient'


    export default {
        components: {
            DropDown,
            UserItem,
            ListItem
        },
        props: {
            workEntry: {
                type: Object,
                required: true,
            }
        }
        ,
        data() {
            return {
                employeeFirstName: this.workEntry.employee.firstName,
                employeeLastName: this.workEntry.employee.lastName,
                workStatus: this.workEntry.employee.workStatus,

                workEntryIn: null,
                workEntryOut: null,

                elapsedTime: 0,
                totalTime: 0,

                paused: false,
                trackInterval: null,
                totalTimeInterval: null,
            }
        },
        computed: {
            statusColor() {
                return this.workStatus === "online" ? 'bg-teal' : 'bg-light-grey';
            },
            trackButtonEvent() {
                let func = null;

                if(this.workStatus === "offline") func = this.trackTime;
                else if(this.workStatus === "paused") func = this.resume;
                else func = this.pause;

                return func;
            },
        },
        methods: {
            trackTime() {
                this.paused = false;
                if(this.workStatus !== "online" && this.workStatus !== 'paused')
                    TimeTrackerClient.clockIn()
                        .then(response => {
                            this.workEntryIn = response.data.data.workEntryIn;
                            this.resume();
                        })
                        .catch(error => console.log(error));
            },
            resume() {
                this.workStatus = "online";
                this.elapsedTime = 0;
                this.trackInterval = setInterval(() => {
                    this.elapsedTime++;
                }, 1000);
            },

            pause() {                
                this.paused = true;
                this.workStatus = "paused";

                clearInterval(this.trackInterval);
                this.totalTime += this.elapsedTime;
            },

            stopTracking() {
                clearInterval(this.trackInterval);
                TimeTrackerClient.clockOut()
                    .then(response => {
                    if(!this.paused) this.totalTime += this.elapsedTime;

                    this.workEntryOut = response.data.data.workEntryOut;
                    this.workStatus = response.data.data.employee.workStatus;
                })
                .catch(error => console.log(error));
            },

            formatTime(secs) {
                const date = new Date(0);
                date.setHours(0, 0, secs);
                return new Date(date).toLocaleTimeString([], {hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit"});
            }
        }
    }
</script>