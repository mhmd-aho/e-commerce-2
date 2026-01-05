export default async function Loading () {
    return (
        <section className="h-[calc(100vh-2.5rem)] lg:h-[calc(100vh-3rem)] sm:h-[calc(150vh-3rem)]  lg:pt-12 pt-10 bg-black overflow-hidden">
            <div className="relative flex flex-col lg:flex-row justify-center items-center lg:gap-12 h-full">
                        <div className="relative aspect-square lg:h-96 lg:w-96  max-sm:w-full max-sm:h-auto shadow-sm overflow-hidden bg-neutral-800 animate-pulse"/>
                <div className="flex flex-col lg:gap-4 gap-2 lg:w-1/4 w-full p-2">
                    <div className="h-10 w-full bg-neutral-800 animate-pulse"/>
                    <div className="flex flex-col lg:gap-1 gap-0.5">
                        <div className="h-16 w-full bg-neutral-800 animate-pulse rounded"/>
                        <div className="h-8 w-1/4 bg-neutral-800 animate-pulse rounded"/>
                    </div>
                    <div className="flex flex-col lg:gap-1 gap-0.5">
                        <p className="text-white/80">Colors:</p>
                        <div className="flex gap-1">
                            { Array.from({length: 5}).map((_, index) => (
                                <div key={index} className="lg:w-6 lg:h-6 w-5 h-5 border border-black rounded-full" style={{ backgroundColor: '#262626'}}></div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col lg:gap-1 gap-0.5">
                        <p className="text-white/80">Sizes:</p>
                        <div className="flex gap-1 flex-wrap">
                            { Array.from({length: 5}).map((_, index) => (
                            <div
                                key={index}
                                className='h-8 w-16 rounded-xl transition-colors bg-neutral-800 animate-pulse'
                            />
                                    
                            ))}
                        </div>
                        <div className="flex justify-start items-center lg:gap-4 gap-2 mt-4">
                            <div className="h-10 w-1/2 bg-neutral-800 animate-pulse rounded"/>
                            <div className="h-10 w-1/2 bg-neutral-800 animate-pulse rounded"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}