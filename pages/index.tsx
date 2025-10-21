import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// The data structure is perfect, we'll keep it exactly as it is.
const sliderData = [
  {
    img: "/1.png",
    location: "Switzerland Alps",
    description:
      "The journey to Machu Picchu typically starts in the mountain city of Cusco, which was the capital city of the Inca Empire",
    title: "SAINT ANTÖNEN",
  },
  {
    img: "/2.png",
    title: "The Grand Canyon",
    description:
      "The earth's geological history opens before your eyes in a mile-deep chasm",
    location: "Arizona",
  },
  {
    img: "/3.png",
    title: "Masai Mara",
    description:
      "Wild animals in their natural environment, luxury safari lodges",
    location: "Kenya",
  },
  {
    img: "/4.png",
    title: "Angkor Wat",
    description:
      "A stunning ancient jungle city with hundreds of intricately constructed temples",
    location: "Cambodia",
  },
  {
    img: "/7.png",
    title: "Bali",
    description:
      "Tropical beaches, volcano hikes, ancient temples, and friendly people",
    location: "Indonesia",
  },
];

export default function Home() {
  // We use a ref to get a reference to our main container element
  const mainRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect is perfect for animations that need to happen after the DOM is painted
  useLayoutEffect(() => {
    // A GSAP context allows for safe cleanup of animations
    const ctx = gsap.context(() => {
      // Create an animation for each section
      sliderData.forEach((_, index) => {
        const section = document.getElementById(`section-${index}`);
        if (!section) return;

        const content = section.querySelector('.content-container');
        const background = section.querySelector('.background-image');

        // Animate the content box to fade in and slide up
        gsap.from(content, {
          yPercent: 50,
          opacity: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          },
        });

        // Create a subtle parallax effect on the background image
        gsap.to(background, {
          yPercent: -15, // Move the background up by 15% of its height
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, mainRef);

    // Cleanup function to remove all animations when the component unmounts
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef}>
      {/* We map over the sliderData to create a section for each item */}
      {sliderData.map((slide, index) => (
        <section
          key={index}
          id={`section-${index}`}
          className="relative h-screen w-screen flex items-center justify-start overflow-hidden"
        >
          {/* Background Image */}
          <div
            className="background-image absolute top-0 left-0 w-full h-[130%] bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.img})`, willChange: 'transform' }}
          />

          {/* Content Container */}
          <div className="relative z-10 ml-[5%] md:ml-[10%] max-w-md">
            <div className="content-container bg-black bg-opacity-50 backdrop-blur-md p-8 rounded-lg">
              <h3 className="text-lg font-light tracking-widest uppercase opacity-80 mb-2">
                {slide.location}
              </h3>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {slide.title}
              </h1>
              <p className="mt-4 text-base opacity-90">
                {slide.description}
              </p>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}