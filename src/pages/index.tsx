import Image from "next/image";
import Head from "next/head";
import { HomeComatainer, Product } from "../styles/pages/home";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { GetStaticProps, NextPage } from "next";
import { stripe } from "../lib/stripe";
import Link from "next/link";
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

const Home: NextPage<HomeProps>= ({ products })=> {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.45,
      spacing: 48,
    },
  });

  return (
    <>
    <Head>
      <title>Home | Iginte Shop</title>
    </Head>

    <HomeComatainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            prefetch={false}
          >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt="" />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
        );
      })}
    </HomeComatainer>

  </>
  );
}

export const getStaticProps: GetStaticProps = async ({}) => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount / 100),
      description: product.description,
    };
  });

  return {
    props: {
      products,
    },

    revalidate: 60 * 60 * 2, //a cada duas horas back-end atualiza os dados:
  };
};

export default Home;