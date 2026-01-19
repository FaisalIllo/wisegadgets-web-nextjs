import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'

export default function ImageCarousel({
  images = [],
  alt = 'Carousel images'
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  if (!images?.length) {
    return (
      <div className="bg-gray-200 rounded-lg w-full h-[50vh] flex items-center justify-center text-gray-600">
        No images available
      </div>
    )
  }

  const navigate = (direction) => {
    setCurrentIndex((prev) =>
      direction === 'next'
        ? (prev + 1) % images.length
        : (prev - 1 + images.length) % images.length
    )
  }

  const NavButton = ({ direction, className = '' }) => (
    <button
      onClick={() => navigate(direction)}
      className={`absolute top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 ${className}`}
      aria-label={`${direction === 'next' ? 'Next' : 'Previous'} image`}
    >
      {direction === 'next' ? (
        <ChevronRight size={24} />
      ) : (
        <ChevronLeft size={24} />
      )}
    </button>
  )

  return (
    <>
      <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden group">
        {/* Main Image */}
        <div
          className="relative w-full h-[50vh] cursor-pointer"
          onClick={() => setIsExpanded(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setIsExpanded(true)
          }}
        >
          <Image
            src={images[currentIndex]}
            alt={`${alt} ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(true)}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label="Expand image"
        >
          <Maximize2 size={24} />
        </button>

        <NavButton direction="prev" className="left-4" />
        <NavButton direction="next" className="right-4" />

        {/* Thumbnails */}
        <div className="flex gap-2 p-4 bg-transparent justify-center overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-16 h-16 rounded flex-shrink-0 transition-all ring-2 ${
                currentIndex === index ? 'ring-blue-500' : 'ring-gray-300'
              } hover:ring-blue-400`}
              aria-label={`Go to image ${index + 1}`}
              aria-current={currentIndex === index}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover rounded"
              />
            </button>
          ))}
        </div>

        {/* Indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
          role="dialog"
          aria-label="Expanded image view"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsExpanded(false)
          }}
          tabIndex={0}
        >
          <div
            className="relative w-full h-5/6 max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt={`${alt} ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-0 right-0 text-white p-2 z-10"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <button
              onClick={() => navigate('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => navigate('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
