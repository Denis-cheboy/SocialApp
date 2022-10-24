import {Button,Grid} from "@mui/material"
import {styled} from "@mui/material/styles"
import Feeds from "./components/Feeds";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar"
import NavBar from "./components/NavBar";
import Add from "./components/Add";

function App() {

  return (
  <>
   <NavBar/>
   <Grid container >
    <Grid item sm={2} xs={2}>
      <LeftBar/>
    </Grid>
    <Grid item sm={7} xs={10} >
      <Feeds/>
    </Grid>
    <Grid item sm={3} sx={{display:{xs:"none",md:"block",sm:"block"}}}>
      <RightBar/>
    </Grid>
   </Grid>
   <Add/>
   
 </>
  );
}

export default App;
