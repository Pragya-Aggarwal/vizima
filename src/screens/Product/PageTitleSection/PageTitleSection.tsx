import React from "react";

export const PageTitleSection = (): JSX.Element => {
    return (
        <section className="flex flex-col gap-3 w-full py-6">
            <h2 className="font-desktop-h3 text-text text-[length:var(--desktop-h3-font-size)] tracking-[var(--desktop-h3-letter-spacing)] leading-[var(--desktop-h3-line-height)] font-[number:var(--desktop-h3-font-weight)] [font-style:var(--desktop-h3-font-style)]">
                Find PGs and Hostels in Delhi NCR on Vizima
            </h2>

            <div className="font-desktop-text-regular text-text text-[length:var(--desktop-text-regular-font-size)] tracking-[var(--desktop-text-regular-letter-spacing)] leading-[var(--desktop-text-regular-line-height)] font-[number:var(--desktop-text-regular-font-weight)] [font-style:var(--desktop-text-regular-font-style)]">
                <p>
                    Looking for a PG or hostel in Delhi NCR? Vizima helps you discover
                    verified shared accommodations, whether you&#39;re a student or a
                    working professional.
                </p>
                <p className="mt-4">
                    Find boys/girls PGs, co-living studios, and hostels that offer clean
                    rooms, daily meals, Wi-Fi, and security — all at budget-friendly
                    rates. Choose from single, double, or triple sharing rooms across
                    locations like Lajpat Nagar, Karol Bagh, Noida, and Gurgaon. Compare
                    amenities, check rent, and schedule visits easily from your phone.
                </p>
                <p className="mt-4">
                    All listings are personally verified and managed by trusted property
                    owners. With Vizima, finding the right place to stay is now simple,
                    fast, and transparent.
                </p>
            </div>
        </section>
    );
};
