'use client';
import React, { useEffect, useState, useRef } from 'react';
import './event.css';
import toast, { Toaster } from 'react-hot-toast';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import InstagramFeed from './InstgrameFeed';

const Page = () => {
  // Timmer --------------------------
  const targetDate = new Date('2026-03-13T00:00:00Z').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // Jion Form -----------------------------

//   const [formData, setFormData] = useState({
//     firstName: '',
//     email: '',
//     uCreator: false,
//     influencer: false,
//     social: false,
//     policy: false,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.firstName.trim() || !formData.email.trim()) {
//       toast.error('Please fill in all required fields.');
//       return;
//     }

//     if (!formData.policy) {
//       toast.error('You must accept the policy to proceed.');
//       return;
//     }

//     toast.success('Thanks! You are on the waitlist.');
//     console.log('Form Data:', formData);

//     setFormData({
//         firstName: '',
//         email: '',
//         uCreator: false,
//         influencer: false,
//         social: false,
//         policy: false,
//     });

//     };

    // Brand Form -----------------------------

    // const [brandForm, setBrandForm] = useState({
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     phone: '',
    //     message: '',
    // });

    // const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { name, value } = e.target;
    //     setBrandForm((prev) => ({
    //     ...prev,
    //     [name]: value,
    //     }));
    // };

    // const handleBrandSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();

    //     if (!brandForm.firstName.trim() || !brandForm.lastName.trim() || !brandForm.email.trim()) {
    //     toast.error('Please fill in all required fields.');
    //     return;
    //     }

    //     toast.success('Your entry has been submitted!');
    //     console.log('Brand Form Data:', brandForm);

    //     setBrandForm({
    //         firstName: '',
    //         lastName: '',
    //         email: '',
    //         phone: '',
    //         message: '',
    //     });
    // };

    // Gallery Images -----------------------------

    const images = [
        '/eventpage-assets/gallery/1.jpg',
        '/eventpage-assets/gallery/2.jpg',
        '/eventpage-assets/gallery/3.jpg',
        '/eventpage-assets/gallery/4.jpg',
        '/eventpage-assets/gallery/5.jpg',
        '/eventpage-assets/gallery/6.jpg'
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    // logoes array -----------------------------

    const brands = [
        { img: '/eventpage-assets/brand-icon/pr01.svg', link: 'https://itsblume.com/?srsltid=AfmBOopEwTON0_hawryx26cLqN5V4k46BdQ86k620TT9Acku-5Q89RMa' },
        { img: '/eventpage-assets/brand-icon/pr02.jpg', link: 'https://awakechocolate.ca/' },
        { img: '/eventpage-assets/brand-icon/1.png', link: 'javascript:void(0)' },
        { img: '/eventpage-assets/brand-icon/2.png', link: 'javascript:void(0)' },
        { img: '/eventpage-assets/brand-icon/3.png', link: 'javascript:void(0)' },
        { img: '/eventpage-assets/brand-icon/4.png', link: 'javascript:void(0)' },
        { img: '/eventpage-assets/brand-icon/5.png', link: 'javascript:void(0)' },
        { img: '/eventpage-assets/brand-icon/6.png', link: 'javascript:void(0)' },
        { img: '/eventpage-assets/brand-icon/7.png', link: 'javascript:void(0)' },
        { img: '/eventpage-assets/brand-icon/8.png', link: 'javascript:void(0)' },
        { img: '/eventpage-assets/brand-icon/9.png', link: 'javascript:void(0)' },
        { img: '/eventpage-assets/brand-icon/10.png', link: 'javascript:void(0)' },
        { img: '/eventpage-assets/brand-icon/11.png', link: 'javascript:void(0)' },
        { img: '/eventpage-assets/brand-icon/12.png', link: 'javascript:void(0)' },
        { img: '/eventpage-assets/brand-icon/13.png', link: 'javascript:void(0)' },
        { img: '/eventpage-assets/brand-icon/14.png', link: 'javascript:void(0)' },
        // { img: '/eventpage-assets/brand-icon/15.png', link: 'javascript:void(0)' },
        // { img: '/eventpage-assets/brand-icon/16.png', link: 'javascript:void(0)' },
    ];

    // video Sound

    // Desktop video state + ref
    const [desktopAudioOn, setDesktopAudioOn] = useState(false);
    const desktopVideoRef = useRef<HTMLVideoElement | null>(null);

    // Mobile video state + ref
    const [mobileAudioOn, setMobileAudioOn] = useState(false);
    const mobileVideoRef = useRef<HTMLVideoElement | null>(null);

    // Toggle desktop video only
    const toggleDesktopAudio = () => {
    const newState = !desktopAudioOn;
    setDesktopAudioOn(newState);

    if (desktopVideoRef.current) {
        desktopVideoRef.current.muted = !newState;
        if (newState) {
        desktopVideoRef.current.play().catch(() => {});
        }
    }
    };

    // Toggle mobile video only
    const toggleMobileAudio = () => {
    const newState = !mobileAudioOn;
    setMobileAudioOn(newState);

    if (mobileVideoRef.current) {
        mobileVideoRef.current.muted = !newState;
        if (newState) {
        mobileVideoRef.current.play().catch(() => {});
        }
    }
    };


  return (
    <main className="relative bg-white pt-24">

        <section id="presale" className='py-12 md:py-24'>
            <span className='shadow'></span>
            <Toaster position="top-right" reverseOrder={false} />

            <div className="colum-wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="content-box">
                    <h3>
                        Wovvo Creator
                        <br /> Meets <span className="gradient-text">Brands</span> 2026
                    </h3>
                    <p>Where Vancouver’s top creators and brands connect in real life.</p>

                    <div className="infoboxes-wrapper">
                        <div className="icon-box">
                        <img src="/eventpage-assets/calender-icon.svg" alt="Calendar" />
                        <h5>March 12, 2026</h5>
                        </div>
                        <div className="icon-box">
                        <img src="/eventpage-assets/location-icon.svg" alt="Location" />
                        <h5>475 Granville Street 5-8 PM</h5>
                        </div>
                    </div>

                    <div className="content">
                        <p>
                        Join 180 content creators, agencies, and brands for Vancouver’s first-ever <b>UGC Creator Meets Brands Event,</b> hosted by <b>Wovvo.</b>
                        </p>
                        <p>
                        Spend an evening of connection, collaboration, and content creation sparking new partnerships, land UGC deals, and build lasting industry relationships.
                        </p>
                        <p>
                        Meet the brands you love, network with creators, and walk away with fresh content filmed live.
                        </p>
                    </div>

                    <div className="tickets-li">
                        <h6>
                        🎟️ <span className="gradient-text">180 tickets available</span>  — grab yours before they’re gone!
                        </h6>
                    </div>

                    <a href='https://buy.stripe.com/bJe8wQ1tK27Q8eK0Rzds400' target='_blank'><button className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-lg text-white hover:bg-primary-dark transition-colors">
                        Grab Your Ticket
                    </button></a>
                </div>

                <div className="form-wrapper">
                    <h3>UGC Creators Limited tickets available now!</h3>
                    {/* <p>Limited tickets available now!</p> */}

                    <form>
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                        />

                        <h4>I am a...</h4>
                        <div className="checkobox-wrapper">
                            <div className="checkbox-wrapper">
                            <input type="checkbox" id="u-creator" />
                            <label htmlFor="u-creator">UCG Creator</label>
                            </div>
                            <div className="checkbox-wrapper">
                            <input type="checkbox" id="influencer" />
                            <label htmlFor="influencer">Influencer</label>
                            </div>
                            <div className="checkbox-wrapper">
                            <input type="checkbox" id="social" />
                            <label htmlFor="social">Social Media Manager</label>
                            </div>
                        </div>

                        {/* DIRECT REDIRECT BUTTON */}
                        <a
                            href="https://buy.stripe.com/bJe8wQ1tK27Q8eK0Rzds400"
                            target="_blank"
                            className="form-a"
                            rel="noopener noreferrer"
                        >
                            <button
                            type="button"
                            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-lg text-white hover:bg-primary-dark transition-colors"
                            >
                            Lock In Your Ticket
                            </button>
                        </a>

                        <div className="checkbox-wrapper" id='pr-links'>
                            <input type="checkbox" id="policy" />
                            <label htmlFor="policy">
                            I agree to receive emails from Wovvo. By signing up, I accept
                            Wovvo’s <a href='https://www.wovvo.ai/terms-and-conditions' target='_blank'>Terms of Service</a> and <a href='https://www.wovvo.ai/privacy-policy' target='_blank'>Privacy Policy</a>. I understand that I
                            can unsubscribe at any time.
                            </label>
                        </div>
                        </form>
                </div>
            </div>
        </section>

        {/* <section id="event-banner">
            <div className="banner-video">
            <video
                src="/eventpage-assets/banner-video.mp4"
                autoPlay
                muted
                loop
                playsInline
            ></video>
            </div>
            <div className="event-heading">
            <h2 className="gradient-text">Creators & Collabs</h2>
            <p>March 12, 2026 • Vancouver, BC • 5–8 PM</p>
            </div>
        </section> */}

        <section id="timmersection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3>
            Land your Next <span className="gradient-text">Collab May 14, 2026</span>
            </h3>
            <div className="box-wrapper">
            <div className="days">
                <span className="number">{timeLeft.days}</span>
                <span className="caption">Days</span>
            </div>
            <div className="hours">
                <span className="number">{timeLeft.hours}</span>
                <span className="caption">Hours</span>
            </div>
            <div className="minutes">
                <span className="number">{timeLeft.minutes}</span>
                <span className="caption">Mins</span>
            </div>
            <div className="sec">
                <span className="number">{timeLeft.seconds}</span>
                <span className="caption">Secs</span>
            </div>
            </div>
        </section>

        <section id="creator-ecnomy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
            <div className="heading-text">
                <h3>Built for Every Part of the <span className="gradient-text">Creator Economy</span></h3>
                <p>Creators, agencies, and brands come together to collaborate, learn, and create high-performing UGC that drives growth for everyone.</p>
            </div>
            <div className="creator-boxes">
                <div className="box">
                    <div>
                        <span className='icon'><img src="/eventpage-assets/creator.svg" /></span>
                        <h3>Creators</h3>
                        <p><b>Land</b> paid UGC deals, grow your portfolio, and connect with brands that value authentic content.</p>
                    </div>
                    <a href='https://buy.stripe.com/bJe8wQ1tK27Q8eK0Rzds400' target='_blank'><button className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-lg text-white hover:bg-primary-dark transition-colors">
                        Grow Your Network
                    </button></a>
                </div>
                <div className="box">
                    <div>
                        <span className='icon'><img src="/eventpage-assets/manager.svg" /></span>
                        <h3>Talent Managers & Agencies</h3>
                        <p><b>Connect</b> your roster with top brands, negotiate smarter deals, and stay ahead of UGC trends.</p>
                    </div>
                    <a href='https://buy.stripe.com/bJe8wQ1tK27Q8eK0Rzds400' target='_blank'><button className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-lg text-white hover:bg-primary-dark transition-colors">
                        Gain the Edge
                    </button></a>
                </div>
                <div className="box">
                    <div>
                        <span className='icon'><img src="/eventpage-assets/brand.svg" /></span>
                        <h3>Brands & Retailers</h3>
                        <p><b>Meet</b> creators in person, build genuine relationships, and leave with ready-to-use UGC filmed on site.</p>
                    </div>
                    <a href='https://docs.google.com/forms/d/1HYABo8WLrbP9bzSscmZ3MPFBmzU5FFWVYwC1G9tOHO4/edit' target='_blank'><button className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-lg text-white hover:bg-primary-dark transition-colors">
                        Business Registration
                    </button></a>
                </div>
            </div>
        </section>

        <section id="brands">
            <span className='shadow'></span>
            <div className="from-audio-video" id="destop-video">
                <span
                    className={`audio-btn ${desktopAudioOn ? 'on' : ''}`}
                    onClick={toggleDesktopAudio}
                >
                    <img src="/eventpage-assets/sound-on.png" className="audio-on" />
                    <img src="/eventpage-assets/sound-off.png" className="audio-off" />
                </span>

                <video
                    src="/eventpage-assets/form-video.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="destopvideo"
                    ref={desktopVideoRef}
                ></video>
            </div>
            <div className="colum-wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
                <div className="logoes-wrapper">
                    <div className="heading">
                        <h3>
                        Brands Attending
                        <br /> At <span className="gradient-text">The Event</span>
                        </h3>
                    </div>
                    <div className="logoes">
                        {brands.map((brand, i) => (
                            <a href={brand.link} target="_blank" rel="noopener noreferrer">
                                <div className="item" key={i}>
                                    <img src={brand.img} alt={`Brand ${i + 1}`} />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="form">
                    {/* <h3>Brands In The Goodie Bag</h3>
                    <p>Fill out this form to enter our goodie bags</p>

                    <form onSubmit={handleBrandSubmit}>
                        <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={brandForm.firstName}
                        onChange={handleBrandChange}
                        />
                        <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={brandForm.lastName}
                        onChange={handleBrandChange}
                        />
                        <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={brandForm.email}
                        onChange={handleBrandChange}
                        />
                        <input
                        type="tel"
                        placeholder="Phone Number"
                        name="phone"
                        value={brandForm.phone}
                        onChange={handleBrandChange}
                        />
                        <textarea
                        placeholder="Your Message..."
                        name="message"
                        value={brandForm.message}
                        onChange={handleBrandChange}
                        ></textarea>

                        <button
                        type="submit"
                        className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-lg text-white hover:bg-primary-dark transition-colors"
                        >
                        Submit Now
                        </button>
                    </form> */}
                    <div className="from-audio-video" id="mobile-video">
                        <span
                            className={`audio-btn ${mobileAudioOn ? 'on' : ''}`}
                            onClick={toggleMobileAudio}
                        >
                            <img src="/eventpage-assets/sound-on.png" className="audio-on" />
                            <img src="/eventpage-assets/sound-off.png" className="audio-off" />
                        </span>

                        <video
                            src="/eventpage-assets/form-video.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="destopvideo"
                            ref={mobileVideoRef}
                        ></video>
                    </div>
                </div>
            </div>
        </section>

        <section id='ticket-cta' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24'>
            <div className="culum-wrapper">
                <img src="/eventpage-assets/wovvo-icon.png" className='wovvo-icon-water' />
                <div className="content">
                    <h3>Tickets Are Going Fast <br/>Secure Yours Now!</h3>
                    <p>180 tickets available grab yours before they’re gone!</p>
                    <a href='https://buy.stripe.com/bJe8wQ1tK27Q8eK0Rzds400' target='_blank'><button className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-lg text-white hover:bg-primary-dark transition-colors">
                        Grab Your Tickets Now
                    </button></a>
                </div>
                <div className="image">
                    <img src="/eventpage-assets/ticketcta.png" />
                </div>
            </div>
        </section>

        <section id="space" className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className="shadows">
                <span></span>
                <span></span>
            </div>
            <div className="culum-wrapper">
                <div className="content">
                    <h3>The Space Where <br/><span className="gradient-text">Connections Happen</span></h3>
                    <p>The J Lounge Venue, Vancouver, BC — modern, bright, and designed for creators.</p>
                    <div className="notice-box">
                        <p>Nestled in the heart of downtown, the venue provides an open-concept space with natural light and 360° city views, perfect for networking and content creation.</p>
                    </div>
                    <h4>Venue <span className="gradient-text">Highlights:</span></h4>
                    <ul>
                        <li>
                            <span className='icon'><img src="/eventpage-assets/pin-icon.svg"/></span>
                            <span className='text'>1 minute from Granville Station</span>
                        </li>
                        <li>
                            <span className='icon'><img src="/eventpage-assets/coffe-icon.svg"/></span>
                            <span className='text'>Surrounded by cafés, restaurants, and waterfront views</span>
                        </li>
                        <li>
                            <span className='icon'><img src="/eventpage-assets/camera-icon.svg"/></span>
                            <span className='text'>Spacious layout ideal for filming and networking</span>
                        </li>
                        <li>
                            <span className='icon'><img src="/eventpage-assets/share-icon.svg"/></span>
                            <span className='text'>Full networking setup connecting brands and creators</span>
                        </li>
                    </ul>
                    <a href='https://buy.stripe.com/bJe8wQ1tK27Q8eK0Rzds400' target='_blank'><button className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-lg text-white hover:bg-primary-dark transition-colors">
                        Grow Your Network
                    </button></a>
                </div>
                <div className="img">
                    <img src="/eventpage-assets/space-img.png" />
                </div>
            </div>
        </section>

        <section id="brandeals" className='my-12 md:my-24'>
            <div className="extra-shades">
                <span className='red-shades'></span>
                <span className='oragane-shades'></span>
                <span className='lines'>
                    <img src="/eventpage-assets/lines.svg" />
                </span>
            </div>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24'>
                <div className="heading">
                    <h3>Meet Local Creators &<br/> <span className='gradient-text'>Win Brand Deals</span></h3>
                    <p>Businesses are attending the event because they want to meet you and sign deals.</p>
                    <a href='https://buy.stripe.com/bJe8wQ1tK27Q8eK0Rzds400' target='_blank'><button className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-lg text-white hover:bg-primary-dark transition-colors">
                        Tickets On Sale Now
                    </button></a>
                </div>
                <div className="cricle-wrapper">
                    <div className="circle-one cricle-wrapper-circle">
                        <img src="/eventpage-assets/circle-image/circel01.svg" />
                    </div>
                    <div className="circle-two cricle-wrapper-circle">
                        <img src="/eventpage-assets/circle-image/circle-two-1.svg" />
                        <img src="/eventpage-assets/circle-image/circle-two-2.svg" />
                    </div>
                    <div className="circle-three cricle-wrapper-circle">
                        <img src="/eventpage-assets/circle-image/circle-three-1.svg" />
                        <img src="/eventpage-assets/circle-image/circle-three-2.svg" />
                        <img src="/eventpage-assets/circle-image/circle-three-3.svg" />
                        <img src="/eventpage-assets/circle-image/circle-three-5.svg" />
                    </div>
                </div>
            </div>
        </section>

        <section id="space" className='photoshot-sec max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-24'>
            <div className="shadows">
                <span></span>
                <span></span>
            </div>
            <div className="culum-wrapper">
                <div className="img">
                    <img src="/eventpage-assets/professional.jpeg" />
                </div>
                <div className="content">
                    <h3>Complimentary Professional <br/><span className="gradient-text">Headshots with Your Ticket</span></h3>
                    <div className="notice-box">
                        <p>Every ticket includes a complimentary 15-minute professional photoshoot with our world-class photographers from the Vancouver Canucks.</p>
                    </div>
                    <p>You’ll receive 3 professionally edited photos — perfect for your portfolio, social media, or media kit.</p>
                    <p>This $350+ value is yours free with your ticket!</p>
                    <p>You’ll be asked to book your time slot before the event starts, so you can capture your best content without missing a moment of the event.</p>
                    <a href='https://buy.stripe.com/bJe8wQ1tK27Q8eK0Rzds400' target='_blank'><button className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-lg text-white hover:bg-primary-dark transition-colors">
                        Reserve Your Ticket & Headshot
                    </button></a>
                </div>
            </div>
        </section>

        <section id="creator-steps" className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className="heading">
                {/* <h5>What Creators</h5> */}
                <h4>From Screen to Stage — Step<br/> <span className='gradient-text'>Into the Creator Experience</span></h4>
                <a href='https://buy.stripe.com/bJe8wQ1tK27Q8eK0Rzds400' target='_blank'><button className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-lg text-white hover:bg-primary-dark transition-colors">
                    Grab Your Ticket
                </button></a>
            </div>
            <span className='line'></span>
            <span className='gradient-shades'></span>
            <div className="colum-wrapper">
                <div className="content">
                    <h5>What <span className='gradient-text'>Creators</span> <br/>can expect</h5>
                    <p>This event was built for creators who are ready to move from online connections to real-world opportunities.</p>
                    <img src="/eventpage-assets/0101.png" alt="" />
                </div>
                <div className="img">
                    <img src="/eventpage-assets/0202.png" alt="" />
                </div>
                <div className="content">
                    <img src="/eventpage-assets/0303.png" alt="" />
                    <ul>
                        <li><span><img src="/eventpage-assets/li-icon.svg"/></span>Meet 15+ brands hiring UGC creators</li>
                        <li><span><img src="/eventpage-assets/li-icon.svg"/></span>Capture on-site content for your portfolio</li>
                        <li><span><img src="/eventpage-assets/li-icon.svg"/></span>Network with agencies and other creators</li>
                        <li><span><img src="/eventpage-assets/li-icon.svg"/></span>Join panels on pitching, pricing, and scaling</li>
                        <li><span><img src="/eventpage-assets/li-icon.svg"/></span>Receive curated goodie bags and prize giveaways</li>
                    </ul>
                </div>
            </div>
        </section>

        <section id='ticket-cta' className='box-cat max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24'>
            <div className="culum-wrapper">
                <img src="/eventpage-assets/wovvo-icon.png" className='wovvo-icon-water' />
                <div className="content">
                    <h3>Take Home a Gift Bag<br/> Loaded With Products<br/> From Our Sponsors</h3>
                    <p>Every pass holder gets a $350+ gift bag packed with products from event partners.</p>
                    <a href='https://buy.stripe.com/bJe8wQ1tK27Q8eK0Rzds400' target='_blank'><button className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-lg text-white hover:bg-primary-dark transition-colors">
                        Grab Your Tickets Now
                    </button></a>
                </div>
                <div className="image">
                    {/* <img src="/eventpage-assets/gift-box.png" /> */}
                    <video
                        src="/eventpage-assets/gift-box.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                    </video>
                </div>
            </div>
        </section>

        <section id="creator-steps" className='creator-steps-two max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className="heading">
                {/* <h5>What Brands</h5> */}
                <h4>Turn Your Online Passion into <span className='gradient-text'>Real-World Partnerships</span></h4>
            </div>
            <span className='line'></span>
            <span className='gradient-shades'></span>
            <div className="colum-wrapper">
                <div className="img">
                    <img src="/eventpage-assets/partnerships01.png" />
                </div>
                <div className="content">
                    <h5>What <span className='gradient-text'>Agencies</span> <br/>Can Expect</h5>
                    <img src="/eventpage-assets/partnerships02.png" />
                </div>
                <div className="content">
                    <p>Build real relationships with the creators shaping today’s content economy. Find talent, film partnerships, and collect fresh UGC all in one day.</p>
                    <ul>
                        <li><span><img src="/eventpage-assets/li-icon.svg"/></span>200+ creators attending from multiple niches</li>
                        <li><span><img src="/eventpage-assets/li-icon.svg"/></span>Dedicated networking sessions and booth space</li>
                        <li><span><img src="/eventpage-assets/li-icon.svg"/></span>Access to creator portfolios and media kits</li>
                        <li><span><img src="/eventpage-assets/li-icon.svg"/></span>Opportunity to host giveaways or sponsor prizes</li>
                        <li><span><img src="/eventpage-assets/li-icon.svg"/></span>Optional speaking opportunities on industry panels</li>
                    </ul>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSfJJgieptkcg2qv-eBpx2uclZ4OJAl02WgSVEGD-q7YIBcUWA/viewform?usp=header" target='_blank'><button className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-lg text-white hover:bg-primary-dark transition-colors">
                        Become a Brand Partner
                    </button></a>
                </div>
            </div>
        </section>

        <section id="gallery" className='my-12 md:my-24'>
            <div className="shadows">
                <span></span>
                <span></span>
            </div>
            <div className="content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
                <div className="heading">
                    <h4>
                        Take a Peek Inside
                        <br />
                        <span className="gradient-text">The Event Venue</span>
                    </h4>
                    <a href="https://www.jlounge.ca/gallery" target='_blank'><button className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-lg text-white hover:bg-primary-dark transition-colors">
                        View Full Gallery
                    </button></a>
                </div>

                {/* 🔹 Responsive Grid */}
                <div className="gallery-images grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, index) => (
                    <div
                    key={index}
                    onClick={() => {
                        setIsOpen(true);
                        setPhotoIndex(index);
                    }}
                    >
                    <img
                        src={img}
                        alt={`Gallery image ${index + 1}`}
                    />
                    </div>
                ))}
                </div>

                {/* 🔹 Popup Lightbox */}
                {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                    setPhotoIndex((photoIndex + images.length - 1) % images.length)
                    }
                    onMoveNextRequest={() =>
                    setPhotoIndex((photoIndex + 1) % images.length)
                    }
                    enableZoom={false}
                />
                )}
            </div>
        </section>

        <section id='bussines-cta' className='box-cat max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className="culum-wrapper">
                <img src="/eventpage-assets/wovvo-icon.png" className='wovvo-icon-water' />
                <div className="content">
                    <h5>Are you a Business?</h5>
                    <h3>Apply Here to be a Business<br/> Involved at Collabs vs Creators</h3>
                    <p>We have limited spaces still available.</p>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSfJJgieptkcg2qv-eBpx2uclZ4OJAl02WgSVEGD-q7YIBcUWA/viewform?usp=header" target='_blank'><button className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-lg text-white hover:bg-primary-dark transition-colors">
                        Apply Now
                    </button></a>
                </div>
            </div>
        </section>

        {/* Instagram Section */}
        <section id="about_gallery" className="my-12 md:my-24">
            <span className='shadow'></span>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mx-auto mb-10">
                <h2 className="text-[25px] font-semibold text-primary tracking-wide">Follow us on Instagram</h2>
                <p className="mt-2 text-[40px] font-bold">
                See What We've <span className="gradient-text">Been Working On</span>
                </p>
                <p className="mt-4 text-md md:text-xl text-gray-600">
                <a href="https://www.instagram.com/Wovvo.ai" target="_blank" className='link-ins'>Wovvo.ai</a>
                </p>
            </div>
            </div>
            {/* ✅ Instagrma */}
            <InstagramFeed />
        </section>

    </main>
  );
};

export default Page;