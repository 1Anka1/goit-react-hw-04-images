import PropTypes from 'prop-types';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css'

function ImageGalleryItem({id, tags, webformatURL, largeImageURL, onClick}){
    return (
        <li key = {id} className={css.ImageGalleryItem}>
            <img 
                
                src={webformatURL} 
                alt = {tags} 
                loading='lazy'
                className={css.ImageGalleryItem_image} 
                onClick={() => { onClick(largeImageURL)}}>
            </img>
        </li>
    )
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    onClick: PropTypes.func,
    tags: PropTypes.string,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    id: PropTypes.number,
}