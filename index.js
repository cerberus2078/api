const express = require('express');
const app = express();

// Now we can get json data from the client
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// IRL we could connect to the database
// But here we will user array of JS object
// Dummy database
let products =
[
    {id: 1, name: 'chair', price: 140},
    {id: 2, name: 'table', price: 300},
    {id: 3, name: 'closet', price: 400},
]

// Route to get all products
// localhost:5000/api/products  GET method
app.get('/api/products', (req,res) => {
    res.json(products);
});

// Get on product based on ID
// localhost:5000/api/products/2
app.get('/api/products/:id', (req,res) => {
    const productId = Number(req.params.id);
    console.log(productId);

    //const car = cars.find(car => car.id === id)
    const product = products.find(product => product.id === productId);

    if (product){
    res.json(product);
    }

    else{
        res.status(404).json({
            msg: "Not found"
        });
    }
});



// DELETE
app.delete('/api/products/:id', (req,res) => {
    const productId = Number(req.params.id);
    
    // check if we have a product with the id
    const product = products.find(product => product.id === productId);

    if(product){
        // cars = cars.filter(car => car.id !== idToRemove);
        products = products.filter(product => product.id !== productId);
        res.status(200).json({
            id: productId
        });  
    }
    else{
        res.status(404).json({
            msg: 'Could not find the product'
        });
    }
});



// Create 
app.post('/api/products', (req,res) => {
    //console.log(req.body);
    //res.send('ok');
    const lastId = products[products.length-1].id;
    const newId = lastId + 1;
    //console.log(newId);

    //res.send('ok');
    
    newProduct = {
        id: newId,
        name: req.body.name,
        price: req.body.price
    }

    products.push(newProduct);

    res.location('https://localhost:5000/api/products/' + newId);
    res.status(201).json(newProduct);
    
});


// Update
app.patch('/api/products/:id', (req,res) => {
    const idToUpdate = Number(req.params.id);
    const newName = req.body.name;
    const newPrice = req.body.price;

    products.forEach(product => {
        if(product.id === idToUpdate){
            product.name = newName;
            product.price = newPrice;
        }
    });


    const product = products.find(product => product.id === idToUpdate);
    if(product){
        res.status(200).json(product);
    }
    else{
        res.status(404).json({msg: 'Could not find the product'});
    }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));