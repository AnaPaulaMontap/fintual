import React , {Component} from 'react';
import './Forms.css';
import PriceListAnnual from '../PriceList/PriceListAnnual';
import PriceList from '../PriceList/PriceList'

class Forms extends Component {
    constructor(props){
        super (props);
        this.state ={
            date: false,
            startDate: '2019-01-01',
            endDate: props.date,
            display: true    
        }

    }


    handleChangeStartDate = (event) =>{
        event.preventDefault()
       this.setState({
           ...this.state,
            startDate: event.target.value
       })
       
    }
    handleChangeEndDate = (event) =>{
        event.preventDefault()
        this.setState({
            ...this.state,
             endDate: event.target.value
        })
    }
    handleClick = ()=>{
        this.setState({
            ...this.state,
            date: true,
            display: false
        })
    }
   render (){
        return (
            <div>
                <form className="form">
                    <p> Favor ingresa las fechas en la que buscas los valores de nuestros fondos. </p>
                <label>Desde: </label>
                <input type='date' value={this.state.startDate} onChange={this.handleChangeStartDate} />
                <label> Hasta: </label>
                <input type='date' value={this.state.endDate} onChange={this.handleChangeEndDate}/>
                </form>

                 <button onClick={this.handleClick} className="buttonForms"> Buscar </button> 

                {this.state.display && <PriceListAnnual style={{display: this.state.display ? 'block' : 'none'}} data={this.state}/>}

                {this.state.date && <PriceList data={this.state}/>}

            </div>
        )
    }
} 

export default Forms