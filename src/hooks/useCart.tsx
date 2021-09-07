import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');
    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });
  
  const addProduct = async (productId: number) => {

    try {
      const productFind = cart.find((product) => product.id === productId);
      const stockResponse = await api.get(`stock/${productId}`);
      const { amount } = stockResponse.data;

      if(!productFind){

        const { data } = await api.get(`products/${productId}`);
        const product = { ...data, amount: 1 };

        localStorage.setItem('@RocketShoes:cart', JSON.stringify([...cart,product]))

        setCart([
          ...cart,
          product
        ])
        toast.success('Produto adicionado no carrinho');
      }else{

        if(amount < productFind.amount+1){
          toast.error('Quantidade solicitada fora de estoque');
          return;
        }
        const cartAddAmount = cart.map((product) => product.id === productId 
          ? { ...product, amount: product.amount + 1 } 
          : {...product}
        );

        localStorage.setItem('@RocketShoes:cart', JSON.stringify(cartAddAmount))

        setCart(cartAddAmount);
        
        toast.success('Produto adicionado no carrinho');
        
      }
      
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {

    try {
      const ProductExcluded = cart.filter(
        product => product.id !== productId
      ).map(product => (product));

      localStorage.setItem('@RocketShoes:cart', JSON.stringify(ProductExcluded));

      setCart(ProductExcluded);

      toast.warning('Produto removido com sucesso');

    } catch {  
      toast.error('Erro na remoção do produto');

    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      
      const { data } = await api.get(`stock/${productId}`);
      
      if(amount <= 0 || !data){
        return;
      }

      if(amount > data.amount){
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      const productAttAmount = cart.map((product) => product.id === productId 
        ? { ...product, amount: amount } 
        : {...product}
      );

      localStorage.setItem('@RocketShoes:cart', JSON.stringify(productAttAmount));

      setCart(productAttAmount);

      toast.warning('Produto removido com sucesso');
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
