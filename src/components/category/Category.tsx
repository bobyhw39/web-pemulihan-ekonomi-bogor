import React from "react";
import MakananImage from "../../assets/img/makanan.png";
import BusanaImage from "../../assets/img/busana.png";
import BahanImage from "../../assets/img/bahan.png";
import DllImage from "../../assets/img/dll.png";
import InteriorImage from "../../assets/img/interior.png";
import KerajinanImage from "../../assets/img/kerajinan.png";
import KecantikanImage from "../../assets/img/kecantikan.jpg";
import "./styles.scss";
import history from "../../utils/history";

type Props = {
  title: string;
  icon?: string;
  idCategory: any;
};

const Category: React.FC<Props> = ({ title, icon, idCategory }) => {
  const getImage = (category: any) => {
    const includes = (text: string) => category.toLowerCase().includes(text);
    if (includes("makanan") || includes("minuman")) {
      return MakananImage;
    } else if (
      includes("busana") ||
      includes("pakaian") ||
      includes("baju") ||
      includes("celana")
    ) {
      return BusanaImage;
    } else if (includes("bahan") || includes("pokok") || includes("pakan")) {
      return BahanImage;
    } else if (includes("interior") || includes("rumah")) {
      return InteriorImage;
    } else if (includes("kerajinan")) {
      return KerajinanImage;
    } else if (includes("kecantikan") || includes("kosmetik")) {
      return KecantikanImage;
    } else {
      return DllImage;
    }
  };
  const searchProduct = (name: any) => {
    history.push({
      search: `category=${idCategory}&per_page=10&sort=&product_name=&umkm=&page=${1}`,
      pathname: "search",
    });
  };
  return (
    <div
      onClick={searchProduct}
      className="peb-category"
      style={{
        background: `url(${getImage(title)})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="peb-category-left">
        <div className="peb-category-icon"></div>
      </div>
      <div className="peb-category-right">
        <label className="peb-category-label">{title}</label>
      </div>
    </div>
  );
};

export default Category;
