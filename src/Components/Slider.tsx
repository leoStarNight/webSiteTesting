import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import '../Variables/Variables'
import 'swiper/swiper-bundle.css';
import '../Styles/Slider.css';

import gData from '../Variables/Variables';
import { useMediaQuery } from 'react-responsive';

interface SlideData {
    Slides: {
        Data: {
            Title;
            Desc;
        }[]
    }[]
}

type Props = {
    slides ?: SlideData;
}

const Slider = (props: Props) => {
    const [slide, setSlide] = React.useState(0);

    React.useEffect(() => {
        setInterval(() => setSlide(gData.chosenIndex - 1));
    })

    let readyToProcess = props.slides.Slides[slide];

    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={4}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            className='slider'
        >
        {
            readyToProcess.Data.map(
                (elem) => (
                    <SwiperSlide className='swiper-slide'>
                        <p className='title'>{elem.Title}</p>
                        <p className='desc'>{elem.Desc}</p>
                    </SwiperSlide>
                )
            ) 
        }
        </Swiper>
    )
}

export default Slider;