import { TextField, Button } from "@material-ui/core";

const test = (e, props) => {
    window.alert('Test')
    props.handleInputChange(e)
}

const AirplaneInputDetails = (props: IProps) => {
    return (
        <div style={{ display: "flex", "marginLeft":"20px" }} >
            <TextField
                autoFocus
                margin="dense"
                id="totalPassengers"
                label="Passengers"
                type={"number"}
                onChange={props.handleInputChange}
                value={props.totalPassengers}
                className={"form-control"}
            />
            <TextField
                autoFocus
                margin="dense"
                id="inputSeat"
                label="Plane Input"
                onChange={props.handleInputChange}
                value={props.inputSeat}
                className={"form-control"}

            />
            <Button
                variant="outlined"
                className={"testcss form-control"}
                onClick={props.handleSeatAllotment}
            >
                Allot Seats
            </Button>
        </div>
    )
}
export default AirplaneInputDetails
interface IProps {
    totalPassengers: number;
    inputSeat: string;
    handleInputChange:(event: any) => void;
    handleSeatAllotment:() => void;
}