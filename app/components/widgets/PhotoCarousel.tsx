"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import Image from 'next/image';
import { useState, useEffect } from 'react';

type Props = {
  profileImages: {
    _key: string;
    image: string;
    lqip: string;
    alt: string;
    customSize: string;
  }[];
};

const ProfileCarousel = ({ profileImages }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showHint, setShowHint] = useState(true);

  // Nascondi il suggerimento dopo alcuni secondi
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="profile-carousel-container relative">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards, Pagination, Autoplay]}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        className="mySwiper"
        onSlideChange={() => setShowHint(false)}
      >
        {profileImages.map((image) => (
          <SwiperSlide key={image._key}>
            <div className={image.customSize === 'portrait' ? 'portrait' : 'landscape'}>
              <div className={`relative w-full h-full ${isLoading ? 'bg-gray-200 animate-pulse' : ''}`}>
                <Image
                  src={image.image}
                  alt={image.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={image.lqip}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-lg"
                  onLoadingComplete={() => setIsLoading(false)}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Suggerimento iniziale */}
      {showHint && (
        <div className="carousel-hint">
          Trascina per vedere altre foto
        </div>
      )}
    </div>
  );
};

export default ProfileCarousel;