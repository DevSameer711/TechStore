// import React from "react";
// import { Menu, Dropdown, Row, Col } from "antd";
// import {
//   DownOutlined,
//   MobileOutlined,
//   AudioOutlined,
//   UsbOutlined,
//   LaptopOutlined,
//   AppleOutlined,
// } from "@ant-design/icons";

// const Navbar = () => {
//   // Mobile Submenu content
//   const mobileSubMenu = (
//     <div className="bg-gray-50 text-black shadow-lg rounded-lg w-5/6 p-4 ml-20">
//       <Row>
//         <Col span={4}>
//           <a
//             href="/mobiles/iphone"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="iPhone"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>iPhone</span>
//           </a>
//         </Col>
//         <Col span={4}>
//           <a
//             href="/mobiles/iphone"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="iPhone"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>iPhone</span>
//           </a>
//         </Col>
//         <Col span={4}>
//           <a
//             href="/mobiles/iphone"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="iPhone"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>iPhone</span>
//           </a>
//         </Col>
//         <Col span={4}>
//           <a
//             href="/mobiles/iphone"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="iPhone"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>iPhone</span>
//           </a>
//         </Col>
//         <Col span={4}>
//           <a
//             href="/mobiles/iphone"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="iPhone"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>iPhone</span>
//           </a>
//         </Col>
//         <Col span={4}>
//           <a
//             href="/mobiles/iphone"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="iPhone"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>iPhone</span>
//           </a>
//         </Col>
//       </Row>
//     </div>
//   );

//   // Headphones Submenu content
//   const headphonesSubMenu = (
//     <div className="bg-gray-50 text-black shadow-lg rounded-lg w-5/6 p-4 ml-20">
//       <Row>
//         <Col span={4}>
//           <a
//             href="/headphones/sony"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="Sony Headphones"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>Sony</span>
//           </a>
//         </Col>
//         <Col span={4}>
//           <a
//             href="/headphones/sony"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="Sony Headphones"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>Sony</span>
//           </a>
//         </Col>
//         <Col span={4}>
//           <a
//             href="/headphones/sony"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="Sony Headphones"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>Sony</span>
//           </a>
//         </Col>
//         <Col span={4}>
//           <a
//             href="/headphones/sony"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="Sony Headphones"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>Sony</span>
//           </a>
//         </Col>
//       </Row>
//     </div>
//   );

//   // Power Banks Submenu content
//   const powerBankSubMenu = (
//     <div className="bg-gray-50 text-black shadow-lg rounded-lg w-5/6 p-4 ml-20">
//       <Row>
//         <Col span={4}>
//           <a
//             href="/power-banks/anker"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="Anker Power Bank"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>Anker</span>
//           </a>
//         </Col>
//         <Col span={4}>
//           <a
//             href="/power-banks/anker"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="Anker Power Bank"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>Anker</span>
//           </a>
//         </Col>
//         <Col span={4}>
//           <a
//             href="/power-banks/anker"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="Anker Power Bank"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>Anker</span>
//           </a>
//         </Col>
//         <Col span={4}>
//           <a
//             href="/power-banks/anker"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="Anker Power Bank"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>Anker</span>
//           </a>
//         </Col>
//       </Row>
//     </div>
//   );

//   // Laptops Submenu content
//   const laptopSubMenu = (
//     <div className="bg-gray-50 text-black shadow-lg rounded-lg w-5/6 p-4 ml-20">
//       <Row>
//         <Col span={4}>
//           <a
//             href="/laptops/dell"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="Dell Laptop"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>Dell</span>
//           </a>
//         </Col>
//         <Col span={4}>
//           <a
//             href="/laptops/dell"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="Dell Laptop"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>Dell</span>
//           </a>
//         </Col>
//         <Col span={4}>
//           <a
//             href="/laptops/dell"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="Dell Laptop"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>Dell</span>
//           </a>
//         </Col>
//         <Col span={4}>
//           <a
//             href="/laptops/dell"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="Dell Laptop"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>Dell</span>
//           </a>
//         </Col>
//       </Row>
//     </div>
//   );

//   // Smartwatches Submenu content
//   const smartwatchSubMenu = (
//     <div className="bg-gray-50 text-black shadow-lg rounded-lg w-5/6 p-4 ml-20">
//       <Row>
//         <Col span={4}>
//           <a
//             href="/smartwatches/apple"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="Apple Smartwatch"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>Apple</span>
//           </a>
//         </Col>
//         <Col span={4}>
//           <a
//             href="/smartwatches/apple"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="Apple Smartwatch"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>Apple</span>
//           </a>
//         </Col>
//         <Col span={4}>
//           <a
//             href="/smartwatches/apple"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="Apple Smartwatch"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>Apple</span>
//           </a>
//         </Col>
//         <Col span={4}>
//           <a
//             href="/smartwatches/apple"
//             className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
//           >
//             <img
//               src="https://via.placeholder.com/200"
//               alt="Apple Smartwatch"
//               className="mb-2 w-48 h-48 object-cover"
//             />
//             <span>Apple</span>
//           </a>
//         </Col>
//       </Row>
//     </div>
//   );

