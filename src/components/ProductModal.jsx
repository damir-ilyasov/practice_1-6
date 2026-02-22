import React, { useState, useEffect } from 'react';

export default function ProductModal({ open, mode, initialProduct, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        stock: '',
        rating: '5'
    });

    useEffect(() => {
        if (initialProduct && mode === 'edit') {
            setFormData(initialProduct);
        } else {
            setFormData({
                name: '',
                category: '',
                description: '',
                price: '',
                stock: '',
                rating: '5'
            });
        }
    }, [initialProduct, mode, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!open) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal__header">
                    <h2>{mode === 'create' ? 'Новый товар' : 'Редактировать товар'}</h2>
                    <button className="modal__close" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit} className="modal__form">
                    <div className="form-group">
                        <label>Название товара *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Например: Протеин Gold"
                        />
                    </div>

                    <div className="form-group">
                        <label>Категория *</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            placeholder="Например: Спортпит"
                        />
                    </div>

                    <div className="form-group">
                        <label>Описание *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="3"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Цена (₽) *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </div>

                        <div className="form-group">
                            <label>Количество *</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </div>

                        <div className="form-group">
                            <label>Рейтинг</label>
                            <input
                                type="number"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                min="0"
                                max="5"
                                step="0.1"
                            />
                        </div>
                    </div>

                    <div className="modal__actions">
                        <button type="button" className="btn btn--secondary" onClick={onClose}>
                            Отмена
                        </button>
                        <button type="submit" className="btn btn--primary">
                            {mode === 'create' ? 'Создать' : 'Сохранить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}   