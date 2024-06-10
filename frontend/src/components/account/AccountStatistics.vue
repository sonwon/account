<template>
    <div id="accountStatistics">
        <div class="outer-btn">
            <button class="btn btn-warning btn-regi" @click="toRegistration">입출금 등록</button>
        </div>
        <h3>월별 지출 차트</h3>
        <div class="chart-header">
            입금 : <div class="chart-deposit"></div>
            출금 : <div class="chart-withdraw"></div>
        </div>
        <Chart
            :size="{ width:800, height:420 }"
            :data="data"
            :margin="margin"
            :direction="direction"
            :axis="axis">
            <template #layers>
                <Grid strokeDasharray="2,2"></Grid>
                <Bar :dataKeys="['month', 'deposit']" :barStyle="{ fill: '#90e0ef' }" />
                <Bar :dataKeys="['month', 'withdraw']" :barStyle="{ fill: '#0096c7' }" />
            </template>
            <template #widgets>
                <Tooltip
                    borderColor="#48CAE4"
                    :config="{
                    }"
                />
            </template>
        </Chart>
        <br> <br>
        <h3>최근 거래 내역</h3>
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>날짜</th>
                    <th>타입</th>
                    <th>카테고리</th>
                    <th>금액</th>
                    <th>메모</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(d, idx) in sortedData">
                    <td>
                        {{ idx }}
                    </td>
                    <td>
                        {{ d.createAt }}
                    </td>
                    <td>
                        {{ d.type }}
                    </td>
                    <td>
                        {{ d.category }}
                    </td>
                    <td>
                        {{ d.amount }}
                    </td>
                    <td>
                        {{ d.content }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { Chart, Grid, Line, Bar, Marker, Tooltip } from 'vue3-charts'
import axios from 'axios'

export default {
    name : "AccountStatistics",
    components:{ Chart, Grid, Line, Bar, Marker, Tooltip },
    mounted(){
        //userID는 params 또는 부모컴포넌트로부터 받아오기
        let userId = this.userId;
        let chartData = [
            { month : "Jan", deposit : 0, withdraw : 0 },
            { month : "Feb", deposit : 0, withdraw : 0 },
            { month : "Apr", deposit : 0, withdraw : 0 },
            { month : "Mar", deposit : 0, withdraw : 0 },
            { month : "May", deposit : 0, withdraw : 0 },
            { month : "Jun", deposit : 0, withdraw : 0 },
            { month : "Jul", deposit : 0, withdraw : 0 },
            { month : "Aug", deposit : 0, withdraw : 0 },
            { month : "Sep", deposit : 0, withdraw : 0 },
            { month : "Oct", deposit : 0, withdraw : 0 },
            { month : "Nov", deposit : 0, withdraw : 0 },
            { month : "Dec", deposit : 0, withdraw : 0 },
        ];

        //서버로부터 데이터 받아오기
        const httpRequest = async()=>{
            const url = "/api"
            try{
                let result = await axios.get(url+"/deposit");
                let getData = result.data;
                
                let myData = getData.filter((data)=>{ return data.userId === userId });
                myData.forEach((data)=>{
                    let month = data.createAt.split('-')[1];
                    month = month.charAt(0) === '0' ? month.charAt(1) : month;
                    let month_number = parseInt(month);
                    if(data.type === '입금'){
                        chartData[month_number-1].deposit += data.amount;
                    }
                    else{
                        chartData[month_number-1].withdraw += data.amount;
                    }
                })

                this.data = chartData;

                let sortedData = myData.sort(function(a, b){
                    let dateA = new Date(a.createAt);
                    let dateB = new Date(b.createAt);

                    return dateB.getTime() - dateA.getTime();
                })

                sortedData.slice(0, 5);

                this.sortedData = sortedData;
            }
            catch(err){
                console.log(err);
            }
        }

        httpRequest();
    },
    data(){
        return{
            userId : 1,
            data : [],
            sortedData: [],
            direction : 'horizontal',
            margin : {
                left : 0,
                top : 20,
                right : 20,
                bottom : 0
            },
            axis : {
                primary : {
                    type : 'band'
                },
                secondary : {
                    domain : ['dataMin', 'dataMax + 100'],
                    type : 'linear',
                    ticks : 8
                }
            }
        }
    },
    methods:{
        toRegistration : function(){
            this.$router.push('accountRegistration');
        }
    }
}
</script>
<style scoped>
    #accountStatistics{
        text-align: center;
    }
    .btn-regi{
        margin: 10px 20px 10px 0px;
    }
    .outer-btn{
        text-align: right;
    }
    .chart-header{
        text-align: right;
    }
    .chart-deposit{
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background-color: #90e0ef;
        vertical-align: middle;
    }
    .chart-withdraw{
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background-color: #0096c7;
        vertical-align: middle;
        margin-right: 20px;
    }
</style>