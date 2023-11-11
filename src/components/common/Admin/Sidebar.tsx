import React from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Dialog,
  Button,
  DialogFooter,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import {
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import styles from "../../../User.module.css"

function Sidebar() {
  const userLoginJSON = localStorage.getItem("username");
  const userLogin: any = userLoginJSON
    ? JSON.parse(userLoginJSON)
    : null;
  const newName = userLogin?.firstName.replace(/["\\]/g, '');
  const newLastName = userLogin?.lastName.replace(/["\\]/g, '');
  const location = useLocation()
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: React.SetStateAction<number>) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <>
      <Card className="w-2/5 dasboard p-4 shadow-xl shadow-blue-gray-900/5 ">

        <p style={{ textAlign:"center", marginTop:"17px"}}> Xin chào Admin</p>
        <p style={{ margin: "25px 0 40px 35px", fontSize:"27px", letterSpacing:"1px"}}> {newName} {newLastName}</p>
        <List>
          <ListItem className={location.pathname == '/admin' ? 'active custom-hover' : 'custom-hover'}>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/admin">Dasboard</Link>
            <ListItemSuffix>

            </ListItemSuffix>
          </ListItem>

          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""
                  }`}
              />
            }
          >
            <ListItem className="p-0 custom-hover" selected={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  ECommerce
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0" style={{ color: "#fff", fontSize: "15px" }}>
                <ListItem className={location.pathname == '/admin/managerorder' ? 'active custom-hover' : 'custom-hover'}>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  <Link to="/admin/managerorder">Orders</Link>
                </ListItem>{" "}
                <ListItem className={location.pathname == '/admin/managerproduct' ? 'active custom-hover' : 'custom-hover'}>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  <Link to="/admin/managerproduct">Products</Link>
                </ListItem>{" "}
              </List>
            </AccordionBody>
          </Accordion>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem className={location.pathname == '/admin/manageruser' ? 'active custom-hover' : 'custom-hover'}>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/admin/manageruser">Customers</Link>
            <ListItemSuffix>
              <Chip
                value={0}
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem className=" custom-hover">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Discounts
          </ListItem>
          <ListItem className=" custom-hover">
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Feedbacks
          </ListItem>
          <ListItem className=" custom-hover ">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card></>
  );
}
export default Sidebar;
