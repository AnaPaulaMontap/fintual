import React, {Component} from 'react'
import './PriceList.css';
import Charts from '../Charts/Charts'


class PriceListAnnual extends Component {
    constructor(props){
        super(props);
        this.state={
            fromDate: props.data.startDate,
            toDate: props.data.endDate,
            conservativeClooney: false,
            moderatePit: false,
            riskyNorris: false,
            chart: false,
        }
        console.log(props)
    }
    componentDidMount(){        
        this.conservativeClooney();
        this.moderatePit();
        this.riskyNorris();    
    }

    comparativeChart = () =>{
        this.setState({
            ...this.state,
            chart: true
        })
    }

    conservativeClooney = ()=>{
        fetch(`https://fintual.cl/api/real_assets/188/days?from_date=${this.state.fromDate}&to_date=${this.state.toDate}`)
        .then((data) => data.json())
        .then((data)=>{

            return this.setState({
                ...this.state,
                conservativeClooney: data.data
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
            return this.setState({
                ...this.state,
                moderatePit: data.data
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
            return this.setState({
                ...this.state,
                riskyNorris: data.data
            })
            
            
        })
        .catch((error)=> {
            console.error (error.message)
        })
    }

    render (){
         const dateSearch =  this.state.moderatePit ? (this.state.moderatePit.map((item)=>{
            return (
              <p key={item.attributes.date}>{item.attributes.date}</p>   
             )
            })): null

         const conservativeClooney = this.state.conservativeClooney ? ( this.state.conservativeClooney.map((item)=>{
            return (
              <p key={item.attributes.price}>{item.attributes.price}</p>   
             )
            })): null

        const moderatePit =  this.state.moderatePit ? ( this.state.moderatePit.map((item)=>{
            return (
              <p key={item.attributes.price}>{item.attributes.price}</p>   
             )
            })): null
        
        const riskyNorris =  this.state.riskyNorris ? ( this.state.riskyNorris.map((item)=>{
                return (
                  <p key={item.attributes.price}>{item.attributes.price}</p>   
                 )
                })): null
    return (
        <div>
            <div className='column'>
                <p className='title'>Fecha</p>
                {dateSearch}
            </div>
            <div className='column'>
                <p className='title'>Conservative Clooney</p>
                {conservativeClooney}
            </div>
            <div className='column'>
                <p className='title'>Moderate Pit</p>
                 {moderatePit}
            </div>
            <div className='column'>
                <p className='title'>Risky Norris</p>
                {riskyNorris}
            </div>      

            <button className="buttonCharts"onClick={this.comparativeChart}>Ver Gráfico Comparativo</button>

            {this.state.chart && <Charts data = {this.state} />}

        </div>
        )
    }
}

export default PriceListAnnual

 

        /*             
           */