// (user)/products/[id]/page.tsx

// 'use client';

import Image from 'next/image';
import {
  fetchImages,
  fetchProductById
} from '@/app/lib/data';
import { Carousel } from '@/app/ui/carousel';
import clsx from 'clsx';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [product, images] = await Promise.all([
    fetchProductById(id),
    fetchImages('product', id),
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div
        className={clsx(
          'flex',
          'border-solid border-[1px] border-red-500',
        )}
      >
        <Carousel
          images={images}
        />
        <div
          className={clsx(
            'm-5 w-[300px]',
            'border-solid border-[1px] border-black',
          )}
        >
          <h1>{ product.name }</h1>
          <h2>{  }</h2>
          <h2></h2>
          <br/>
          <p>{ product.description }</p>
        </div>
      </div>
      {/* {images.map((image, index) => {
        return (
          <Image
            src={image.path}
            alt={`Product image number ${index + 1}`}
            width={500}
            height={400}
            className='h-auto'
          />
        )
      })} */}
    </main>
  );
}
