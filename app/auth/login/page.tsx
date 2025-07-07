"use client";

import React from "react";
import { Waypoints } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import OAuth from "@/components/auth/OAuth";

export default function LoginPage() {
    return (
        <div className="container mx-auto flex flex-col my-10">
            <h1 className="text-5xl font-bold text-center mt-24">Login to your account</h1>
            <p className="text-center text-lg text-muted-foreground mt-4">Welcome back! Please login to continue.</p>
            <div className="flex max-md:flex-col max-md:items-center justify-center mt-10 gap-10 items-center">
                <div className="flex flex-col justify-center items-center">
                    <LoginForm />
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