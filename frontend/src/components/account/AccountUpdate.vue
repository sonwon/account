<template>
    <div>
        {{ accountId }}
    </div>
</template>
<script>
export default {
    name : "AccountUpdate",
    data(){
        return{
            accountId : ""
        }
    },
    mounted(){
        this.accountId = this.$route.params.accountId;
    }
}
</script>
<style lang="">
    
</style>