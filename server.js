const express = require('express');
const { nanoid } = require('nanoid');
const cors = require('cors');
const app = express();
const port = 3000;

// Товары интернет-магазина (цифровые товары)
let products = [
    {
        id: nanoid(6),
        name: 'Протеин Gold',
        category: 'Спортпит',
        description: 'Белковая бомба',
        price: 2990,
        stock: 999,
        rating: 4.8,
        image: '/images/1.jpg'
    },
    {
        id: nanoid(6),
        name: 'Протеин Дядя Ваня',
        category: 'Спортпит',
        description: 'Белковый набор',
        price: 3990,
        stock: 500,
        rating: 4.9,
        image: '/images/2.jpg'
    },
    {
        id: nanoid(6),
        name: 'Креатин Дядя Ваня',
        category: 'Спортпит',
        description: 'Мощная штучка',
        price: 2000,
        stock: 3,
        rating: 5.0,
        image: '/images/3.jpg'
    },
    {
        id: nanoid(6),
        name: 'Креатин "Убийство"',
        category: 'Спортпит',
        description: 'Без комментариев',
        price: 8900,
        stock: 1000,
        rating: 4.7,
        image: '/images/4.jpg'
    },
    {
        id: nanoid(6),
        name: 'Протеиновый батончик(Гвоздь)',
        category: 'Спортпит',
        description: 'Залетает на ура',
        price: 14990,
        stock: 300,
        rating: 4.9,
        image: '/images/5.jpg'
    },
    {
        id: nanoid(6),
        name: 'Штанга',
        category: 'спорт-инвентарь',
        description: '20 kg',
        price: 1290,
        stock: 10000,
        rating: 4.9,
        image: '/images/6.jpg'
    },
    {
        id: nanoid(6),
        name: 'Тренболон',
        category: 'Спортпит',
        description: 'Для детей',
        price: 12900,
        stock: 200,
        rating: 4.6,
        image: '/images/7.jpg'
    },
    {
        id: nanoid(6),
        name: 'Шейкер',
        category: 'Спортпит',
        description: 'Патимейкер',
        price: 24900,
        stock: 150,
        rating: 4.8,
        image: '/images/8.jpg'
    },
    {
        id: nanoid(6),
        name: 'Проетин Kolorad',
        category: 'Спортпит',
        description: 'Вкусно',
        price: 1990,
        stock: 5000,
        rating: 4.7,
        image: '/images/9.jpg'
    },
    {
        id: nanoid(6),
        name: 'Белковый изолят',
        category: 'Спортпит',
        description: 'Для кабанов',
        price: 3990,
        stock: 400,
        rating: 4.8,
        image: '/images/10.jpg'
    }
];

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(`[${new Date().toISOString()}] [${req.method}] ${res.statusCode} ${req.path}`);
    });
    next();
});

app.get("/api/products", (req, res) => {
    const { category, minPrice, maxPrice } = req.query;
    let filtered = [...products];
    
    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }
    if (minPrice) {
        filtered = filtered.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
        filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }
    
    res.json(filtered);
});

app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
});

app.post("/api/products", (req, res) => {
    const { name, category, description, price, stock, rating, image } = req.body;
    
    if (!name || !category || !description || !price || !stock) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    
    const newProduct = {
        id: nanoid(6),
        name: name.trim(),
        category,
        description,
        price: Number(price),
        stock: Number(stock),
        rating: rating ? Number(rating) : 0,
        image: image || '/images/default.jpg'
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.patch("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }
    
    const { name, category, description, price, stock, rating, image } = req.body;
    
    if (name) product.name = name.trim();
    if (category) product.category = category;
    if (description) product.description = description;
    if (price !== undefined) product.price = Number(price);
    if (stock !== undefined) product.stock = Number(stock);
    if (rating !== undefined) product.rating = Number(rating);
    if (image) product.image = image;
    
    res.json(product);
});

app.delete("/api/products/:id", (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: "Product not found" });
    }
    
    products.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
    console.log(`Товаров в базе: ${products.length}`);
});