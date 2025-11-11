'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

interface InstagramMediaItem {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
}

const InstagramFeed = () => {
  const [media, setMedia] = useState<InstagramMediaItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstagramMedia = async () => {
      try {
        const res = await fetch(
          'https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&access_token=IGAAHKoYxeZA3JBZAFQ4TU55NUZAXcEFRcmhyTXRXWl9PT1pHXzJWaFRrN3JPbHU4cEh0SDM5Um5JY0U2VjRXVDdqMllMdmJ4T1dxWDVYeGp0ZADNZANWg3UGtuWVhWYlRjcEFyOUI5ZAk5OdEVHNzZAQdVVXcE93'
        );

        const data = await res.json();
        if (data.error) throw new Error(data.error.message);

        setMedia(data.data || []);
      } catch (err: any) {
        console.error('Instagram API error:', err);
        setError(err.message || 'Failed to load feed');
      }
    };

    fetchInstagramMedia();
  }, []);

  return (
    <div className="p-0 instafedd-wrapper">
      {error && <p className="text-red-500 mb-4">⚠️ {error}</p>}

      {media.length > 0 ? (
        <Swiper
          modules={[Autoplay]}
          loop={media.length > 5}
          slidesPerView={5}
          spaceBetween={16}
          autoplay={{
            delay: 1, // Small delay to keep continuous movement
            disableOnInteraction: false,
          }}
          speed={6000}
          allowTouchMove={false}
          grabCursor={false}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {media.map((item) => (
            <SwiperSlide key={item.id}>
              <a
                href={item.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group block w-full h-[220px] md:h-[350px] rounded overflow-hidden instafedd-item"
              >
                <img
                  src={item.media_type === 'VIDEO' ? item.thumbnail_url! : item.media_url}
                  alt="Instagram post"
                  className="w-full h-full object-cover rounded transition-transform duration-300 group-hover:scale-105"
                />
                {item.caption && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <p className="text-white text-sm text-center line-clamp-4">
                      {item.caption}
                    </p>
                  </div>
                )}
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-500">Loading Instagram feed...</p>
      )}
    </div>
  );
};

export default InstagramFeed;