import React from "react";
import accountManage from "src/assets/icon/menu/accountManage.png";
import brandSquare from "src/assets/icon/menu/brandSquare.png";
import dataDashboard from "src/assets/icon/menu/dataDashboard.png";
import goodsLibrary from "src/assets/icon/menu/goodsLibrary.png";
import squareSKU from "src/assets/icon/menu/squareSKU.png";
import tagLibrary from "src/assets/icon/menu/tagLibrary.png";
import statistics from "src/assets/icon/menu/statistics.png";
import accountManageSelect from "src/assets/icon/menu/accountManageSelect.png";
import brandSquareSelect from "src/assets/icon/menu/brandSquareSelect.png";
import dataDashboardSelect from "src/assets/icon/menu/dataDashboardSelect.png";
import goodsLibrarySelect from "src/assets/icon/menu/goodsLibrarySelect.png";
import squareSKUSelect from "src/assets/icon/menu/squareSKUSelect.png";
import tagLibrarySelect from "src/assets/icon/menu/tagLibrarySelect.png";
import statisticsSelect from "src/assets/icon/menu/statisticsSelect.png";


const MenuItemsCallback = (userinfo) => {

  const getItem = (label, key, icon = [], children, auth) => {
    if (auth.indexOf(userinfo.role_id) > -1) {
      return {
        key,
        icon: (
          <div className={"icon"}>
            {/* 默认状态 */}
            <img src={icon[0]} />
            {/* 选中状态 */}
            <img src={icon[1]} />
          </div>
        ),
        children,
        label,
      };
    }
    return null
  }

  const MenuItems = [
    getItem("品类广场", "dataDashboard", [dataDashboard, dataDashboardSelect], null, [1, 2, 3]),
    getItem("品牌广场", "brandSquare", [brandSquare, brandSquareSelect], null, [1, 2, 3]),
    getItem("SKU广场", "squareSKU", [squareSKU, squareSKUSelect], null, [1, 2, 3]),
    getItem("标签库", "tagLibrary", [tagLibrary, tagLibrarySelect], null, [1, 2]),
    getItem("商品库", "goodsLibrary", [goodsLibrary, goodsLibrarySelect], null, [1, 2]),
    getItem("数据统计", "statistics", [statistics, statisticsSelect], null, [1]),
    getItem("账户管理", "accountManage", [accountManage, accountManageSelect], null, [1, 2]),
    // getItem("Navigation One", "sub1", <PoweroffOutlined />, [
    //   getItem("Option 5", "5"),
    //   getItem("Option 6", "6"),
    // ]),
  ];
  return MenuItems
}

export default MenuItemsCallback;
