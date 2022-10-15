import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Section/Section.module.css';
import { useState, useEffect } from 'react';

// COMPONENTS
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { LoadMoreBtn } from './shared/components/Button/Button';
import Loader from './shared/components/Loader/Loader';
import { Modal } from './shared/components/Modal/Modal';
import { searchApiPictures } from './services/api';

export default function App() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [total, setTotal] = useState(0);

  // 	componentDidUpdate(_, prevState) {
  //     const { search, page } = this.state;

  // if ((search && prevState.search !== search) || page > prevState.page) {
  // 	this.fetchImages(search, page)
  // }
  //   }

  useEffect(() => {
    setImages([]);
  }, [search]);

  useEffect(() => {
    if (!search) return;

    const fetchImages = async () => {
      setLoading(true);

      try {
        const data = await searchApiPictures(search, page);
        if (data.totalHits === 0) {
          toast.error('No images found!');
        }
        setImages(prev => {
          setTotal(data.totalHits);
          return [...prev, ...data.hits];
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [page, search]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const openModal = largeImageURL => {
    setModalOpen(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setModalOpen(false);
    setLargeImageURL('');
  };

  const handelFormSubmit = search => {
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const isImages = Boolean(images.length);

  return (
    <>
      <Searchbar onSubmit={handelFormSubmit} />
      {loading && <Loader />}
      {error && toast.error('Please try again later!')}
      <section className={css.app}>
        {isImages && <ImageGallery images={images} onClick={openModal} />}
        {images.length > 0 && images.length < total && (
          <LoadMoreBtn loadMore={loadMore} />
        )}
        {modalOpen && (
          <Modal onClose={closeModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </section>
      <ToastContainer autoClose={3000} />
    </>
  );
}