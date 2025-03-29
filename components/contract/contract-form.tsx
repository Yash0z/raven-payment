"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ContractSchema } from "@/types";
import { useContract } from "@/features/contract/use-contract";

export function ContractForm() {
	const today = format(new Date(), "yyyy-MM-dd");

	const { mutate, isPending } = useContract();
	const form = useForm<z.infer<typeof ContractSchema>>({
		resolver: zodResolver(ContractSchema),
		defaultValues: {
			contractName: "",
			recipientEmail: "",
			amount: "",
			agreement: "",
			expirationDate: "",
			creationDate: today,
			milestones: 1,
		},
	});

	function onSubmit(values: z.infer<typeof ContractSchema>) {
		mutate(values);
		console.log(values);
		// You can handle form submission here
	}

	return (
		<div className='relative mt-10 w-full max-w-3xl p-2.5 py-5 '>
			<div className='text-left mb-6 space-y-2'>
				<h1 className='text-3xl ml-6 font-haskoy-bold'>
					Create a Contract
				</h1>
				<p className='text-md ml-6 text-secondary-foreground/50'>
					Fill the details that are to be send to recipient
				</p>
			</div>

			<Card>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-8 md:space-y-10   font-satoshi-regular font-bold '
						>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
								<FormField
									control={form.control}
									name='contractName'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-[0.8em] text-secondary-foreground/70'>
												Contract Name
											</FormLabel>
											<FormControl>
												<Input
													// disabled={isPending}
													className='border border-muted-foreground/60 h-10 focus-visible:ring-1'
													placeholder='enter contract name'
													{...field}
												/>
											</FormControl>
											<FormMessage className='text-tertiary' />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='recipientEmail'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-[0.8em] text-secondary-foreground/70'>
												Recipient`&apos;`s Email
											</FormLabel>
											<FormControl>
												<Input
													// disabled={isPending}
													className='border border-muted-foreground/60 h-10 focus-visible:ring-1'
													placeholder="enter recipient's email"
													{...field}
												/>
											</FormControl>
											<FormMessage className='text-tertiary' />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name='agreement'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-[0.8em] text-secondary-foreground/70'>
											Agreement Template
										</FormLabel>
										<FormControl>
											<Input
												// disabled={isPending}
												className='border border-muted-foreground/60 h-10 focus-visible:ring-1'
												placeholder='enter agreement details'
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-tertiary' />
									</FormItem>
								)}
							/>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
								<FormField
									control={form.control}
									name='amount'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-[0.8em] text-secondary-foreground/70'>
												Contract Payment
											</FormLabel>
											<FormControl>
												<Input
													placeholder='0.00'
													{...field}
													className='border border-muted-foreground/60 h-10 focus-visible:ring-1'
												/>
											</FormControl>
											<FormMessage className='text-tertiary' />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='milestones'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-[0.8em] text-secondary-foreground/70'>
												Milestone
											</FormLabel>
											<FormControl>
												<Input
													placeholder='0.00'
													{...field}
													className='border border-muted-foreground/60 text-muted-foreground  h-10 focus-visible:ring-1'
												/>
											</FormControl>
											<FormMessage className='text-tertiary' />
										</FormItem>
									)}
								/>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
								<FormField
									control={form.control}
									name='creationDate'
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<FormLabel className='text-[0.8em] text-secondary-foreground/70'>
												Creation Date
											</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={"outline"}
															className={cn(
																"w-full pl-3 text-left text-muted-foreground hover:bg-background border border-muted-foreground/60",
																!field.value &&
																	"text-muted-foreground"
															)}
														>
															{field.value ? (
																field.value
															) : (
																<span>Pick a date</span>
															)}
															<CalendarIcon className='ml-auto h-5 w-5' />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent
													className='w-auto p-0 bg-background text-foreground border-primary'
													align='start'
												>
													<Calendar
														classNames={{
															day_today:
																"bg-white text-background",
															day_selected:
																"bg-background border border-primary",
														}}
														mode='single'
														selected={
															field.value
																? new Date(field.value)
																: undefined
														}
														onSelect={(date) =>
															field.onChange(
																date
																	? format(date, "yyyy-MM-dd")
																	: ""
															)
														}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='expirationDate'
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<FormLabel className='text-[0.8em] text-secondary-foreground/70'>
												Expiration Date
											</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={"outline"}
															className={cn(
																"w-full pl-3 text-left text-muted-foreground hover:bg-background border border-muted-foreground/60",
																!field.value &&
																	"text-muted-foreground"
															)}
														>
															{field.value ? (
																field.value
															) : (
																<span>Pick a date</span>
															)}
															<CalendarIcon className='ml-auto h-5 w-5' />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent
													className='w-auto p-0 bg-background text-foreground border-primary'
													align='start'
												>
													<Calendar
														classNames={{
															day_today:
																"bg-white text-background",
															day_selected:
																"bg-background border border-primary",
														}}
														mode='single'
														selected={
															field.value
																? new Date(field.value)
																: undefined
														}
														onSelect={(date) =>
															field.onChange(
																date
																	? format(date, "yyyy-MM-dd")
																	: ""
															)
														}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className='flex justify-end pt-4'>
								<Button
									type='button'
									variant='outline'
									className='mr-2'
								>
									Back
								</Button>
								<Button type='submit'>Continue</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
