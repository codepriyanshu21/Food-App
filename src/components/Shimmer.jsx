
const Shimmer = () => {
    return (
        <div className="p-20 mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 -ml-4 lg:ml-12">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="shimmer rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"></div>
                ))}
            </div>
        </div>
    )
};

export default Shimmer;