'use client'
import { shoeSchema } from "@/app/schemas/shoe";
import { useForm, Controller, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransition } from "react";
import { createShoeAction } from "@/app/actions";
import { colors } from "@/lib/constants";

type FormValues = z.infer<typeof shoeSchema>;
export default function AddShoe() {
    const [isPending, startTransition] = useTransition()
    const form = useForm<FormValues>({
        resolver: zodResolver(shoeSchema) as Resolver<FormValues>,
        defaultValues: {
            name: "",
            description: "",
            price: undefined as unknown as number,
            colors: [],
            gender: "",
            image: undefined,
        }
    })
    const onSubmit = (data: FormValues) => {
        startTransition(() => {
            createShoeAction(data)
        })
    }
    return (
        <section className="h-[calc(100vh-2.5rem)] sm:h-[calc(100vh-3rem)] pt-12 flex justify-center items-center  bg-black overflow-hidden">
            <div className="bg-neutral-900 border-2 border-neutral-950/50 p-4 rounded-lg shadow-xl w-2xl h-fit flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <h1>Add Shoe</h1>
                    <h3 className="text-neutral-400">Add a new shoe to the store</h3>
                </div>
                <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-2">
                        <Controller
                        control={form.control}
                        name="name" 
                        render={({field, fieldState}) => (
                        <div className="flex flex-col gap-1 w-1/2">
                            <label className="text-white" htmlFor="name">Name</label>
                            <input placeholder="Nike Air Max" className="bg-neutral-900 border border-neutral-600 p-2 rounded-lg h-12 text-white" type="text"  id="name" {...field} />
                            {fieldState.error && <p className="text-accent/80 text-sm">{fieldState.error.message}</p>}
                        </div>
                        )}
                        />
                        <Controller
                        control={form.control}
                        name="price" 
                        render={({field, fieldState}) => (
                        <div className="flex flex-col gap-1 w-1/2">
                            <label className="text-white" htmlFor="price">Price</label>
                            <input placeholder="100" className="bg-neutral-900 border border-neutral-600 p-2 rounded-lg h-12 text-white" type="number"  id="price" onChange={(e) => field.onChange(Number(e.target.value))} value={field.value || ""} />
                            {fieldState.error && <p className="text-accent/80 text-sm">{fieldState.error.message}</p>}
                        </div>
                        )}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Controller
                        control={form.control}
                        name="image"
                        render={({field, fieldState}) => (
                        <div className="flex flex-col gap-1">
                            <label className="text-white" htmlFor="image">Image</label>
                            <input className="bg-neutral-900 border border-neutral-600 p-2 rounded-lg h-12 text-white" type="file"  id="image" accept="image/*" onChange={(e)=>field.onChange(e.target.files?.[0])}/>
                            {fieldState.error && <p className="text-accent/80 text-sm">{fieldState.error.message}</p>}
                        </div>
                        )}
                        />
                        <Controller
                        control={form.control}
                        name="gender" 
                        render={({field, fieldState}) => (
                        <div className="flex flex-col gap-1 w-1/2">
                            <label className="text-white" htmlFor="gender">Gender</label>
                            <select className="bg-neutral-900 border border-neutral-600 p-2 rounded-lg h-12 text-white" id="gender" {...field}>
                                <option value="men">men</option>
                                <option value="women">women</option>
                                <option value="unisex">unisex</option>
                            </select>
                            {fieldState.error && <p className="text-accent/80 text-sm">{fieldState.error.message}</p>}
                        </div>
                        )}
                        />
                    </div>
                    <div className="flex gap-2">
                         <Controller
                                control={form.control}
                                name="colors"
                                render={({ field, fieldState }) => {
                                    const selected = field.value ?? [];
                                    const toggle = (value: string, checked: boolean) => {
                                    if (checked) {
                                        field.onChange([...selected, value]);
                                    } else {
                    
                                        field.onChange(selected.filter((v) => v !== value));
                                    }
                                    };

                                    return (
                                    <div className="flex flex-col gap-1 w-1/2">
                                        <label className="text-white flex items-center justify-between pr-2" htmlFor="colors">
                                        Colors
                                        </label>

                                        <div className={`flex gap-1 flex-wrap w-full h-32 overflow-y-scroll bg-neutral-900 border border-neutral-600 rounded-lg p-2`}>
                                            {colors.map((color) => {
                                            const isChecked = selected.includes(color.name);
                                            return (
                                                <label
                                                key={color.name}
                                                className="flex items-center gap-2 border border-neutral-700 px-2 py-1 rounded"
                                                >
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={(e) => toggle(color.name, e.target.checked)}
                                                />
                                                <span style={{ color: color.css }}>{color.name}</span>
                                                </label>
                                            );
                                            })}
                                        </div>
                                        {fieldState.error && (
                                        <p className="text-accent/80 text-sm">{fieldState.error.message}</p>
                                        )}
                                    </div>
                                    );
                                }}
                                />
                                <Controller
                                control={form.control}
                                name="description"
                                render={({field, fieldState}) => (
                                <div className="flex flex-col gap-1 w-1/2">
                                    <label className="text-white" htmlFor="description">Description</label>
                                    <textarea className="bg-neutral-900 border resize-none h-32 border-neutral-600 p-2 rounded-lg text-white" id="description" {...field} />
                                    {fieldState.error && <p className="text-accent/80 text-sm">{fieldState.error.message}</p>}
                                </div>
                                )}
                                />
                    </div>
                    <input disabled={isPending} type="submit" value={isPending ? "Adding..." : "Add Shoe"} className="bg-white/80 hover:bg-white/60 transition-all duration-200 text-black mt-3 h-12 rounded-lg" />
                </form>
            </div>
        </section>
    )
}