const initializeSeats = (seatFormat: number[][]) =>{

    //3D array to initialize seats
    let seats: number[][][] = []

     seatFormat.map((row, i) => {
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

const fillAisleSeats = (passengerCount: number, seats: number[][][], totalPassengers: number ) => {

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

    return passengerCount

}

const fillWindowSeats = (passengerCount: number, seats: number[][][], totalPassengers: number ) => {

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

const fillMidSeats = (passengerCount: number, seats: number[][][], totalPassengers: number) => {

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

    return passengerCount
}

export const fillSeats = (seatFormat: number[][], totalPassengers: number) => {
    let seats = initializeSeats(seatFormat)
    let passengerCount = 0

    if(seats && seats.length>0){
            
        //reserve aisle seats
        passengerCount = fillAisleSeats(passengerCount, seats, totalPassengers)

        //reserve window seats
        passengerCount = fillWindowSeats(passengerCount, seats, totalPassengers)

        //reserve middle seats
        passengerCount = fillMidSeats(passengerCount, seats, totalPassengers)

    }

    return seats
}