//   // Categories Menu with dropdown for subcategories
//   const categoriesMenu = (
//     <Menu className="bg-gradient-to-r text-white p-2 rounded-lg shadow-lg">
//       <Menu.Item
//         key="1"
//         icon={<MobileOutlined />}
//         className="flex items-center hover:text-black p-5 rounded-b-md transition-all"
//       >Mobiles
//         {/* <Dropdown overlay={mobileSubMenu} trigger={["hover"]}>
//           <a className="flex items-center justify-between w-full">
//             Mobiles
//             <DownOutlined className="ml-auto" />
//           </a>
//         </Dropdown> */}
//       </Menu.Item>
//       <Menu.Item
//         key="2"
//         icon={<AudioOutlined />}
//         className="flex items-center hover:text-black p-5 rounded-b-md transition-all"
//       >Headphones
//         {/* <Dropdown overlay={headphonesSubMenu} trigger={["hover"]}>
//           <a className="flex items-center justify-between w-full">
//             Headphones
//             <DownOutlined className="ml-auto" />
//           </a>
//         </Dropdown> */}
//       </Menu.Item>
//       <Menu.Item
//         key="3"
//         icon={<UsbOutlined />}
//         className="flex items-center hover:text-black p-5 rounded-b-md transition-all"
//       >Power Banks
//         {/* <Dropdown overlay={powerBankSubMenu} trigger={["hover"]}>
//           <a className="flex items-center justify-between w-full">
//             Power Banks
//             <DownOutlined className="ml-auto" />
//           </a>
//         </Dropdown> */}
//       </Menu.Item>
//       <Menu.Item
//         key="4"
//         icon={<LaptopOutlined />}
//         className="flex items-center hover:text-black p-5 rounded-b-md transition-all"
//       >Laptops
//         {/* <Dropdown overlay={laptopSubMenu} trigger={["hover"]}>
//           <a className="flex items-center justify-between w-full">
//             Laptops
//             <DownOutlined className="ml-auto" />
//           </a>
//         </Dropdown> */}
//       </Menu.Item>
//       <Menu.Item
//         key="5"
//         icon={<AppleOutlined />}
//         className="flex items-center hover:text-black p-5 rounded-b-md transition-all"
//       >Smartwatches
//         {/* <Dropdown overlay={smartwatchSubMenu} trigger={["hover"]}>
//           <a className="flex items-center justify-between w-full">
//             Smartwatches
//             <DownOutlined className="ml-auto" />
//           </a>
//         </Dropdown> */}
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white h-auto">
//       <div className="container mx-auto flex justify-between px-3 md:px-2">
//         <Dropdown
//           overlay={categoriesMenu}
//           trigger={["hover"]}
//           className="relative group bg-white text-black px-5 rounded-tl-md rounded-tr-md "
//         >
//           <a className="flex items-center hover:text-yellow-400 text-lg font-semibold py-3 md:py-0">
//             Categories
//             <DownOutlined className="ml-16 group-hover:transform group-hover:rotate-180 transition-all" />
//           </a>
//         </Dropdown>

