import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import profile_icon from "../assets/profile_icon.png";
import menu_icon from "../assets/menu_icon.png";
import cart_icon from "../assets/cart_icon.png";
import dropdown_icon from "../assets/dropdown_icon.png";
import { useUser, useClerk } from "@clerk/clerk-react";

const NavBar = () => {
    const [visible, setVisible] = useState(false);

    const { isSignedIn } = useUser();
    const { signOut } = useClerk();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate("/login");
    };
    //
    const handleSignin = () => {
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-between py-5 font-medium">
            <Link to="/">
                <img src={logo} alt="Logo" className="w-36" />
            </Link>

            <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>

                <NavLink
                    to="/collection"
                    className="flex flex-col items-center gap-1"
                >
                    <p>COLLECTION</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>

                <NavLink
                    to="/cart"
                    className="flex flex-col items-center gap-1"
                >
                    <p>CART</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>

                <NavLink
                    to="/orders"
                    className="flex flex-col items-center gap-1"
                >
                    <p>ORDERS</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>

                {/* <NavLink
                    to="/about"
                    className="flex flex-col items-center gap-1"
                >
                    <p>ABOUT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink> */}

                <NavLink
                    to="/contact"
                    className="flex flex-col items-center gap-1"
                >
                    <p>CONTACT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
            </ul>

            <div className="flex  item-center gap-2">
                {/* <Link to="/cart" className="relative">
                    <img src={cart_icon} alt="" className="w-5 min-w-5" />
                </Link>    */}
                <div>
                    {!isSignedIn && (
                        <p
                            onClick={handleSignin}
                            className="text-black px-2 py-[2px] border border-gray-500 cursor-pointer hover:bg-gray-200"
                        >
                            Sign up
                        </p>
                    )}
                </div>
                {/* <img
                    onClick={() => setShowSearch(true)}
                    src={search_icon}
                    alt=""
                    className="w-5 cursor-pointer items-center"
                /> */} 

                <div className="group relative">
                    <div>
                        <img
                            src={profile_icon}
                            alt=""
                            className="w-5 cursor-pointer "
                        />
                    </div>
                    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                        <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                            <NavLink to="/profile">
                                <p className="cursor-pointer hover:text-black">
                                    My Profile
                                </p>
                            </NavLink>
                            <p
                                onClick={() => {
                                    if (isSignedIn) {
                                        navigate("/orders");
                                    } else {
                                        navigate("/login");
                                    }
                                }}
                                className="cursor-pointer hover:text-black"
                            >
                                Orders
                            </p>
                            {isSignedIn && (
                                <p
                                    onClick={handleLogout}
                                    className="cursor-pointer hover:text-black"
                                >
                                    Logout
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                
                <img
                    onClick={() => setVisible(true)}
                    src={menu_icon}
                    alt=""
                    className="w-5 cursor-pointer sm:hidden"
                />
            </div>

            {/* side bar for small screen*/}
            <div
                className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
                    visible ? "w-full" : "w-0"
                }`}
            >
                <div className="flex flex-col text-gray-600">
                    <div
                        onClick={() => setVisible(false)}
                        className="flex items-center gap-4 p-3"
                    >
                        <img
                            src={dropdown_icon}
                            alt=""
                            className="h-4 rotate-180"
                        />
                        <p>Back</p>
                    </div>
                    <NavLink
                        onClick={() => setVisible(false)}
                        className="py-2 pl-6 border"
                        to="/"
                    >
                        HOME
                    </NavLink>
                    <NavLink
                        onClick={() => setVisible(false)}
                        className="py-2 pl-6 border"
                        to="/collection"
                    >
                        COLLECTION
                    </NavLink>
                    <NavLink
                        onClick={() => setVisible(false)}
                        className="py-2 pl-6 border"
                        to="/cart"
                    >
                        CART
                    </NavLink>
                    <NavLink
                        onClick={() => setVisible(false)}
                        className="py-2 pl-6 border"
                        to="/about"
                    >
                        ABOUT
                    </NavLink>
                    <NavLink
                        onClick={() => setVisible(false)}
                        className="py-2 pl-6 border"
                        to="/contact"
                    >
                        CONTACT
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
