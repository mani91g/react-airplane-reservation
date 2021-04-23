import React from 'react'
import SeatingDetails from '../../Components/airplane-reservation/airplane-seating-details'
import {SeatEnum} from '../../Enum/SeatEnum'
import InputDetails from '../../Components/airplane-reservation/airplane-input-details'
import {fillSeats} from '../../Functions/seats-functions'

export default class TaskViewContainer extends React.Component<IProps, ILocalState>{
    /**
     *
     */
    constructor(props) {
        super(props);
        this.state = {
            seats: [],
            inputSeat:"",
            seatFormat: [],
            passengerCount: 0,
            totalPassengers: 0

        }

        this.allotSeats = this.allotSeats.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)

    }

    handleInputChange = (event) => {
        const name = event.currentTarget.id;
        const value = event.currentTarget.value;

        this.setState({
            ...this.state,
            [name]: value})
    }

    isValidateInput = () => {
        let { inputSeat } = this.state
        let seatFormat:number[][] = []
        var array = inputSeat.split(',');

        if(array.length%2 != 0)
            return []
        else{
            for(let i = 0; i < array.length; i = i+2){
                try{
                    let num1 = parseInt(array[i])
                    let num2 = parseInt(array[i+1])

                    if(isNaN(num1) || isNaN(num2))
                        return []
                    
                    seatFormat.push([num1, num2])

                }catch(err){
                    return []
                }
            }

            return seatFormat
        }
        
    }

    formSeats = async () => {
        const { seatFormat } = this.state

        //3D array to initialize seats
        let seats: number[][][] = []

        await seatFormat.map((row, i) => {
            seats.push([])
            for (let j = 0; j < row[1]; j++) {
                seats[i].push([])
                for (let k = 0; k < row[0]; k++) {
                    seats[i][j].push(0)
                }
            }
        })

        return seats
    }

    allotSeats = async ()  => {
        let { totalPassengers } = this.state
        let seatFormat = this.isValidateInput()

        if(seatFormat && seatFormat.length > 1){
            //Fill seats
            let seats = fillSeats(seatFormat, totalPassengers)
            this.setState({seats})
        }
        else
            window.alert('Please provide comma, separated numbers of even length for plane seating plan')

    }


    componentDidUpdate = async (prevProps, prevState) => {
        //Check if seating arrangement has changed
        // if(this.state.inputSeat !== prevState.inputSeat){
        //     this.isValidateInput()
        // }
    }

    getColor = (i, j, k): string => {
        const { seats } = this.state
        let iMax = seats.length
        let kMax = seats[i][j] && seats[i][j].length
        
        //Check seat position
        if((i == iMax-1 && k == kMax-1) || (i == 0 && k==0))
            return "window"
        if(k!=0 && k!=kMax-1)
            return "middle"
        else
            return "aisle"
    }
    

    render() {

        const { seats, inputSeat, totalPassengers } = this.state        

        return (
            <div>
                <InputDetails 
                    inputSeat={inputSeat} 
                    totalPassengers={totalPassengers}
                    handleSeatAllotment={this.allotSeats}
                    handleInputChange={this.handleInputChange}
                />
                <SeatingDetails 
                    seats={seats}
                    getColor={this.getColor}
                />
            </div>
        )

    }
}

interface IProps {

}

interface ILocalState {
    seatFormat: number[][];
    seats: number[][][]
    passengerCount: number;
    totalPassengers: number;
    inputSeat: string;
}