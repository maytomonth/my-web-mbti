interface AdPlaceholderProps {
  className?: string
}

export function AdPlaceholder({ className = "" }: AdPlaceholderProps) {
  return (
    <div className={`hidden ${className}`}>
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 text-center">
        <div className="w-full max-w-[300px] h-[250px] mx-auto flex items-center justify-center">
          <span className="text-gray-500 text-sm font-medium">Ad Placeholder</span>
        </div>
      </div>
    </div>
  )
}
