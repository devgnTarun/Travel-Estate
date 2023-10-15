import React from 'react'
import './main.css'
import girl from '../Images/girl.png'
import mountain from '../Images/mount.png'


const Home = () => {
  return (
   <>
       <div className='main_bg'>
    <div className='map_bg'></div>
    <div className="responsive_box_550">
        <h2>The Exotic <br/>  <span>Lakshadweep</span>  Islands</h2>
    <button className='discover_btn'>Discover</button>
        
    </div>
        <div className='left_box'>
            <button className="visit_btn">
                Visit <i className="fa-solid fa-compass"></i>
            </button>
            <div className="h2_div">
            <h2>The Exotic </h2> 
            <h2>Lakshadweep </h2>  
            <h2>Islands </h2> 
            </div>
            <button className='discover_btn'>Discover</button>
        </div>
        <div className='right_box'>
            <div className='right_box_float'> <i className="fa fa-plane"></i> Jakarta</div>
            <div className='right_box_train'><i className="fas fa-train"></i></div>
            <div className='floating_card'>
                <div className="img_card">
                    <img src={mountain} alt="Labuon Baju" />
                </div>
                <h3>Explore Labuon Baju</h3>
              <span>   <i className='fas fa-map-marker-alt'></i>   NTT, Indonesia</span>
            </div>
            <div className="float_div_two">
            <div className="img_card">
                    <img src={mountain} alt="Labuon Baju" />
                </div>
                <h3>Explore Labuon Baju</h3>
              <span>   <i className='fas fa-map-marker-alt'></i>   NTT, Indonesia</span>
            </div>
            <div className="image_concat">
            <img src={girl} alt="tourist" />
            </div>
        </div>
      </div>
      
   </>
  )
}

export default Home