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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContractSchema } from "@/types";

export function ContractForm() {
	const today = format(new Date(), "yyyy-MM-dd");
	const form = useForm<z.infer<typeof ContractSchema>>({
		resolver: zodResolver(ContractSchema),
		defaultValues: {
			contracName: "",
			amount: "",
			agreement: "",
			expirationDate: "",
			creationDate: today,
			milestones: 1,
		},
	});

	function onSubmit(values: z.infer<typeof ContractSchema>) {
		console.log(values);
		// You can handle form submission here
	}

	return (
		<div className='w-full max-w-3xl mx-auto bg-white'>
			<div className='text-center mb-6'>
				<h1 className='text-2xl font-bold'>Add Person</h1>
				<p className='text-gray-500'>Create a new contract for employee</p>
			</div>

			{/* Progress steps */}
			<div className='flex justify-center mb-8'>
				<div className='flex items-center space-x-4'>
					<div className='flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white'>
						1
					</div>
					<span className='text-sm'>Contract Details</span>
					<div className='w-12 h-0.5 bg-gray-200'></div>
					<div className='flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white'>
						2
					</div>
					<span className='text-sm'>Compensation and Dates</span>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Compensation and Dates</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-6'
						>
							<FormField
								control={form.control}
								name='contracName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter name'
												{...field}
												className='border-gray-300'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='agreement'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Agreement</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter agreement details'
												{...field}
												className='border-gray-300'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<FormField
									control={form.control}
									name='amount'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Amount</FormLabel>
											<FormControl>
												<div className='flex'>
													<span className='inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md'>
														$
													</span>
													<Input
														placeholder='0.00'
														{...field}
														className='rounded-l-none border-gray-300'
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='milestones'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Milestones</FormLabel>
											<FormControl>
												<Input
													type='number'
													min='1'
													{...field}
													className='border-gray-300'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<FormField
									control={form.control}
									name='creationDate'
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<FormLabel>Creation Date</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={"outline"}
															className={cn(
																"w-full pl-3 text-left font-normal border-gray-300",
																!field.value &&
																	"text-muted-foreground"
															)}
														>
															{field.value ? (
																field.value
															) : (
																<span>Pick a date</span>
															)}
															<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent
													className='w-auto p-0'
													align='start'
												>
													<Calendar
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
											<FormLabel>Expiration Date</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={"outline"}
															className={cn(
																"w-full pl-3 text-left font-normal border-gray-300",
																!field.value &&
																	"text-muted-foreground"
															)}
														>
															{field.value ? (
																field.value
															) : (
																<span>Pick a date</span>
															)}
															<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent
													className='w-auto p-0'
													align='start'
												>
													<Calendar
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
								<Button type='submit' className='bg-primary'>
									Continue
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
