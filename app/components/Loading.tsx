import Image from "next/image"

const Loading = () => {
    return (
        <div className="w-full absolute inset-0 flex justify-center items-center">
            <Image
                src="/loading.gif"
                alt="loading"
                width={200}
                height={200}
                unoptimized
                className="rounded-full"
            />
        </div>
    )
}

export default Loading