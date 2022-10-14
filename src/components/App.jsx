import { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import css from './Section/Section.module.css'


// COMPONENTS
import Searchbar from './Searchbar'
import ImageGallery from './ImageGallery'
import {LoadMoreBtn} from './shared/components/Button/Button';
import Loader from './shared/components/Loader/Loader'
import {Modal} from './shared/components/Modal/Modal'
import { searchApiPictures } from './services/api'



export default class App extends Component {
	state = {
		search: '',
		page: 1,
		images: [],
		loading: false,
		error: null,
		modalOpen: false,
		largeImageURL: '',
		total: 0,
	}
	componentDidUpdate(_, prevState) {
    const { search, page } = this.state;

		if ((search && prevState.search !== search) || page > prevState.page) {
			this.fetchImages(search, page)
		}
  }
  
	async fetchImages() {
    const { search, page } = this.state
    
		this.setState({
			loading: true,
		})
		try {
			const data = await searchApiPictures(search, page)
			if (data.totalHits === 0) {
				toast.error('No images found!')
			}

			this.setState(({ images }) => {
				return {
					images: [...images, ...data.hits],
					total: data.totalHits,
				}
			})
		} catch (error) {
			this.setState({
				error,
			})
		} finally {
			this.setState({
				loading: false,
			})
		}
	}
	loadMore = () => {
		this.setState(({ page }) => {
			return {
				page: page + 1,
			}
		})
	}

	openModal = largeImageURL => {
		this.setState({
			modalOpen: true,
			largeImageURL,
		})
	}

	closeModal = () => {
		this.setState({
			modalOpen: false,
			largeImageURL: '',
		})
  }
  
	handelFormSubmit = search => {
		this.setState({
			search,
			images: [],
			page: 1,
		})
	}

	render() {
		const { images, loading, error, modalOpen, largeImageURL, total } = this.state
		const { openModal, closeModal, handelFormSubmit, loadMore } = this
		const isImages = Boolean(images.length)

		return (
			<>
				<Searchbar onSubmit={handelFormSubmit} />
				{loading && <Loader />}
				{error && toast.error('Please try again later!')}
				<section className={css.app}>
					{isImages && <ImageGallery images={images} onClick={openModal} />}
					{images.length > 0 && images.length < total && <LoadMoreBtn loadMore={loadMore} />}
					{modalOpen && (
						<Modal onClose={closeModal}>
							<img src={largeImageURL} alt="" />
						</Modal>
					)}
				</section>
				<ToastContainer autoClose={3000} />
			</>
		)
	}
}
