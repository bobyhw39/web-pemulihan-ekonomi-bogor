import { CaretUpOutlined } from "@ant-design/icons";
import { Spin, Input, List, Avatar, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducRequest, getProductSearchRequest } from "../actions/product";
import { RootState } from "../models/RootState";
import { getProductSearchF } from "../sagas/product";
import history from "../utils/history";
import { formatMoney, useQuery } from "../utils/utils";
import "./styless/styless.scss";

const { Search } = Input;
const SearchComp = () => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.product);

  let query: any = useQuery();
  const [clickSearch, setClickSearch] = useState(false);
  const queryData: any = {
    category_id: query.get("category") || "",
    perPage: query.get("per_page") || "10",
    sort: query.get("sort") || "",
    name: query.get("product_name") || "",
    umkm_id: query.get("umkm") || "",
    page: query.get("page") || "1",
  };
  const searchProduct = (name: any) => {
    dispatch(getProductSearchRequest({ ...queryData, name }));
    history.push({
      search: `category=${queryData.category_id}&per_page=${
        queryData.perPage
      }&sort=${queryData.sort}&product_name=${name.replace(" ", "-")}&umkm=${
        queryData.umkm_id
      }&page=${queryData.page}`,
      pathname: "search",
    });
    clickBackdrop();
  };
  const clickSearchhandler = () => {
    const element: any = document.getElementById("root");
    element.style.margin = 0;
    element.style.height = "100%";
    element.style.overflow = "hidden";
    setClickSearch(true);
  };

  const clickBackdrop = () => {
    const element: any = document.getElementById("root");
    element.style.margin = "unset";
    element.style.height = "unset";
    element.style.overflow = "unset";
    setClickSearch(false);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getProductSearchRequest({ ...queryData, name: searchTerm }));
      setSearchLoading(false);
      // Send Axios request here
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, !product.dataSearch]);
  const onChangeSearch = (e: any) => {
    setSearchTerm(e.target.value);
    setSearchLoading(true);
  };
  const getImageTumb = (url_gambar: any) => {
    let urlImage: string = "";
    for (const key in url_gambar) {
      if (Object.prototype.hasOwnProperty.call(url_gambar, key)) {
        const element = url_gambar[key];
        if (element !== "") {
          urlImage = element;
          break;
        }
      }
    }
    return urlImage;
  };
  const goTo = (id: any) => {
    clickBackdrop();
    history.push("/product/" + id);
  };
  return (
    <>
      <div className="peb-navbar-search">
        <Search
          defaultValue={query.get("product_name")}
          placeholder="input search text"
          onChange={onChangeSearch}
          onSearch={searchProduct}
          style={{ display: "block" }}
          onClick={clickSearchhandler}
        />
      </div>
      <div className={"search-content " + (clickSearch ? "" : "hide")}>
        <div className="search-content-body">
          <div className="search-close">
            <label>Hasil Pencarian</label>
            <Button
              type="text"
              icon={<CaretUpOutlined />}
              onClick={clickBackdrop}
            />
          </div>
          <div className="search-content-list">
            <Spin spinning={searchLoading || product.isLoadingSearch} tip="Memuat...">
              <List itemLayout="horizontal">
                {product?.dataSearch?.data?.map((item: any, i: any) => (
                  <List.Item
                    key={i}
                    className="search-list"
                    onClick={() => goTo(item.id)}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={getImageTumb(item.url_gambar)} />}
                      title={item.nama_produk}
                      description={"RP " + formatMoney(item.harga_produk)}
                    />
                  </List.Item>
                ))}
              </List>
            </Spin>
          </div>
        </div>
      </div>
      <div
        onClick={clickBackdrop}
        className={"search-backdrop " + (clickSearch ? "" : "hide")}
      ></div>
    </>
  );
};

export default SearchComp;
