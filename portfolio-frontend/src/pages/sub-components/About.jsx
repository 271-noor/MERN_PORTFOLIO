import axios from 'axios';
import React, { useEffect, useState } from 'react'

const About = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
      const getMyProfile = async() =>{
      const { data } = await axios.get("http://localhost:4000/api/v1/user/me/portfolio", {withCredentials: true }
      );
      setUser(data.user);
  };
  getMyProfile();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col overflow-x-hidden">
          <div className="relative">
            <h1 className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold" style={{background: "hsl(222.2 84% 4.9%)"}}>
                  About
                  <span className="text-tubeLight-effect font-extrabold">Me</span>
            </h1>
            <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200 "></span>
          </div>
          <div className="">
            <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
              <div className="flex justify-center items-center">
                <img src={user.avatar && user.avatar.url} alt={user.fullName} className='bg-white p-2 sm:p-4 rotate-[25deg] h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px]' />
              </div>
              <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
                <p>Hello Noor,  amet consectetur adipisicing elit. Nemo officia voluptates facilis ab quam delectus debitis consequatur eligendi. Atque, mollitia et. Provident adipisci dolore vero, voluptate nostrum aut delectus laboriosam!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quaerat blanditiis dolorem ex iste iure adipisci quod voluptates. Beatae maxime velit impedit enim reprehenderit libero unde! Atque vero debitis neque!</p>
              </div>
            </div>
            <p className="tracking-[1px] text-xl" >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia laborum consequuntur beatae repellendus totam alias eaque nesciunt iste consectetur doloribus ipsam, rem odio labore voluptatibus porro aspernatur sint quia. Rem?
            </p>
          </div>
      </div>
    </>
  )
}

export default About
