import React, { useEffect, useState } from "react";
import "./ProductsPage.scss";

import ProductsList from "../../components/ProductsList";
import ProductModal from "../../components/ProductModal";
import { api } from "../../api";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: ''
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        loadProducts();
    }, [filters]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await api.getProducts(filters);
            setProducts(data);
        } catch (err) {
            console.error(err);
            alert("Ошибка загрузки товаров");
        } finally {
            setLoading(false);
        }
    };

    const openCreate = () => {
        setModalMode("create");
        setEditingProduct(null);
        setModalOpen(true);
    };

    const openEdit = (product) => {
        setModalMode("edit");
        setEditingProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingProduct(null);
    };

    const handleDelete = async (id) => {
        const ok = window.confirm("Удалить товар?");
        if (!ok) return;

        try {
            await api.deleteProduct(id);
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error(err);
            alert("Ошибка удаления товара");
        }
    };

    const handleSubmitModal = async (payload) => {
        try {
            if (modalMode === "create") {
                const newProduct = await api.createProduct(payload);
                setProducts((prev) => [...prev, newProduct]);
            } else {
                const updatedProduct = await api.updateProduct(payload.id, payload);
                setProducts((prev) =>
                    prev.map((p) => (p.id === payload.id ? updatedProduct : p))
                );
            }
            closeModal();
        } catch (err) {
            console.error(err);
            alert("Ошибка сохранения товара");
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const categories = [...new Set(products.map(p => p.category))];

    return (
        <div className="page">
            <header className="header">
                <div className="header__inner">
                    <div className="brand">Sport Shop</div>
                    <div className="header__right">Спортивные товары</div>
                </div>
            </header>

            <main className="main">
                <div className="container">
                    <div className="toolbar">
                        <h1 className="title">Товары</h1>
                        <button className="btn btn--primary" onClick={openCreate}>
                            + Добавить товар
                        </button>
                    </div>

                    <div className="filters">
                        <select name="category" onChange={handleFilterChange} value={filters.category}>
                            <option value="">Все категории</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="minPrice"
                            placeholder="Мин. цена"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                        />
                        <input
                            type="number"
                            name="maxPrice"
                            placeholder="Макс. цена"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                        />
                    </div>

                    {loading ? (
                        <div>Загрузка...</div>
                    ) : (
                        <ProductsList 
                            products={products} 
                            onEdit={openEdit} 
                            onDelete={handleDelete} 
                        />
                    )}
                </div>
            </main>

            <footer className="footer">
                <div className="footer__inner">
                    © {new Date().getFullYear()} Sport Shop
                </div>
            </footer>

            <ProductModal
                open={modalOpen}
                mode={modalMode}
                initialProduct={editingProduct}
                onClose={closeModal}
                onSubmit={handleSubmitModal}
            />
        </div>
    );
}