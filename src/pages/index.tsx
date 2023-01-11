import Image from "next/image";
import { HomeComatainer, Product } from "../styles/pages/home";
import {useKeenSlider} from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import {GetServerSideProps } from 'next';
import { stripe } from '../lib/stripe';

import Stripe from "stripe";

interface HomeProps{
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[]
}


export default function Home({products}: HomeProps) {
 
  const [sliderRef] = useKeenSlider({
    slides:{
      perView: 2.45,
      spacing: 48,
    }
  })

  return (
<HomeComatainer ref={sliderRef} className ='keen-slider'>

{products.map(product => {
  return (
    <Product key={product.id} className="keen-slider__slide">

      <Image src={product.imageUrl} width={520} height={480} alt="" />

      <footer>
         <strong>{product.name}</strong>
         <span>{product.price / 100}</span>
      </footer>
    </Product>
  );
})}
     
</HomeComatainer>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
 
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
    }
  })

  return {
    props: {
     products
    }
  }
}
