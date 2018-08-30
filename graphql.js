export const listUPCS = `
query getAll{
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

export const getUPC = `
query getUPC($upc:String!) {
  queryUPCSByUpcCode(upc: $upc) {
    items{
    product_name
    upc
    id
    }
  }
}
`;
