import React, { useState, ChangeEvent, FormEvent } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormData {
  userName: string;
  userType: string;
  userLocation: string;
}

export function UserMetadata({ setRecheckUser }: { setRecheckUser: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    userType: "",
    userLocation: "",
  });

  function handleClick() {
    // reset all state values
    setFormData({
      userName: "",
      userType: "",
      userLocation: "",
    });
    setUserRegistered(false);
    setIsLoading(false);
  }

  async function registerUser() {
    try {
      setIsLoading(true);
      console.log(" Data: ", formData);
      // TO DO: call register function from smart contract

      setTimeout(() => {
        setIsLoading(false);
        setUserRegistered(true);
        setRecheckUser((prev: boolean) => !prev);
      }, 2000);
    } catch (error) {
      console.error("Error submitting metaData:", error);
      setIsLoading(false);
    }
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitRequest = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Registering...");
    console.log("Form Data: ", formData);
    await registerUser();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleClick}>
          Register
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-40 gap-4">
            {/* <Loader /> */}
            <p>Registering user...</p>
          </div>
        ) : (
          <>
            {!userRegistered ? (
              <>
                <DialogHeader>
                  <DialogTitle>Enter Details</DialogTitle>
                  <DialogDescription>
                    Register your details here to access the DeWork.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitRequest}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="userName" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="userName"
                        value={formData.userName}
                        className="col-span-3"
                        onChange={handleChange}
                        name="userName"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="userType" className="text-right">
                        Username
                      </Label>
                      <Select
                        onValueChange={(value: string) =>
                          setFormData({
                            ...formData,
                            userType: value,
                          })
                        }
                        required
                        name="userType"
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a user type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="health">Client</SelectItem>
                            <SelectItem value="travel">Freelancer</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="userLocation" className="text-right">
                        Location
                      </Label>
                      <Input
                        id="userLocation"
                        value={formData.userLocation}
                        className="col-span-3"
                        onChange={handleChange}
                        name="userLocation"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Submit</Button>
                  </DialogFooter>
                </form>
              </>
            ) : (
              <div className="flex flex-col gap-4 items-center">
                <CheckCircledIcon className="w-20 h-20 text-green-500" />
                <p>Registered Successfully</p>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
