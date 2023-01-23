import {
  ProductDetails,
  ImageContainer,
  ProductContainer,
} from "../../styles/pages/product";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

  const Product: NextPage<ProductProps> = ({ product }) => {
    const { isFallback } = useRouter();

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch  {
      //O melhor seria conectar com uma ferramenta de observabilidade (Datadog / Sentry)

      setIsCreatingCheckoutSession(false);

      alert("Falha ao redirecionar ao checkout");
    }
  }

  if (isFallback) {
    return <p>Loading...</p>;
  }

  // const {isFallback} = userRouter()

  // if(isFallback){
  //     return <p>Loading</p>
  // } // para usar quando um fallback true que é mais recomendado crie um fallback true e crie um loading, para uma experiência melhor do usuário. No caso do fallback bloking e false não precisa usar
  
  return (
    <>
    <Head>
      <title>{product.name} | Iginte Shop</title>
    </Head>

    
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button disabled={isCreatingCheckoutSession} onClick={handleBuyButton}>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>

    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: "prod_N8o5OnhJU3Jloz",
        },
      },
      {
        params: {
          id: "prod_N8o54cqbV9NMDZ",
        },
      },
      {
        params: {
          id: "prod_N8o4A0BgYqoYDs",
        },
      },
      {
        params: {
          id: "prod_N8o3WrbGM0QjjT",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};

export default Product;