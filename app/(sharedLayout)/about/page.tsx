export default function About() {
    return (
        <section className="bg-black min-h-screen w-full flex flex-col gap-6 sm:px-2 px-1">
            <div className="flex-1 flex flex-col justify-center items-center text-white gap-6 px-4">
                <h1 className="text-4xl font-bold text-center">About This Project</h1>
                <div className="max-w-2xl text-center space-y-4 text-gray-300">
                    <p className="text-xl">
                        This website is a mock e-commerce platform inspired by Nike.
                    </p>
                    <div className="p-6 border border-neutral-600 rounded-xl bg-neutral-900 backdrop-blur-sm">
                        <p className="text-lg font-semibold text-white mb-2">EDUCATIONAL PURPOSE ONLY</p>
                        <p>
                            This project was created solely for educational and demonstration purposes. 
                            It is not affiliated with, endorsed by, or connected to Nike, Inc. in any way. 
                            No products can be purchased from this site.
                        </p>
                    </div>
                    <p>
                        Built with React, TypeScript, and Tailwind CSS.
                    </p>
                </div>
            </div>
        </section>
    )
}
