import React from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';

class CustomCarousel extends React.Component {
  state = {
    activeIndex: 0,
  }

  render() {
    return (
      <div className='carousel-wrapper'>
        {this.prepareData()}
      </div>
    );
  }

  prepareData = () => {
    const { activeIndex } = this.state;
    return (
      <div>
        <Carousel
          className={`carousel-container ${this.props.halfWidth ? 'half-view-width' : ''} pl-0`}
          interval={false}
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
          slide={false}
        >
          <CarouselIndicators items={this.props.posters} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {this.props.posters.map(poster => {
            let currentPoster = `http://argoxinterns:2003${poster.poster}`;
            return (
              <CarouselItem key={poster.poster}>
                <div className='background-carousel-img' style={{
                  background: `${this.props.halfWidth ? `url(${currentPoster})` : `linear-gradient( rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), url(${currentPoster})`}`
                }}></div>
                <div className={`${this.props.halfWidth ? '' : 'background-black'}`}>
                  <img className={`carousel-img ${this.props.halfWidth ? 'opacity-8' : 'opacity-3'}`} src={currentPoster} alt={poster.poster} height='600px' />
                </div>
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
              </CarouselItem>
            );
          })}
        </Carousel>
        {this.props.children}
      </div>
    );
  }

  next = () => {
    const nextIndex = this.state.activeIndex === this.props.posters.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous = () => {
    const nextIndex = this.state.activeIndex === 0 ? this.props.posters.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex = (newIndex) => {
    this.setState({ activeIndex: newIndex });
  }
}

export default CustomCarousel;