import React from 'react';

import './collection-item.styles.scss';

import CustomButton from '../custom-button/custom-button.component';

import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';

const CollectionItem = ({item, addItem}) => {
    const {name, price, imageUrl } = item;
    return(
        <div className="collection-item">
            <div className="image"
            style={{
                backgroundImage: `url(${imageUrl})`
            }}>
            </div>
            <div className="collection-footer">
             <span className="item-name">{name}</span>
             <span className="item-price">${price}</span>
            </div>
            <CustomButton onClick={() => addItem(item)} inverted>Add to Cart</CustomButton>
        </div>
    )
}

const mapDispatchtoProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchtoProps)(CollectionItem);