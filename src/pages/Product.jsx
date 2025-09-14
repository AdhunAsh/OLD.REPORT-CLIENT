import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Policy from "../components/Policy";
import RelatedProducts from "../components/RelatedProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import ButtonLoader from "../components/ButtonLoader";

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState("");
    const [size, setSize] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);

    const fetchProductData = () => {
        setLoading(true);
        
        const product = products.find(item => parseInt(item.id) === parseInt(productId));
        if (product) {
            setProductData(product);
            setImage(`${product.images[0].image}`);
            setSubcategory(product.subcategory);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId]);

    const handleImageClick = (newImage) => {
        setImage(newImage);
    };

    const handleAddToCart = async (e) => {
        e.preventDefault();
        if (!size) return;
        
        setAddingToCart(true);
        try {
            await addToCart(productData.id, size);
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return productData ? (
        <div className="border-t-2 sm:pt-10">
            {/* Product Data */}
            <div className="flex gap-8 sm:gap-12 flex-col sm:flex-row ">
                {/* Product Images */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {productData.images.map((item, index) => (
                            <img
                                onClick={() => handleImageClick(`${item.image}`)}
                                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-200"
                                src={`${item.image}`}
                                key={index}
                                alt={`Product view ${index + 1}`}
                            />
                        ))}
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img
                            className="w-full h-auto transition-opacity duration-300"
                            src={image}
                            alt={productData.name}
                        />
                    </div>
                </div>
                {/* Product Information */}
                <div className="flex-1">
                    <h1 className="font-medium text-2xl mt-2">
                        {productData.name}
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                        100% original product.
                    </p>
                    <p className="mt-5 text-3xl font-medium">
                        {currency}
                        {productData.price}
                    </p>
                    <p className="mt-5 text-gray-500 md:w-4/5">
                        {productData.description}
                    </p>
                    <div className="flex flex-col gap-4 my-8">
                        <p>Select Size</p>
                        <div className="flex gap-2">
                            {productData.stock_details.map((detail, index) => (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (detail.quantity > 0) {
                                            setSize(detail.size);
                                        }
                                    }}
                                    disabled={detail.quantity === 0}
                                    className={`border py-2 px-4 transition-all duration-200 ${
                                        detail.quantity === 0
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    } ${
                                        detail.size === size
                                            ? "border-gray-900 bg-gray-200"
                                            : ""
                                    }`}
                                    key={index}
                                >
                                    {detail.size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <ButtonLoader
                        type="button"
                        onClick={handleAddToCart}
                        loading={addingToCart}
                        disabled={!size || addingToCart}
                        className={`px-8 py-3 transition-colors duration-200 ${
                            !size || addingToCart 
                                ? "bg-gray-400 cursor-not-allowed text-white" 
                                : "bg-black text-white hover:bg-gray-800"
                        }`}
                    >
                        ADD TO CART
                    </ButtonLoader>
                    <hr className="mt-8 sm:4/5"></hr>
                    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                        <Policy />
                    </div>
                </div>
            </div>

            {/* Description & Review Section */}
            <div className="mt-20">
                <div className="flex">
                    <b className="border px-5 py-3 text-sm">Description</b>
                </div>
                <div className="flex flex-col gap-6 border px-6 py-8 text-gray-600">
                    <p>
                        We are a future-forward clothing brand inspired by the
                        sacred threads of ancient and the bold silhouettes of a
                        futuristic world. Our unisex designs blend traditional
                        drapes, timeless motifs, and rich textures with
                        cutting-edge aesthetics—creating clothing that feels
                        like heritage reimagined. Every piece we craft is more
                        than fabric—it’s a narrative woven through time. We
                        honor the artistry of the past while pushing the
                        boundaries of what fashion can become. From the fluid
                        elegance of ancestral drapery to the sharp precision of
                        modern tailoring, our collections are built for those
                        who seek meaning in style and depth in detail. This is
                        not just clothing—it is an experience. A movement that
                        connects eras, cultures, and visions of tomorrow.
                        Whether worn as a statement or cherished as an everyday
                        essential, each design speaks to individuality,
                        confidence, and timeless creativity.
                    </p>
                    <p>
                        It’s a timeline.<br></br> Every piece tells a story, and
                        every story becomes a statement.
                    </p>
                </div>
            </div>

            {/* Display related products */}
            <RelatedProducts
                subcategory={subcategory}
                currentProductId={productId}
            />
        </div>
    ) : (
        <div className="text-center py-10">
            <p className="text-gray-500">Product not found</p>
        </div>
    );
};

export default Product;
