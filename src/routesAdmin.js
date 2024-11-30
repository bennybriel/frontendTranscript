/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/pages/Profile.js";
import Maps from "views/pages/Maps.js";
import Tables from "views/pages/Tables.js";
import Icons from "views/pages/Icons.js";
import ApplyNow from "views/pages/ApplyNow.js";
import Prepay from "views/pages/Prepay.js";
import Success from "views/pages/Success.js";
import Failed from "views/pages/Failed.js";
import CompleteApplication from "views/pages/CompleteApplication.js";
import AppList from "views/pages/AppList.js";
import Payments from "views/pages/Payments.js";
import Receipt from "views/pages/Receipt.js";
import Successful from "views/pages/Successful";
var routes = [
 
  {
    path: "/index",
    name: "My Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/applynow",
    name: "Apply Now",
    icon: "ni ni-tv-2 text-primary",
    component: ApplyNow,
    layout: "/admin"
  },
  {
    path: "/applist",
    name: "Submitted Applications",
    icon: "ni ni-bullet-list-67 text-red",
    component: AppList,
    layout: "/admin"
  },
  {
    path: "/payments",
    name: "Payment history",
    icon: "ni ni-bullet-list-67 text-red",
    component: Payments,
    layout: "/admin"
  },
  // {
  //   path: "/receipt",
  //   name: "Payment Receipt",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Receipt,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin"
  // },
  {
    path: "/prepay",
    // name: "Prepay",
    // icon: "ni ni-bullet-list-67 text-red",
     component: Prepay,
    layout: "/admin"
  },
  {
    path: "/success",
    // name: "Confirmation",
    // icon: "ni ni-tv-2 text-primary",
    component: Success,
    layout: "/admin"
  },
  {
    path: "/failed",
    // name: "Confirmation",
    // icon: "ni ni-tv-2 text-primary",
    component: Failed,
    layout: "/admin"
  },
  {
    path: "/completeapplication",
    // name: "Complete Application",
    // icon: "ni ni-tv-2 text-primary",
    component: CompleteApplication,
    layout: "/admin"
  },
  {
    path: "/successful",
    // name: "Confirmation",
    // icon: "ni ni-tv-2 text-primary",
    component: Successful,
    layout: "/admin"
  },


];
export default routes;
