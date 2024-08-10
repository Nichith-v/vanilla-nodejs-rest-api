const http = require('http')
const { getProducts, getProduct, createProduct,updateProduct, deleteProduct } = require('./controllers/productController')

const server = http.createServer((req, res) => {

    // Handle GET request for all products
    if (req.url === '/api/products' && req.method === 'GET')
    {
        getProducts(req, res)
    } 
    
    // Handle GET request for a single product by ID
    else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET')
    {
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    }
    
    // Handle POST request to create a new product
    else if(req.url === '/api/products' && req.method === 'POST')
    {
        createProduct(req, res)
    }

    // Handle PUT request to update a product by ID
    else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT')
    {
        const id = req.url.split('/')[3]
        updateProduct(req, res, id)
    }

    // Handle DELETE request to remove a product by ID
    else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE') 
    {
        const id = req.url.split('/')[3]
        deleteProduct(req, res, id)
    }

    // Handle requests to undefined routes
    else 
    {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route not Found' }))

    }
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server runnig on ${PORT}`))

