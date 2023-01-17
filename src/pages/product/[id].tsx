import { ProductDetails, ImageContainer, ProductContainer } from '../../styles/pages/product';
import { GetStaticPaths, GetStaticProps } from 'next';
import { stripe } from '../../lib/stripe';
import Stripe from 'stripe';
import Image from 'next/image';

interface ProductProps {
    product: {
      id: string
      name: string
      imageUrl: string
      price: string
      description: string
      defaultPriceId: string
    }
  }
  

export default function Product({product}: ProductProps){
  function handleBuyProduct(){
    console.log(product.defaultPriceId);
  }

    // const {isFallback} = userRouter()

    // if(isFallback){
    //     return <p>Loading</p>
    // } // para usar quando um fallback true que é mais recomendado crie um fallback true e crie um loading, para uma experiência melhor do usuário. No caso do fallback bloking e false não precisa usar 

    return (
        <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button onClick={handleBuyProduct}>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
   
  )
}

        export const getStaticPaths: GetStaticPaths = async () => {
            return{
                paths: [
                    {params: { id: 'prod_N8o5OnhJU3Jloz'}},
                ],

                fallback: false,
            } 
        }

export const getStaticProps: GetStaticProps <any, {id: string}>= async ({params}) => {
    const productId = params.id

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    })

    const price = product.default_price as Stripe.Price
    
    return{
        props:{
          product: {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: new Intl.NumberFormat('pt-BR',{
                style: 'currency',
                currency: 'BRL',
            }).format(price.unit_amount / 100),
            description: product.description,
            defaultPriceId: price.id,
          }
        },
        revalidate: 60 * 60 * 1 // 1 hours
    }
}