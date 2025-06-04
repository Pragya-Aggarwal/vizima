import React from "react";

export const LocationMapSection = (): JSX.Element => {
    // Define location markers data for easier mapping
    const locationMarkers = [
        { id: 1, count: 40, size: "large", top: "475px", left: "283px" },
        { id: 2, count: 12, size: "medium", top: "338px", left: "193px" },
        { id: 3, count: 8, size: "small", top: "534px", left: "135px" },
        { id: 4, count: 1, size: "small", top: "392px", left: "329px" },
        { id: 5, count: 2, size: "small", top: "602px", left: "289px" },
        { id: 6, count: 20, size: "large", top: "373px", left: "75px" },
        { id: 7, count: 16, size: "medium", top: "249px", left: "337px" },
        { id: 8, count: 2, size: "small", top: "168px", left: "218px" },
    ];

    // Helper function to get marker styles based on size
    const getMarkerStyles = (size: string) => {
        switch (size) {
            case "large":
                return {
                    containerClass: "w-[60px] h-[68px]",
                    markerClass: "h-[60px] rounded-[30px] border-8",
                    textClass: "top-[9px] left-3",
                };
            case "medium":
                return {
                    containerClass: "w-12 h-[54px]",
                    markerClass: "h-12 rounded-3xl border-[6px]",
                    textClass: "top-[5px] left-2",
                };
            case "small":
                return {
                    containerClass: "w-10 h-[45px]",
                    markerClass: "h-10 rounded-[20px] border-4",
                    textClass: "top-[3px] left-[11px]",
                };
            default:
                return {
                    containerClass: "w-10 h-[45px]",
                    markerClass: "h-10 rounded-[20px] border-4",
                    textClass: "top-[3px] left-[11px]",
                };
        }
    };

    return (
        <div className="relative w-full h-[900px] bg-[url(https://c.animaapp.com/mbi2us3vKS97yu/img/map.png)] bg-cover bg-[50%_50%]">
            {locationMarkers.map((marker) => {
                const styles = getMarkerStyles(marker.size);

                return (
                    <div
                        key={marker.id}
                        className={`absolute ${styles.containerClass}`}
                        style={{ top: marker.top, left: marker.left }}
                    >
                        <div
                            className={`relative ${styles.markerClass} bg-bg border-solid border-[#49735a]`}
                        >
                            <div
                                className={`absolute ${styles.textClass} font-desktop-subtitle-bold font-[number:var(--desktop-subtitle-bold-font-weight)] text-text text-[length:var(--desktop-subtitle-bold-font-size)] tracking-[var(--desktop-subtitle-bold-letter-spacing)] leading-[var(--desktop-subtitle-bold-line-height)] whitespace-nowrap [font-style:var(--desktop-subtitle-bold-font-style)]`}
                            >
                                {marker.count}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
