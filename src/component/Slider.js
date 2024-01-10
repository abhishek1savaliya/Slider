import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import axios from 'axios';


const Slide = () => {
    const minDistance = 10;

    const [values, setValues] = useState([0, 2000]);
    const [getAllProduct, setGetAllProduct] = useState([])
    const [products, setProducts] = useState(getAllProduct);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products?limit=100');
                setGetAllProduct(response.data.products);

                setLoading(false)

            } catch (err) {
                console.log(err)
            }
        };

        fetchData();
    }, []);

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValues([Math.min(newValue[0], values[1] - minDistance), values[1]]);
        } else {
            setValues([values[0], Math.max(newValue[1], values[0] + minDistance)]);
        }
    };

    useEffect(() => {
        const pro = getAllProduct.filter((item) => {
            return item.price > parseInt(values[0]) && item.price < parseInt(values[1])
        })

        setProducts(pro)
    }, [values, getAllProduct])

    return (
        <div className="container mx-auto p-4">
            <div className="bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200 p-6 rounded shadow mb-4">

                <p className="text-lg font-semibold mb-2">Slider:</p>
                <div className="mb-4">Min: {values[0]} && Max: {values[1]}</div>
                <Slider
                    getAriaLabel={() => 'Minimum distance'}
                    value={values}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    disableSwap
                    min={0}
                    max={2000}
                />
            </div>



            {
                loading ? (<div className="flex items-center justify-center h-64 bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 rounded shadow">
                    <div aria-label="Loading..." role="status" class="flex items-center space-x-2">
                        <svg class="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                            <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                            <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="24"></line>
                            <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                            </line>
                            <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="24"></line>
                            <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                            </line>
                            <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="24"></line>
                            <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                            <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                            </line>
                        </svg>
                        <span class="text-4xl font-medium text-gray-500">Loading...</span>
                    </div>
                </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        products.map((item, index) => (
                            <div key={item.id} className={`bg-gradient-to-r ${index % 2 === 0 ? 'from-green-100 via-teal-100 to-blue-100' : 'from-red-100 via-orange-100 to-yellow-100'} p-6 rounded shadow`}>
                    
                                <img src={item.thumbnail} alt={item.title} className="mb-4 w-full rounded-lg shadow-md" />
                                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                                <p className="text-gray-600 mb-2">{item.description}</p>
                                <p className="text-blue-600 font-semibold mb-2">Price: ${item.price}</p>
                                <p className="text-green-600 font-semibold mb-2">Discount: {item.discountPercentage}%</p>
                                <p className="mb-2">Rating: {item.rating}/5</p>
                                <p className="mb-2">Stock: {item.stock}</p>
                                <p className="mb-2">Brand: {item.brand}</p>
                                <p className="mb-2">Category: {item.category}</p>
                                <h3 className="text-lg font-semibold mb-2">More Images:</h3>
                                <div className="flex flex-wrap">
                                    <div className="flex overflow-x-auto p-4">
                                        {item.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`Product ${index + 1}`}
                                                className="w-24 h-24 object-cover rounded-md shadow-md m-1"
                                            />
                                        ))}
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>)
            }




        </div>
    );
};

export default Slide;
