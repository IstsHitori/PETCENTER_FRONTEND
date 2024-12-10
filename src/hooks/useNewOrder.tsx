import { useState } from "react";

export default function useNewOrder() {
  const [newOrder, setNewOrder] = useState({
    customer: {
      name: "",
      nit: 0,
      address: "",
      telephone: "",
    },
    items: [],
    total_amount: 0,
    payment_method: "",
  });
  return [newOrder,setNewOrder];
}
