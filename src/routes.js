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
import Register from "views/pages/Register.js";
import Login from "views/pages/Login.js";
import Tables from "views/pages/Tables.js";
import Icons from "views/pages/Icons.js";
import Home from "views/pages/Home.js";
import Apply from "views/pages/Apply.js";
import ConfirmPasscode from "views/pages/ConfirmPasscode.js";
import ApplyNow from "views/pages/ApplyNow.js";
import AppSuccess  from "views/pages/Successful";

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
    name: "ApplyNow",
    icon: "ni ni-tv-2 text-primary",
    component: ApplyNow,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },

  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/home",
    name: "Home",
    icon: "ni ni-tv-2 text-primary",
    component: Home,
    layout: "/auth"
  },
  {
    path: "/apply",
    name: "Apply",
    icon: "ni ni-tv-2 text-primary",
    component: Apply,
    layout: "/auth"
  },
  {
    path: "/confirmpasscode",
    name: "ConfirmPasscode",
    icon: "ni ni-tv-2 text-primary",
    component: ConfirmPasscode,
    layout: "/auth"
  },

  
];
export default routes;
