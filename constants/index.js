"use client";
import { SiPersonio } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { TiContacts } from "react-icons/ti";
import { RiShoppingBag2Line } from "react-icons/ri";
import { RiCalendarLine } from "react-icons/ri";
import { UserDropdown } from '@/components/index';

export const navOptions = [
  {
    name: "About",
    href: "/#about",
    icon: <SiPersonio size={25} className="m-auto"/>,
  },
  {
    name: "Schedule",
    href: "/schedule",
    icon: <RiCalendarLine size={25} className="m-auto"/>
  },
  {
    name: "Contact",
    href: "/contact",
    icon: <TiContacts size={25} className="m-auto"/>
  },
  // {
  //   href: "",
  //   name: <UserDropdown />,
  //   icon: <CgProfile size={25} className="m-auto"/>
  // }
]
