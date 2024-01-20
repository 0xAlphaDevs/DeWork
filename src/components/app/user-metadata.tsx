import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConnectKitButton } from "connectkit";

export function UserMetadata() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Details</DialogTitle>
          <DialogDescription>
            Register your details here to access the DeWork.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="userName" className="text-right">
              Name
            </Label>
            <Input id="userName" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="userType" className="text-right">
              Username
            </Label>
            <Input id="userType" value="@peduarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="userLocation" className="text-right">
              Location
            </Label>
            <Input id="userLocation" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <ConnectKitButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
