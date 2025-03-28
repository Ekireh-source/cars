"use client";  // 👈 Add this to enable client-side rendering

import authenticated from "@/lib/authenticated";
import Company from "./company";
import { getUserConfig } from "@/lib/account";
import { User } from "@/interface/user.interface";
import { useEffect, useState } from "react";
import AuctionPage from "./customer";

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);  
    const [loading, setLoading] = useState(true);  

    useEffect(() => {
        const checkAuth = async () => {
            
    
            
            const userConfig = await getUserConfig<User>();
            setUser(userConfig);
            console.log({ userConfig });
            
            setLoading(false);
        };

        checkAuth();
    }, []);

    if (loading) {
        return <p>Loading...</p>;  
    }

    return (
        <div>
            {user?.user_role === "COMPANY" && <Company />}
            {user?.user_role === "CUSTOMER" && <AuctionPage />}
            
            
        </div>
    );
}
