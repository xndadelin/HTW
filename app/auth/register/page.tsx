"use client"
import React from "react"
import { Waypoints } from "lucide-react"
import RegisterForm from "@/components/auth/RegisterForm"
import OAuth from "@/components/auth/OAuth"
import { getUser } from "@/utils/queries/user/getUser"
import { useQuery } from "react-query"
import { redirect } from "next/navigation"
import Loading from "@/components/auth/Loading"

const Register: React.FC = () => {   
    const { data: user, isLoading } = useQuery("user", getUser)
    
    if(user) {
        redirect("/")
    }

    return (
        <div className="container mx-auto flex flex-col my-10">
            <h1 className="text-5xl font-bold text-center mt-24">Register for an account</h1>
            <p className="text-center text-lg text-muted-foreground mt-4">Join the community and start your cybersecurity journey today.</p>
            <div className="flex max-md:flex-col max-md:items-center justify-center mt-10 gap-10">
                <RegisterForm />
                <Waypoints size={50} className="my-auto" strokeWidth={1} />
                <OAuth />
            </div>
        </div>
    )
}

export default Register