import React from "react";

type Props = {
    img: string;
    alt?: string;
}

const Avatar: React.FC<Props> = ({img, alt}) => {
    return (
        <div className={"rounded-full overflow-hidden w-full pt-[100%] relative"}>
            <div className={"absolute inset-0"}>
                <img alt={alt || img} src={img}/>
            </div>
        </div>
    )
}

export default Avatar;