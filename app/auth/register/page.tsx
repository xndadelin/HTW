"use client"
import React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Waypoints } from "lucide-react"
import { Google } from "@/public/svgs/google"
import { Discord } from "@/public/svgs/discord"
import { Github } from "@/public/svgs/github"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    })
})

const Register: React.FC = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data)
    }

    return (
        <div className="container mx-auto flex flex-col my-10">
            <h1 className="text-5xl font-bold text-center mt-24">Register for an account</h1>
            <p className="text-center text-lg text-muted-foreground mt-4">Join the community and start your cybersecurity journey today.</p>
            <div className="flex flex-wrap justify-center mt-10 gap-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 mt-8 w-96">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} id="email" type="email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >
                        </FormField>

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} id="password" type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} id="confirmPassword" type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >
                        </FormField>
                        <Button variant="destructive" type="submit">Register</Button>
                    </form>
                </Form>
                <Waypoints size={50} className="my-auto" strokeWidth={1} />
                <div className="flex flex-col space-y-4 w-96 my-auto">
                    <Button variant="outline" className="flex justify-start p-6 rounded-lg" >
                        <Google {...{
                            className: "h-6 w-6 fill-current",
                        }} />
                        <p className="font-bold ml-2 text-lg">
                            Register with Google
                        </p>
                    </Button>
                    <Button variant="outline" className="flex justify-start p-6">
                        <Discord {...{
                            className: "h-6 w-6 fill-current",
                        }} />
                        <p className="font-bold ml-2 text-lg">
                            Register with Discord
                        </p>
                    </Button>
                    <Button variant="outline" className="flex justify-start p-6">
                        <Github {...{
                            className: "h-6 w-6 fill-current",
                        }} />
                        <p className="font-bold ml-2 text-lg">
                            Register with Github
                        </p>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Register