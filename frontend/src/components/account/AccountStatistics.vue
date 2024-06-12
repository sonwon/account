<template>
    <div id="accountStatistics">
        <div class="chart-outer">
            <h3>월별 지출 차트</h3>
            <div class="chart-header">
                <div>
                    현재 금액 : <b>{{ this.balance }}</b>
                </div>
                <div>
                    입금 : <div class="chart-deposit"></div>
                    출금 : <div class="chart-withdraw"></div>
                </div>
            </div>
            <Chart
                :size="{ width:800, height:420 }"
                :data="data"
                :margin="margin"
                :direction="direction"
                :axis="axis">
                <template #layers>
                    <Grid strokeDasharray="2,2"></Grid>
                    <Bar :dataKeys="['month', '입금']" :barStyle="{ fill: '#F7D280' }" />
                    <Bar :dataKeys="['month', '출금']" :barStyle="{ fill: '#F7A50C' }" />
                </template>
                <template #widgets>
                    <Tooltip
                        borderColor="#48CAE4"
                        :config="{
                        입금: { color: '#F7D280' },
                        출금: { color: '#F7A50C' },
                        }"
                    />
                </template>
            </Chart>
            <table class="profit-table">
                <tr>
                    <th style="width: 40px; min-width: 40px; max-width: 40px; font-size: 12px; font-weight: bold;">순이익</th>
                    <td :style="profitColor(d.순이익)" v-for="d in data">{{ d.순이익 }}</td>
                </tr>
            </table>
        </div>
        <div class="list-outer">
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
        this.userId = localStorage.getItem('userId');
        let chartData = [
            { month : "Jan", 입금 : 0, 출금 : 0, 순이익 : 0 },
            { month : "Feb", 입금 : 0, 출금 : 0, 순이익 : 0 },
            { month : "Apr", 입금 : 0, 출금 : 0, 순이익 : 0 },
            { month : "Mar", 입금 : 0, 출금 : 0, 순이익 : 0 },
            { month : "May", 입금 : 0, 출금 : 0, 순이익 : 0 },
            { month : "Jun", 입금 : 0, 출금 : 0, 순이익 : 0 },
            { month : "Jul", 입금 : 0, 출금 : 0, 순이익 : 0 },
            { month : "Aug", 입금 : 0, 출금 : 0, 순이익 : 0 },
            { month : "Sep", 입금 : 0, 출금 : 0, 순이익 : 0 },
            { month : "Oct", 입금 : 0, 출금 : 0, 순이익 : 0 },
            { month : "Nov", 입금 : 0, 출금 : 0, 순이익 : 0 },
            { month : "Dec", 입금 : 0, 출금 : 0, 순이익 : 0 },
        ];

        //서버로부터 데이터 받아오기
        const httpRequest = async()=>{
            const url = "/api"
            try{
                let userData = await axios.get(url+`/users/${this.userId}`);
                this.balance = userData.data.balance;

                let result = await axios.get(url+`/deposit?userId=${this.userId}`);
                let getData = result.data;
                getData.forEach((data)=>{
                    let month = data.createAt.split('-')[1];
                    month = month.charAt(0) === '0' ? month.charAt(1) : month;
                    let month_number = parseInt(month);
                    if(data.type === '입금'){
                        chartData[month_number-1].입금 += parseInt(data.amount);
                    }
                    else{
                        chartData[month_number-1].출금 += parseInt(data.amount);
                    }
                })
                chartData.forEach((data)=>{
                    data.순이익 = data.입금 - data.출금;
                })

                this.data = chartData;

                let sortedData = getData.sort(function(a, b){
                    let dateA = new Date(a.createAt);
                    let dateB = new Date(b.createAt);

                    return dateB.getTime() - dateA.getTime();
                })

                this.sortedData = sortedData.slice(0, 5);


            }
            catch(err){
                console.log(err);
            }
        }

        httpRequest();
    },
    data(){
        return{
            userId : '',
            balance : 0,
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
    methods : {
        profitColor : function(profit){
            if(profit > 0){
                return 'color : blue;'
            }
            else if(profit < 0){
                return 'color : red;'
            }
            else{
                return 'color : black;'
            }
        }
    }
}
</script>
<style scoped>
    #accountStatistics{
        text-align: center;
    }
    .chart-header{
        display : flex;
        justify-content: space-between;
    }
    .chart-deposit{
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background-color: #F7D280;
        vertical-align: middle;
    }
    .chart-withdraw{
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background-color: #F7A50C;
        vertical-align: middle;
        margin-right: 20px;
    }
    .chart-outer{
        margin-bottom: 80px;
    }
    .profit-table{
        width : 778px;
    }
    .profit-table td{
        width : 61.5px;
        max-width: 61.5px;
        font-size : 12px;
    }

</style>