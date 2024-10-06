

import Slider from "./slider";
import ProductOverview from "./productOverview"
import Footer from "./footer"
import Content from "./womendashboard"
import Team from "./allcategory"
import Example from "./summer.js"
const DashBoard = () => {
  return(
    <>
    <Slider />
    <ProductOverview />
<Example />
    {/* <Team /> */}
    <Content />
    <Footer />
    </>
  )
};

export default DashBoard;


