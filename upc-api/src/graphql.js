export const listUPCS = `
query listUPCS{
  listUPCS{
    items{
      product_name
      upc
      id
    }
  }
}
`;
export const createUPC = `
mutation createUPC(
    $upc: String!
    $product_name: String!
  ){
    createUPC(input:{
      upc: $upc,
      product_name: $product_name
    }){
      id
      upc
      product_name
    }
  }
`;
