'use client';

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import useGetUser from '@/lib/useGetUser';

const writeupSchema = z.object({
  title: z.string().min(2, { message: 'Title is required' }),
  content: z.string().min(10, { message: 'Content is required' }),
  challenge: z.string().min(1, { message: 'Challenge is required' }),
});

export default function WriteupsPage() {
  const { user, loading } = useGetUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorValue, setEditorValue] = useState("");
  const [writeups, setWriteups] = useState<any[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);


  const form = useForm({
    resolver: zodResolver(writeupSchema),
    defaultValues: { title: '', content: '', challenge: '' },
  });

  useEffect(() => {
    async function fetchChallenges() {
      const supabase = (await import("@/utils/supabase/client")).default;
      const { data, error } = await supabase.from('challenges').select('id, name');
      if (!error && data) setChallenges(data);
    }
    async function fetchWriteups() {
      const supabase = (await import("@/utils/supabase/client")).default;
      const { data, error } = await supabase.from('writeups').select('id, title, content, challenge, user_id, created_at');
      if (!error && data) setWriteups(data);
    }
    fetchChallenges();
    fetchWriteups();
  }, []);

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    if (!user) {
      toast.error('Not authenticated');
      setSubmitting(false);
      return;
    }
    const supabaseClient = (await import("@/utils/supabase/client")).default;
    const { error } = await supabaseClient.from("writeups").insert([
      { title: values.title, content: values.content, challenge: values.challenge, user_id: user.id }
    ]);
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Writeup submitted!');
      setModalOpen(false);
      form.reset();
    }
  };

  if (loading) return null;
  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/unauthorized";
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8 mt-16">
        <div>
          <h1 className="text-5xl font-bold mb-2">Writeups</h1>
          <p className="text-lg text-muted-foreground">
            Share your solutions and learn from others!
          </p>
        </div>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button className="px-6 py-3 bg-[#EF4444] hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New writeup
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit writeup</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Title" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="challenge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Challenge</FormLabel>
                      <FormControl>
                        <div className="mt-1">
                          <select {...field} className="border rounded px-3 py-2 bg-background w-full" required>
                            <option value="">Select challenge</option>
                            {challenges.map((c: any) => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <textarea
                            {...field}
                            ref={textareaRef}
                            className="border rounded px-3 py-2 min-h-[120px] bg-background w-full"
                            placeholder="Writeup content..."
                            required
                          />
                          <Button
                            type="button"
                            className="absolute top-2 right-2 p-2 bg-[#EF4444] hover:bg-red-600 shadow-md rounded-md"
                            onClick={() => { setEditorValue(form.getValues('content')); setEditorOpen(true); }}
                            title="Full screen editor"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V6a2 2 0 012-2h2m8 0h2a2 2 0 012 2v2m0 8v2a2 2 0 01-2 2h-2m-8 0H6a2 2 0 01-2-2v-2" />
                            </svg>
                          </Button>
                        </div>
                      </FormControl>
                      <div className="mt-2 text-xs text-muted-foreground text-right pr-1">
                        You can use HTML in your writeup.
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="bg-[#EF4444] hover:bg-red-600 text-white font-semibold" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
          <DialogContent className="z-[100] flex flex-col max-w-3xl w-full max-h-[90vh] p-0 bg-background rounded-lg shadow-lg border-none">
            <DialogHeader>
              <DialogTitle>
                <span className="sr-only">Edit writeup</span>
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-between px-8 py-6 border-b border-border">
              <span className="text-2xl font-bold">Edit writeup</span>
            </div>
            <div className="flex-1 flex flex-col px-8 pb-8 pt-4">
              <textarea
                className="border rounded px-3 py-2 h-full w-full bg-background text-base resize-none flex-1"
                style={{ minHeight: '40vh' }}
                value={editorValue}
                onChange={e => setEditorValue(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setEditorOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="bg-[#EF4444] hover:bg-red-600 text-white font-semibold"
                  onClick={() => { form.setValue('content', editorValue); setEditorOpen(false); }}
                >
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-12">
        <table className="min-w-full border text-sm rounded-lg overflow-hidden">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Challenge</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {writeups.map((w) => (
              <tr key={w.id} className="border-b last:border-0">
                <td className="px-4 py-2 font-medium align-top max-w-xs break-words">{w.title}</td>
                <td className="px-4 py-2 align-top">{challenges.find((c) => c.id === w.challenge)?.name || '-'}</td>
                <td className={"px-4 py-2 align-top" + ((w.user_id?.slice(0, 8) === '00000000') ? ' text-left' : '')}>{w.user_id?.slice(0, 8) || '-'}</td>
                <td className="px-4 py-2 align-top text-nowrap">{w.created_at ? new Date(w.created_at).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {writeups.length === 0 && (
          <div className="text-muted-foreground mt-8 text-center">No writeups yet.</div>
        )}
      </div>
    </div>
  );
}
