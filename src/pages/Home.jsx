import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import BlogSection from "../components/BlogSection";
import ValueProposition from "../components/ValueProposition";
import Footer from "../components/Footer";
import img1 from "../assets/images/write1.jpg";
import img2 from "../assets/images/write2.jpg";
import img3 from "../assets/images/write3.jpg";
import img4 from "../assets/images/write4.jpg";
import img5 from "../assets/images/write5.jpg";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [img1, img2, img3, img4, img5];

  useEffect(() => {
    const autoplay = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(autoplay);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300 flex flex-col">
      <NavBar />
      <main className="w-full ">
        <section className="flex flex-col md:flex-row p-2 w-full items-stretch h-[50rem] md:h-[35.0rem] md:pt-10 lg:pt-16 lg:h-[50.0rem] 2xl:h-[70.0rem]">
          {/* Hero Text Content - 50% width */}
          <div className="w-full md:w-[60%] flex 2xl:w-[50%] p-8 bg-white dark:bg-[#0a0a0a] order-2 md:order-1 2xl:w-[50%]  items-center">
            <div className="w-full space-y-8">
              <div className="space-y-4">
                <h4 className="text-blue-600 font-bold dark:text-blue-400 tracking-[0.2em] uppercase text-[0.9rem] 2xl:text-[2.0rem]">
                  New Era Of Publishing
                </h4>
                <h1 className="text-3xl  text-start md:text-4xl lg:text-6xl 2xl:text-8xl font-bold leading-tight tracking-tight">
                  Illuminate Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r 2xl:text-8xl from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                    Perspective
                  </span>
                </h1>
                <p className="text-xl md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl 2xl:text-3xl">
                  A minimalist sanctuary for deep thought, technical mastery,
                  and creative storytelling. Join a community of modern
                  thinkers, shaping the digital broadsheet.
                </p>
              </div>

              <div className="flex gap-4 pt-4 text-[0.8rem]">
                <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 lg:px-6 lg:py-3 2xl:px-8 2xl:py-6 2xl:text-3xl rounded-full font-semibold hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-blue-500/25">
                  Get Started
                </button>
                <button className="border border-gray-500 dark:border-gray-800 px-4 py-2 2xl:px-8 2xl:py-6 2xl:text-3xl rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Slideshow Image Container - 50% width */}
          <div className="w-full  relative h-full md:h-[80%] rounded-2xl md:w-[50%] 2xl:w-[50%] md:flex md:items-center overflow-hidden order-1 md:order-2 px-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`slide-${index}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out transform ${
                  index === currentIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-110"
                }`}
              />
            ))}

            {/* Subtle Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === currentIndex
                      ? "w-12 bg-white"
                      : "w-3 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <ValueProposition />

        <BlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
