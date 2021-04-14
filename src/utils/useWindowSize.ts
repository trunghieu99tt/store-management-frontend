import { useEffect, useState } from "react";
import { Size } from "../types/app.types";

/**
 * Hàm trả về kích thước của cửa sổ hiện tại
 */
function useWindowSize(): Size {
    const [windowSize, setWindowSize] = useState<Size>({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

export { useWindowSize };
