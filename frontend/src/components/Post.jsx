import React from 'react'
import profile1 from "../profile1.png"
import { Card, CardActionArea, CardContent, CardMedia, Container, Typography,Button,CardActions } from '@mui/material'
import {styled} from "@mui/material/styles"


const StyledCardMedia=styled(CardMedia)(({theme})=>({
    height:"250px",
    objectFit:"contain",
    width:"100%",
    [theme.breakpoints.down("sm")]:{
        height:"150px"
    }
}))

function Post() {
  return (
    <Card  style={{marginBottom:"40px",marginTop:"0px"}}>
        <CardActionArea>
            <StyledCardMedia component="img" image={profile1} title="My Post"/>
            <CardContent sx={{paddingTop:{xs:"-50px"}}}>
                <Typography variant="h5">My First Post</Typography>
                <Typography variant="body2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis eius sit quis. Hic, accusantium necessitatibus? Quo, inventore at? Vel, est eos, ipsa consequatur non doloribus aspernatur alias ab labore libero, numquam maxime cumque quod optio nisi minus repellendus expedita! Possimus suscipit, repellendus dicta consectetur vel ea ducimus doloribus? Dolorum, facilis enim. Iure nisi asperiores nulla quas nobis quisquam incidunt voluptatem, cum unde dicta pariatur cupiditate provident, neque molestiae vero. Aspernatur suscipit libero illum doloremque laborum distinctio itaque, rem numquam sapiente mollitia praesentium voluptates illo consequatur fugit 
                temporibus aliquid dignissimos eos vitae aperiam e
                x ad! Rem labore nihil quos hic
                 atque?
                 </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary">Share</Button>
            <Button  size="small" color="primary">Learn More</Button>
        </CardActions>
    </Card>
  
  )
}

export default Post