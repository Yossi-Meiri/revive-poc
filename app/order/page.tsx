import { Suspense } from 'react';
import OrderForm from './OrderForm';

export default function Order() {
  return (
    <Suspense>
      <OrderForm />
    </Suspense>
  );
}
