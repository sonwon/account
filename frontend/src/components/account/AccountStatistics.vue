<template>
    <div>
        <h3>월별 지출 차트</h3>
        <Chart
            :size="{ width:500, height:420 }"
            :data="data"
            :margin="margin"
            :direction="direction"
            :axis="axis">
            <template #layers>
                <Grid strokeDasharray="2,2"></Grid>
                <Bar :dataKeys="['name', 'deposit']" :barStyle="{ fill: '#90e0ef' }" />
                <Bar :dataKeys="['name', 'withdraw']" :barStyle="{ fill: '#0096c7' }" />
            </template>
            <template #widgets>
                <Tooltip
                    borderColor="#48CAE4"
                    :config="{
                    pl: { color: '#90e0ef' },
                    avg: { color: '#0096c7' },
                    inc: { color: '#48cae4' }
                    }"
                />
            </template>
        </Chart>

        <h3>최근 거래 내역</h3>
        <table border="1">
            <thead>
                <tr>
                    <th>날짜</th>
                    <th>타입</th>
                    <th>카테고리</th>
                    <th>금액</th>
                    <th>메모</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="d in sortedData">
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
            { name : "Jan", deposit : 0, withdraw : 0 },
            { name : "Feb", deposit : 0, withdraw : 0 },
            { name : "Apr", deposit : 0, withdraw : 0 },
            { name : "Mar", deposit : 0, withdraw : 0 },
            { name : "May", deposit : 0, withdraw : 0 },
            { name : "Jun", deposit : 0, withdraw : 0 },
            { name : "Jul", deposit : 0, withdraw : 0 },
            { name : "Aug", deposit : 0, withdraw : 0 },
            { name : "Sep", deposit : 0, withdraw : 0 },
            { name : "Oct", deposit : 0, withdraw : 0 },
            { name : "Nov", deposit : 0, withdraw : 0 },
            { name : "Dec", deposit : 0, withdraw : 0 },
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
    }
}
</script>
<style lang="">
    
</style>