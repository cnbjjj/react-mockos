import React, { useEffect, useRef } from "react";
import Layout from "../layout/Layout";
import jj from "../../assets/jj.jpeg";

function Gallery() {
    const images = [
        "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/8784470/pexels-photo-8784470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/416179/pexels-photo-416179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/70069/pexels-photo-70069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/33101/new-wing-emergency-at-the-moment.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/792416/pexels-photo-792416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/36762/scarlet-honeyeater-bird-red-feathers.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/255435/pexels-photo-255435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2400030/pexels-photo-2400030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/106685/pexels-photo-106685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2078747/pexels-photo-2078747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/135940/pexels-photo-135940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2398418/pexels-photo-2398418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2570085/pexels-photo-2570085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ];
    const galleryRef = useRef(null);
    useEffect(() => {
        galleryRef?.current.addEventListener('mousewheel', (e) => {
            if (e.deltaY > 0) {

            } else {
                console.log('scroll up');
            }
        });
    }, []);
    return (
        <Layout title={'Gallery'}>
            <div className='grid grid-cols-2 gap-2 p-4' ref={galleryRef}>
                {
                    images.map((image, index) => (
                        <img key={index} src={image}
                            alt='gallery'
                            className='rounded-md aspect-square object-cover shadow-sm grid-item in'
                            style={{
                                '--delay': index / 50 + 's',
                                '--gallery-image-top': `${Math.floor(index / 2)}px`,
                                '--gallery-image-left': `${(index % 2)}px`
                            }} />
                    ))
                }
            </div>
        </Layout>
    )
}
export default Gallery;