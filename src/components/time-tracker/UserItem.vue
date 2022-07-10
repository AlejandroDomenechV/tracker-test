<template>
    <a href="/" class="flex items-center gap-3 bg-white hover:bg-light-teal px-4 py-2 first:rounded-t-lg last:rounded-b-lg shadow-lg">
        <div class="flex items-center justify-center w-6 h-6 rounded-full border border-dark-grey bg-extra-light-grey">
            <span class="text-xs font-cera font-thin">{{accountProfile}}</span>
        </div>
        <div class="flex flex-col">
            <div class="flex gap-2 items-end">
                <span class="font-cera font-medium text-xs">{{accountName}}</span>
                <span class="font-cera font-light text-xs">{{userName}}</span>
            </div>
            <div class="flex items-start">
                <span class="font-cera font-light text-xs font-medium text-light-grey">Hoy llevas {{timeRecorded}}</span>
            </div>
        </div>
    </a>
</template>

<script>
    export default {
        props: {
            accountName: String,
            accountProfile: String,
            userName: String,
            timeRecorded: String
        }    
    }
</script>