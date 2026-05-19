import React from 'react';
import effortlessImg from '../assets/images/effortless_publishing.png';

const ValueProposition = () => {
  const cards = [
    {
      title: "Effortless Publishing",
      description: "Create any website with flexible design tools and the power of blocks. Start with a blank canvas or choose a theme. Customize every detail—no code needed.",
      image: effortlessImg,
      bgColor: "bg-gray-50 dark:bg-gray-800/30"
    },
    {
      title: "Track Your Growth",
      description: "See how your site will look in real time, even as you add, edit, and rearrange content—with intuitive editing and integrated features to manage it all.",
      type: "illustration",
      theme: "orange",
      bgColor: "bg-[#fff5f0] dark:bg-orange-900/10"
    },
    {
      title: "Designed for Emerging Writers",
      description: "Make your site do whatever you need it to. Add a store, analytics, newsletter, social media integration; you're in control with an extensive library of plugins.",
      type: "illustration",
      theme: "teal",
      bgColor: "bg-[#f0f9fa] dark:bg-teal-900/10"
    }
  ];

  return (
    <section className="py-24 px-6 md:px-16 lg:px-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 w-full">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {cards.map((card, index) => (
            <div key={index} className="space-y-10 group cursor-pointer">
              {/* Image/Illustration Container */}
              <div className={`aspect-[4/3] rounded-[2rem] overflow-hidden ${card.bgColor} flex items-center justify-center p-4 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-blue-500/5`}>
                {card.image ? (
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-contain rounded-2xl" 
                  />
                ) : (
                  <div className={`w-full h-full rounded-2xl flex items-center justify-center relative overflow-hidden shadow-inner ${
                    card.theme === 'orange' ? 'bg-[#FF6B35]' : 'bg-[#005F73]'
                  }`}>
                    {card.theme === 'orange' ? (
                      <div className="relative">
                         {/* Minimalist Dashboard/Cursor vibe */}
                         <div className="w-24 h-24 bg-white/10 rounded-full animate-pulse" />
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-white drop-shadow-lg">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 2l12 11.013-7 1.987 5 6-4 3-5-6-1 5z" />
                            </svg>
                         </div>
                      </div>
                    ) : (
                      <div className="w-full h-full p-10 flex flex-col justify-end relative">
                        {/* Abstract wave decoration */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/20 rounded-full -ml-24 -mb-24 blur-3xl" />
                        
                        <div className="relative z-10 space-y-3">
                           <div className="flex gap-1.5">
                             <div className="h-1 w-8 bg-white/40 rounded-full" />
                             <div className="h-1 w-4 bg-white/20 rounded-full" />
                           </div>
                           <div className="text-white/95 font-bold text-3xl tracking-tighter drop-shadow-sm">novem</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className="space-y-5">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
