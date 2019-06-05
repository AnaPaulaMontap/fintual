import React , {Component} from 'react';
import Chart from 'react-google-charts';


class Charts extends Component{
    constructor(props){
        super(props);
        this.state={

            conservativeClooneyPrice:props.data.conservativeClooney,
            moderatePitPrice: props.data.moderatePit, 
            riskyNorrisPrice: props.data.riskyNorris,
            dataLoadingStatus: 'loading', 
            chartData: [],

        }
    }

    componentDidMount () {

    const rateDates = this.state.conservativeClooneyPrice.map((item)=>{
        return item.attributes.date
    });

    const rateValuesConservative = this.state.conservativeClooneyPrice.map((item)=>{
        return item.attributes.price
    });

    const rateValuesModerate = this.state.moderatePitPrice.map((item)=>{
        return item.attributes.price
    });

    const rateValuesRisk = this.state.riskyNorrisPrice.map((item)=>{
        return item.attributes.price
    });

    const chartData = [['Fecha', 'Conservative', 'Moderate' , 'Risk']]
    for (let i = 0; i < rateDates.length; i += 1) {
      chartData.push([rateDates[i], rateValuesConservative[i],rateValuesModerate[i],rateValuesRisk[i]])
    }

    this.setState({
        ...this.state,
      dataLoadingStatus: 'ready',
      chartData: chartData,
    })
    }   

    render(){
        return (
        <div>
        <Chart
        width={'100%'}
        height={'300px'}
        chartType="AreaChart"
        loader={<div>Cargando Grafico</div>}
        data={this.state.chartData}
        options={{
            title: 'Comparación Fondos',
            hAxis: { title: 'Fecha', titleTextStyle: { color: '#333' } },
            
    // For the legend to fit, we make the chart area smaller
                chartArea: { width: '70%', height: '70%' },
    // lineWidth: 25
        }}
  // For tests
                rootProps={{ 'data-testid': '1' }}
        />
        </div>
    )
    }

}

export default Charts