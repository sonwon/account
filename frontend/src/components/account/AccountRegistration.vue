<template lang="">
    <div>
        <h3>입출금 등록</h3>
        <form @submit.prevent="submit">

            <input type="submit"/>
        </form>
    </div>
</template>
<script>
export default {
    name : 'AccountRegistration',
    data(){
        return{
            userId : 1,
        }
    },
    methods:{
        submit : function(){
            console.log("폼 제출");
        }
    }
}
</script>
<style lang="">
    
</style>