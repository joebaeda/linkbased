'use client'

import { useState, useEffect } from "react";

interface EFPProps {
    basename: string
}

export default function EthFollowCounts({ basename }: EFPProps) {
    const [followersCount, setFollowersCount] = useState<number | null>(null);
    const [followingCount, setFollowingCount] = useState<number | null>(null);

    useEffect(() => {
        // Fetch followers
        fetch(`https://api.ethfollow.xyz/api/v1/users/${basename}/followers`)
            .then((res) => res.json())
            .then((data) => {
                const count =
                    data.followers && Array.isArray(data.followers)
                        ? data.followers.length
                        : null;
                setFollowersCount(count);
            })
            .catch((err) => {
                console.error("Error fetching followers:", err);
                setFollowersCount(null);
            });

        // Fetch following
        fetch(`https://api.ethfollow.xyz/api/v1/users/${basename}/following`)
            .then((res) => res.json())
            .then((data) => {
                const count =
                    data.following && Array.isArray(data.following)
                        ? data.following.length
                        : null;
                setFollowingCount(count);
            })
            .catch((err) => {
                console.error("Error fetching following:", err);
                setFollowingCount(null);
            });
    }, [basename]);

    return (
        <div className="w-full flex gap-4 font-extrabold text-white justify-center mt-4">
            <span>
                {followersCount !== null ? followersCount : "0"}<span className="opacity-25"> Followers</span>
            </span>
            <span>
                {followingCount !== null ? followingCount : "0"}<span className="opacity-25"> Following</span>
            </span>
        </div>
    );
}
