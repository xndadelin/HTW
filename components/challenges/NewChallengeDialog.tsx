"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField, FormLabel, FormControl, FormMessage, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const CATEGORIES = [
  "web",
  "crypto",
  "pwn",
  "forensics",
  "reverse",
  "osint",
  "misc",
  "stegano",
  "mobile",
  "hardware",
  "networking",
] as const;

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  description: z.string().min(10, { message: "Description is required" }),
  difficulty: z.enum([
    "entry level",
    "easy",
    "medium",
    "hard",
    "insane",
    "god"
  ], { required_error: "Difficulty is required" }),
  categories: z.array(z.enum(CATEGORIES)).min(1, { message: "Select at least one category" }),
  link: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal('')),
});

export default function NewChallengeDialog({ children }: { children: React.ReactNode }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      difficulty: undefined,
      categories: [],
      link: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const supabase = (await import('@/utils/supabase/client')).default;
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      toast.error('Not authenticated');
      return;
    }
    const { error } = await supabase.from('challenges').insert([{
      name: data.name,
      description: data.description,
      difficulty: data.difficulty,
      categories: data.categories,
      link: data.link || null,
      created_by: user.id,
    }]);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Challenge added!');
      form.reset();
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New challenge</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new challenge.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Challenge name</FormLabel>
                  <FormControl>
                    <Input {...field} id="name" placeholder="e.g. SQL Injection 101" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Challenge description</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      id="description"
                      placeholder="Describe the challenge..."
                      className="input border rounded px-2 py-1 w-full min-h-[90px] bg-background resize-y"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="difficulty">Difficulty</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      id="difficulty"
                      className="input border rounded px-2 py-1 w-full bg-background"
                      value={field.value || ""}
                    >
                      <option value="" disabled>
                        Select difficulty
                      </option>
                      <option value="entry level">Entry level</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                      <option value="insane">Insane</option>
                      <option value="god">God</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="categories">Categories</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Checkbox
                            checked={field.value?.includes(cat)}
                            onCheckedChange={(checked: boolean) => {
                              if (checked) {
                                field.onChange([...(field.value || []), cat]);
                              } else {
                                field.onChange((field.value || []).filter((c: string) => c !== cat));
                              }
                            }}
                            id={`cat-${cat}`}
                          />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="link">Resource link (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} id="link" placeholder="https://..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="destructive">Add challenge</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
