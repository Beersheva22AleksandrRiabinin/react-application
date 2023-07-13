import React, { useState } from "react";
import {
    FormControl, Grid, TextField, InputLabel, Select, Box, MenuItem, Button,
    FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText
} from '@mui/material';
import { Product } from "../../model/Product";
import categoriesConfig from '../../config/categories-config.json'

type Props = {
    submitFn: (prod: Product) => void
    productUpdated?: Product
}
const categories: string[] = categoriesConfig.categories
const initialProduct: Product = {
    id: 0, imageUrl: '', title: '', price: 0, content: '', category: ''
};

export const AddProductForm: React.FC<Props> = ({ submitFn, productUpdated }) => {

    const [product, setProduct] = useState<Product>(productUpdated || initialProduct);
    const [errorMessage, setErrorMessage] = useState('');

    function handlerImageUrl(event: any) {
        const imageUrl = event.target.value;
        const prodCopy = { ...product };
        prodCopy.imageUrl = imageUrl;
        setProduct(prodCopy);
    }
    function handlerPrice(event: any) {
        const price: number = +event.target.value;
        const prodCopy = { ...product };
        prodCopy.price = price;
        setProduct(prodCopy);
    }
    function handlerCategory(event: any) {
        const category = event.target.value;
        const prodCopy = { ...product };
        prodCopy.category = category;
        setProduct(prodCopy);
    }
    function handlerTitle(event: any) {
        const title = event.target.value;
        const prodCopy = { ...product };
        prodCopy.title = title;
        setProduct(prodCopy);
    }
    function handlerContent(event: any) {
        const content = event.target.value;
        const prodCopy = { ...product };
        prodCopy.content = content;
        setProduct(prodCopy);
    }
    async function onSubmitFn(event: any) {
        event.preventDefault();
        // if (!product.category) {
        //     setErrorMessage("Please select category")
        // } else {
            submitFn(product);
            event.target.reset();
        // }
    }
    function onResetFn(event: any) {
        setProduct(productUpdated || initialProduct);
    }

    return <Box sx={{ marginTop: { sm: "25vh" } }}>
        <form onSubmit={onSubmitFn} onReset={onResetFn}>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={8} sm={5} >
                    <FormControl fullWidth required>
                        <InputLabel id="select-category-id">Category</InputLabel>
                        <Select labelId="select-category-id" label="Category"
                            value={product.category} onChange={handlerCategory}>
                            <MenuItem value=''>None</MenuItem>
                            {categories.map(cat => <MenuItem value={cat} key={cat}>{cat}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8} sm={5} >
                    <TextField type="text" required fullWidth label="Image url"
                        helperText="enter image url" onChange={handlerImageUrl}
                        value={product.imageUrl} />
                </Grid>
                <Grid item xs={8} sm={5} >
                    <TextField type="text" required fullWidth label="Title"
                        helperText="enter title" onChange={handlerTitle}
                        value={product.title} />
                </Grid>
                <Grid item xs={8} sm={5} >
                    <TextField type="text" required fullWidth label="Content"
                        helperText="enter content" onChange={handlerContent}
                        value={product.content} />
                </Grid>

                <Grid item xs={8} sm={4} md={5} >
                    <TextField label="Price" fullWidth required
                        type="number" onChange={handlerPrice}
                        value={product.price || ''}
                        helperText={'enter product price'}
                        inputProps={{
                            min: 0,
                            max: Number.MAX_VALUE
                        }} />
                </Grid>
                
                
            </Grid>
            <Box sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
                <Button type="submit" >Submit</Button>
                <Button type="reset">Reset</Button>
            </Box>
        </form>
    </Box>
}