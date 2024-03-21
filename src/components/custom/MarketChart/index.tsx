import { Skeleton } from "@/components/ui/skeleton";
import { useMarketChart } from "@/services/gecko"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment'

interface MarketChartProps{
    id: string
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export function MarketChart({id}: MarketChartProps){
    const {data: chart } = useMarketChart(id)
    console.log(chart)

    if(!chart) {
        return (
          <div className="wrapper-container mt-8">
            <Skeleton className="h-72 w-full mb-10" />
          </div>
        )
      }
    
    const coinPriceData = chart.prices.map(value => ({ x: value[0], y: value[1].toFixed(2) }));
    const coinMarketCap = chart.market_caps.map(value => ({ x: value[0], y: value[1].toFixed(2) }));
    const coinTotalVolume = chart.total_volumes.map(value => ({ x: value[0], y: value[1].toFixed(2) }));
  
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        
      };
    const data = {
        labels: coinPriceData.map(value => moment(value.x).format('MMM DD')),
        datasets: [
        {
            label: 'Price',
            fill: true,
            data: coinPriceData.map(val => val.y),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Total Volume',
            fill:true,
            data: coinTotalVolume.map(val => val.y),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Market Cap 2',
            fill: true,
            data: coinMarketCap.map(val => val.y),
            borderColor: 'rgb(192, 75, 192)',
            backgroundColor: 'rgba(192, 75, 192, 0.5)',
        }
        ]
    }



    return(
        <section className="w-full flex relative container flex-col items-center justify-center">
            <h2 className="font-bold text-3xl">Price History</h2>
                <Line className="" data={data} options={options}/>
        </section>
    )
}