import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../Styles/styles";
import { background_url } from "../../../server";

const ShopCard = ({ data }) => {
  return (
    <div className="w-full h-[320px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
      <Link to={`/shop/preview/${data?._id}`}>
        <h2 className={`${styles.shop_name}`}>{data?.name}</h2>

        <img
          src={`${background_url}${data?.avatar}`}
          alt=""
          className="w-full h-[170px] object-contain"
        />
        <div className="flex">Address : {data?.address}</div>
        <div className="flex">Phone No. : {data?.phoneNumber}</div>
      </Link>
    </div>
  );
};

export default ShopCard;
