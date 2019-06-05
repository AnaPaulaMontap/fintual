import React, {Component} from 'react'
import './PriceList.css';
import Charts from '../Charts/Charts'


class PriceListAnnual extends Component {
    constructor(props){
        super(props);
        this.state={
            annualData: props.data.date,
            fromDate: props.data.startDate,
            toDate: props.data.endDate,
            conservativeClooney: false,
            moderatePit: false,
            riskyNorris: false,
            annualSumaryConservative: false,
            annualSumaryModerate: false,
            annualSumaryRisk: false,
            chartC: false,
            chartM: false,
            chartR: false,
        }
    }
    componentDidMount(){        
        this.conservativeClooney();
        this.moderatePit();
        this.riskyNorris();   
    }

    conservativeClooney = ()=>{
        fetch(`https://fintual.cl/api/real_assets/188/days?from_date=${this.state.fromDate}&to_date=${this.state.toDate}`)
        .then((data) => data.json())
        .then((data)=>{

            this.setState({
                ...this.state,
                conservativeClooney: data.data,
                chartC: true
            })
            var arr = [];
            this.state.conservativeClooney.map((item)=>{
                return arr.push(item.attributes.price)
            })

            return arr
        })
        .then ((data)=>{

            var acum = 0;
            for (var i=0; i<data.length; i++){
              acum = acum + data[i] / data.length    
            }
            
            return this.setState({
                ...this.state,
                annualSumaryConservative: Math.round(acum)
            })
        })
        .catch((error)=> {
            console.error (error.message)
        })
    }

    moderatePit = () =>{

        fetch(`https://fintual.cl/api/real_assets/187/days?from_date=${this.state.fromDate}&to_date=${this.state.toDate}`)
        .then((data) => data.json())
        .then((data)=>{
            this.setState({
                ...this.state,
                moderatePit: data.data,
                chartM: true
            })
            var arr = [];
            this.state.moderatePit.map((item)=>{
                return arr.push(item.attributes.price)
            })

            return arr
        })
        .then((data)=>{

            var acum = 0;
            for (var i=0; i<data.length; i++){
              acum = acum + data[i] / data.length    
            }
            
            return this.setState({
                ...this.state,
                annualSumaryModerate: Math.round(acum)
            })
        })
        .catch((error)=> {
            console.error (error.message)
        })
    }

    riskyNorris = () =>{
        fetch(`https://fintual.cl/api/real_assets/186/days?from_date=${this.state.fromDate}&to_date=${this.state.toDate}`)
        .then((data) => data.json())
        .then((data)=>{
            this.setState({
                ...this.state,
                riskyNorris: data.data,
                chartR: true
            })
            var arr = [];
            this.state.riskyNorris.map((item)=>{
                return arr.push(item.attributes.price)
            })

            return arr
            
        })
        .then((data)=>{
            var acum = 0;
            for (var i=0; i<data.length; i++){
              acum = acum + data[i] / data.length    
            }
            
            return this.setState({
                ...this.state,
                annualSumaryRisk: Math.round(acum)
            })
        })
        .catch((error)=> {
            console.error (error.message)
        })
    }

    render (){
         const dateSearch =  this.state.moderatePit ? (this.state.moderatePit[0].attributes.date.slice(0,4)):null

    return (
        <div>
           
        <table className="tableAnnual">
            <thead className="tableSquema">
             <tr>
              <th>Año</th>
              <th>Conservative Clooney</th>
              <th>Moderate Pit</th>
              <th>Risk Norris</th>
             </tr>

            </thead>
            <tbody className="tableSquema">
              <tr>
                <td>{dateSearch}</td>
                <td>{this.state.annualSumaryConservative}$</td>
                <td>{this.state.annualSumaryModerate}$</td>
                <td>{this.state.annualSumaryRisk}$</td>
              </tr>
            </tbody>
 
        </table>
            
            {this.state.chartC && this.state.chartM && this.state.chartR && <Charts data = {this.state} />}
            
        </div>
        )
    }
}

export default PriceListAnnual

 