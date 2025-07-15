import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import dropdown_icon from "../assets/dropdown_icon.png";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import CartLoader from "../components/loaders/CartLoader";

const Collection = () => {
    const { products, search, showSearch, backendUrl } =
        useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [sortSize, setSortSize] = useState("relevent");
    const [loading, setLoading] = useState(true);

    const toggleSizes = (e) => {
        if (sizes.includes(e.target.value)) {
            setSizes((prev) => prev.filter((item) => item !== e.target.value));
        } else {
            setSizes((prev) => [...prev, e.target.value]);
        }
    };

    const applyFilters = () => {
        let productsToFilter = products.slice();
        if (sizes.length > 0) {
            productsToFilter = productsToFilter.filter((item) =>
                item.stock_details?.some((detail) =>
                    sizes.includes(detail.size)
                )
            );
        }

        if (showSearch && search) {
            productsToFilter = productsToFilter.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredProducts(productsToFilter);
    };

    const sortProducts = () => {
        let fpCopy = filteredProducts.slice();
        switch (sortSize) {
            case "low-high":
                setFilteredProducts(fpCopy.sort((a, b) => a.price - b.price));
                break;
            case "high-low":
                setFilteredProducts(fpCopy.sort((a, b) => b.price - a.price));
                break;
            default:
                applyFilters();
                break;
        }
    };

    useEffect(() => {
        applyFilters();
    }, [products, sizes, search, showSearch]);

    useEffect(() => {
        sortProducts();
    }, [sortSize]);

    useEffect(() => {
        // Simulate loading or wait for data
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [products]);

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            {/* Left side */}
            {/* filter option */}
            <div className="min-w-60">
                <p
                    onClick={() => {
                        setShowFilter(!showFilter);
                    }}
                    className="my-2 text-xl flex items-center cursor-pointer gap-2"
                >
                    FILTERS
                    <img
                        className={`h-3 sm:hidden ${
                            showFilter ? "roate-90" : ""
                        }`}
                        src={dropdown_icon}
                        alt=""
                    />
                </p>
                {/* size category */}
                <div
                    className={`border border-gray-300 pl-5 py-3 mt-6 ${
                        showFilter ? "" : "hidden"
                    } sm:block`}
                >
                    <p className="mb-3 text-sm font-medium">SIZES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input
                                className="w-3"
                                type="checkbox"
                                value={"M"}
                                onChange={toggleSizes}
                            />
                            M
                        </p>
                        <p className="flex gap-2">
                            <input
                                className="w-3"
                                type="checkbox"
                                value={"L"}
                                onChange={toggleSizes}
                            />
                            L
                        </p>
                        <p className="flex gap-2">
                            <input
                                className="w-3"
                                type="checkbox"
                                value={"XL"}
                                onChange={toggleSizes}
                            />
                            XL
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side */}
            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={"ALL"} text2={"COLLECTIONS"} />
                    {/* product sorting */}
                    <select
                        onChange={(e) => setSortSize(e.target.value)}
                        className="border-2 border-gray-300 text-sm px-2"
                    >
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                {/* map products */}
                <div className="min-h-[200px]">
                    {loading ? (
                        <CartLoader />
                    ) : filteredProducts.length === 0 ? (
                        <p className="text-center text-gray-500 mt-10 mb-10">
                            No products found.
                        </p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 ld:grid-cols-4 gap-4 gap-y-6">
                            {filteredProducts.map((item, index) => (
                                <ProductItem
                                    key={index}
                                    id={item.id}
                                    image={`${backendUrl}${item.images[0].image}`}
                                    name={item.name}
                                    price={item.price}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Collection;
