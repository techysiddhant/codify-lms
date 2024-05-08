"use client";
import GridLoader  from "react-spinners/GridLoader";

export const Loader = ({ size = 20 }) => {
    return (
        <div>
            <GridLoader 
                color="hsla(221.2, 83.2%, 53.3%, 1)"
                size={size}
            />
        </div>

    )
}
