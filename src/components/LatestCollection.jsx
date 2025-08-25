import { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import { gsap } from "gsap";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
    const { products, backendUrl } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const gridRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products]);

    useEffect(() => {
        if (latestProducts.length > 0) {
            const tl = gsap.timeline();
            
            tl.fromTo(titleRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            )
            .fromTo(gridRef.current.children,
                { opacity: 0, y: 30, scale: 0.9 },
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out"
                },
                "-=0.3"
            );
        }
    }, [latestProducts]);

    return (
        <div className="my-10">
            <div ref={titleRef} className="text-center sm:py-8 text-3xl opacity-0">
                <Title text1={" LATEST "} text2={" COLLECTION "} />
            </div>
            {/* products rendering */}

            <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {latestProducts.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item.id}
                        image={`${backendUrl}${item.images[0].image}`}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default LatestCollection;
