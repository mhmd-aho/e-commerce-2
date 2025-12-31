export function ShoesSkeleton() {
    return (
                <div className="relative w-full h-60 sm:h-72 lg:h-96 shadow-xl flex flex-col overflow-hidden origin-center hover:scale-105 transition-all duration-200 ">
                    <div className="relative sm:h-3/5 h-1/2 w-full overflow-hidden bg-neutral-800 animate-pulse"/>
                    <div className="sm:h-2/5 h-1/2 flex flex-col justify-baseline items-baseline gap-1 p-2 overflow-hidden">
                        <div className="h-6 w-3/4 rounded-lg bg-neutral-800 animate-pulse"/>
                        <div className="h-6 w-1/2 rounded-lg bg-neutral-800 animate-pulse"/>
                        <div className="h-6 w-1/2 rounded-lg bg-neutral-800 animate-pulse"/>
                    </div>
                </div>
    )
}