//         <ul className="hidden md:flex space-x-8 pb-4">
//           <li>
//             <a
//               href="/"
//               className="text-xl font-semibold bg-transparent hover:bg-transparent"
//             >
//               Home
//             </a>
//           </li>
//           <li>
//             <a
//               href="/aboutus"
//               className="text-xl font-semibold bg-transparent hover:bg-transparent"
//             >
//               About Us
//             </a>
//           </li>
//           <li>
//             <a
//               href="/contactus"
//               className="text-xl font-semibold bg-transparent hover:bg-transparent"
//             >
//               Contact
//             </a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import React from "react";
import { Menu, Dropdown, Row, Col } from "antd";
import {
  DownOutlined,
  MobileOutlined,
  AudioOutlined,
  UsbOutlined,
  LaptopOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Mobile Submenu content
  const mobileSubMenu = (
    <div className="bg-gray-50 text-black shadow-lg rounded-lg w-5/6 p-4 ml-20">
      <Row>
        <Col span={4}>
          <a
            href="/mobiles/iphone"
            className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
          >
            <img
              src="https://via.placeholder.com/200"
              alt="iPhone"
              className="mb-2 w-48 h-48 object-cover"
            />
            <span>iPhone</span>
          </a>
        </Col>
        {/* Other products in the mobile category */}
      </Row>
    </div>
  );

  // Headphones Submenu content
  const headphonesSubMenu = (
    <div className="bg-gray-50 text-black shadow-lg rounded-lg w-5/6 p-4 ml-20">
      <Row>
        <Col span={4}>
          <a
            href="/headphones/sony"
            className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
          >
            <img
              src="https://via.placeholder.com/200"
              alt="Sony Headphones"
              className="mb-2 w-48 h-48 object-cover"
            />
            <span>Sony</span>
          </a>
        </Col>
        {/* Other products in the headphones category */}
      </Row>
    </div>
  );

  // Power Banks Submenu content
  const powerBankSubMenu = (
    <div className="bg-gray-50 text-black shadow-lg rounded-lg w-5/6 p-4 ml-20">
      <Row>
        <Col span={4}>
          <a
            href="/power-banks/anker"
            className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
          >
            <img
              src="https://via.placeholder.com/200"
              alt="Anker Power Bank"
              className="mb-2 w-48 h-48 object-cover"
            />
            <span>Anker</span>
          </a>
        </Col>
        {/* Other products in the power banks category */}
      </Row>
    </div>
  );

  // Laptops Submenu content
  const laptopSubMenu = (
    <div className="bg-gray-50 text-black shadow-lg rounded-lg w-5/6 p-4 ml-20">
      <Row>
        <Col span={4}>
          <a
            href="/laptops/dell"
            className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
          >
            <img
              src="https://via.placeholder.com/200"
              alt="Dell Laptop"
              className="mb-2 w-48 h-48 object-cover"
            />
            <span>Dell</span>
          </a>
        </Col>
        {/* Other products in the laptops category */}
      </Row>
    </div>
  );

  // Smartwatches Submenu content
  const smartwatchSubMenu = (
    <div className="bg-gray-50 text-black shadow-lg rounded-lg w-5/6 p-4 ml-20">
      <Row>
        <Col span={4}>
          <a
            href="/smartwatches/apple"
            className="flex flex-col items-center hover:bg-blue-400 hover:text-black p-5 rounded-lg transition-all"
          >
            <img
              src="https://via.placeholder.com/200"
              alt="Apple Smartwatch"
              className="mb-2 w-48 h-48 object-cover"
            />
            <span>Apple</span>
          </a>
        </Col>
        {/* Other products in the smartwatches category */}
      </Row>
    </div>
  );

  // Categories Menu with dropdown for subcategories
  const categoriesMenu = (
    <Menu className="bg-gradient-to-r text-white p-2 rounded-lg shadow-lg">
      <Menu.Item
        key="1"
        icon={<MobileOutlined />}
        className="flex items-center hover:text-black p-5 rounded-b-md transition-all"
        onClick={() => navigate(`/productsearch?query=mobiles`)} // Navigate with the query for mobiles
      >
        Mobiles
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<AudioOutlined />}
        className="flex items-center hover:text-black p-5 rounded-b-md transition-all"
        onClick={() => navigate(`/productsearch?query=headphones`)} // Navigate with the query for headphones
      >
        Headphones
      </Menu.Item>
      {/* <Menu.Item
        key="3"
        icon={<UsbOutlined />}
        className="flex items-center hover:text-black p-5 rounded-b-md transition-all"
        onClick={() => navigate(`/productsearch?query=power-banks`)} // Navigate with the query for power banks
      >
        Power Banks
      </Menu.Item> */}
      <Menu.Item
        key="4"
        icon={<LaptopOutlined />}
        className="flex items-center hover:text-black p-5 rounded-b-md transition-all"
        onClick={() => navigate(`/productsearch?query=laptops`)} // Navigate with the query for laptops
      >
        Laptops
      </Menu.Item>
      <Menu.Item
        key="5"
        icon={<AppleOutlined />}
        className="flex items-center hover:text-black p-5 rounded-b-md transition-all"
        onClick={() => navigate(`/productsearch?query=smartwatches`)} // Navigate with the query for smartwatches
      >
        Smartwatches
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white h-auto">
      <div className="container mx-auto flex justify-between px-3 md:px-2">
        <Dropdown
          overlay={categoriesMenu}
          trigger={["hover"]}
          className="relative group bg-white text-black px-5 rounded-tl-md rounded-tr-md "
        >
          <a className="flex items-center hover:text-yellow-400 text-lg font-semibold py-3 md:py-0">
            Categories
            <DownOutlined className="ml-16 group-hover:transform group-hover:rotate-180 transition-all" />
          </a>
        </Dropdown>

        <ul className="hidden md:flex space-x-8 pb-4">
          <li>
            <a
              href="/"
              className="text-xl font-semibold bg-transparent hover:bg-transparent"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/aboutus"
              className="text-xl font-semibold bg-transparent hover:bg-transparent"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="/contactus"
              className="text-xl font-semibold bg-transparent hover:bg-transparent"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
