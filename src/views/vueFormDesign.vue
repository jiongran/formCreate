<script>
import ElementFormDesign from '@/components/formDesign/element/elementFormDesign.vue';
import SvgIcon from '@/components/svg-icon/index.vue';
import { defineComponent } from 'vue';
export default defineComponent({
    components: {
        ElementFormDesign,
        SvgIcon
    },
    setup(){
       
        return {
            
        }
    }
})
</script>
<template>
    <ElementFormDesign class="autoHeight" :generateCode="false"></ElementFormDesign>
</template>
<style lang="scss" scoped>
.autoHeight{
    height: calc(100vh);
    overflow: hidden;
}
</style>