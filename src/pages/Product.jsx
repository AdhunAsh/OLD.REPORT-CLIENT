import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Policy from "../components/Policy";
import RelatedProducts from "../components/RelatedProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import { gsap } from "gsap";

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart, backendUrl } =
        useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState("");
    const [size, setSize] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [loading, setLoading] = useState(false);

    const containerRef = useRef(null);
    const imageGalleryRef = useRef(null);
    const productInfoRef = useRef(null);

    const fetchProductData = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        products.map((item) => {
            if (parseInt(item.id) === parseInt(productId)) {
                setProductData(item);
                setImage(`${backendUrl}${item.images[0].image}`);
                setSubcategory(item.subcategory);
                return null;
            }
        });
        setLoading(false);
    };

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId]);

    useEffect(() => {
        if (!loading && productData) {
            const tl = gsap.timeline();

            tl.fromTo(
                containerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
            )
                .fromTo(
                    imageGalleryRef.current.children,
                    { opacity: 0, x: -50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                    },
                    "-=0.4"
                )
                .fromTo(
                    productInfoRef.current.children,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                    },
                    "-=0.4"
                );
        }
    }, [loading, productData]);

    const handleImageClick = (newImage) => {
        gsap.to(imageGalleryRef.current.querySelector(".main-image"), {
            opacity: 0,
            scale: 0.95,
            duration: 0.2,
            onComplete: () => {
                setImage(newImage);
                gsap.to(imageGalleryRef.current.querySelector(".main-image"), {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: "back.out(1.7)",
                });
            },
        });
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(productData.id, size);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return productData ? (
        <div ref={containerRef} className="bordet-t-2 sm:pt-10 opacity-0">
            {/* Product Data */}
            <div className="flex gap-8 sm:gap-12 flex-col sm:flex-row ">
                {/* Product Images */}
                <div
                    ref={imageGalleryRef}
                    className="flex-1 flex flex-col-reverse gap-3 sm:flex-row"
                >
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {productData.images.map((item, index) => (
                            <img
                                onClick={() =>
                                    handleImageClick(
                                        `${item.image}`
                                    )
                                }
                                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-200"
                                src={`${item.image}`}
                                key={index}
                                alt=""
                            />
                        ))}
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img
                            className="main-image w-full h-auto"
                            src={image}
                            alt=""
                        />
                    </div>
                </div>
                {/* Product Information */}
                <div ref={productInfoRef} className="flex-1">
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
                                    onClick={() =>
                                        detail.quantity > 0 &&
                                        setSize(detail.size)
                                    }
                                    disabled={detail.quantity === 0}
                                    className={`border py-2 px-4 transition-all duration-200 ${
                                        detail.quantity === 0
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed" // Out of stock style
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
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors duration-200"
                    >
                        ADD TO CART
                    </button>
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
        <div className="opacity-0"></div>
    );
};

export default Product;
