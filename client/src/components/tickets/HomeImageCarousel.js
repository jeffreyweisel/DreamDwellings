import React, { useEffect, useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import { getHomes } from '../../DataManagers/homeManager';

// not currently using but created for potentional use later


export default function HomeImageCarousel() {
    const [homes, setHomes] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    useEffect(() => {
      getHomes().then(setHomes);
      console.log(homes);
    }, []);
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === homes.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    };
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? homes.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    };
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    };
  
    return (
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        {homes.length > 0 && (
          <CarouselIndicators
            items={homes.map((home) => ({ src: home.homeImage }))}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
        )}
        {homes.map((home) => (
          <CarouselItem
            key={home.id}
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
          >
            <img src={home.homeImage} alt="supposedtobeimage" 
             style={{ width: '700px', height: '500px', objectFit: 'cover' }}/>
            <CarouselCaption
              captionText={home.price.toLocaleString('en-US')}
              captionHeader={home.streetAddress}
            />
          </CarouselItem>
        ))}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    );
  }
