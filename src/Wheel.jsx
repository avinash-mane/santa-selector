import WheelComponent from "react-wheel-of-prizes";

function App({segments, onFinished, segColors}) {
    
    return (
        <div style={{display:"flex", width:"42%"}}>
            <WheelComponent
                segments={segments}
                key={segments.join('-')}
                segColors={segColors}
                winningSegment="MM"
                onFinished={(winner) => {
                    onFinished(winner)
                }}
                primaryColor="black"
                contrastColor="white"
                buttonText="Spin"
                isOnlyOnce={false}
                size={250}
                upDuration={500}
                downDuration={500}
                fontFamily="Helvetica"

            />
        </div>
    )
}

export default App
