const fs = require("fs");

exports.getAllProducts = (req, res) => {
    const products = JSON.parse(
        fs.readFileSync(`${__dirname}/../data/products.json`)
    );

    res.status(200).json({
        status: "success",
        timeOfRequest: req.requestTime,
        results: products.length,
        data: {
            products,
        },
    });
};

exports.addProduct = (req, res) => {
    const products = JSON.parse(
        fs.readFileSync(`${__dirname}/../data/products.json`)
    );
    products.push(req.body);
    fs.writeFileSync(`${__dirname}/data/products.json`, JSON.stringify(products));

    res.status(200).json({
        status: "success",
        data: {
            products,
        },
    });
};

exports.getProductById = (req, res) => {
    const products = JSON.parse(
        fs.readFileSync(`${__dirname}/../data/products.json`)
    );
    const foundProduct = products.find((p) => p.id == req.params.id);
    if (foundProduct) {
        res.status(200).json({
            status: "success",
            data: {
                product: foundProduct,
            },
        });
    } else {
        res.status(404).json({
            status: "not found",
        });
    }
};

exports.updatedProductById = (req, res) => {
    const products = JSON.parse(
        fs.readFileSync(`${__dirname}/../data/products.json`)
    );
    const product = products.find((p) => p.id == req.params.id);
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.category = req.body.category;
        products.map(value => {
            if (value === product){
                value = product;
                return value;
            }
        });
        fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
        res.status(201).json({
            status: "success",
            message: 'Archivo modificado con exito'
        });
    } else {
        res.status(404).json({
            status: "not found",
        });
    }
}

exports.deleteProductById = (req, res) => {
    const products = JSON.parse(
        fs.readFileSync(`${__dirname}/../data/products.json`)
    );
    const foundProduct = products.find((p) => p.id == req.params.id);
    if (foundProduct) {
        products.forEach((value, key) => {
            if (value.id === foundProduct.id) products.splice(key, 1);
        });
        fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
        res.status(204).json({
            status: "success",
            message: 'Archivo eliminado con exito'
        });
    } else {
        res.status(404).json({
            status: "not found",
        });
    }
}
