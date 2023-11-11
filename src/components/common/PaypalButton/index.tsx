import { PayPalButtons } from "@paypal/react-paypal-js";
type Props = {
  amount: string;
};

const Paypal = (props: Props) => {
  const { amount } = props;
  const handlePaymentSuccess = async () => {
    
  };
  return (
    <div>
      <PayPalButtons
      style={{
        color:'blue'
      }}
        createOrder={(_data, actions) => {
          {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: String(amount),
                  },
                  description: `purchase at ${new Date().toDateString()}`,
                },
              ],
            });
          }
        }}
        onApprove={(_, action): any => {
          return action.order?.capture().then(() => handlePaymentSuccess());
        }}
      />
    </div>
  );
};

export default Paypal;