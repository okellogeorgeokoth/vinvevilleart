import { COUPON_CODE } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import { ReactElement } from "react";

const HeaderDiscount = async (): Promise<ReactElement | null> => {
  const sale = await getActiveSaleByCouponCode(COUPON_CODE.CERDOS25);
  if (!sale) return null;

  return (
    <div className="py-2.5 text-zinc-200 text-center font-medium text-xs  md:text-base bg-black animate animate-out  ">
      Vinceville{" "}
      <span className="text-white font-bold">{sale.couponCode}</span> Sales{" "}
      <span className="text-white font-bold">{sale.discountAmount}%</span> Artcollection
    </div>
  );
};

export default HeaderDiscount;
