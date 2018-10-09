<template lang="pug">
    i.icon(
        :class="getClass()"
        v-html="getContent()"
    )
</template>

<script type="text/javascript">
    import icon from 'static/icons/_index.js';

    export default {
        props   : ['name'],
        methods : {
            getContent() {
                return icon[this.name];
            },
            getClass() {
                return `icon-${this.name}`;
            },
        },
    };
</script>

<style lang="stylus">
    i
        width 20px
        display inline-block
</style>
