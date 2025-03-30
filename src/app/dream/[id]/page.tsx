interface DreamPostProps {
  params: { id: string }
}

export default function DreamPost({ params }: DreamPostProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-[#070707] pt-16 text-white dark:bg-[#0D0D0D] dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1>Blog Post ID: {params.id}</h1>
      </div>
    </div>
  )
}
