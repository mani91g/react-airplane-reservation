const AirplaneDetails = (props: IProps) => {
    const { seats } = props
    return (
        <div style={{ display: "flex", marginTop: "50px", "marginLeft":"20px", "marginBottom":"20px" }} >
            {seats.map((x, i) => {
                return <div style={{ marginRight: "50px" }}>{
                    x.map((y, j) => { 
                        return <div style={{display: "flex"}}>{y.map((_, k) => { 
                            let color = props.getColor(i, j,k)
                            return <p className={color}>{seats[i][j][k]}  </p> })}</div> })
                }
                </div>
            })}
        </div>
    )
}
export default AirplaneDetails
interface IProps {
    seats: number[][][];
    getColor: (i, j, k) => string
}