// lib/carousel.tsx

'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { MouseEventHandler, useState } from 'react';
import { ImageField } from '@/app/lib/definitions';

import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export function Carousel(
  { className, images }:
  { className?: string, images: Array<ImageField> }
) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const nextImage = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className={clsx(
        'flex',
        'w-[650px] h-[550px]',
        // 'border-solid border-[1px] border-black',
        className
      )}
    >
      {/* main image container */}
      <div
        className={clsx(
          'relative flex m-5 w-[450px] h-[500px] overflow-hidden',
        )}
      >
        <LeftButton onClick={prevImage}/>
        {images.map((image, index) => {
          return (
            <Image
              key={image.id}
              src={image.path}
              alt={image.id}
              width={450}
              height={500}
              className={clsx(
                'border-solid border-2 border-gray-300',
                {
                  hidden: index !== selectedIndex
                }
              )}
              priority={index === 0}
            />
          );
        })}
        <RightButton onClick={nextImage}/>
      </div>
      <div
        className={clsx(
          'grid grid-cols-1',
          'p-5',
        )}
      >
        {images.map((image, index) => {
          return (
            <Image
              key={image.id}
              src={image.path}
              alt={image.id}
              width={124}
              height={150}
              className={clsx(
                'border-solid border-2 border-gray-300',
                {
                  'opacity-50' : index !== selectedIndex
                }
              )}
              onClick={() => setSelectedIndex(index)}
            />
          );
        })}
      </div>
    </div>
  );
}

function LeftButton(
  { onClick }:
  { onClick: MouseEventHandler<HTMLButtonElement> }
) {
  return (
    <button
      className={clsx(
        'absolute w-[80px] h-[50%] inset-y-1/4 left-0 z-20',
        'rounded-r-full',
        'place-content-center',
        'bg-gray-500/35',
        'opacity-0 hover:opacity-100',
      )}
      onClick={onClick}
    >
      <ArrowLeftIcon className='w-6 m-auto'/>
    </button>
  );
}

function RightButton(
  { onClick }:
  { onClick: MouseEventHandler<HTMLButtonElement> }
) {
  return (
    <button
      className={clsx(
        'absolute w-[80px] h-1/2 inset-y-1/4 right-0 z-20',
        'rounded-l-full',
        'justify-items-end place-content-center',
        'bg-gray-500/35',
        'opacity-0 hover:opacity-100',
      )}
      onClick={onClick}
    >
      <ArrowRightIcon className='w-6 m-auto'/>
    </button>
  );
}

// export function Carousel(
//   { className, images }:
//   { className?: string, images: { path: string }[] }
// ) {
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const nextImage = () => {
//     setSelectedIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevImage = () => {
//     setSelectedIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className={clsx('relative flex items-center', className)}>
//       {/* Left arrow */}
//       <button
//         onClick={prevImage}
//         className="absolute left-0 z-10 p-2 bg-gray-700 text-white rounded-full focus:outline-none"
//       >
//         &#9664;
//       </button>

//       {/* Image slider */}
//       <div className="w-full h-[400px] overflow-hidden">
//         {images.map((image, index) => (
//           <div
//             className={clsx(
//               'transition-opacity duration-500 ease-in-out',
//               index === selectedIndex ? 'opacity-100' : 'opacity-0',
//               {
//                 hidden: selectedIndex !== index
//               }
//             )}
//             key={image.path}
//           >
//             <Image
//               src={image.path}
//               alt=''
//               width={400}
//               height={400}
//               className="mx-auto"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Right arrow */}
//       <button
//         onClick={nextImage}
//         className="absolute right-0 z-10 p-2 bg-gray-700 text-white rounded-full focus:outline-none"
//       >
//         &#9654;
//       </button>

//       {/* Dots indicator */}
//       <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setSelectedIndex(index)}
//             className={clsx(
//               'inline-block w-3 h-3 rounded-full',
//               index === selectedIndex ? 'bg-white' : 'bg-gray-400'
//             )}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
