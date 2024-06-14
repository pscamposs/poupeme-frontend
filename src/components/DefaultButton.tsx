import { ButtonHTMLAttributes } from "react";

export const DefaultButton: React.FC<ButtonHTMLAttributes<any>> = ({
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className="bg-indigo-500 text-white py-4 px-2 hover:bg-indigo-600 focus:bg-indigo-600 outline-none hover:rounded-e-md transition-all"
    >
      {children}
    </button>
  );
};
