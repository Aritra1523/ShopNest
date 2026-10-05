interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  max?: number;
}

const QuantityControl = ({
  quantity,
  onIncrement,
  onDecrement,
  max,
}: QuantityControlProps) => {
  const atMax = max !== undefined && quantity >= max;

  return (
    <div className="quantity-control">
      <button type="button" aria-label="Decrease quantity" onClick={onDecrement}>
        −
      </button>

      <span>{quantity}</span>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrement}
        disabled={atMax}
        title={atMax ? "Maximum stock reached" : undefined}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
