import { useRouter } from 'next/router'
import { ProductConatiner, ImageCoonatiner, ProductDetails } from '../../styles/pages/product';


export default function Product(){
    const { query } = useRouter()
    return (
    <ProductConatiner>
        <ImageCoonatiner>

        </ImageCoonatiner>
        <ProductDetails>
            <h1>Camiseta x</h1>
            <span>R$ 79,90</span>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat deleniti porro tenetur, eaque tempora aperiam ullam fuga in? Commodi corporis voluptatibus ullam eum odit ipsam sequi minus ab reprehenderit accusamus.</p>
            <button>
                Comprar agora
            </button>
        </ProductDetails>
    </ProductConatiner>
    )
}