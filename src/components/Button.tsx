import cn from "classnames";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "min-w-24 rounded-md text-white text-sm bg-gray-800 hover:text-gray-400",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
