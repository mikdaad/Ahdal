export type Cart = {
  userId: string;
  items: Array<{
    id: string;
    name: string;
    originalprice: number;
    discountprice: number;
    quantity: number;
    imageString: string;
    color:string;
  }>;
};

export type newcart = {
     id: string;
    name: string;
    discountprice: number;
    originalprice: number;
    discountpercent: number;
    quantity: number;
    imageString: string;
    color:string;
  };

export type Wishlist = {
  userId: string;
  items: Array<{
    id: string;
    name: string;
    originalprice: number;
    discountprice: number;
    imageString: string;
    color:string;
    quantity: number;
  }>;
};


