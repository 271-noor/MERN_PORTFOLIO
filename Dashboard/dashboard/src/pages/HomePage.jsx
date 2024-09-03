import { clearAllUserErrors, logout } from "@/store/slices/userSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquareMore,
  Package,
  Package2,
  PanelLeft,
  PencilRuler,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Dashboard from "./sub-components/Dashboard";
import AddProject from "./sub-components/AddProject";
import AddSkill from "./sub-components/AddSkill";
import AddApplication from "./sub-components/AddApplication";
import AddTimeline from "./sub-components/AddTimeline";
import Account from "./sub-components/Account";
import Messages from "./sub-components/Messages";


const HomePage = () => {
  const [active, setActive] = useState("Dashboard");

  const { isAuthenticated, error, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out");
  };

  const navigateTo = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated]);
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">

      {/* For Sidebar Max Screen Code... */}
        <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex z-50">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full">
              <Package className="h-6 w-6 transition-all group-hover: scale-110" />
              <span className="sr-only">Dashboard</span>
            </Link>

            {/* For Home */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Dashboard"
                        ? "text-accent-foreground bg-accent"
                        : " text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Dashboard")}
                  >
                    <Home className="w-5 h-5 " />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className=" bg-black text-white px-1.5 py-1 rounded-md ">Dashboard</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* For Add Projects */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Add Project"
                        ? "text-accent-foreground bg-accent"
                        : " text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Add Project")}
                  >
                    <FolderGit className="w-5 h-5 " />
                    <span className="sr-only">Add Project</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className=" bg-black text-white px-1.5 py-1 rounded-md " >Add Project</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* For Add Skill */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Add Skill"
                        ? "text-accent-foreground bg-accent"
                        : " text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Add Skill")}
                  >
                    <PencilRuler className="w-5 h-5 " />
                    <span className="sr-only">Add Skill</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className=" bg-black text-white px-1.5 py-1 rounded-md " >Add Skill</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* For Add Application */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Add Application"
                        ? "text-accent-foreground bg-accent"
                        : " text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Add Application")}
                  >
                    <LayoutGrid className="w-5 h-5 " />
                    <span className="sr-only">Add Application</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className=" bg-black text-white px-1.5 py-1 rounded-md " >Add Application</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* For Add Timeline */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Add Timeline"
                        ? "text-accent-foreground bg-accent"
                        : " text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Add Timeline")}
                  >
                    <History className="w-5 h-5 " />
                    <span className="sr-only">Add Timeline</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className=" bg-black text-white px-1.5 py-1 rounded-md " >Add Timeline</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* For Messages */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Messages"
                        ? "text-accent-foreground bg-accent"
                        : " text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Messages")}
                  >
                    <MessageSquareMore className="w-5 h-5 " />
                    <span className="sr-only">Messages</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className=" bg-black text-white px-1.5 py-1 rounded-md ">Messages</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* For Account */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Account"
                        ? "text-accent-foreground bg-accent"
                        : " text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Account")}
                  >
                    <User className="w-5 h-5 " />
                    <span className="sr-only">Account</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className=" bg-black text-white px-1.5 py-1 rounded-md ">Account</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>

          {/* For Logout... */}
          <nav className="mt-auto flex-col items-center gap-4 px-2 py-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Logout"
                        ? "text-accent-foreground bg-accent"
                        : " text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5 " />
                    <span className="sr-only">Logout</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className=" bg-black text-white px-1.5 py-1 rounded-md ">Logout</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>

                {/* For Sidebar Small Screen After click Package Icon... */}
        <header
          className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4
          sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]"
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5 " />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full 
                                bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                </Link>

                {/* For Dashboard */}
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Dashboard"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Dashboard")}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>

                {/* For Add Project */}
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Project"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Add Project")}
                >
                  <FolderGit className="h-5 w-5" />
                  Add Project
                </Link>

                {/* For Add Skill */}
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Skill"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Add Skill")}
                >
                  <PencilRuler className="h-5 w-5" />
                  Add Skill
                </Link>

                {/* For Add Applications */}
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Application"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Add Application")}
                >
                  <LayoutGrid className="h-5 w-5" />
                  Add Application
                </Link>

                {/* For Account */}
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Account"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Account")}
                >
                  <User className="h-5 w-5" />
                  Account
                </Link>

                {/* For Timelines */}
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Timeline"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Add Timeline")}
                >
                  <History className="h-5 w-5" />
                    Add Timeline
                </Link>

                {/* For Messages */}
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Messages"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Messages")}
                >
                  <MessageSquareMore className="h-5 w-5" />
                  Messages
                </Link>

                {/* For Logout... */}
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground`}
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Link>
              </nav>
            </SheetContent>
          </Sheet>


                      <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5">
                        <img src={user && user.avatar && user.avatar.url} 
                       alt="avatar" 
                       className="w-20 h-20 rounded-full max-[900px]:hidden" 
                       />
                            <h1 className="text-4xl font-semibold max-[900px]:text-2xl">  
                                Welcome back, {user.fullName}
                            </h1>
                      </div>

        </header>

                  {
                    (() => {
                      switch (active) {
                        case "Dashboard":
                          return <Dashboard />
                          break;
                        case "Add Project":
                          return <AddProject />
                          break;
                        case "Add Skill":
                          return <AddSkill />
                          break;
                        case "Add Application":
                          return <AddApplication />
                          break;
                        case "Add Timeline":
                          return <AddTimeline />
                          break;
                          case "Account":
                            return <Account />
                            break;
                            case "Messages":
                              return <Messages />
                              break;
                      
                        default:
                          return <Dashboard />
                          break;
                      }
                    })()}
      </div>
    </>
  );
};

export default HomePage;
