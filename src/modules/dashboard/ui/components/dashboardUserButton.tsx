"use client";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const isMobile = useIsMobile();
  if (isPending || !data?.user) {
    return null;
  }

  const handleLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger
          className="rounded-lg borderborder-border/10 p-3 w-full flex
      ems-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden"
        >
          {data.user.image ? (
            <Avatar>
              <AvatarImage
                src={data.user.image}
                alt={data.user.name || "User Avatar"}
              />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={data.user.name || "User"}
              className="size-9 mr-3"
              variant="initials"
            />
          )}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {data.user.name}
            </p>
            <p className="text-xs text-white/70 truncate">{data.user.email}</p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="outline" onClick={() => {}}>
              <CreditCardIcon className="size-4 mr-2" />
              Billing
            </Button>
            <Button
              variant="destructive"
              className="ml-2"
              onClick={handleLogout}
            >
              <LogOutIcon className="size-4 mr-2" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="rounded-lg borderborder-border/10 p-3 w-full flex
      ems-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden"
      >
        {data.user.image ? (
          <Avatar>
            <AvatarImage
              src={data.user.image}
              alt={data.user.name || "User Avatar"}
            />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name || "User"}
            className="size-9 mr-3"
            variant="initials"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {data.user.name}
          </p>
          <p className="text-xs text-white/70 truncate">{data.user.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium  truncate">
              {data.user.name}
            </span>
            <span className="text-sm text-muted-foreground truncate font-normal">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center jubstify-between">
          Biiling
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer flex items-center jubstify-between"
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserButton;
