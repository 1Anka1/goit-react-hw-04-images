import css from '../Button/Button.module.css';

export function LoadMoreBtn({ loadMore }) {
    return (
        <button className={css.buttonLoand} onClick={loadMore}>Load more</button>
    )
}