const express = require('express');
const { nanoid } = require('nanoid');
const cors = require('cors');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 3000;

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
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
            console.log('Body:', req.body);
        }
    });
    next();
});

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API спортивного магазина',
            version: '1.0.0',
            description: 'API для управления товарами спортивного магазина',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Локальный сервер',
            },
        ],
    },
    apis: ['./server.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - description
 *         - price
 *         - stock
 *       properties:
 *         id:
 *           type: string
 *           description: Автоматически сгенерированный ID товара
 *         name:
 *           type: string
 *           description: Название товара
 *         category:
 *           type: string
 *           description: Категория товара
 *         description:
 *           type: string
 *           description: Описание товара
 *         price:
 *           type: number
 *           description: Цена товара в рублях
 *         stock:
 *           type: integer
 *           description: Количество на складе
 *         rating:
 *           type: number
 *           description: Рейтинг товара (0-5)
 *         image:
 *           type: string
 *           description: Путь к изображению
 *       example:
 *         id: "abc123"
 *         name: "Протеин Gold"
 *         category: "Спортпит"
 *         description: "Белковая бомба"
 *         price: 2990
 *         stock: 999
 *         rating: 4.8
 *         image: "/images/1.jpg"
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Возвращает список всех товаров
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Фильтр по категории
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Минимальная цена
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Максимальная цена
 *     responses:
 *       200:
 *         description: Список товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получает товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Данные товара
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создает новый товар
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - description
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               rating:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Товар успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Ошибка в теле запроса
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Обновляет данные товара
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               rating:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Обновленный товар
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Нет данных для обновления
 *       404:
 *         description: Товар не найден
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Удаляет товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     responses:
 *       204:
 *         description: Товар успешно удален (нет тела ответа)
 *       404:
 *         description: Товар не найден
 */
app.delete("/api/products/:id", (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: "Product not found" });
    }
    
    products.splice(index, 1);
    res.status(204).send();
});

// 404 для всех остальных маршрутов
app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
});

app.listen(port, '127.0.0.1', () => {
    console.log(`Сервер запущен на http://127.0.0.1:${port}`);
    console.log(`Товаров в базе: ${products.length}`);
    console.log(`Swagger UI доступен по адресу http://127.0.0.1:${port}/api-docs`);
});

setInterval(() => {
    console.log("Сервер жив...");
}, 5000);