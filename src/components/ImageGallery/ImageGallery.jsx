import PropTypes from 'prop-types'
import React from 'react'

import ImageGalleryItem from '../ImageGalleryItem'
import css from './ImageGallery.module.css'

function ImageGallery({ images, onClick}) {
	return (
    <ul className={css.imageGallery}>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          tags={tags}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
           onClick = {onClick}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
	images: PropTypes.array,
	id: PropTypes.number,
	webformatURL: PropTypes.string,
	largeImageURL: PropTypes.string,
	tags: PropTypes.string,
}

export default ImageGallery;
