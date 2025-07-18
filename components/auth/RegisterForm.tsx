import { Form, FormField, FormLabel, FormControl, FormMessage, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import supabase from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

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
            toast.error("Passwords do not match");
            return;
        }
        
        toast.loading("Creating your account...");
        
        const { data: {user}, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            toast.dismiss();
            toast.error(error.message);
            return;
        }
        
        if (user) {
            toast.dismiss();
            toast.success("Verification email sent!", {
                description: "Please check your inbox and follow the link to verify your account."
            });
            form.reset();
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

