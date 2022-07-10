<template>
    <div class="relative" @mouseover="open" @mouseleave="close">
        <slot name="button" :toggle="toggle"/>
        <slot v-if="hovered"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                hovered: false
            }
        },
        methods: {
            open() {
                this.hovered = true;
            },
            close() {
                this.hovered = false;
            },
            toggle() {
                this.hovered = !this.hovered;
            }
        }
    }
</script>