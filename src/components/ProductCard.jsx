import React from 'react';

export default function ProductCard({ product, onEdit, onDelete }) {
    return (
        <div className="product-card">
            <div className="product-card__content">
                <h3 className="product-card__title">{product.name}</h3>
                <span className="product-card__category">{product.category}</span>
                <p className="product-card__description">{product.description}</p>
                
                <div className="product-card__details">
                    <div className="product-card__price">
                        <span className="product-card__price-label">Цена:</span>
                        <span className="product-card__price-value">{product.price} ₽</span>
                    </div>
                    
                    <div className="product-card__stock">
                        <span className="product-card__stock-label">В наличии:</span>
                        <span className={`product-card__stock-value ${product.stock < 10 ? 'product-card__stock--low' : ''}`}>
                            {product.stock} шт.
                        </span>
                    </div>
                    
                    <div className="product-card__rating">
                        <span className="product-card__rating-stars">★</span>
                        <span className="product-card__rating-value">{product.rating}</span>
                    </div>
                </div>

                <div className="product-card__actions">
                    <button 
                        className="btn btn--edit"
                        onClick={() => onEdit(product)}
                    >
                        Редактировать
                    </button>
                    <button 
                        className="btn btn--delete"
                        onClick={() => onDelete(product.id)}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
}