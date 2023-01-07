import { styled } from "../styles"

const Button = styled('button', {
  background: '$primary',
  border: 'none',
  padding: '4px 8px',
  borderRadius: 4,

  '&:hover':{
    filter: 'brightness(0.8)'
  }
 
})

export default function Home() {
  return (
   <Button>Enviar</Button>
  )
}
