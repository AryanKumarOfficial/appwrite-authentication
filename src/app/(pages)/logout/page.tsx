"use client";
import {useRouter} from "next/navigation";
import useAuth from "@/context/useAuth";
import React, {useEffect} from "react";
import appwriteService from "@/appwrite/config";

const LogoutPage = () => {
    const router = useRouter();
    const {setAuthStatus} = useAuth();
    useEffect(() => {
        appwriteService.logout()
            .then(() => {
                setAuthStatus(false)
                router.replace("/")
            })
    }, []);

    return (
        <div className={"h-screen flex items-center justify-center text-xl"}>
            Logging out...
        </div>
    )
}

export default LogoutPage;