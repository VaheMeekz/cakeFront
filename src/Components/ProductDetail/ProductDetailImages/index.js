import React, {useState} from 'react';
import css from './productDetailImages.module.css';

const ProductDetailImages = ({item}) => {

    let mainImage = item.image.split(',').map((i) => i)

    const [img, setImg] = useState(mainImage[0])

    const handleClick = (link) => {
        setImg(link)
    }

    return (
        <div className={css.mainImages}>
            <img src={img} alt="image"/>
            <div>
                {
                    mainImage?.map((i) => {
                        return (
                            <img onClick={() => handleClick(i)} src={i} alt="image"/>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ProductDetailImages;