<h1 align="center">
    <img height="80" src=".github/logo.svg" alt="rocketshoes" />
</h1>

![cover](.github/home.png?style=flat)

# 💻 Sobre o desafio

Essa será uma aplicação onde o principal objetivo é criar um hook de carrinho de compras. 

-   [X] Adicionar um novo produto ao carrinho;
-   [X] Remover um produto do carrinho;
-   [X] Alterar a quantidade de um produto no carrinho;
-   [X] Cálculo dos preços sub-total e total do carrinho;
-   [X] Validação de estoque;
-   [X] Exibição de mensagens de erro;
-   [X] Entre outros.

A seguir mais detalhes 🚀

## Teste components/Header/index.tsx

- **should be able to render the amount of products added to cart**


## Testes pages/Home/index.tsx

- **should be able to render each product quantity added to cart**

- **should be able to add a product to cart**


## Testes pages/Cart/index.tsx

- **should be able to increase/decrease a product amount**

- **should not be able to decrease a product amount when value is 1**

- **shoud be able to remove a product**


## Testes hooks/useCart.tsx

- **should be able to initialize cart with localStorage value**

- **should be able to add a new product**

- **should not be able add a product that does not exist**

- **should be able to increase a product amount when adding a product that already exists on cart**

- **should not be able to increase a product amount when running out of stock**

- **should be able to remove a product**

- **should not be able to remove a product that does not exist**

- **should be able to update a product amount**

- **should not be able to update a product that does not exist**

- **should not be able to update a product amount when running out of stock**

- **should not be able to update a product amount to a value smaller than 1**
