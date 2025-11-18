import {useState, useEffect} from "react";
import "../styles/ScrollToTopButton.css";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(!entry.isIntersecting);
            }, {threshold: 0}
        );

        const header = document.querySelector(".gallery-header");
        if (header) {
            observer.observe(header);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <button
            className={`scroll-to-top-btn ${isVisible ? "visible" : ""}`}
            onClick={scrollToTop}>
            ↑
        </button>
    );
};

export default ScrollToTopButton;