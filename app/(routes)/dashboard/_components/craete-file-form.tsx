'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { DialogClose } from '@/components/ui/dialog';
import { createFile, getFiles } from '@/convex/files';
import { revalidatePath } from 'next/cache';
import { useContext, useEffect } from 'react';
import { ActiveTeamContext } from '@/context/active-team-context';

const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
});

export const CreateFileForm = ({
    className,
    fromDialog = false,

    updateTotalFiles,
}: {
    className?: string;
    fromDialog?: boolean;

    updateTotalFiles: () => void;
}) => {
    const { activeTeam_ } = useContext(ActiveTeamContext);
    const convex = useConvex();
    const router = useRouter();
    const { user } = useKindeBrowserClient();
    const createFile = useMutation(api.files.createFile);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema), // use zod to validate form
        defaultValues: {
            name: '',
        },
    });

    // destruct state from form
    const { isValid, isSubmitting } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await createFile({
                name: values.name,
                teamId: activeTeam_?._id,
                createdBy: user?.email ?? '',
                archive: false,
                document: '',
                whiteboard: '',
            });
            updateTotalFiles();
            toast.success('File created successfully');
            router.push('/dashboard');
        } catch (error) {
            toast.error('Error creating team!');
        }
    };

    return (
        <div className={cn('mx-auto w-full p-6 sm:w-[60%]', className)}>
            <div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-8 "
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-2 flex text-base tracking-[0.2px] text-white/75">
                                        File Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="relative m-0 w-full border border-[#3a3a3a] bg-[#242424] py-6 text-white"
                                            disabled={isSubmitting}
                                            {...field}
                                            placeholder="File Name"
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {fromDialog ? (
                            <div className="mt-12 flex items-center justify-center gap-x-2">
                                <DialogClose asChild>
                                    <Button
                                        className="flex w-[60%] items-center justify-center bg-blue-600 py-6 hover:bg-blue-600/75"
                                        type="submit"
                                        disabled={!isValid || isSubmitting}
                                    >
                                        Continue
                                    </Button>
                                </DialogClose>
                            </div>
                        ) : (
                            <div className="mt-12 flex items-center justify-center gap-x-2">
                                <Button
                                    className="flex w-[60%] items-center justify-center bg-blue-600 py-6 hover:bg-blue-600/75"
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                >
                                    Continue
                                </Button>
                            </div>
                        )}
                    </form>
                </Form>
            </div>
        </div>
    );
};
