import React from 'react';
import PropTypes from 'prop-types';

export default class Slide extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <g>
        {this.props.currentSlide ?
          <g>
            <rect
              x="0"
              y="0"
              width={this.props.currentSlide.slide.width}
              height={this.props.currentSlide.slide.height}
              fill="white"
            />
            <image
              x="0" y="0"
              width={this.props.currentSlide.slide.width}
              height={this.props.currentSlide.slide.height}
              xlinkHref={this.props.currentSlide.slide.img_uri}
              strokeWidth="0.8"
            />
          </g>
        : null }
      </g>
    );
  }
}
