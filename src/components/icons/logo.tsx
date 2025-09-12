import logo from "../../assets/images/logo.png";
import { cn } from "../../lib/utils";

type Props = {
  className?: string;
};
const Logo = ({ className }: Props) => {
  return (
    <img
      src={logo}
      className={cn("object-cover aspect-square h-[55px] w-[55px]", className)}
      alt="Logo"
    />
  );
};

export default Logo;
