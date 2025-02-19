import Carousel from "../Components/Carousel";
import { items } from "../Components/CarouselData";
import { Template1 } from "../Components/CarouselData";
import Phase3 from "../Components/Phase3";
import Phase4 from "../Components/Phase4";
import Phase5 from "../Components/Phase5";
import Phase6 from "../Components/Phase6";
import Phase7 from "../Components/Phase7";
import Phase8 from "../Components/Phase8";
import Phase9 from "../Components/Phase9";
import Template from "../Components/Template";


import './Home.css'

let Home = ()=>{
  return(
    <>
    <div className="main-container">
          <Carousel items = {items}></Carousel>
          <Template Template1 = {Template1}></Template>
          <Phase3></Phase3>
          <Phase4></Phase4>
          <Template Template1={Template1}></Template>
          <Phase5></Phase5>
          <Phase6></Phase6>
          <Phase7></Phase7>
          <Phase8></Phase8>
          <Phase9></Phase9>
    </div>
     
    </>
    
  )
}
export default Home;