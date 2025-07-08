"use client";
import React from "react";
import { Waypoints } from "lucide-react";
import RegisterForm from "@/components/auth/RegisterForm";
import OAuth from "@/components/auth/OAuth";
import useGetUser from "@/lib/useGetUser";
import WaveLoading from "@/components/auth/Loading";

export default function RegisterPage() {
    const { user, loading } = useGetUser();
    if (loading) return <WaveLoading />;
    if (user) {
        if (typeof window !== "undefined") window.location.href = "/";
        return null;
    }
    return (
        <div className="container mx-auto flex flex-col my-10">
            <h1 className="text-5xl font-bold text-center mt-24">Register for an account</h1>
            <p className="text-center text-lg text-muted-foreground mt-4">Join the community and start your cybersecurity journey today.</p>
            <div className="flex max-md:flex-col max-md:items-center justify-center mt-10 gap-10 items-center">
                <div className="flex flex-col justify-center items-center">
                    <RegisterForm />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <Waypoints size={50} className="mx-auto" strokeWidth={1} />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <OAuth />
                </div>
            </div>
        </div>
    );
}