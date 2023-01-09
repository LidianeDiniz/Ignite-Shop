import Image from "next/image";
import { HomeComatainer, Product } from "../styles/pages/home";
import camiseta1 from '../assets/camisetas/1.png'
import camiseta2 from '../assets/camisetas/2.png'
import camiseta3 from '../assets/camisetas/3.png'

export default function Home() {
  return (
<HomeComatainer>
  <Product>
    <Image src={camiseta1} width={520} height={480} alt=""/>
    
        <footer>
      <strong>Camiseta 1</strong>
      <span>R$ 79,90</span>
    </footer>
  </Product>

  <Product>
  <Image src={camiseta2} width={520} height={480}  alt=""/>
        <footer>
      <strong>Camiseta 1</strong>
      <span>R$ 79,90</span>
    </footer>
  </Product>
</HomeComatainer>
  )
}
   