import React from 'react'
import HeroImage from '../../assets/heroimg.webp'
const Hero = () => {
  return (
    <>
   
   <div className="relative z-[-1]">
   <div className="container ">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center min-h-[600px]">
{/* text-content section */}
     <div className="space-y-7
     order-2 sm:order-1 ">
      <h1 className="text-5xl">
       Fresh & Healthy Meal Plan{" "}
        <span className="text-secondary
          font-cursive |">Delivery</span> in Miami</h1>
             <p>
              Delicious Meals Delivered to Your
                 Door From $132.95 per week
              </p>

              
             </ div>



         <div>
          <img src={HeroImage} alt="" />



          </div>

         </div>


         </div>


    </div>

    </>
  )
}

export default Hero