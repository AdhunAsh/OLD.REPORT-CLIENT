import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelatedProducts = ({ subcategory, currentProductId }) => {
    const { products, backendUrl } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0 && subcategory) {
            const products_copy = products.filter(
                (item) => item.subcategory === subcategory && parseInt(item.id) !== parseInt(currentProductId)
            );

            setRelated(products_copy.slice(0, 5));
        }
    }, [products, currentProductId]);

    return (
        <div className="my-24">
            <div className="text-center text-3xl py-2">
                <Title text1={"RELATED"} text2={"PRODUCTS"} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {related.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item.id}
                        image={`${item.images[0].image}`}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
