import { Form, FormField, FormLabel, FormControl, FormMessage, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import supabase from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    })
})


const RegisterForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const { email, password, confirmPassword } = data;

        if (password !== confirmPassword) {
            return;
        }

        const { data: {user}, error } = await supabase.auth.signUp({
            email,
            password
        })

        console.log(user, error);
        if (!error && user) {
            window.location.reload();
        }
    }
    
    return (
        <div>
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
        </div>
    );
}

export default RegisterForm;