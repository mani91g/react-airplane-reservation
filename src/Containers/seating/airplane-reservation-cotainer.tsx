import React from 'react'
import SeatingDetails from '../../Components/airplane-reservation/airplane-seating-details'
import {SeatEnum} from '../../Enum/SeatEnum'
import InputDetails from '../../Components/airplane-reservation/airplane-input-details'

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

    validateInput() {
        let { inputSeat } = this.state
        let seatFormat:number[][] = []
        var array = inputSeat.split(',');
        let inputErrorMessage = 'Please provide comma, separated numbers of even length for plane seating plan'

        if(array.length%2 != 0)
            window.alert(inputErrorMessage)
        else{
            array.map((_,i) => {
                if(i%2==0){
                    try{
                        seatFormat.push([parseInt(array[i]), parseInt(array[i+1])])
                    }catch(err){
                        window.alert(inputErrorMessage)
                    }
                }                    
            this.setState({seatFormat})
                
            })
        }
        
    }

    isCorrectSeat = (i:number, j:number, k:number, seat:SeatEnum) => {
        return true;
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
        
        let passengerCount = 0
        this.validateInput()
        //Reset seats
        let seats = await this.formSeats()
        this.setState({seats})

        if(seats && seats.length>0){
            
            //reserve aisle seats
            passengerCount = this.fillAisleSeats(passengerCount)

            //reserve window seats
            passengerCount = this.fillWindowSeats(passengerCount)

            //reserve middle seats
            passengerCount = this.fillMidSeats(passengerCount)

        }
    }

    fillAisleSeats = (passengerCount: number) => {
        let { seats, totalPassengers } = this.state

        let i:number = 0;
        let j:number = 0;
        let k:number = 0;

        let iMax = seats.length
        let jMax = seats[0] && seats[0].length
        let kMax = seats[0][0] && seats[0][0].length


        while(i < iMax && j < jMax && k < kMax && passengerCount < totalPassengers){   
            if(!(seats[i] && seats[i][j])){ //condition to check to traverse through longer rows
                if(i == iMax-1){
                    j++;
                    i=0;
                }else
                    i++                
                
                continue
            }                     
            kMax = seats[i][j].length

            if((k == 0 || k == kMax-1)
                && !((i == 0 && k == 0) || (i == iMax -1 && k == kMax-1))
                ){
                seats[i][j][k] = ++passengerCount
            }
            
            
            if(k == 0) //if left aisle then move to right aisle
                k = kMax -1
            else if(k == kMax -1){ //if right aisle is filled move to next aisle
                i = i + 1;
                k = 0;
            }
            if(i>iMax-1 && j!=jMax-1){ // Move one row back if end of right most but not is last section
                i = 0;
                j++;
            }          
            
            jMax = seats[i] && seats[i].length > jMax ? seats[i].length : jMax //Only change jMax for valid i value

            // while(jMax<=j){
            //     ++i;
            //     jMax = seats[i].length
            // }

            }
            
        this.setState({seats})
        return passengerCount

    }

    fillWindowSeats = (passengerCount: number) => {
        let { seats, totalPassengers } = this.state

        let i:number = 0;
        let j:number = 0;
        let k:number = 0;

        let iMax = seats.length
        let jMax = seats[0] && seats[0].length
        let kMax = seats[0][0] && seats[0][0].length


        while(i < iMax && j < jMax && k < kMax && passengerCount < totalPassengers){    
            if(!(seats[i] && seats[i][j])){
                i++
                continue
            }

            kMax = seats[i][j].length

            if(i == 0 && k == 0){
                seats[i][j][k] = ++passengerCount
                k = kMax-1
                i = iMax-1
            }
            else if(i == iMax-1 && k == kMax-1){
                seats[i][j][k] = ++passengerCount

                if(j == jMax-1)
                    break;

                                
                ++j
                i = seats[0] && seats[0][j] ? 0 : iMax-1                 
                k = i == 0 ? 0 : seats[i][j].length-1
            }
            else
                i = iMax -1


            jMax = seats[i] && seats[i].length > jMax ? seats[i].length : jMax //Only change jMax for valid i value

            // while(jMax<=j){
            //     ++i;
            //     jMax = seats[i].length
            // }


        }

        return passengerCount
    }

    fillMidSeats = (passengerCount: number) => {
        let { seats, totalPassengers } = this.state

        let i:number = 0;
        let j:number = 0;
        let k:number = 0;

        let iMax = seats.length
        let jMax = seats[0] && seats[0].length
        let kMax = seats[0][0] && seats[0][0].length


        while(i < iMax && j < jMax && k < kMax && passengerCount < totalPassengers){                        
            if(!(seats[i] && seats[i][j])){ //condition to check to traverse through longer rows
                if(i == iMax-1){
                    j++;
                    i=0;
                }else
                    i++  

                continue
            }

            kMax = seats[i][j].length

            if(k!=0 && k!=kMax ){
                seats[i][j][k] = ++passengerCount
            }
            ++k
            
            
            if(k >= kMax -1){ //if midseat is filled in one section of the row
                i = i + 1;
                k = 0;
            }
            if(i>iMax-1 && j!=jMax-1){ // Move one row back if more mid seats
                i = 0;
                j++;
            }          
            
            jMax = seats[i] && seats[i].length > jMax ? seats[i].length : jMax //Only change jMax for valid i value

            // while(jMax<=j){
            //     ++i;
            //     jMax = seats[i].length
            // }

            }
            
        this.setState({seats})

        return passengerCount
    }

    getColor = (i, j, k): string => {
        const { seats } = this.state
        let iMax = seats.length
        let jMax = seats[i] && seats[i].length
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