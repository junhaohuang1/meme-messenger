import React from 'react'
import {Carousel} from 'react-materialize'
import axios from "axios";

const styles = {
    button:{
        "position":"absolute",
        "right": "45%",
        "top": "50%"
    },
    img:{
        "position": "relative",
        "height": "auto"
    }
}

export default class CarouselPage extends React.Component {

    handleClick = (e) => {
        console.log(e.target.id)
        //open another website for different scene
        // switch (e.target.id){
        //     case '1':
        //         window.open('https://murmuring-hamlet-56587.herokuapp.com/home.html','_blank')
        //         break;
        //     case '2':
        //         window.open('https://radiant-caverns-54355.herokuapp.com/home.html','_blank')
        //         break;
        //     case '3':
        //         window.open('https://radiant-bayou-34137.herokuapp.com/home.html','_blank')
        //         break;
        //     case '4':
        //         window.open('https://blooming-badlands-89901.herokuapp.com/home.html','_blank')
        //         break;
        // }

        const data = {id: e.target.id}
        axios.put("/scene", data)
        //const current = window.location.href
        //window.location.href = '/vr/test'
        window.open('/vr/test','_blank')
    }
    render(){
        return(

            <Carousel options = {{fullWidth: true}}>
                <div className = "caroImg" style = {styles.img}>
                    <img src = "/images/1.jpg" />
                    <button className='btn' id = "1" onClick ={this.handleClick} style = {styles.button}>Launch</button>
                </div>
                <div className = "caroImg" >
                    <img src = "/images/2.jpg" style = {styles.img}/>
                    <button className='btn' id = "2" onClick ={this.handleClick} style = {styles.button}>Launch</button>
                </div>
                <div className = "caroImg" >
                    <img src = "/images/3.jpg" style = {styles.img}/>
                    <button className='btn' id = "3" onClick ={this.handleClick} style = {styles.button} >Launch</button>
                </div>
                <div className = "caroImg" >
                    <img src = "/images/4.jpg"style = {styles.img}  />
                    <button className='btn' id = "4" onClick ={this.handleClick} style = {styles.button}>Launch</button>
                </div>
            </Carousel>

        )
     }
}
