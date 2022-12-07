import { 	SpinnerCircularFixed		 } from 'spinners-react';
function Loading() {
  return (
    <center style={{display:"grid",placeItems:"center",height:"100vh"}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" alt=""
        height="200"
        styles={{marginBottom:10}}
        />
        <SpinnerCircularFixed	size={100} color="#3CBC28" thickness={150} secondaryColor="lightblue" />
      </div>
    </center>
  )
}

export default Loading