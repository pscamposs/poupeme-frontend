import { ButtonHTMLAttributes } from "react";
import Loader from "./Loader";

interface HtmlButtonProps extends ButtonHTMLAttributes<any> {
  loading: boolean;
}

export const LoadingButton: React.FC<HtmlButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={props.loading}
      className="bg-indigo-500 text-white py-4 px-2 hover:bg-indigo-600 focus:bg-indigo-600 outline-none hover:rounded-e-md transition-all"
    >
      {props.loading ? <Loader /> : children}
    </button>
  );
};
