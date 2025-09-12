import Meta from "../components/custom-ui/Meta"
import { RedeemRequest } from "../features/wallet"


const Wallet = () => {
  return (
    <div>
      <Meta page="wallet"/>
        <RedeemRequest/>
    </div>
  )
}

export default Wallet